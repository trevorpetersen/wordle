import { LetterResultType } from "./LetterResultType";

export interface LetterResult {
    readonly index: number;
    readonly letter: string;
    readonly type: LetterResultType;
}