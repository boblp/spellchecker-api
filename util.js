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

// OLD
// const getSuggestions = (word) => {
//   const suggestions = [word]

//   // search for words with 1 extra letter at the end
//   alphabet.forEach((letter) => {
//     const newWord = word + letter
//     if (dictionary[newWord]) {
//       suggestions.push(newWord)
//     }
//   })

//   // search for word with 1 less letter at the end
//   const newWord = word.substring(0, word.length - 1)
//   if (dictionary[newWord]) {
//     suggestions.push(newWord)
//   }

//   return suggestions
// }

const getSuggestions = (word) => {
  const formattedWord = word.toLowerCase();
  const suggestions = {
    inserts: getInsertEdit(formattedWord),
    deletes: getDeleteEdit(formattedWord),
    subs: getSubsEdit(formattedWord),
    trans: getTransEdit(formattedWord),
  }

  if (dictionary[formattedWord]) {
    suggestions.isCorrect = formattedWord
  }

  // Ideally these would be ranked by frequency of occurrence in the vocabulary
  // And sent in a single array
  return suggestions;

}

const getInsertEdit = (word) => {
  const wordArr = word.split('')
  const suggestions = [];

  // search for words with 1 extra letter anywhere but the end
  wordArr.forEach((letter, index) => {
    alphabet.forEach((char) => {
      const newWord = wordArr.slice(0, index).concat(char).concat(wordArr.slice(index))
      if (dictionary[newWord.join('')]) {
        suggestions.push(newWord.join(''))
      }
    })
  })

  // search for words with 1 extra letter at the end
  alphabet.forEach((letter) => {
    const newWord = word + letter
    if (dictionary[newWord]) {
      suggestions.push(newWord)
    }
  })

  return suggestions;
}

const getDeleteEdit = (word) => {
  const wordArr = word.split('')
  const suggestions = [];

  wordArr.forEach((letter, index) => {
    const newWord = wordArr.slice(0, index).concat(wordArr.slice(index + 1))
    if (dictionary[newWord.join('')]) {
      suggestions.push(newWord.join(''))
    }
  })

  return suggestions;
}

const getSubsEdit = (word) => {
  const wordArr = word.split('')
  const suggestions = [];

  wordArr.forEach((letter, index) => {
    alphabet.forEach((char) => {
      if (char === letter) return;
      const newWord = wordArr.slice(0, index).concat(char).concat(wordArr.slice(index + 1))
      if (dictionary[newWord.join('')]) {
        suggestions.push(newWord.join(''))
      }
    })
  })

  return suggestions;
}

const getTransEdit = (word) => {
  const wordArr = word.split('')
  const suggestions = [];

  wordArr.forEach((letter, index) => {
    if (index === wordArr.length - 1) return;
    const newWord = wordArr.slice(0, index).concat(wordArr[index + 1]).concat(wordArr[index]).concat(wordArr.slice(index + 2))
    if (dictionary[newWord.join('')]) {
      suggestions.push(newWord.join(''))
    }
  })

  return suggestions;
}

module.exports = {
  isValidCasing,
  getSuggestions,
}