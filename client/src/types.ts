export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "REGULAR" | "PREMIUM" | "ADMIN";
}

export type Game = {
  id: number;
  name: string;
  description: string;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  user: {
    username: string;
  }
  game: {
    id: number;
    name: string;
  }
}