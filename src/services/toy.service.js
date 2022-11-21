import { utilService } from '../services/util.service'
import { storageService } from '../services/async-storage.service'

export default {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

const STORAGE_KEY = 'toysDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]

var gToys = _createToys()
console.log(gToys)

function query() {
  const toys = storageService.query(STORAGE_KEY)
  return toys
}

function getById(id) {
  const currToy = storageService.get(STORAGE_KEY, id)
  console.log(currToy)
  return Promise.resolve(currToy)
}

function remove(id) {
  storageService.remove(STORAGE_KEY, id)
  return Promise.resolve()
}

function save(toy) {
  const toyToSave = JSON.parse(JSON.stringify(toy))
  const savedToy = toyToSave._id
    ? storageService.put(STORAGE_KEY, toyToSave)
    : storageService.post(STORAGE_KEY, toyToSave)
  return Promise.resolve(savedToy)
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    createdAt: Date.now(),
    inStock: true,
    price: '',
    labels: [''],
  }
}

function _createToys() {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (!toys || !toys.length) {
      toys = [_createToy('buzz'), _createToy('masaya'), _createToy('dog')]
      utilService.saveToStorage(STORAGE_KEY, toys)
    }
    return toys
  })
}

function _createToy(name = 'waldo!') {
  return {
    _id: utilService.makeId(),
    name,
    createdAt: Date.now(),
    price: 30,
    inStock: true,
    labels: [labels[1], labels[2]],
  }
}
