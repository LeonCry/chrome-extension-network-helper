// 复制
export function copy(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  }
  catch (err) {
    console.error('copy command failed', err);
  }
  document.body.removeChild(textArea);
  ElMessage.success('copy success');
}
