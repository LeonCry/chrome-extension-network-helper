export function timeTransfer(_r: any, _c: any, cellValue: any) {
  if (cellValue < 1000) {
    return `${cellValue.toFixed(2)}ms`;
  }
  if (cellValue < 1000 * 60) {
    return `${(cellValue / 1000).toFixed(2)}s`;
  }
  if (cellValue < 1000 * 60 * 60) {
    return `${(cellValue / 1000 / 60).toFixed(2)}min`;
  }
  return `${(cellValue / 1000 / 60 / 60).toFixed(2)}h`;
}
