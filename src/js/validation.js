// Form validation rules
const VALIDATION_RULES = {
  'full-name': {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid name (letters, spaces, hyphens and apostrophes only)'
  },
  'date-of-birth': {
    required: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: 'Please enter a valid date in DD/MM/YYYY format'
  },
  'phone-number': {
    required: true,
    pattern: /^\d{10}$/,
    message: 'Please enter a valid 10-digit phone number'
  },
  'email-id': {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  'address-line-1': {
    required: true,
    minLength: 5,
    message: 'Please enter your street address'
  },
  'address-line-2': {
    required: true,
    minLength: 3,
    message: 'Please enter your apartment/unit details'
  },
  'pincode': {
    required: true,
    pattern: /^\d{6}$/,
    message: 'Please enter a valid 6-digit pincode'
  },
  'state': {
    required: true,
    message: 'Please select your state'
  },
  'partner-full-name': {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid name'
  },
  'partner-date-of-birth': {
    required: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: 'Please enter a valid date in DD/MM/YYYY format'
  },
  'partner-phone-number': {
    required: true,
    pattern: /^\d{10}$/,
    message: 'Please enter a valid 10-digit phone number'
  },
  'partner-email-id': {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  'anniversary': {
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: 'Please enter a valid date in DD/MM/YYYY format'
  },
  // Optional Goa address fields
  'goa-address-line-1': {
    pattern: /^.{5,}$/,
    message: 'Please enter a valid street address'
  },
  'goa-address-line-2': {
    pattern: /^.{3,}$/,
    message: 'Please enter valid apartment/unit details'
  },
  'goa-pincode': {
    pattern: /^\d{6}$/,
    message: 'Please enter a valid 6-digit pincode'
  }
};

// Validate a single field
export function validateField(field) {
  const rules = VALIDATION_RULES[field.id];
  if (!rules) return true;

  let isValid = true;
  let errorMessage = '';

  // Remove any existing error message
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Required field validation
  if (rules.required && !field.value.trim()) {
    isValid = false;
    errorMessage = rules.message || 'This field is required';
  }

  // Minimum length validation
  if (isValid && rules.minLength && field.value.trim().length < rules.minLength) {
    isValid = false;
    errorMessage = `Must be at least ${rules.minLength} characters`;
  }

  // Pattern validation
  if (isValid && rules.pattern && !rules.pattern.test(field.value.trim())) {
    isValid = false;
    errorMessage = rules.message;
  }

  // Display error message if validation failed
  if (!isValid) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
  } else {
    field.classList.remove('error');
  }

  return isValid;
}

// Validate all form fields
export function validateForm() {
  const fields = document.querySelectorAll('#initial-form input[required]');
  let isValid = true;
  const familyType = document.querySelector('input[name="family"]:checked');

  // Validate family type selection
  if (!familyType) {
    isValid = false;
    const radioGroup = document.querySelector('.radio-group');
    if (!radioGroup.querySelector('.error-message')) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = 'Please select your family type';
      radioGroup.appendChild(errorDiv);
    }
  } else {
    const radioGroup = document.querySelector('.radio-group');
    const existingError = radioGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Validate home name if applicable
    if (['isprava', 'chapter', 'lohono'].includes(familyType.value)) {
      const homeName = document.getElementById('home-name');
      if (!homeName.value.trim()) {
        isValid = false;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Please enter your home name';
        homeName.parentElement.appendChild(errorDiv);
        homeName.classList.add('error');
      }
    }
  }

  // Validate all required fields
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}