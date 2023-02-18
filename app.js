const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const port = 31337
const { dictionary } = JSON.parse(fs.readFileSync('dictionary.json', 'utf8'))
const {
  isValidCasing,
  getSuggestions,
} = require('./util')

app.use(cors())

app.get('/', (req, res) => {
  // Please check the util.js file to see possible upgrades to this API.
  res.send('Welcome to the Outdefine Take Home API by Bob Lozano')
})

app.get('/spellcheck/:word', (req, res) => {
  const word = req.params.word
  const response = { suggestions: [], correct: false }

  // check if word exists regardless of casing
  if (dictionary[word.toLowerCase()] && isValidCasing(word)) {
    response.correct = true
    return res.status(200).json(response)
  }

  response.suggestions = getSuggestions(word)
  return res.status(404).json(response)
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})