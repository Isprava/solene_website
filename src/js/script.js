// Enable/disable "Other" input based on checkbox
document.getElementById('other')?.addEventListener('change', function() {
  const otherInput = document.querySelector('.other-input input');
  otherInput.disabled = !this.checked;
});

// Form validation and submission
document.getElementById('terms')?.addEventListener('change', function() {
  const submitButton = document.querySelector('.btn-submit');
  submitButton.disabled = !this.checked;
  submitButton.style.backgroundColor = this.checked ? '#8d9b53' : '#dddddd';
  submitButton.style.cursor = this.checked ? 'pointer' : 'not-allowed';
});