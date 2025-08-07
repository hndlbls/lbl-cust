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
  const payload = { access_key: '8a12b0fb-3f5d-48e2-a10f-9d4d1fe7f01f' };  // Sostituisci con la tua API key Web3Forms
  data.forEach((value, key) => { payload[key] = value; });
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
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
