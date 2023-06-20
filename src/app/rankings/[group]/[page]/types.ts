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

export type RankingsData = UserRanking[];

export type GroupsData = { id: number; name: string }[];
