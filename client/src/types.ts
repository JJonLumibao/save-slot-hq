export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: "REGULAR" | "PREMIUM" | "ADMIN";
}

export type Game = {
  id: number;
  name: string;
  description: string;
};