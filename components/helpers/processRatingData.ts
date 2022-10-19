import { FaWindows } from "react-icons/fa";

export type RatingData = {
  category: "fast";
  finishDate: number | Date;
  timeControl: number;
  rating: number;
  playerColor: 1 | 2;
  result: "win" | "loss" | "draw";
  opponentRating: number;
  opponentUsername: string;
  opponentAvatarUrl: string;
}[];

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
      user: {
        username: string;
        avatar: {
          url: string;
        };
      };
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

export function composeTopOpponents(ratingData: RatingData) {
  const opponents = ratingData.reduce((acc, item) => {
    if (acc[item.opponentUsername]) {
      acc[item.opponentUsername] += 1;
    } else {
      acc[item.opponentUsername] = 1;
    }

    return acc;
  }, {} as Record<string, number>);

  const sortedOpponents = Object.entries(opponents).sort((a, b) => b[1] - a[1]);

  return sortedOpponents.slice(0, 10).map((item) => {
    const opponent = ratingData.find((game) => {
      return (game.opponentUsername = item[0]);
    });

    return {
      username: item[0],
      games: item[1],
      avatarUrl: opponent.opponentAvatarUrl,
      rating: opponent.opponentRating,
    };
  });
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
        opponentUsername: item.opponent.user.username,
        opponentAvatarUrl: item.opponent.user.avatar.url,
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
    topOpponents: composeTopOpponents(ratingData),
    lineChartData: composeLineChartData(ratingData),
    pieChartData: composePieChartData(ratingData),
    startDate,
    endDate,
  };
}
