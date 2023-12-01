import { useStore } from "@/app/context";
import { createConfetti, speakText } from "@/app/utils";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

const ModalButtons = ({
  answerID,
  answer,
}: {
  answerID: number;
  answer: string;
}) => {
  const confettiRef = useRef<HTMLDivElement | null>(null);
  const { handleClick: handleCorrectAnswerClick } = createConfetti(confettiRef);
  const {
    gameStatus,
    setGameStatus,
    setQuestionSelected,
    addCorrectAnswerIDs,
    addIncorrectAnswerIDs,
    isTextToSpeechActivated,
  } = useStore();

  return (
    <div className="mt-5 sm:mt-6">
      {gameStatus === "SHOWING QUESTION" ? (
        <button
          type="button"
          className="mt-4 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            setGameStatus("SHOWING ANSWER");
            isTextToSpeechActivated && speakText(answer);
          }}
        >
          Reveal answer
        </button>
      ) : (
        <div className="flex">
          <div
            className="cursor-pointer mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
            ref={confettiRef}
            onClick={() => {
              addCorrectAnswerIDs(answerID);
              handleCorrectAnswerClick();
              setTimeout(() => {
                setQuestionSelected(null);
              }, 2000);
            }}
          >
            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div
            className="cursor-pointer mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
            onClick={() => {
              addIncorrectAnswerIDs(answerID);
              setQuestionSelected(null);
            }}
          >
            <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalButtons;
