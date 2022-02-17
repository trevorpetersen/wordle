import { LetterResultType } from '../../src/models/LetterResultType';
import { State } from '../../src/models/State';

test(creteRoot.name, creteRoot);
test(updateState_correctSpot.name, updateState_correctSpot);
test(updateState_incorrectSpot.name, updateState_incorrectSpot);
test(updateState_notInWord.name, updateState_notInWord);
test(updateState_multipleCalls.name, updateState_multipleCalls);

function creteRoot() {
  const state: State = State.createRoot();

  expect(state.possibleLetters.length).toEqual(5);
  expect(state.requiredLetters.size).toEqual(0);

  for(let i = 0; i < 5; i++) {
    expect(state.possibleLetters[i]).toEqual(State.ALL_LETTERS);
  }
}

function updateState_correctSpot() {
  const state: State = State.createRoot();

  state.updateState({
    index: 0,
    letter: 'a',
    type: LetterResultType.CORRECT_SPOT
  });

  expect(state.possibleLetters.length).toEqual(5);
  expect(state.requiredLetters.size).toEqual(0);

  expect(state.possibleLetters[0]).toEqual(new Set(['a']));
  for(let i = 1; i < 5; i++) {
    expect(state.possibleLetters[i]).toEqual(State.ALL_LETTERS);
  }
}

function updateState_incorrectSpot() {
  const state: State = State.createRoot();

  state.updateState({
    index: 0,
    letter: 'a',
    type: LetterResultType.INCORRECT_SPOT
  });

  expect(state.possibleLetters.length).toEqual(5);
  expect(state.requiredLetters.size).toEqual(1);

  expect(state.possibleLetters[0].has('a')).toEqual(false);
  expect(state.possibleLetters[0].size).toEqual(State.ALL_LETTERS.size - 1);

  for(let i = 1; i < 5; i++) {
    expect(state.possibleLetters[i]).toEqual(State.ALL_LETTERS);
  }
}


function updateState_notInWord() {
  const state: State = State.createRoot();

  state.updateState({
    index: 0,
    letter: 'a',
    type: LetterResultType.NOT_IN_WORD
  });

  expect(state.possibleLetters.length).toEqual(5);
  expect(state.requiredLetters.size).toEqual(0);

  for(let i = 0; i < 5; i++) {
    expect(state.possibleLetters[i].size).toEqual(State.ALL_LETTERS.size - 1);
    expect(state.possibleLetters[i].has('a')).toEqual(false);
  }
}

function updateState_multipleCalls() {
  const state: State = State.createRoot();

  state.updateState({
    index: 0,
    letter: 'a',
    type: LetterResultType.CORRECT_SPOT
  });
  expect(state).toEqual(State.create(
    [
      new Set(['a']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
    ], 
    new Set())
  );

  state.updateState({
    index: 4,
    letter: 'z',
    type: LetterResultType.NOT_IN_WORD
  });
  expect(state).toEqual(State.create(
    [
      new Set(['a']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'])
    ], 
    new Set())
  );


  state.updateState({
    index: 3,
    letter: 'b',
    type: LetterResultType.CORRECT_SPOT
  });
  expect(state).toEqual(State.create(
    [
      new Set(['a']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['b']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'])
    ], 
    new Set())
  );

  state.updateState({
    index: 1,
    letter: 'l',
    type: LetterResultType.INCORRECT_SPOT
  });
  expect(state).toEqual(State.create(
    [
      new Set(['a']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['b']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'])
    ], 
    new Set(['l']))
  );

  state.updateState({
    index: 0,
    letter: 'k',
    type: LetterResultType.INCORRECT_SPOT
  });
  expect(state).toEqual(State.create(
    [
      new Set(['a']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']),
      new Set(['b']),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'])
    ], 
    new Set(['l', 'k']))
  );
}
