interface UserRanking {
  avatar: string;
  group: number;
  groupname: string;
  id: number;
  username: string;
  name: string;
  rank: number;
  points: number;
}

export type RankingData = Array<UserRanking>;

export type GroupData = Array<{ id: number; name: string }>;
