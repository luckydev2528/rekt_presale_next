export const revalidate = 0;

export type LeaderboardEntry = {
  rank: number;
  wallet: string;
  rektScore: number;
  totalLosses: number;
  purchase: number;
};

const data: LeaderboardEntry[] = [
  { rank: 1, wallet: "DQyrAc...FUKv", rektScore: 11232, totalLosses: 43391.01, purchase: 13391.01 },
  { rank: 2, wallet: "9XtrLm...Qp2A", rektScore: 10102, totalLosses: 41391.01, purchase: 10391.01 },
  { rank: 3, wallet: "AA1b2C...XyZ9", rektScore: 9102, totalLosses: 40391.01, purchase: 9391.01 },
  { rank: 4, wallet: "Beef42...Dead", rektScore: 9050, totalLosses: 39321.11, purchase: 8391.01 },
  { rank: 5, wallet: "Cafe99...Babe", rektScore: 8877, totalLosses: 38210.5, purchase: 7990.0 },
  { rank: 6, wallet: "Face77...Feed", rektScore: 8701, totalLosses: 36100.0, purchase: 6990.0 },
  { rank: 7, wallet: "Deed12...Moon", rektScore: 8500, totalLosses: 34210.75, purchase: 6550.25 },
  { rank: 8, wallet: "F00d5E...C0de", rektScore: 8302, totalLosses: 32100.99, purchase: 6100.99 },
  { rank: 9, wallet: "B0bA11...Chad", rektScore: 8150, totalLosses: 29910.2, purchase: 5800.0 },
  { rank: 10, wallet: "Bad0P5...W4g3", rektScore: 8012, totalLosses: 27950.0, purchase: 5600.0 },
];

export async function GET() {
  return Response.json(data);
}
