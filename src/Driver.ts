const fs = require('fs');

import { GuessStrategy } from "./strategies/GuessStrategy";
import { SimulationResult } from "./models/SimulationResult";
import { WordleGameSimulator } from "./WordleGameSimulator";
import { MinimumDifferenceGuessStrategy } from "./strategies/MinimumDifferenceGuessStrategy";
import { FirstGuessOverrideStrategy } from "./strategies/FirstGuessOverrideStrategy";

main();

function main() {
    let words: Array<string> = fs.readFileSync('/home/trevor/projects/wordle/resources/wordle-all-words.txt').toString().split("\n");
    words = words.map(word => word.substring(0,5));    

    const wordleGameSimulator: WordleGameSimulator = new WordleGameSimulator();
    const guessStrategy: GuessStrategy = new MinimumDifferenceGuessStrategy(words);
    // MinimumDifferenceGuessStrategy always guesses 'escar' first when used with this word list, 
    // but it has to calculate it, which is time consuming. So here I just manually guess 'escar' first
    const firstGuessOverrideStrategy: GuessStrategy = new FirstGuessOverrideStrategy('escar', guessStrategy);

    // first guess is always "escar"
    const simulationResult: SimulationResult = wordleGameSimulator.simulate('alien', firstGuessOverrideStrategy, {maxNumGuesses: 20});

    console.log('===== RESULTS =====')
    console.log(simulationResult);
}