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

export function filterByDate(data: InputData, startDate: Date, endDate: Date) {
  // filter the items by date
  data.items = data.items.filter((item) => {
    const finishDate = new Date(item.finishDate * 1000).setHours(0, 0, 0, 0);
    return finishDate >= startDate && finishDate <= endDate;
  });

  return data;
}

export default function processRatingData(data: InputData): RatingData {
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
