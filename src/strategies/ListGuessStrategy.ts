import { GuessStrategy } from "./GuessStrategy";
import { GuessResult } from "../models/GuessResult";

export class ListGuessStrategy implements GuessStrategy {
    private readonly guesses: Array<string>;
    private index;
    
    constructor(guesses: Array<string>) {
        this.guesses = guesses;

        this.index = 0;
    }

    public getGuess(): string {
        const guess: string = this.guesses[this.index];
        this.index = (this.index + 1) % this.guesses.length;

        return guess;
    }
    
    public onGuessResult(guess: string, guessResult: GuessResult): void {
    }
}