export const focusInAnimation = [
  { transform: "scale(1)" },
  { transform: "scale(1.1)" },
];

export const focusOutAnimation = [
  { transform: "scale(1.1)" },
  { transform: "scale(1)" },
];

export const shakeAnimation = [
  { transform: "scale(1.1) rotate(0deg)" },
  { transform: "scale(1.2) rotate(5deg)", offset: 0.3 },
  { transform: "scale(1.1) rotate(-7deg)", offset: 0.4 },
  { transform: "scale(1.2) rotate(7deg)", offset: 0.6 },
  { transform: "scale(1.1) rotate(-5deg)", offset: 0.8 },
  { transform: "scale(1.1) rotate(0deg)" },
];
