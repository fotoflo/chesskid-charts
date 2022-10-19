import { FaWindows } from "react-icons/fa";

export type RatingData = {
  category: "fast";
  finishDate: number | Date;
  timeControl: number;
  rating: number;
  playerColor: 1 | 2;
  result: "win" | "loss" | "draw";
  opponentRating: number;
}[];

const trunkatedSample = {
  category: "fast",
  finishDate: 1665273425,
  humanGameInfo: {
    rating: 1295,
    timeControl: 900,
  },
  opponent: {
    rating: 1310,
  },
  playerColor: 2,
  result: "win",
};

type InputData = {
  items: {
    category: "fast";
    finishDate: number | string | Date;
    humanGameInfo: {
      rating: number;
      timeControl: number;
    };
    opponent: {
      rating: number;
    };
    playerColor: 1 | 2;
    result: "win" | "loss" | "draw";
  }[];
};

export function composeLineChartData(ratingData: RatingData) {
  return {
    datasets: [
      {
        label: "rating",
        data: ratingData.map((item) => {
          return {
            x: item.finishDate.toISOString().split("T")[0],
            y: item.rating,
          };
        }),
      },
    ],
  };
}

export function composePieChartData(ratingData: RatingData) {
  let wins = 0;
  let losses = 0;
  let draws = 0;

  ratingData.forEach((item) => {
    if (item.result === "win") {
      wins++;
    } else if (item.result === "loss") {
      losses++;
    } else {
      draws++;
    }
  });

  return {
    labels: ["Wins", "Losses", "Draws"],
    datasets: [
      {
        label: "Win/Lose/Draw",
        data: [wins, losses, draws],
        backgroundColor: [
          "rgb(54, 235, 90)",
          "rgb(255, 86, 86)",
          "rgba(184, 184, 184, 0.155)",
        ],
        hoverOffset: 4,
      },
    ],
  };
}

export function filterByDate(data: InputData, startDate: Date, endDate: Date) {
  // filter the items by date
  const newData = Object.assign({}, data);

  newData.items = data.items.filter((item) => {
    const finishDate = new Date(item.finishDate * 1000);
    return finishDate >= startDate && finishDate <= endDate;
  });

  return newData;
}

export function flattenRatingData(data: InputData): RatingData {
  console.log(data);

  return data.items
    .filter((item) => item.category === "fast")
    .map((item: any) => {
      return {
        category: item.category,
        finishDate: new Date(item.finishDate * 1000),
        timeControl: item.humanGameInfo.timeControl ?? 0,
        rating: item.humanGameInfo.rating ?? 0,
        playerColor: item.playerColor,
        result: item.result,
        opponentRating: item.opponent.rating,
      };
    });
}

export function processRatingData(
  data: InputData,
  startDate: Date,
  endDate: Date
) {
  const filteredData = filterByDate(data, startDate, endDate);
  const ratingData = flattenRatingData(filteredData);
  return {
    lineChartData: composeLineChartData(ratingData),
    pieChartData: composePieChartData(ratingData),
    startDate,
    endDate,
  };
}
