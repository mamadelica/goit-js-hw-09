const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handleSubmit);

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
  toLocalStorage();
});

function toLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function restoreFromData() {
  const savedData = localStorage.getItem('feedback-form-state');
  let parsedData = null;

  if (!savedData) return;

  try {
    parsedData = JSON.parse(savedData);
  } catch (error) {
    return;
  }

  if (parsedData) {
    form.elements.email.value = parsedData.email || '';
    formData.email = parsedData.email || '';
    form.elements.message.value = parsedData.message || '';
    formData.message = parsedData.message || '';
  }
}

function handleSubmit(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
}

document.addEventListener('DOMContentLoaded', restoreFromData);
