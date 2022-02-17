import { GuessResult } from "./models/GuessResult";
import { LetterResult } from "./models/LetterResult";
import { LetterResultType } from "./models/LetterResultType";
import { State } from "./models/State";

export class WordleGame {
    public readonly word: string;
    public readonly guesses: Array<string>;
    private readonly lettersInWord: Set<string>;

    constructor(word: string) {
        if (word == null || word.length != 5) {
            throw new Error(`Invalid word: ${word}`);
        }

        this.word = word;

        this.guesses = [];
        this.lettersInWord = new Set();

        for(let i = 0; i < word.length; i++) {
            this.lettersInWord.add(word[i]);
        }
    }

    public guessWord(guess: string): GuessResult {
        guess = guess.toLowerCase();
        this.validateGuess(guess);

        this.guesses.push(guess);

        const letterResults: Array<LetterResult> = [];
        for(let i = 0; i < guess.length; i++) {
            const letter = guess[i];

            let letterResultType: LetterResultType = LetterResultType.NOT_IN_WORD;
            if (this.word[i] == letter) {
                letterResultType = LetterResultType.CORRECT_SPOT;
            } else if (this.lettersInWord.has(letter)) {
                letterResultType = LetterResultType.INCORRECT_SPOT;
            }

            letterResults.push({
                index: i,
                letter: letter,
                type: letterResultType
            });
        }

        return {
            isCorrect: letterResults.filter(result => result.type == LetterResultType.CORRECT_SPOT).length == this.word.length,
            letterResults: letterResults
        };
    }

    public getNumGuesses(): number {
        return this.guesses.length;
    }

    private validateGuess(word: string ) {
        if (word == null || word.length != 5) {
            throw new Error('Guess must only be 5 letters');
        }

        for(const letter of word) {
            if (!State.ALL_LETTERS.has(letter)) {
                throw new Error(`Letter ${letter} is illegal`);
            }
        }
    }
}