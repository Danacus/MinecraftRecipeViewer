import jetpack from 'fs-jetpack'

const path = '/home/daan/.local/share/RecipeViewer/data.json'

let storage

export default function createStorage() {
  jetpack.file(path)
  storage = jetpack.readAsync(path, 'json')
  return {
    getItem: (key) => {
      return new Promise((resolve) => {
        storage.then(file => resolve(file[key]))
      })
    },
    setItem: (key, item) => {
      return new Promise((resolve) => {
        storage.then(file => {
          file[key] = item
          jetpack.writeAsync(path, file).then(() => resolve())
        })
      })
    },
    removeItem: (key) => {
      return new Promise((resolve) => {
        storage.then(file => {
          delete file[key]
          jetpack.writeAsync(path, file).then(() => resolve())
        })
      })
    }
  }
}