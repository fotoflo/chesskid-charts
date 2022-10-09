import processRankingData from "../processRankingData";
import fs from "fs";

const jsonData = fs.readFileSync("sampleData/shortSample.json", "utf8");
const data = JSON.parse(jsonData);

describe("processRankingData", () => {
  it("should return hello world", () => {
    const result = processRankingData(data);
    expect(result).toEqual("hello world");
  });
});
