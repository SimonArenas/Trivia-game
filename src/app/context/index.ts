import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GAME_STATUS, SHORT_CLUE } from "../api/types";

type State = {
  gameStatus: GAME_STATUS;
  setGameStatus: (status: GAME_STATUS) => void;
  questionSelected: SHORT_CLUE | null;
  setQuestionSelected: (question: SHORT_CLUE | null) => void;
  correctAnswerIDs: number[];
  addCorrectAnswerIDs: (id: number) => void;
  incorrectAnswerIDs: number[];
  addIncorrectAnswerIDs: (id: number) => void;
  isTextToSpeechActivated: boolean;
  setTextToSpeechActivated: (activated: boolean) => void;
};

export const useStore = create<State>()(
  devtools((set) => ({
    gameStatus: "NOT_STARTED",
    isTextToSpeechActivated: false,
    setTextToSpeechActivated: (status) =>
      set(() => ({ isTextToSpeechActivated: status })),
    setGameStatus: (status) => set(() => ({ gameStatus: status })),
    questionSelected: null,
    setQuestionSelected: (question) =>
      set(() => ({ questionSelected: question })),
    correctAnswerIDs: [],
    incorrectAnswerIDs: [],
    addCorrectAnswerIDs: (id) =>
      set((state) => ({
        correctAnswerIDs: [...state.correctAnswerIDs, id],
      })),
    addIncorrectAnswerIDs: (id) =>
      set((state) => ({
        incorrectAnswerIDs: [...state.incorrectAnswerIDs, id],
      })),
  }))
);
