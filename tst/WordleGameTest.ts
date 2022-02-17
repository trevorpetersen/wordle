import { GuessResult } from '../src/models/GuessResult';
import { LetterResultType } from '../src/models/LetterResultType';
import { WordleGame } from '../src/WordleGame';

const WORD: string = 'games';

let wordleGame: WordleGame;

beforeEach(setup);
test(constructor_invalidWord.name, constructor_invalidWord);
test(guessWord_invalidGuesses.name, guessWord_invalidGuesses);
test(guessWord_validGuesses.name, guessWord_validGuesses);

function setup() {
    wordleGame = new WordleGame(WORD);
}

function constructor_invalidWord() {
    expect(() => new WordleGame('a'))
    .toThrow(Error);

    expect(() => new WordleGame('toolong'))
    .toThrow(Error);
}

function guessWord_invalidGuesses() {
    expect(() => wordleGame.guessWord('a'))
    .toThrow(Error);

    expect(() => wordleGame.guessWord('toolong'))
    .toThrow(Error);
}

function guessWord_validGuesses() {
    expect(wordleGame.getNumGuesses()).toEqual(0);

    let guessResult: GuessResult = wordleGame.guessWord('asdfg');
    expect(guessResult).toEqual({
        isCorrect: false,
        letterResults: [
            {
                index: 0,
                letter: 'a',
                type: LetterResultType.INCORRECT_SPOT
            },
            {
                index: 1,
                letter: 's',
                type: LetterResultType.INCORRECT_SPOT
            },
            {
                index: 2,
                letter: 'd',
                type: LetterResultType.NOT_IN_WORD
            },
            {
                index: 3,
                letter: 'f',
                type: LetterResultType.NOT_IN_WORD
            },
            {
                index: 4,
                letter: 'g',
                type: LetterResultType.INCORRECT_SPOT
            }
        ]
    });
    expect(wordleGame.getNumGuesses()).toEqual(1);

    guessResult = wordleGame.guessWord('semag');
    expect(guessResult).toEqual({
        isCorrect: false,
        letterResults: [
            {
                index: 0,
                letter: 's',
                type: LetterResultType.INCORRECT_SPOT
            },
            {
                index: 1,
                letter: 'e',
                type: LetterResultType.INCORRECT_SPOT
            },
            {
                index: 2,
                letter: 'm',
                type: LetterResultType.CORRECT_SPOT
            },
            {
                index: 3,
                letter: 'a',
                type: LetterResultType.INCORRECT_SPOT
            },
            {
                index: 4,
                letter: 'g',
                type: LetterResultType.INCORRECT_SPOT
            }
        ]
    });
    expect(wordleGame.getNumGuesses()).toEqual(2);

    guessResult = wordleGame.guessWord('games');
    expect(guessResult).toEqual({
        isCorrect: true,
        letterResults: [
            {
                index: 0,
                letter: 'g',
                type: LetterResultType.CORRECT_SPOT
            },
            {
                index: 1,
                letter: 'a',
                type: LetterResultType.CORRECT_SPOT
            },
            {
                index: 2,
                letter: 'm',
                type: LetterResultType.CORRECT_SPOT
            },
            {
                index: 3,
                letter: 'e',
                type: LetterResultType.CORRECT_SPOT
            },
            {
                index: 4,
                letter: 's',
                type: LetterResultType.CORRECT_SPOT
            }
        ]
    });
    expect(wordleGame.getNumGuesses()).toEqual(3);
}