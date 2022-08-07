const cartesianProduct = require('cartesian-product');


import { GuessResult } from '../models/GuessResult';
import { LetterResult } from '../models/LetterResult';
import { LetterResultType } from '../models/LetterResultType';
import { State } from '../models/State';

import { StatefulGuessStrategy } from "../strategies/StatefulGuessStrategy";

export class MinimumDifferenceGuessStrategy extends StatefulGuessStrategy {
    private words: Array<string>;

    constructor(words: Array<string>) {
        super();
        this.words = Array.from(words);
    }

    public getGuess(): string {
        let bestOutcome: Outcome = {word: this.words[0], averageSize: this.words.length};

        let i = 0;
        for(const word of this.words) {
            const outcome: Outcome = this.getOutcome(word);

            if (outcome.averageSize < bestOutcome.averageSize) {
                bestOutcome = outcome;
            }
        }

        return bestOutcome.word;
    }

    public onGuessResult(guess: string, guessResult: GuessResult): void {
        super.onGuessResult(guess, guessResult);
        this.words = this.getWordsInState(this.state);
        console.log(`${this.words.length} words left to look through...`)
    } 

    private getWordsInState(state: State): Array<string> {
        return this.words.filter(word => {
            const lettersInWord = new Set();
            for (let i = 0; i < word.length; i++) {
                lettersInWord.add(word[i]);
            }

            for (let i = 0; i < state.possibleLetters.length; i++) {
                const letter: string = word[i];

                if (!state.possibleLetters[i].has(letter)) {
                    return false;
                }
            }

            for(let requiredLetter of Array.from(state.requiredLetters)) {
                if (!lettersInWord.has(requiredLetter)) {
                    return false;
                }
            }

            return true;
        });
    }

    private getOutcome(word: string): Outcome {
        const setsOfOutcomes: Array<Array<LetterResult>> = [];
        for(let i = 0; i < word.length; i++) {
            const letter: string = word[i];

            setsOfOutcomes.push(this.getPossibleLetterResults(letter, i));
        }
        
        const allPossibleOutcomes: Array<Array<LetterResult>> = cartesianProduct(setsOfOutcomes);
        let sum: number = 0;
        
        for(const outcomeSet of allPossibleOutcomes) {
            const state: State = this.state.duplicate();

            outcomeSet.forEach(result => state.updateState(result));
            sum += this.getWordsInState(state).length;
        }

        return {
            word: word,
            averageSize: sum / allPossibleOutcomes.length
        };
    }

    private getPossibleLetterResults(letter: string, index: number): Array<LetterResult> {
        const possibleLetterResults: Array<LetterResult> = [];

        const correctSpot: LetterResult = {letter: letter, index: index, type: LetterResultType.CORRECT_SPOT};
        const incorrectSpot: LetterResult = {letter: letter, index: index, type: LetterResultType.INCORRECT_SPOT};
        const notInWord: LetterResult = {letter: letter, index: index, type: LetterResultType.NOT_IN_WORD};


        if (this.state.possibleLetters[index].has(letter)) {
            possibleLetterResults.push(correctSpot);
        }

        let isInOtherColumn: boolean = false;
        for(let i = 0; i < this.state.possibleLetters.length; i++) {
            if(i == index) {
                continue;
            }

            if(this.state.possibleLetters[i].has(letter)) {
                isInOtherColumn = true;
                break;
            }
        }
        if(isInOtherColumn && !this.state.possibleLetters[index].has(letter)) {
            possibleLetterResults.push(incorrectSpot);
        }

        if (this.state.possibleLetters.find(letterSet => letterSet.has(letter)) != undefined ) {
            possibleLetterResults.push(notInWord);
        }


        return possibleLetterResults;
    }
    
}

interface Outcome {
    word: string;
    averageSize: number;
}