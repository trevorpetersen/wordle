import { GuessStrategy } from "./strategies/GuessStrategy";
import { GuessResult } from "./models/GuessResult";
import { SimulationResult } from "./models/SimulationResult";
import { WordleGame } from "./WordleGame";

export interface SimulationOptions {
    maxNumGuesses?: number;
}

export class WordleGameSimulator {
    private static DEFAULT_OPTIONS: SimulationOptions = {
        maxNumGuesses: 100
    };

    public simulate(word: string, guessStrategy: GuessStrategy, simulationOptions: SimulationOptions = WordleGameSimulator.DEFAULT_OPTIONS): SimulationResult {
        const wordleGame: WordleGame = new WordleGame(word);

        let guessResult: GuessResult;
        do {
            if (simulationOptions?.maxNumGuesses != null && wordleGame.guesses.length >= simulationOptions.maxNumGuesses) {
                throw new Error(`Max number of guesses of ${simulationOptions.maxNumGuesses} exceeded`);
            }

            const guess: string = guessStrategy.getGuess();

            console.log(`Guessing ${guess} for attempt number ${wordleGame.guesses.length + 1}`)
            guessResult = wordleGame.guessWord(guess);
            guessStrategy.onGuessResult(guess, guessResult);
        } while(!guessResult.isCorrect);

        return {
            word: wordleGame.word,
            guesses: wordleGame.guesses
        }
    }
}