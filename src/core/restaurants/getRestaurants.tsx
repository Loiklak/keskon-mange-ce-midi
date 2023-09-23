"use server";

export type Restaurant = {
  name: string;
  tags?: string[];
  canTakeAway: boolean;
  canEatIn: boolean;
};

export const getRandomRestaurant = async (): Promise<Restaurant> =>
  getRestaurants()[Math.floor(Math.random() * getRestaurants().length)];

const getRestaurants = (): Restaurant[] => RESTAURANTS;

const RESTAURANTS = [
  {
    name: "Via Roma",
    tags: [],
    canTakeAway: true,
    canEatIn: false,
  },
  {
    name: "Banh Mila",
    canTakeAway: true,
    canEatIn: false,
    tags: ["asiatique"],
  },
  {
    name: "Ichiban Sushi",
    tags: ["asiatique"],
    canTakeAway: true,
    canEatIn: false,
  },
  {
    name: "Y-Izakaya",
    tags: ["asiatique"],
    canTakeAway: false,
    canEatIn: true,
  },
  {
    name: "Krispy (KFC)",
    tags: ["asiatique"],
    canTakeAway: true,
    canEatIn: true,
  },
  {
    name: "Enpanadas",
    tags: ["amerique latine"],
    canTakeAway: true,
    canEatIn: false,
  },
  {
    name: "Barepas",
    tags: ["amerique latine"],
    canTakeAway: true,
    canEatIn: true,
  },
  {
    name: "Billy Brick",
    tags: [],
    canTakeAway: true,
    canEatIn: false,
  },
  {
    name: "Shin Jung",
    tags: ["asiatique"],
    canTakeAway: true,
    canEatIn: true,
  },
  {
    name: "Mme Shawn",
    tags: ["asiatique"],
    canTakeAway: true,
    canEatIn: true,
  },
  {
    name: "Pokeshop",
    tags: ["asiatique"],
    canEatIn: false,
    canTakeAway: true,
  },
  {
    name: "Parisik",
    tags: ["asiatique"],
    canEatIn: true,
    canTakeAway: true,
  },
  {
    name: "Augustin",
    tags: [],
    canEatIn: true,
    canTakeAway: false,
  },
];
