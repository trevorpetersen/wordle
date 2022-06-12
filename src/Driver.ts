const fs = require('fs');

import { GuessStrategy } from "./strategies/GuessStrategy";
import { SimulationResult } from "./models/SimulationResult";
import { WordleGameSimulator } from "./WordleGameSimulator";
import { MinimumDifferenceGuessStrategy } from "./strategies/MinimumDifferenceGuessStrategy";
import { SmallestAverageSetGuessStrategy } from "./strategies/SmallestAverageSetGuessStrategy";

main();

function main() {
    let words: Array<string> = fs.readFileSync('/home/trevor/projects/wordle/resources/wordle-all-words.txt').toString().split("\n");
    words = words.map(word => word.substring(0,5));    

    const wordleGameSimulator: WordleGameSimulator = new WordleGameSimulator();
    // This bot just guesses the words that you give to it in order
    const minDiff: GuessStrategy = new MinimumDifferenceGuessStrategy(words);

    // Play the game wordle where the word to guess is "aroma" and guesses will be provided by an instance of ListGuessStrategy
    const minDiffResult: SimulationResult = wordleGameSimulator.simulate('float', minDiff, {maxNumGuesses: 20});

    console.log('===== RESULTS =====')
    console.log(minDiffResult);
}