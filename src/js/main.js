// Form validation
const form = document.querySelector('.card');
const submitButton = document.querySelector('.btn-submit');
const termsCheckbox = document.getElementById('terms');

// Enable submit button when terms are accepted
termsCheckbox?.addEventListener('change', (e) => {
  submitButton.disabled = !e.target.checked;
  submitButton.style.backgroundColor = e.target.checked ? '#9c3c33' : '#dddddd';
  submitButton.style.cursor = e.target.checked ? 'pointer' : 'not-allowed';
});

// Function to save dependents data
function saveDependentsData() {
  const dependents = [];
  const dependentSections = document.querySelectorAll('#dependants-container .form-section');
  
  dependentSections.forEach((section, index) => {
    const dependent = {
      fullName: document.getElementById(`dependent-${index + 1}-full-name`)?.value || '',
      dateOfBirth: document.getElementById(`dependent-${index + 1}-date-of-birth`)?.value || '',
      phoneNumber: document.getElementById(`dependent-${index + 1}-phone-number`)?.value || '',
      emailId: document.getElementById(`dependent-${index + 1}-email`)?.value || '',
      relationship: document.getElementById(`dependent-${index + 1}-relationship`)?.value || '',
      socialMediaHandle: document.getElementById(`dependent-${index + 1}-social-media`)?.value || ''
    };
    dependents.push(dependent);
  });

  localStorage.setItem('dependentsData', JSON.stringify(dependents));
  return dependents;
}

// Add dependant button functionality
const addDependantButton = document.querySelector('.btn-outline');
let dependantCount = document.querySelectorAll('#dependants-container .form-section').length;

addDependantButton?.addEventListener('click', () => {
  dependantCount++;
  
  const newDependantSection = document.createElement('div');
  newDependantSection.className = 'form-section';
  newDependantSection.innerHTML = `
    <h3>Dependant ${dependantCount}</h3>
    <div class="form-grid">
      <div class="form-field">
        <input type="text" id="dependent-${dependantCount}-full-name" placeholder=" " required />
        <label for="dependent-${dependantCount}-full-name">Full Name*</label>
      </div>
      <div class="form-field">
        <input type="text" id="dependent-${dependantCount}-date-of-birth" placeholder="DD/MM/YYYY" required />
        <label for="dependent-${dependantCount}-date-of-birth">Date of Birth*</label>
      </div>
      <div class="form-field phone-field">
        <div class="country-code">
          <span>+91 India</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="divider"></div>
        <input type="tel" id="dependent-${dependantCount}-phone-number" placeholder=" " required />
        <label for="dependent-${dependantCount}-phone-number">Phone Number*</label>
      </div>
      <div class="form-field">
        <input type="email" id="dependent-${dependantCount}-email" placeholder=" " required />
        <label for="dependent-${dependantCount}-email">Email ID*</label>
      </div>
      <div class="form-field">
        <select id="dependent-${dependantCount}-relationship" required>
          <option value="" disabled selected></option>
          <option value="child">Child</option>
          <option value="parent">Parent</option>
        </select>
        <label for="dependent-${dependantCount}-relationship">Relationship*</label>
      </div>
      <div class="form-field">
        <input type="text" id="dependent-${dependantCount}-social-media" placeholder=" " />
        <label for="dependent-${dependantCount}-social-media">Social Media Handle</label>
      </div>
    </div>
  `;

  const container = document.getElementById('dependants-container');
  const addDependantButton = container.querySelector('.add-dependant');
  container.insertBefore(newDependantSection, addDependantButton);
  container.insertBefore(document.createElement('div'), addDependantButton).className = 'separator';

  // Add event listeners for new form fields
  newDependantSection.querySelectorAll('.form-field input, .form-field select').forEach(input => {
    input.addEventListener('focus', function() {
      const label = this.nextElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.classList.add('active');
      }
    });
    
    input.addEventListener('blur', function() {
      const label = this.nextElementSibling;
      if (label && label.tagName === 'LABEL' && this.value === '') {
        label.classList.remove('active');
      }
      if (this.hasAttribute('required')) {
        validateField(this);
      }
    });
  });
});

// Handle form submission
submitButton?.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Save dependents data
  const dependents = saveDependentsData();
  
  // Show success message
  alert(`Successfully saved ${dependents.length} dependent(s)`);
  console.log('Saved dependents:', dependents);
});

// Load saved dependents data on page load
const savedDependentsData = localStorage.getItem('dependentsData');
if (savedDependentsData) {
  const dependents = JSON.parse(savedDependentsData);
  dependents.forEach((dependent, index) => {
    if (index > 0) {
      // Add new dependent section for each saved dependent after the first one
      addDependantButton?.click();
    }
    
    // Fill in the data
    document.getElementById(`dependent-${index + 1}-full-name`).value = dependent.fullName;
    document.getElementById(`dependent-${index + 1}-date-of-birth`).value = dependent.dateOfBirth;
    document.getElementById(`dependent-${index + 1}-phone-number`).value = dependent.phoneNumber;
    document.getElementById(`dependent-${index + 1}-email`).value = dependent.emailId;
    document.getElementById(`dependent-${index + 1}-relationship`).value = dependent.relationship;
    document.getElementById(`dependent-${index + 1}-social-media`).value = dependent.socialMediaHandle;

    // Update labels
    document.querySelectorAll(`#dependent-${index + 1}-full-name, #dependent-${index + 1}-date-of-birth, #dependent-${index + 1}-phone-number, #dependent-${index + 1}-email, #dependent-${index + 1}-relationship, #dependent-${index + 1}-social-media`).forEach(input => {
      if (input.value) {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
          label.classList.add('active');
        }
      }
    });
  });
}