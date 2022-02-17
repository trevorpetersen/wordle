import { LetterResultType } from "../models/LetterResultType";
import { State } from "./../models/State";
import { StatefulGuessStrategy } from "./StatefulGuessStrategy";

export class SmallestAverageSetGuessStrategy extends StatefulGuessStrategy {
    private readonly words: Array<string>;

    constructor(words: Array<string>) {
        super();
        this.words = Array.from(words);
    }

    public getGuess(): string {
        const guessLetters: Array<string> = [];

        for(let i = 0; i < this.state.possibleLetters.length; i++) {
            let bestLetter: string = '@';
            let bestScore: number = this.getStateScore(this.state);

            for(const remainingLetter of Array.from(this.state.possibleLetters[i])) {
                const notInWordState = this.state.duplicate();
                const incorrectSpotState = this.state.duplicate();
                const correctSpotState = this.state.duplicate();

                notInWordState.updateState({
                    index: i,
                    letter: remainingLetter,
                    type: LetterResultType.NOT_IN_WORD
                });
                incorrectSpotState.updateState({
                    index: i,
                    letter: remainingLetter,
                    type: LetterResultType.INCORRECT_SPOT
                });
                correctSpotState.updateState({
                    index: i,
                    letter: remainingLetter,
                    type: LetterResultType.CORRECT_SPOT
                });

                const notInWordScore: number = this.getStateScore(notInWordState);
                const incorrectSpotScore: number = this.getStateScore(incorrectSpotState);
                const correctSpotScore: number = this.getStateScore(correctSpotState);

                const averageScore: number = (notInWordScore + incorrectSpotScore + correctSpotScore) / 3;

                if (averageScore < bestScore) {
                    bestScore = averageScore;
                    bestLetter = remainingLetter;
                }
            }

            guessLetters.push(bestLetter);
        }

        return guessLetters.join('');
    }

    private getStateScore(state: State): number {
        return this.getWordsInState(state).length;
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
}