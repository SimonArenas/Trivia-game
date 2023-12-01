"use client";
import { motion } from "framer-motion";
import { useGetCategories, useGetCluesByCategoryIDs } from "./api";
import { categoriesSerializer, cluesSerializer } from "./api/api.serializer";
import GameBoard from "./components/GameBoard";
import { Hero } from "./components/Hero";
import { useStore } from "./context";
import { fadeInOut } from "./utils";

export default function Home() {
  const { gameStatus, setGameStatus } = useStore();
  const { data } = useGetCategories();
  const categories = categoriesSerializer(data);
  const questions = useGetCluesByCategoryIDs(
    categories?.map((category) => category.id)
  )
    .filter((result) => result.isSuccess)
    .map((result) => result.data);

  const questionsSerialized = cluesSerializer(categories, questions);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInOut}
    >
      <Hero
        gameStatus={gameStatus}
        isCTALoading={!questions}
        onCTAClick={() => setGameStatus("STARTED")}
      />
      {questions && gameStatus !== "NOT_STARTED" && (
        <GameBoard questions={questionsSerialized} />
      )}
    </motion.div>
  );
}
