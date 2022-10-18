export type RatingData = {
  category: "fast";
  finishDate: number;
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

export default function processRatingData(
  data: object,
  startDate: Date,
  endDate: Date
): RatingData {
  return data.items
    .filter((item) => item.category === "fast")
    .map((item: any) => {
      return {
        category: item.category,
        finishDate: new Date(parseInt(item.finishDate * 1000)),
        timeControl: item.humanGameInfo.timeControl ?? 0,
        rating: item.humanGameInfo.rating ?? 0,
        playerColor: item.playerColor,
        result: item.result,
        opponentRating: item.opponent.rating,
      };
    });
}
