const express = require('express')
const fs = require('fs')
const app = express()
const port = 31337
const { dictionary } = JSON.parse(fs.readFileSync('dictionary.json', 'utf8'))
console.log(dictionary)
const {
  isValidCasing,
  getSuggestions,
} = require('./util')

app.get('/', (req, res) => {
  // Please check the util.js file to see possible upgrades to this API.
  res.send('Welcome to the Outdefine Take Home API by Bob Lozano')
})

app.get('/spellcheck/:word', (req, res) => {
  const word = req.params.word
  const response = { suggestions: [], correct: false }

  // check if word exists regardless of casing
  if (Object.hasOwn(dictionary, word.toLowerCase())) {
    if(isValidCasing(word)) {
      response.correct = true
      return res.status(200).json(response)
    }
    
    response.suggestions = getSuggestions(word.toLowerCase())
    return res.status(200).json(response)
  }

  return res.status(404).send('Not found.')
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})