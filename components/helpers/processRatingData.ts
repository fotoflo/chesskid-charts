import {
  composeLineChartData,
  composePieChartData,
  composeTopOpponents,
} from "./composeRatingData";

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
};

export type InputData = {
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

export type OpponentData = {
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

export function filterByDate(data: InputData, startDate: Date, endDate: Date) {
  // filter the items by date
  const newData = Object.assign({}, data);

  newData.items = data.items.filter((item) => {
    const finishDate = new Date(item.finishDate * 1000);
    return finishDate >= startDate && finishDate <= endDate;
  });

  return newData;
}

export function filterByPlayerColor(
  data: InputData,
  playerColor: "all" | "white" | "black"
) {
  if (playerColor === "all") {
    return data;
  }

  const newData = Object.assign({}, data);

  const selectedColor = playerColor === "white" ? 1 : 2;
  newData.items = data.items.filter((item) => {
    return item.playerColor === selectedColor;
  });

  return newData;
}

export function flattenRatingData(data: InputData): RatingData[] {
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
  options: {
    startDate: Date;
    endDate: Date;
    opponentLimit: number;
    opponentSortType: "rating" | "gameCount";
  }
) {
  const filteredData = filterByDate(data, options.startDate, options.endDate);
  const ratingData = flattenRatingData(filteredData);

  return {
    topOpponents: composeTopOpponents(
      ratingData,
      options.opponentLimit,
      options.opponentSortType
    ),
    lineChartData: composeLineChartData(ratingData),
    pieChartData: composePieChartData(ratingData),
    ...options,
  };
}
