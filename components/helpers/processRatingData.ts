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
      id: string;
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

type OpponentData = {
  username: string;
  games: {
    count: number;
    wins: number;
    losses: number;
    draws: number;
  };
  avatarUrl: string;
  rating: number;
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

export function composeTopOpponents(
  ratingData: RatingData,
  limit = 5
): OpponentData[] {
  const opponents = ratingData.reduce((acc, game) => {
    if (acc[game.opponentUsername]) {
      acc[game.opponentUsername].count += 1;
    } else {
      acc[game.opponentUsername] = {};
      acc[game.opponentUsername].count = 1;
      acc[game.opponentUsername].wins = 0;
      acc[game.opponentUsername].losses = 0;
      acc[game.opponentUsername].draws = 0;
    }

    if (game.result === "win") {
      acc[game.opponentUsername].wins += 1;
    } else if (game.result === "loss") {
      acc[game.opponentUsername].losses += 1;
    } else {
      acc[game.opponentUsername].draws += 1;
    }

    return acc;
  }, {});

  const sortedOpponents = Object.entries(opponents).sort((a, b) => {
    return b[1].count - a[1].count;
  });

  return sortedOpponents.slice(0, limit).map((opponent) => {
    const opponentData = ratingData.find((game) => {
      return game.opponentUsername === opponent[0];
    });

    return {
      username: opponent[0],
      games: opponent[1],
      avatarUrl: opponentData.opponentAvatarUrl,
      rating: opponentData.opponentRating,
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
    topOpponents: composeTopOpponents(ratingData, 3),
    lineChartData: composeLineChartData(ratingData),
    pieChartData: composePieChartData(ratingData),
    startDate,
    endDate,
  };
}
