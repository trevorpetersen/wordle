import { GuessResult } from "../models/GuessResult";
import { GuessStrategy } from "./GuessStrategy";

export class FirstGuessOverrideStrategy implements GuessStrategy {
    private readonly firstGuess: string;
    private readonly strategy: GuessStrategy;
    private guessNum: number;
    
    constructor(firstGuess: string, strategy: GuessStrategy) {
        this.firstGuess = firstGuess;
        this.strategy = strategy;
        this.guessNum = 0;
    }

    public getGuess(): string {
        this.guessNum++;

        if (this.guessNum == 1) {
            return this.firstGuess;
        } else {
            return this.strategy.getGuess();
        }
    }

    public onGuessResult(guess: string, guessResult: GuessResult): void {
        this.strategy.onGuessResult(guess, guessResult);
    }
}