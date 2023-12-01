export type CATEGORIES = {
  id: number;
  title: string;
  clues_count: number;
};

export type CLUE = {
  id: number;
  answer: string;
  question: string;
  value: number | null;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  invalid_count: number | null;
  category: CATEGORIES;
};

export type SHORT_CLUE = Pick<
  CLUE,
  "id" | "answer" | "question" | "value" | "category"
>;

export type GAME_STATUS =
  | "NOT_STARTED"
  | "STARTED"
  | "SHOWING QUESTION"
  | "SHOWING ANSWER";
