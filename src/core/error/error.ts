export const BUSINESS_ERRORS = {
  EXAMPLE_ERROR: "EXAMPLE",
} as const;

export type BusinessErrorType =
  (typeof BUSINESS_ERRORS)[keyof typeof BUSINESS_ERRORS];
