export const typography = {
  fonts: {
    bold: "TaskSaga-Bold",
    semiBold: "TaskSaga-SemiBold",
    medium: "TaskSaga-Medium",
    regular: "TaskSaga-Regular",
    light: "TaskSaga-Light",
  },
  sizes: {
    h1: 34,
    h2: 28,
    h3: 24,
    h4: 20,
    subtitle: 18, // Added new subtitle size
    body: 16,
    caption: 14,
    small: 12,
    tiny: 10,
  },
  lineHeights: {
    h1: 40,
    h2: 34,
    h3: 30,
    h4: 26,
    subtitle: 26, // Added new subtitle line height
    body: 24,
    caption: 20,
    small: 18,
    tiny: 14,
  },
};

export type Typography = typeof typography;
