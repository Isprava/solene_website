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

    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');

    // Empty field validation
    if (rules.required && !field.value.trim()) {
        showFieldError(field, "This field is required");
        return false;
    }

    // Skip further validation if field is empty and not required
    if (!field.value.trim()) return true;

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(field.value.trim())) {
        showFieldError(field, rules.message);
        return false;
    }

    // Minimum length validation
    if (rules.minLength && field.value.trim().length < rules.minLength) {
        showFieldError(field, `Must be at least ${rules.minLength} characters`);
        return false;
    }

    // Custom validation
    if (rules.validate && !rules.validate(field)) {
        return false; // Error message handled by validate function
    }

    // Conditional validation for partner fields
    if (rules.conditionallyRequired && typeof rules.conditionallyRequired === 'function') {
        const familyType = document.querySelector('input[name="family"]:checked')?.value;
        if (rules.conditionallyRequired(familyType) && !field.value.trim()) {
            showFieldError(field, "This field is required based on your selection");
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function validateDateField(field) {
    const value = field.value.trim();
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

    if (!value && !field.hasAttribute('required')) {
        return true;
    }

    if (!value && field.hasAttribute('required')) {
        showFieldError(field, "This field is required");
        return false;
    }

    if (!datePattern.test(value)) {
        showFieldError(field, "Please enter date in DD/MM/YYYY format");
        return false;
    }

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        showFieldError(field, "Please enter a valid date");
        return false;
    }

    if (date > today) {
        showFieldError(field, "Date cannot be in future");
        return false;
    }

    return true;
}

// Setup form validation event listeners
function setupFormValidation() {
    const form = document.getElementById('initial-form');
    const requiredFields = form.querySelectorAll('input[required], select[required]');

    requiredFields.forEach(field => {
        ['input', 'blur', 'change'].forEach(eventType => {
            field.addEventListener(eventType, () => {
                validateField(field);
                toggleNextButton();
            });
        });
    });

    // Special handling for family type radio buttons
    document.querySelectorAll('input[name="family"]').forEach(radio => {
        radio.addEventListener('change', () => {
            validateFamilyTypeFields();
            toggleNextButton();
        });
    });
}

function validateFamilyTypeFields() {
    const familyType = document.querySelector('input[name="family"]:checked')?.value;
    
    if (["isprava_homeowner", "chapter_homeowner"].includes(familyType)) {
        const homeName = document.getElementById('home-name');
        if (!homeName.value.trim()) {
            showFieldError(homeName, "Home name is required for this membership type");
            return false;
        }
    }
    
    if (["not_yet", "lohono_platinum"].includes(familyType)) {
        const goaFields = ['goa-address-line-1', 'goa-address-line-2', 'goa-pincode'];
        for (const fieldId of goaFields) {
            const field = document.getElementById(fieldId);
            if (!validateField(field)) return false;
        }
    }
    
    return true;
}

// Function to check if the form is valid
function isFormValid() {
    const requiredFields = document.querySelectorAll('#initial-form input[required], #initial-form select[required]');
    for (const field of requiredFields) {
        if (!validateField(field)) return false;
    }
    return validateFamilyTypeFields();
}

// Initialize validation
document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();
    toggleNextButton(); // Initial button state
});