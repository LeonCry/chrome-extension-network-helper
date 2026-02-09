function urlTransfer(url: string) {
  const index = url.lastIndexOf('/');
  if (index === -1) return url;
  const text = url.substring(index + 1);
  if (text.length === 0) return urlTransfer(url.substring(0, index));
  return text;
}
export { urlTransfer };
