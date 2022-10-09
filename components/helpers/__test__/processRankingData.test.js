import { processRankingData } from "../processRankingData";

describe("processRankingData", () => {
  it("should return an object", () => {
    const result = processRankingData();
    expect(result).toEqual("hello world");
  });
});
