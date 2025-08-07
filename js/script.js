const form = document.getElementById('customizationForm');
const steps = Array.from(document.querySelectorAll('.step'));
let currentStep = 0;

document.querySelectorAll('.next').forEach(btn => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      goToStep(currentStep + 1);
    } else {
      alert("Seleziona un'opzione per continuare.");
    }
  });
});
document.querySelectorAll('.prev').forEach(btn => {
  btn.addEventListener('click', () => {
    goToStep(currentStep - 1);
  });
});
function goToStep(step) {
  steps[currentStep].style.display = 'none';
  steps[step].style.display = '';
  currentStep = step;
}
function validateStep(step) {
  const stepEl = steps[step];
  const inputs = stepEl.querySelectorAll('input[type="radio"], input[type="text"]');
  return Array.from(inputs).some(input => {
    if (input.type === 'radio' && input.checked) return true;
    if (input.type === 'text' && input.value.trim() !== '') return true;
    return false;
  });
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(form);
  const json = {};
  data.forEach((value, key) => { json[key] = value; });
  fetch('https://formspree.io/f/yourFormID', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(json)
  }).then(response => {
    if (response.ok) {
      alert('Ordine inviato con successo!');
      form.reset();
      goToStep(0);
    } else {
      alert('Si è verificato un errore. Per favore riprova.');
    }
  }).catch(() => alert('Si è verificato un errore. Per favore riprova.'));
});