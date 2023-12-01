import { SHORT_CLUE } from "@/app/api/types";
import React from "react";
import Modal from "../Modal";
import { bounceVariants, fadeInOut } from "@/app/utils";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";
import Toggle from "../Toggle";
import { useStore } from "@/app/context";

const GameBoard = ({
  questions,
}: {
  questions: Record<string, SHORT_CLUE[]>;
}) => {
  const { questionSelected } = useStore();
  const categoriesAndQuestions = Object.keys(questions).map((category) => ({
    title: category,
    clues: questions[category],
  }));

  return (
    <>
      <motion.div
        id="game-board"
        initial="initial"
        animate="animate"
        variants={bounceVariants}
      >
        <Toggle />
        <div className="flex flex-col items-center my-16 mx-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoriesAndQuestions.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex justify-center items-center text-center mb-4 text-lg font-semibold text-white bg-blue-600 py-2 px-4 rounded-t-lg shadow-lg">
                  <span className="capitalize pl-2">{category.title}</span>
                </div>
                {category.clues.map((clue) => (
                  <Card key={clue.id} clue={clue} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {questionSelected?.question && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInOut}
          >
            <Modal
              questionSelected={{
                ...questionSelected,
                category: questionSelected.category.title,
                value: questionSelected.value!,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameBoard;
