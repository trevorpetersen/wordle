import { GuessStrategy } from '../src/strategies/GuessStrategy';
import { ListGuessStrategy } from '../src/strategies/ListGuessStrategy';
import { SimulationResult } from '../src/models/SimulationResult';
import { WordleGameSimulator } from '../src/WordleGameSimulator';

let wordleGameSimulator: WordleGameSimulator;

beforeEach(setup);
test(simulate_perfectGuess.name, simulate_perfectGuess);
test(simulate_exceedGuessLimit.name, simulate_exceedGuessLimit);

function setup() {
    wordleGameSimulator = new WordleGameSimulator();
}

function simulate_perfectGuess() {
    const word: string = 'games';
    const guessStrategy: GuessStrategy = new ListGuessStrategy([word]);

    const result: SimulationResult = wordleGameSimulator.simulate(word, guessStrategy);

    expect(result).toEqual({
        word: word,
        guesses: [word]
    });
}

function simulate_exceedGuessLimit() {
    const word: string = 'games';
    const guessStrategy: GuessStrategy = new ListGuessStrategy(['wrong']);

    expect(() => wordleGameSimulator.simulate(word, guessStrategy))
    .toThrow(Error);
}