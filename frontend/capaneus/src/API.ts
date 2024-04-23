interface ApiResponse {
  result: number[][];
}

export const fetchPrediction = async (
  userSelectedHolds: number[][]
): Promise<number[][]> => {
  // Check for cached input board
  // const savedBoards = localStorage.getItem("capaneusSavedBoards");
  // if (savedBoards) {
  //   const parsedBoards: Record<string, number[][]> = JSON.parse(savedBoards);
  //   const boardKey = JSON.stringify(userSelectedHolds);
    
  //   if (parsedBoards[boardKey]) {
  //     return parsedBoards[boardKey];
  //   }
  // }

  // If no cached board found, make the API call
  try {
    const response = await fetch(
      "http://localhost:8080/evaluate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userSelectedHolds }),
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data: ApiResponse = await response.json();

    const outputBoard = data.result;
    // Save the input and output boards in localStorage
    const savedBoards = localStorage.getItem("capaneusSavedBoards");
    const parsedBoards: Record<string, number[][]> = savedBoards
      ? JSON.parse(savedBoards)
      : {};
    parsedBoards[JSON.stringify(userSelectedHolds)] = outputBoard;
    localStorage.setItem("capaneusSavedBoards", JSON.stringify(parsedBoards));

    return outputBoard;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
