## Overview
This package provides a simple framework for writing bots that can play the game "Wordle".

## How to Run
```
npm install
npx ts-node src/Driver.ts
```
Expected output:
```
Guessing crane for attempt number 1
Guessing games for attempt number 2
Guessing aroma for attempt number 3
{ word: 'aroma', guesses: [ 'crane', 'games', 'aroma' ] }
```


## Create You Own Bot
Create an instance of a class that implements `GuessStrategy` and plug your instance into `Driver.ts`.

```
export interface GuessStrategy {
    getGuess(): string;
    onGuessResult(guess: string, guessResult: GuessResult): void;
}
```

You bot will be able to only do two things: provide a guess for the next word and update some 
internal state with the result of the guess. See `WordleGameSimulator` to see how your bot will
be called to progress the game state (basically ask your bot for a guess, update your bot with 
the guess result, repeat if you did not guess the correct word).


A good place to start is the abstract class
`StatefulGuessStrategy`, which will automatically record the results of your guess into
a `State` object that your bot can use to make more intelligent guesses.

For a list of all legal words that can be guessed, see `/resources/wordle-all-words.txt`