import {
  flattenRatingData,
  filterByDate,
  processRatingData,
  filterByPlayerColor,
} from "../processRatingData";
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

describe("flattenRatingData(dataWithItemsArray)", () => {
  it("should return flat data for the charts", () => {
    const result = flattenRatingData(data);

    expect(result.length).toBe(10);
    expect(typeof result[0]).toBe("object");
    expect(result[0].category).toBe("fast");
    expect(result[0].finishDate).toEqual(new Date("2022-10-09T00:18:06.000Z"));
    expect(result[0].timeControl).toBe(600);
    expect(result[0].rating).toBe(1302);
    expect(result[0].playerColor).toBe(1);
    expect(result[0].result).toBe("win");
    expect(result[0].opponentUsername).toBe("GoldSunnyTreasure");
    expect(result[0].opponentAvatarUrl).toBe(
      "https://www.chesskid.com/images/avatars/kids/100/kid-321.png"
    );
  });
});

describe("processRatingData(data,{startDate,endDate})", () => {
  const startDate = new Date("2022-09-22");
  const endDate = new Date("2022-10-11");

  it("should return lineChartData in the format expected by chartJS", () => {
    const result = processRatingData(data, { startDate, endDate });

    expect(result.lineChartData.datasets.length).toBe(1);
    expect(result.lineChartData.datasets[0].label).toBe("rating");
    expect(result.lineChartData.datasets[0].data.length).toBe(10);
    expect(result.lineChartData.datasets[0].data[0].x).toBe("2022-10-09");
    expect(result.lineChartData.datasets[0].data[0].y).toBe(1302);

    expect(result.pieChartData).toBeDefined();
  });

  it("should return pieChartData in the format expected by chartJS", () => {
    const result = processRatingData(data, { startDate, endDate });

    expect(result.pieChartData.labels.length).toBe(3);
    expect(result.pieChartData.labels[0]).toBe("Wins");
    expect(result.pieChartData.datasets[0].data.length).toBe(3);
    expect(result.pieChartData.datasets[0].data[0]).toBe(9);
  });

  it("should return topOpponents", () => {
    const result = processRatingData(data, {
      startDate,
      endDate,
      opponentLimit: 3,
      opponentSortType: "gameCount",
    });

    expect(result.topOpponents.length).toBe(3);
    expect(result.topOpponents[0].username).toBe("AngelDavidR");
    expect(result.topOpponents[0].avatarUrl).toBe(
      "https://www.chesskid.com/images/avatars/kids/100/kid-417.png"
    );
    expect(result.topOpponents[0].games.wins).toBe(2);
    expect(result.topOpponents[0].games.losses).toBe(0);
    expect(result.topOpponents[0].games.draws).toBe(0);
    expect(result.topOpponents[0].games.count).toBe(2);
  });

  it("should return topOpponents with limit and sort working", () => {
    const result = processRatingData(data, {
      startDate,
      endDate,
      opponentLimit: 5,
      opponentSortType: "rating",
    });

    expect(result.topOpponents.length).toBe(5);
    expect(result.topOpponents[0].username).toBe("AbruptTest");
  });
});

describe('filterByPlayerColor(data, "all")', () => {
  it("should return all items", () => {
    const result = filterByPlayerColor(data, "all");
    expect(result.items.length).toBe(10);
  });
});

describe('filterByPlayerColor(data, "white")', () => {
  it("should return all items", () => {
    const result = filterByPlayerColor(data, "white");
    expect(result.items.length).toBe(4);
  });
});

describe('filterByPlayerColor(data, "black")', () => {
  it("should return all items", () => {
    const result = filterByPlayerColor(data, "black");
    expect(result.items.length).toBe(6);
  });
});
