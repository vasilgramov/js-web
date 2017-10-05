const fs = require('fs')

let db = []
let dbPath = './db/db.json'

let load = () => {
  return new Promise((res,rej) => {
    fs.readFile(dbPath, (err,data) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('loading')
      db = JSON.parse(data)
      res()
    })
  })
}

let save = () => {
  return new Promise((res,rej) => {
    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if (err) {
        console.log(err)
        return
      }

      res()
    })
  })
}

let add = (movie) =>{
  db.push(movie)
}

let dbCopy = () => {
  
  return db.slice(0)
}

let getById = (id) => {
  for (let meme of db) {
    if (meme['id'] === id) {
      return meme
    }
  }

  throw Error('Meme not found')
}

let length = () => {
  return db.length
}

module.exports = {
  load:load,
  save:save,
  getDb:dbCopy,
  add:add,
  getById: getById,
  length: length
}
