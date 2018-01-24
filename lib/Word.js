var Letter = require("./Letter");

// Word.js creates an array of letters and determines if the user guessed a letter correctly
function Word(word) {
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  });
}

Word.prototype.getSolution = function() {
  return this.letters.map(function(letter) {
    return letter.getSolution();
  }).join('');
}

Word.prototype.toString = function() {
  return this.letters.join(' ');
};

Word.prototype.guessLetter = function(char) {
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });

  console.log("\n" + this + "\n");
  return foundLetter;
};

Word.prototype.guessedCorrectly = function() {
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;
