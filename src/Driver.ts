const fs = require('fs');

import { GuessStrategy } from "./strategies/GuessStrategy";
import { SimulationResult } from "./models/SimulationResult";
import { WordleGameSimulator } from "./WordleGameSimulator";
import { ListGuessStrategy } from "./strategies/ListGuessStrategy";

main();

function main() {
    let words: Array<string> = fs.readFileSync('/home/trevor/projects/wordle/resources/wordle-all-words.txt').toString().split("\n");
    words = words.map(word => word.substring(0,5));    

    const wordleGameSimulator: WordleGameSimulator = new WordleGameSimulator();
    // This bot just guesses the words that you give to it in order
    const guessStrategy: GuessStrategy = new ListGuessStrategy(['crane', 'games', 'aroma']);

    // Play the game wordle where the word to guess is "aroma" and guesses will be provided by an instance of ListGuessStrategy
    const simulationResult: SimulationResult = wordleGameSimulator.simulate('aroma', guessStrategy, {maxNumGuesses: 20});

    console.log(simulationResult);
}