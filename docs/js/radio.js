/* global nameValue, nextValue */

function restoreSessionStorage(nameValue) {
  const input = sessionStorage.getItem(nameValue);
  const inputs = document.querySelectorAll(`input[name="${nameValue}"]`);
  if (input) {
    inputs.forEach((inputElement) => {
      if (inputElement.value === input) {
        inputElement.checked = true;
      } else {
        inputElement.checked = false;
      }
    });
  } else {
    inputs.forEach((inputElement) => {
      inputElement.checked = false;
    });
  }
}

function activateSubmit(nameValue) {
  const inputs = document.querySelectorAll(`input[name="${nameValue}"]:checked`);
  const submitButton = document.getElementById('submit');
  if (inputs.length > 0 && submitButton) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

const entries = performance.getEntriesByType('navigation');
entries.forEach(() => {
  restoreSessionStorage(nameValue);
  activateSubmit(nameValue);
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('input', (e) => {
    if (e.target.matches(`input[name="${nameValue}"]:checked`)) {
      activateSubmit(nameValue);
    }
  });

  const submitButton = document.getElementById('submit');
  if (submitButton) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll(`input[name="${nameValue}"]:checked`);
      const input = inputs.length > 0 ? inputs[0].value : '';
      sessionStorage.setItem(nameValue, input);
      document.location.href = `${nextValue}.html`;
    });
  }
});
