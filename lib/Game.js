var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");

// "Game" keeps score and controls the game flow.
function Game() {
  var self = this;

  this.play = function() {
    this.guessesRemaining = 10;
    this.newWord();
  };

  // Randomly pick a Word from the words.js file/array.
  // Create a Word object
  this.newWord = function() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randomWord);
    console.log('\n' + this.currentWord + '\n');
    this.makeGuess();
  };

  // User Guess
  this.makeGuess = function() {
    this.guessLetter().then(function() {
      // Check how many guesses remaining.  If 0, then ask to play again.
      if (self.guessesRemaining < 1) {
        console.log(
          "You don't know your NFL teams! The team was: \"" + self.currentWord.getSolution() + "\"\n"
        );
        self.playAgain();

        // If the user guessed all letters of the current word corrently, reset guessesRemaining to 10 and get the next word
      }
      else if (self.currentWord.guessedCorrectly()) {
        console.log("Got it! You know your NFL teams!  The next team is...");
        self.guessesRemaining = 10;
        self.newWord();
      }
      else {
        self.makeGuess();
      }
    });
  };

  // Play Again?
  this.playAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Do you want to play again?"
        }
      ])
      .then(function(val) {
        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };

  // Inquirer for User to guess a letter.
  this.guessLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
          return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        // Check is guess is in Word
        var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nCORRECT!!!\n"));

          // If guess is not in the word, then decrement guessesRemaining.
        }
        else {
          self.guessesRemaining--;
          console.log(chalk.red("\nIncorrect!\n"));
          console.log("Only " + self.guessesRemaining + " guesses left.\n");
        }
      });
  };

  // Exit game
  this.quit = function() {
    console.log("\nSee you next time!");
    process.exit(0);
  };
}

module.exports = Game;
