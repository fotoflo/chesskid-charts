import processRatingData from "../processRatingData";
import fs from "fs";

const jsonData = fs.readFileSync("sampleData/shortSample.json", "utf8");
const data = JSON.parse(jsonData);

describe("processRatingData", () => {
  it("should return flat data for the charts", () => {
    const result = processRatingData(data);

    expect(typeof result[0]).toBe("object");
    expect(result[0].category).toBe("fast");
    expect(result[0].finishDate).toEqual(new Date("2022-10-09T00:18:06.000Z"));
    expect(result[0].timeControl).toBe(600);
    expect(result[0].rating).toBe(1302);
    expect(result[0].playerColor).toBe(1);
    expect(result[0].result).toBe("win");
  });
});