import toyService from '../services/toy.service'

export const toyModule = {
  state() {
    return {
      toys: [],
      currToy: '',
      filterBy: {
        name: '',
        inStock: 'All',
        label: 'All',
      },
    }
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    addToy(state, { toy }) {
      state.toys.push(toy)
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((toy) => toy._id === toyId)
      state.toys.splice(idx, 1)
    },
    toggleToy(state, { toy }) {
      toy.isDone = !toy.isDone
      const idx = state.toys.findIndex((item) => item._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((item) => item._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    setCurrToy(state, { currToy }) {
      state.currToy = currToy
    },
    setToys(state, { toys }) {
      state.toys = toys
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
  },
  getters: {
    toys({ toys, filterBy }) {
      var filteredToys = toys
      if (
        !filterBy.name &&
        filterBy.label === 'All' &&
        filterBy.inStock === 'All'
      ) {
        filteredToys = toys
      } else {
        if (filterBy.inStock === 'All') {
          filteredToys = toys
        } else if (filterBy.inStock === true) {
          filteredToys = toys.filter((toy) => toy.inStock)
        }
        if (!filterBy.inStock) {
          filteredToys = toys.filter((toy) => !toy.inStock)
        }
        if (filterBy.label === 'All') {
          filteredToys = filteredToys
        } else {
          filteredToys = toys.filter((toy) =>
            toy.labels.includes(filterBy.label)
          )
        }
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter((toy) => regex.test(toy.name))
      }
      return filteredToys
    },
    getCurrToy({ currToy }) {
      const toy = JSON.parse(JSON.stringify(currToy))
      return toy
    },
    toysProgress({ toys }) {
      if (!toys.length) return 0
      const toyDone = toys.filter((toy) => toy.isDone)
      const toyUnDone = toys.filter((toy) => !toy.isDone)
      const progressPrecent = Math.round(
        (toyDone.length / (toyDone.length + toyUnDone.length)) * 100
      )
      return progressPrecent
    },
    isLoading({ isLoading }) {
      return isLoading
    },
    getLabelAcc({ toys }) {
      var labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ]
      var labelsAccumulator = labels.map((label) => {
        return toys.reduce((acc, toy) => {
          if (toy.labels.includes(label) && toy.inStock) {
            acc++
          }
          return acc
        }, 0)
      })
      console.log(labelsAccumulator)
      return labelsAccumulator
    },
    getPriceTitle({ toys }) {
      var labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ]
      var labelsAccumulator = labels.map((label) => {
        var num = 0
        return toys.reduce((acc, toy) => {
          if (toy.labels.includes(label)) {
            console.log(num)
            if (acc === 0) {
              acc = toy.price
            } else {
              acc += toy.price
            }
            num++
          }
          var average = acc / num
          if (average) {
            return average
          } else return 0
        }, 0)
      })
      console.log(labelsAccumulator)
      return labelsAccumulator
    },
  },
  actions: {
    loadToys(context) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      return toyService
        .query()
        .then((toys) => {
          console.log('toys', toys)
          context.commit({ type: 'setToys', toys })
        })
        .catch((err) => {
          console.log('cannot load toys', err)
          throw err
        })
        .finally(() => {
          context.commit({ type: 'setIsLoading', isLoading: false })
        })
    },
    addToy(context, { toy }) {
      return toyService
        .save(toy)
        .then((savedToy) => {
          context.commit({ type: 'addToy', toy: savedToy })
          return savedToy
        })
        .catch((err) => {
          console.log('Cannot add toy', err)
          throw err
        })
    },
    removeToy(context, { toyId }) {
      const idx = context.state.toys.findIndex((toy) => toy._id === toyId)
      var toy = context.state.toys[idx]
      return toyService
        .remove(toyId)
        .then(() => {
          context.commit({ type: 'removeToy', toyId })
        })
        .catch((err) => {
          console.log('Cannot remove toy', err)
          throw err
        })
    },
    updateToy(context, { toy }) {
      return toyService
        .save(toy)
        .then((updatedToy) => {
          context.commit({ type: 'updateToy', toy: updatedToy })
          return updatedToy
        })
        .catch((err) => {
          console.log('Cannot update toy', err)
          throw err
        })
    },

    getById(context, { toyId }) {
      console.log(toyId)
      return toyService
        .getById(toyId)
        .then((currToy) => {
          context.commit({ type: 'setCurrToy', currToy })
          return currToy
        })
        .catch((err) => {
          console.log('Cannot find toy', err)
          throw err
        })
    },
  },
}
