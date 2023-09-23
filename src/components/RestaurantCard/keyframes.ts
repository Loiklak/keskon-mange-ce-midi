export const focusInAnimation = [
  { transform: "scale(1)" },
  { transform: "scale(1.2)" },
];

export const focusOutAnimation = [
  { transform: "scale(1.2)" },
  { transform: "scale(1)" },
];

export const shakeAnimation = [
  { transform: "scale(1.2) rotate(0deg)" },
  { transform: "scale(1.3) rotate(5deg)", offset: 0.3 },
  { transform: "scale(1.2) rotate(-10deg)", offset: 0.4 },
  { transform: "scale(1.3) rotate(10deg)", offset: 0.6 },
  { transform: "scale(1.2) rotate(-5deg)", offset: 0.8 },
  { transform: "scale(1.2) rotate(0deg)" },
];
