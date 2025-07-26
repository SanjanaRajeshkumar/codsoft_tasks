const display = document.getElementById('display');
let expression = '';

function insert(value) {
  expression += value;
  display.value = expression;
  updatePreview();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  display.value = expression;
  updatePreview();
}

function clearDisplay() {
  expression = '';
  display.value = '';
  document.getElementById('preview').textContent = '';
}

function calculate() {
  try {
    let result = eval(expression);
    if (!isFinite(result)) throw 'Math Error';
    display.value = result;
    expression = result.toString();
    updatePreview();
  } catch {
    display.value = 'Error';
    expression = '';
    document.getElementById('preview').textContent = '';
  }
}

function percentage() {
  try {
    let result = eval(expression) / 100;
    display.value = result;
    expression = result.toString();
    updatePreview();
  } catch {
    display.value = 'Error';
    expression = '';
    document.getElementById('preview').textContent = '';
  }
}

function updatePreview() {
  const preview = document.getElementById('preview');
  try {
    if (expression) {
      const result = eval(expression);
      if (!isNaN(result)) {
        preview.textContent = '= ' + result;
      } else {
        preview.textContent = '';
      }
    } else {
      preview.textContent = '';
    }
  } catch {
    preview.textContent = '';
  }
}
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    insert(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
