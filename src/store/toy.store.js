import toyService from '../services/toy.service'

export const toyModule = {
  state() {
    return {
      toys: [],
      currToy: '',
      filterBy: '',
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
      if (!filterBy) {
        filteredToys = toys
      }
      const regex = new RegExp(filterBy.title, 'i')
      if (filterBy.isDone === 'all') {
        filteredToys = toys.filter((toy) => regex.test(toy.title))
      } else {
        filteredToys = toys.filter(
          (toy) => regex.test(toy.title) && toy.isDone === filterBy.isDone
        )
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
  },
  actions: {
    loadToys(context) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      return toyService
        .query()
        .then((toys) => context.commit({ type: 'setToys', toys }))
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
          context.dispatch({ type: 'addActivity', toy: toy, kind: 'added' })
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
          context.dispatch({
            type: 'addActivity',
            toy: toy,
            kind: 'removed',
          })
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
          console.log(context)
          context.dispatch({
            type: 'addActivity',
            toy: updatedToy,
            kind: 'update',
          })
          // context.$router.push({ path: '/' })
          return updatedToy
        })
        .catch((err) => {
          console.log('Cannot update toy', err)
          throw err
        })
    },
    toggleToy(context, { toy }) {
      return toyService
        .save(toy)
        .then((updatedToy) => {
          context.commit({ type: 'toggleToy', toy: updatedToy })
          context.dispatch({
            type: 'addActivity',
            toy: updatedToy,
            kind: 'toggle',
          })
          return updatedToy
        })
        .catch((err) => {
          console.log('Cannot toggle toy', err)
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
