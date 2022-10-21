import { OpponentData, RatingData } from "./processRatingData";

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

function sortOpponentsByGameCount(opponents: OpponentData[]) {
  return Object.entries(opponents).sort((a, b) => {
    return b[1].count - a[1].count;
  });
}

function sortOpponentsByRating(opponents: OpponentData[]) {
  return Object.entries(opponents).sort((a, b) => {
    return b[1].rating - a[1].rating;
  });
}

export function composeTopOpponents(
  ratingData: readonly RatingData[],
  limit: number = 5,
  sortType: "rating" | "gameCount" = "gameCount"
): OpponentData[] {
  const opponents = ratingData.reduce((acc, game) => {
    if (acc[game.opponentUsername]) {
      acc[game.opponentUsername].count += 1;
    } else {
      acc[game.opponentUsername] = {};
      acc[game.opponentUsername].rating = game.opponentRating;
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

  const sortedOpponents =
    sortType === "gameCount"
      ? sortOpponentsByGameCount(opponents)
      : sortOpponentsByRating(opponents);

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
