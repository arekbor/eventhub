export type FormValidationMessageMap = Record<
  string,
  (param: { requiredLength: number }) => string
>;
