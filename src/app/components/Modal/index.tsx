import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { bounceVariants, fadeInOut } from "@/app/utils";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { useStore } from "@/app/context";
import ModalButtons from "./ModalButtons";

export default function Modal({
  questionSelected,
}: {
  questionSelected: {
    id: number;
    category: string;
    question: string;
    answer: string;
    value: number;
  };
}) {
  const { gameStatus } = useStore();
  const { id, category, question, answer, value } = questionSelected;

  const JSXResponse = DOMPurify.sanitize(answer);

  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
              >
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <span className="capitalize inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 mb-6">
                      {category}
                    </span>
                    <Dialog.Title
                      as="h2"
                      className="text-xl font-semibold text-gray-900"
                    >
                      Question for ${value}
                    </Dialog.Title>
                    <Dialog.Title
                      as="h3"
                      className="mt-10 text-3xl font-semibold text-blue-900"
                    >
                      {question}
                    </Dialog.Title>
                    {gameStatus === "SHOWING ANSWER" && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={fadeInOut}
                      >
                        <div className="mt-6">
                          <mark
                            className="capitalize mt-10 text-lg text-blue-800"
                            dangerouslySetInnerHTML={{ __html: JSXResponse }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                <ModalButtons answerID={id} answer={answer} />
              </motion.div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
