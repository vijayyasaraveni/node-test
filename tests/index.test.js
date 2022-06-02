const indexRef = require("../index");

describe("Test who will win the game,", () => {
  test("Test-1: data set :: 10, 1, 9, 5", () => {
    const result = indexRef.checkGameResult(10, 1, 9, 5);
    expect(result).toBe(0);
  });

  test("Test-2: data set :: 9, 2, 5, 4", () => {
    const result = indexRef.checkGameResult(9, 2, 5, 4);
    expect(result).toBe(1);
  });

  test("Test-3: data set :: 9, 4, 22, 17", () => {
    const result = indexRef.checkGameResult(9, 4, 22, 17);
    expect(result).toBe(0);
  });

  test("Test-4: data set :: 22, 1, 45, 31", () => {
    const result = indexRef.checkGameResult(22, 1, 45, 31);
    expect(result).toBe(0);
  });
});

describe("Test Display Results", () => {
  test("Test-1: Player-1 won the game", () => {
    const inputData = "X";
    const result = indexRef.displatResult(inputData);
    expect(result).toBe(1);
  });

  test("Test-2: Player-2 won the game", () => {
    const inputData = "Y";
    const result = indexRef.displatResult(inputData);
    expect(result).toBe(0);
  });
});
