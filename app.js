const express = require('express')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.static('./src/'))

app.use(cors({
  origin: '*'
}))

// JSON nd x-www-form-urlencoded parsers
app.use(express.json());
app.use(express.urlencoded());

// GET /api/list
app.get('/api/list', function (req, res) {
  if (req.query.search == undefined) {
    res.status(500).send("Bad parameters")
  }
  else {
    let search = req.query.search
    let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    let hero = data.overwatch.filter(
        e => {
            return (e.key.indexOf(search) != -1) || (e.name.indexOf(search) != -1) || (e.role.indexOf(search) != -1) || (e.message.indexOf(search) != -1)
        }
    )
    res.send(
        hero
    )
  }
})

// POST /api/detail
app.post('/api/detail', function (req, res) {
    if (req.body.key == undefined) {
      res.status(500).send("Bad parameters")
    }
    else {
      let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
      let hero = data.overwatch.filter(
          e => {
              return e.key == req.body.key
          }
      )
      res.send(
          hero
      )
    }
})

// Create server that no accepts SSL requests
app.listen(PORT, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
