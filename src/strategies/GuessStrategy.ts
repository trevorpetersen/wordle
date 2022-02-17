import { GuessResult } from "../models/GuessResult";

export interface GuessStrategy {
    getGuess(): string;
    onGuessResult(guess: string, guessResult: GuessResult): void;
}