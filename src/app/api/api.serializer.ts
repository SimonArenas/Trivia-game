import { CATEGORIES, CLUE, SHORT_CLUE } from "./types";

export const categoriesSerializer = (categories: CATEGORIES[]) => {
  //Categories returns ~15 items, the game just requires 5 (with preference on 5 or more clues)
  return categories
    ?.filter((category) => category.clues_count >= 5)
    .slice(0, 5);
};

export const cluesSerializer = (categories: CATEGORIES[], clues: CLUE[]) => {
  // Flatten clues array once if it's nested
  const flattenedClues = clues.flat();

  return categories?.reduce((acc, category) => {
    const filteredClues = filterCluesByCategory(flattenedClues, category);
    const gameSpecificClues = getGameSpecificClues(filteredClues);

    acc[category.title] = processClues(gameSpecificClues);
    return acc;
  }, {} as Record<string, SHORT_CLUE[]>);
};

function filterCluesByCategory(clues: CLUE[], category: CATEGORIES) {
  return clues.filter((clue) => clue.category_id === category.id);
}

function getGameSpecificClues(clues: CLUE[]) {
  const firstGameId = clues.length > 0 ? clues[0].game_id : null;
  return clues.filter((clue) => clue.game_id === firstGameId);
}

function processClues(clues: CLUE[]) {
  return clues
    .map((clue, index, arr) => ({
      id: clue.id,
      answer: clue.answer,
      question: clue.question,
      value: clue.value ?? (arr[index - 1]?.value ?? 0) + 100,
      category: clue.category,
    }))
    .sort((a, b) => (a.value > b.value ? 1 : -1));
}
