import { useQueries, useQuery } from "@tanstack/react-query";
import { getRandomNumber } from "../utils";

const API_URL = "http://jservice.io/api";

export const useGetCategories = () => {
  //The random number is to get a new offset each time, so categories are diff each game
  const randomNumber = getRandomNumber(10000);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getCategories"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const response = await fetch(
          `${API_URL}/categories?count=15&offset=${randomNumber}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      } catch (e) {
        console.error("Fetching categories failed:", e);
        throw e; // Re-throw the error to be caught by React Query
      }
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

export const useGetCluesByCategoryIDs = (categoryIDs: number[] | undefined) => {
  const queries = useQueries({
    queries: categoryIDs
      ? categoryIDs.map((categoryID) => ({
          refetchOnWindowFocus: false,
          queryKey: ["getCluesByCategoryIDs", categoryID],
          queryFn: async () => {
            try {
              const response = await fetch(
                `${API_URL}/clues?category=${categoryID}`
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            } catch (e) {
              console.error("Fetching categories failed:", e);
              throw e; // Re-throw the error to be caught by React Query
            }
          },
        }))
      : [],
  });

  return queries;
};
