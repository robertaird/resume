export function calculateZIndex(
  height: number,
  offsetTop: number,
  offsetLeft: number,
  adjustment: number,
) {
  const offset = offsetTop + offsetLeft / 100 + 100;
  return Math.floor(
    offset +
      adjustment /
        Math.abs(
          10 - Math.max(0, Math.ceil(height / 5 / (Math.log(adjustment) / 10))),
        ),
  );
}
