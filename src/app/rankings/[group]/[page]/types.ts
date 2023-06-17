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

export type RankingsData = Array<UserRanking>;

export type GroupsData = Array<{ id: number; name: string }>;
