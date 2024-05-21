import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const positionTheodo: [number, number] = [48.882737, 2.322391];

export const calculateDistance = (
  position1: [number, number],
  position2: [number, number]
) => {
  const [lat1, lon1] = position1;
  const [lat2, lon2] = position2;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const d = R * (Math.abs(dLat) + Math.abs(dLon)); // Norm 1 distance (mostly perpendicular streets)
  return d;
};

export const walkingSpeed = 5; // km/h

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
