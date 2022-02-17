import { LetterResult } from "./LetterResult";
import { LetterResultType } from "./LetterResultType";

export class State {
    public static readonly ALL_LETTERS = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

    public readonly possibleLetters: Array<Set<string>>;
    public readonly requiredLetters: Set<string>;

    private constructor(possibleLetters: Array<Set<string>>, requiredLetters: Set<string>) {
        this.possibleLetters = possibleLetters;
        this.requiredLetters = requiredLetters;
    }

    public static create(possibleLetters: Array<Set<string>>, requiredLetters: Set<string>): State {
        return new State(possibleLetters, requiredLetters);
    }

    public static createRoot(): State {
        let possibleLetters: Array<Set<string>> = [];
        let requiredLetters: Set<string> = new Set();

        for (let i = 0; i < 5; i ++) {
            possibleLetters.push(new Set(State.ALL_LETTERS));
        }

        return new State(possibleLetters, requiredLetters);
    }

    public duplicate(): State {
        const newPossibleLetters: Array<Set<string>> = [];

        for(let possibleLetters of this.possibleLetters) {
            newPossibleLetters.push(new Set(possibleLetters));
        }


        return new State(newPossibleLetters, new Set(this.requiredLetters));
    }

    public updateState(letterResult: LetterResult): void {
        switch(letterResult.type) {
            case LetterResultType.CORRECT_SPOT:
                this.possibleLetters[letterResult.index] = new Set([letterResult.letter]);
                break;

            case LetterResultType.INCORRECT_SPOT:
                this.requiredLetters.add(letterResult.letter);
                this.possibleLetters[letterResult.index].delete(letterResult.letter);
                break;

            case LetterResultType.NOT_IN_WORD:
                for (const letters of this.possibleLetters) {
                    letters.delete(letterResult.letter);
                }
                break;

            default:
                throw new Error(`Unknown LetterResultType: ${letterResult.type}`);
        }
    }

    public letterIsNotInWord(letter: string): boolean {
        for(const entry of this.possibleLetters) {
            if (entry.has(letter)) {
                return false;
            }
        }

        return true;
    }
}