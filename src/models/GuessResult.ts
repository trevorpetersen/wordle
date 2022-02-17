import { LetterResult } from "./LetterResult";

export interface GuessResult {
    readonly isCorrect: boolean;
    readonly letterResults: Array<LetterResult>;
}