const fs = require('fs')
const { dictionary } = JSON.parse(fs.readFileSync('dictionary.json', 'utf8'))
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const isValidCasing = (word) => {
  const hasUpperAndLower = /[A-Z]/.test(word) && /[a-z]/.test(word)
  const firstChar = word.substring(0, 1)
  const allButFirst = word.substring(1)

  // check if the first letter is uppercase and the rest are lowercase
  if (
    firstChar === firstChar.toUpperCase()
    && allButFirst === allButFirst.toLowerCase()
  ) {
    return true
  }

  // check if word contains both upper and lower case
  if (!hasUpperAndLower) {
    return true
  }

  return false
}

const getSuggestions = (word) => {
  const suggestions = [word]

  // search for words with 1 extra letter at the end
  alphabet.forEach((letter) => {
    const newWord = word + letter
    if (dictionary[newWord]) {
      suggestions.push(newWord)
    }
  })

  // search for word with 1 less letter at the end
  const newWord = word.substring(0, word.length - 1)
  if (dictionary[newWord]) {
    suggestions.push(newWord)
  }

  return suggestions
}

const getSuggestionsExtra = (word) => {
  // When a word is misspelled, a spell checker will suggest a list of possible corrections. 
  // Those suggestions are based on the following rules:
  // 1. Identify the misspelled word.
  // 2. Find words that are N *edits* away from the misspelled word.
  // 3. Filter suggested candidates to retain only the ones found in the vocabulary.
  // 4. Order the suggested candidates by their frequency of occurrence in the vocabulary.
  // 5. Return the top N suggestions.

  // Types of Edits:
  // 1. Insertion: a letter is inserted into the word.
  // 2. Deletion: a letter is deleted from the word.
  // 3. Substitution: a letter is replaced with another letter.
  // 4. Transposition: two adjacent letters are swapped.
}
      

module.exports = {
  isValidCasing,
  getSuggestions,
}