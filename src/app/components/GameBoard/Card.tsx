import { SHORT_CLUE } from "@/app/api/types";
import { useStore } from "@/app/context";
import { speakText } from "@/app/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";

const Card = ({ clue }: { clue: SHORT_CLUE }) => {
  const {
    setQuestionSelected,
    setGameStatus,
    correctAnswerIDs,
    incorrectAnswerIDs,
    isTextToSpeechActivated,
  } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isPending = ![...correctAnswerIDs, ...incorrectAnswerIDs].includes(
    clue.id
  );

  const computeClasses = useMemo(() => {
    const isCorrect = correctAnswerIDs.includes(clue.id);
    const isIncorrect = incorrectAnswerIDs.includes(clue.id);

    return clsx({
      "my-6 flex justify-center items-center text-lg font-bold text-gray-700 w-32 h-24 m-4 rounded shadow":
        true,
      "bg-green-100 hover:text-gray-700": isCorrect,
      "bg-red-100 hover:text-gray-700": isIncorrect,
      "spinner bg-white hover:text-white cursor-pointer": isPending,
    });
  }, [clue.id, correctAnswerIDs, incorrectAnswerIDs, isPending]);

  return (
    <motion.button
      className={computeClasses}
      disabled={[...correctAnswerIDs, ...incorrectAnswerIDs].includes(clue.id)}
      onClick={() => {
        setQuestionSelected(clue);
        setGameStatus("SHOWING QUESTION");
        isTextToSpeechActivated && speakText(clue.question);
      }}
      onHoverStart={() => isPending && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.3 : 1 }}
    >
      $ {clue.value}
    </motion.button>
  );
};

export default Card;
