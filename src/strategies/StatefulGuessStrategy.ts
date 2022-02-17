import { GuessStrategy } from "./GuessStrategy";
import { GuessResult } from "../models/GuessResult";
import { State } from "../models/State";

export abstract class StatefulGuessStrategy implements GuessStrategy {
    protected state: State;

    constructor() {
        this.state = State.createRoot();
    }

    abstract getGuess(): string;

    public onGuessResult(guess: string, guessResult: GuessResult): void {
        for (const letterResult of guessResult.letterResults) {
            this.state.updateState(letterResult);
        }
    }
}