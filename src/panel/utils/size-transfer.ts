export function sizeTransfer(cellValue: number | string) {
  if (typeof cellValue === 'string') return '/';
  if (cellValue < 1024) {
    return `${cellValue.toFixed(2)}B`;
  }
  if (cellValue < 1024 * 1024) {
    return `${(cellValue / 1024).toFixed(2)}KB`;
  }
  if (cellValue < 1024 * 1024 * 1024) {
    return `${(cellValue / 1024 / 1024).toFixed(2)}MB`;
  }
  return `${(cellValue / 1024 / 1024 / 1024).toFixed(2)}GB`;
}
