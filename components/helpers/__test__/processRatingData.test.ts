import processRatingData, { filterByDate } from "../processRatingData";
import fs from "fs";

const jsonData = fs.readFileSync("sampleData/shortSample.json", "utf8");
const data = JSON.parse(jsonData);

describe("filterByDate(dataWithItemsArray)", () => {
  const startDate = new Date("2022-09-22");
  const endDate = new Date("2022-10-11");

  const lateStartDate = new Date("2022-09-25"); // 9 items after
  const earlyEndDate = new Date("2022-10-8"); // 9 items before
  // 8 items between

  it("should return an array of objects with a finishDate property", () => {
    const result = filterByDate(data, startDate, endDate);
    expect(result.items.length).toBeGreaterThan(0);
    expect(typeof result.items[0].finishDate).toEqual("number");
  });

  it("should return all items given a broad date range", () => {
    const result = filterByDate(data, startDate, endDate);
    expect(result.items.length).toBe(10);
    expect(typeof result.items[0].finishDate).toEqual("number");
  });

  it("should return an array of objects with with finishDates after StartDate", () => {
    const result = filterByDate(data, lateStartDate, endDate);
    expect(result.items.length).toBe(9);
    expect(typeof result.items[0].finishDate).toEqual("number");
  });

  it("should return an array of objects with with finishDates before EndDate", () => {
    const result = filterByDate(data, startDate, earlyEndDate);
    expect(result.items.length).toBe(8); // why? looks wrong
    expect(typeof result.items[0].finishDate).toEqual("number");
  });
});

describe("processRatingData(dataWithItemsArray)", () => {
  xit("should return flat data for the charts", () => {
    const result = processRatingData(data);

    expect(result.length).toBe(10);
    expect(typeof result[0]).toBe("object");
    expect(result[0].category).toBe("fast");
    expect(result[0].finishDate).toEqual(new Date("2022-10-09T00:18:06.000Z"));
    expect(result[0].timeControl).toBe(600);
    expect(result[0].rating).toBe(1302);
    expect(result[0].playerColor).toBe(1);
    expect(result[0].result).toBe("win");
  });
});
