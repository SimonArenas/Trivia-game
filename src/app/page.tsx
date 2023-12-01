"use client";
import { useGetCategories, useGetCluesByCategoryIDs } from "./api";
import { categoriesSerializer, cluesSerializer } from "./api/api.serializer";
import GameBoard from "./components/GameBoard";
import { Hero } from "./components/Hero";
import { useStore } from "./context";

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
    <>
      <Hero
        gameStatus={gameStatus}
        isCTALoading={!questions}
        onCTAClick={() => setGameStatus("STARTED")}
      />
      {questions && gameStatus !== "NOT_STARTED" && (
        <GameBoard questions={questionsSerialized} />
      )}
    </>
  );
}
