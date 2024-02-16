export interface RankingData {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: string;
  score: number;
  ratio: number;
  rank: number;
  avatar: string;
}
