import {
  flattenRatingData,
  filterByDate,
  processRatingData,
} from "../processRatingData";

import {
  composeLineChartData,
  composePieChartData,
  composeTopOpponents,
} from "../composeRatingData";

import fs from "fs";

const jsonData = fs.readFileSync("sampleData/shortSample.json", "utf8");
const data = JSON.parse(jsonData);

describe("composeLineChartData", () => {
  it("should return data in the format expected by the Line chart", () => {
    const ratingData = flattenRatingData(data);
    const result = composeLineChartData(ratingData);

    expect(result.datasets.length).toBe(1);
    expect(result.datasets[0].label).toBe("rating");
    expect(result.datasets[0].data.length).toBe(10);
    expect(result.datasets[0].data[0].x).toBe("2022-10-09");
    expect(result.datasets[0].data[0].y).toBe(1302);
  });
});

describe("composePieChartData(ratingData)", () => {
  it("should return data in the format expected by the Pie chart", () => {
    const ratingData = flattenRatingData(data);
    const result = composePieChartData(ratingData);

    expect(typeof result).toBe("object");
    expect(result.labels.length).toBe(3);
    expect(result.labels[0]).toBe("Wins");
    expect(result.labels[1]).toBe("Losses");
    expect(result.labels[2]).toBe("Draws");
  });
});

describe("composeTopOpponents()", () => {
  it("should return an array of objects with the top opponents", () => {
    const ratingData = flattenRatingData(data);
    const result = composeTopOpponents(ratingData);

    expect(result.length).toBe(5);
    expect(result[0].username).toBe("AngelDavidR");
    expect(result[0].avatarUrl).toBe(
      "https://www.chesskid.com/images/avatars/kids/100/kid-417.png"
    );

    expect(result[0].games.count).toBe(2);
    expect(result[0].games.wins).toBe(2);
    expect(result[0].games.losses).toBe(0);
    expect(result[0].games.draws).toBe(0);
  });
});
