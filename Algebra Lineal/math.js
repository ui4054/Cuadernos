document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('math-status');

  if (typeof renderMathInElement !== 'function') {
    status.hidden = false;
    return;
  }

  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  });
});
