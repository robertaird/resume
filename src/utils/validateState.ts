export function validateState<T = object>(
  defaultState: T,
  possibleState: Partial<T>,
) {
  return () =>
    (Object.keys(defaultState) as Array<keyof T>)
      .filter(
        key =>
          !possibleState[key] ||
          typeof defaultState[key] !== typeof possibleState[key],
      )
      .map(key => new Error(`${key} is invalid.`)).length === 0;
}
