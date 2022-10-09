type RankingData = {
  datasets: DataSet[];
};

type DataSet = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

export default function processRankingData(data: object): RankingData {
  return data.items[0];
}
