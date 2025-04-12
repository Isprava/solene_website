function validateDateField(field) {
  const value = field.value.trim();
  const datePattern =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

  // Remove any existing error message
  const existingError =
    field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Allow empty value if field is not required
  if (!value && !field.hasAttribute("required")) {
    field.classList.remove("error");
    return true;
  }

  // Required field validation
  if (!value && field.hasAttribute("required")) {
    showFieldError(field, "This field is required");
    return false;
  }

  // Pattern validation for non-empty values
  if (value && !datePattern.test(value)) {
    showFieldError(field, "Please enter date in DD/MM/YYYY format");
    return false;
  }

  if (value) {
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    // Check if it's a valid date
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      showFieldError(field, "Please enter a valid date");
      return false;
    }

    // Check if date is not in future
    if (date > today) {
      showFieldError(field, "Date cannot be in future");
      return false;
    }
  }

  field.classList.remove("error");
  return true;
}

function showFieldError(field, message) {
  field.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

// Update your VALIDATION_RULES object for date fields
const VALIDATION_RULES = {
  "full-name": {
    required: true,
    pattern: /^[a-zA-Z\s'-]+$/,
    minLength: 2,
    message:
      "Please enter a valid name (letters, spaces, hyphens and apostrophes only)",
  },

  "date-of-birth": {
    required: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: "Please enter a valid date in DD/MM/YYYY format",
    validate: (field) => validateDateField(field),
  },

  "phone-number": {
    required: true,
    pattern: /^\d{10}$/,
    message: "Please enter a valid 10-digit phone number",
  },

  "email-id": {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },

  "linkedin-url": {
        conditionallyRequired: (familyType) => {
            return ["not_yet", "lohono_platinum"].includes(familyType);
        },
        pattern: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/,
        errorMessages: {
            required: "LinkedIn URL is mandatory for this membership type",
            pattern: "Please enter a valid LinkedIn URL"
        }
    },

"linkedin-url": {
        conditionallyRequired: (familyType) => {
            return ["not_yet", "lohono_platinum"].includes(familyType);
        },
        pattern: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/,
        errorMessages: {
            required: "LinkedIn URL is mandatory for this membership type",
            pattern: "Please enter a valid LinkedIn URL"
        }
    },

  // Address fields
  "address-line-1": {
    required: true,
    minLength: 5,
    message: "Please enter your street address",
  },

  "address-line-2": {
    required: true,
    minLength: 3,
    message: "Please enter your apartment/building details",
  },

  pincode: {
    required: true,
    pattern: /^\d{6}$/,
    message: "Please enter a valid 6-digit pincode",
  },

  state: {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Please enter a valid state name",
  },

  // Partner fields
  "partner-full-name": {
    conditionallyRequired: true,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: "Please enter a valid name",
  },

  "partner-date-of-birth": {
    conditionallyRequired: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: "Please enter a valid date in DD/MM/YYYY format",
    validate: (field) => validateDateField(field),
  },

  "partner-phone-number": {
    conditionallyRequired: true,
    pattern: /^\d{10}$/,
    message: "Please enter a valid 10-digit phone number",
  },

  "partner-email-id": {
    conditionallyRequired: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },

  "partner-anniversary": {
    conditionallyRequired: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: "Please enter a valid date in DD/MM/YYYY format",
    validate: (field) => validateDateField(field),
  },

  // Home name field (conditional based on family type)
  "home-name": {
    conditionallyRequired: (familyType) => {
      return ["isprava_homeowner", "chapter_homeowner"].includes(
        familyType
      );
    },
    minLength: 2,
    message: "Please enter your home name",
  },

  // Goa address fields (conditional based on family type)
  "goa-address-line-1": {
    conditionallyRequired: (familyType) => {
      return ["not_yet", "lohono_platinum"].includes(familyType);
    },
    minLength: 5,
    message: "Please enter your Goa street address",
  },

  "goa-address-line-2": {
    conditionallyRequired: (familyType) => {
      return ["not_yet", "lohono_platinum"].includes(familyType);
    },
    minLength: 3,
    message: "Please enter your Goa apartment/building details",
  },

  "goa-pincode": {
    conditionallyRequired: (familyType) => {
      return ["not_yet", "lohono_platinum"].includes(familyType);
    },
    pattern: /^\d{6}$/,
    message: "Please enter a valid 6-digit pincode",
  },

  "partner-linkedin-url": {
    conditionallyRequired: (familyType) => {
      return ["not_yet", "lohono_platinum"].includes(familyType);
    },
    pattern: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/,
    message: "Please enter a valid LinkedIn URL",
  },
};

// Add event listeners for date inputs
document.addEventListener("DOMContentLoaded", function () {
  const dateFields = document.querySelectorAll(
    'input[placeholder="DD/MM/YYYY"]'
  );

  dateFields.forEach((field) => {
    field.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 8) value = value.slice(0, 8);

      if (value.length >= 4) {
        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2, 4) +
          "/" +
          value.slice(4);
      } else if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }

      e.target.value = value;
    });

    field.addEventListener("blur", function () {
      validateDateField(this);
    });
  });
});

// Update the date input event listeners
document.addEventListener("DOMContentLoaded", function () {
  const dateFields = document.querySelectorAll(
    'input[placeholder="DD/MM/YYYY"]'
  );

  dateFields.forEach((field) => {
    // Handle input formatting
    field.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      // Allow backspace and delete
      if (
        e.inputType === "deleteContentBackward" ||
        e.inputType === "deleteContentForward"
      ) {
        return;
      }

      if (value.length > 8) value = value.slice(0, 8);

      if (value.length >= 4) {
        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2, 4) +
          "/" +
          value.slice(4);
      } else if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }

      e.target.value = value;
    });

    // Handle keydown for delete and backspace
    field.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" || e.key === "Delete") {
        const start = this.selectionStart;
        const end = this.selectionEnd;

        if (start === end && this.value[start - 1] === "/") {
          e.preventDefault();
          this.setSelectionRange(start - 1, start - 1);
        }
      }
    });

    // Validate on blur
    field.addEventListener("blur", function () {
      validateDateField(this);
    });
  });
});
// Update your validateField function to use custom validation
function validateField(field) {
  const rules = VALIDATION_RULES[field.id];
  if (!rules) return true;

  // Remove any existing error message
  const existingError =
    field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
  field.classList.remove("error");

  // Get family type for conditional validation
  const familyType = document.querySelector(
    'input[name="family"]:checked'
  )?.value;

  // Check if field is LinkedIn URL and conditionally required
  const isLinkedInField = field.id === "linkedin-url";
  const isRequiredByFamily = rules.conditionallyRequired && 
      typeof rules.conditionallyRequired === "function" ? 
      rules.conditionallyRequired(familyType) : false;
   // Empty field validation for required fields
   if ((isLinkedInField && isRequiredByFamily) && !field.value.trim()) {
    showFieldError(field, rules.errorMessages?.required || "This field is required");
    return false;
}
  // Check if field is required based on partner fields
  const isRequiredByPartner =
    rules.conditionallyRequired &&
    field.id.startsWith("partner-") &&
    isAnyPartnerFieldFilled();

  // Determine if field is required
  const isRequired =
    rules.required || isRequiredByFamily || isRequiredByPartner;

  // Empty field validation
  if (isRequired && !field.value.trim()) {
    let errorMessage = "This field is required";
    if (isRequiredByFamily) {
      errorMessage = `This field is required for your selected membership type`;
    } else if (isRequiredByPartner) {
      errorMessage =
        "This field is required when any partner detail is provided";
    }
    showFieldError(field, errorMessage);
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
    showFieldError(
      field,
      `Must be at least ${rules.minLength} characters`
    );
    return false;
  }

  // Custom validation
  if (rules.validate && !rules.validate(field)) {
    return false; // Error message handled by validate function
  }

  return true;
}

function showFieldError(field, message) {
  field.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}
// Add this function to check all required fields
function checkRequiredFields() {
  // Check family type selection
  const familyType = document.querySelector(
    'input[name="family"]:checked'
  );
  if (!familyType) return false;

  // Check home name if applicable
  if (
    ["isprava_homeowner", "chapter_homeowner"].includes(familyType.value)
  ) {
    const homeName = document.getElementById("home-name");
    if (!homeName.value.trim()) return false;
  }

  // Check all required fields
  const requiredFields = document.querySelectorAll(
    "#initial-form input[required]"
  );
  for (const field of requiredFields) {
    if (!validateField(field)) return false;
  }

  return true;
}

// Add input event listeners to all form fields
function setupFormValidation() {
  // Add event listeners to family type radio buttons
  document.querySelectorAll('input[name="family"]').forEach((radio) => {
    radio.addEventListener("change", toggleNextButton);
  });

  // Add event listeners to all required inputs
  document
    .querySelectorAll(
      "#initial-form input[required], #initial-form select[required]"
    )
    .forEach((field) => {
      ["input", "change", "blur"].forEach((eventType) => {
        field.addEventListener(eventType, toggleNextButton);
      });
    });
}

// Function to toggle Next button state
function toggleNextButton() {
  const nextButton = document.getElementById("next-button");
  const isValid = checkRequiredFields();

  nextButton.disabled = !isValid;
  nextButton.classList.toggle("disabled", !isValid);
}

// Initialize country dropdowns when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeAllCountryDropdowns();

  // Initialize existing dependant dropdowns
  const existingPhoneFields = document.querySelectorAll(
    "#dependants-container .phone-field"
  );
  existingPhoneFields.forEach((phoneField) => {
    initializeCountryDropdown(phoneField);
  });
});

function initializeAllCountryDropdowns() {
  document.querySelectorAll(".country-code").forEach((countryCode) => {
    countryCode.addEventListener("click", function (e) {
      e.stopPropagation();

      const dropdown =
        this.closest(".phone-field").querySelector(".country-dropdown");
      // dropdown.style.border = "solid green";
      // Close all other dropdowns first
      document.querySelectorAll(".country-dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("active");
        }
      });

      // Toggle current dropdown
      dropdown.classList.add("active");
    });
  });

  // Handle country selection
  document.querySelectorAll(".country-option").forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const phoneField = this.closest(".phone-field");
      const countryCode = phoneField.querySelector(".country-code span");
      const dropdown = phoneField.querySelector(".country-dropdown");

      // Update selected country
      countryCode.textContent = `${this.dataset.code} ${this.dataset.country}`;

      // Update selected state
      phoneField.querySelectorAll(".country-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      this.classList.add("selected");

      // Hide dropdown
      dropdown.classList.remove("active");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".phone-field")) {
      document
        .querySelectorAll(".country-dropdown")
        .forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
    }
  });
}

function initializeCountryDropdown(phoneField) {
  const countryCode = phoneField.querySelector(".country-code");
  const dropdown = phoneField.querySelector(".country-dropdown");
  const countryOptions = phoneField.querySelectorAll(".country-option");

  // Toggle dropdown
  // countryCode.addEventListener("click", function (e) {
  //   e.stopPropagation();
  //   // Close all other dropdowns
  //   document.querySelectorAll(".country-dropdown").forEach((d) => {
  //     if (d !== dropdown) {
  //       d.classList.remove("active");
  //     }
  //   });
  //   dropdown.classList.toggle("active");
  // });

  // Handle country selection
  countryOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const code = this.dataset.code;
      const country = this.dataset.country;

      // Update display
      countryCode.querySelector(
        "span"
      ).textContent = `${code} ${country}`;

      // Update selected state
      countryOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // Close dropdown
      dropdown.classList.remove("active");
    });
  });
}

// Update the initializeNewDependantDropdowns function
function initializeNewDependantDropdowns(newSection) {
  const phoneFields = newSection.querySelectorAll(".phone-field");
  phoneFields.forEach((phoneField) => {
    initializeCountryDropdown(phoneField);
  });
}
function validateTermsAndConditions() {
  const termsCheckbox = document.getElementById("terms");
  const termsSection = document.querySelector(".terms-section");

  if (!termsCheckbox.checked) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = "Please accept the Terms & Conditions";

    // Remove any existing error message
    const existingError = termsSection.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    termsSection.appendChild(errorDiv);
    return false;
  }

  // Remove error message if terms are accepted
  const existingError = termsSection.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
  return true;
}
// Add click handler to close dropdowns when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".phone-field")) {
    document.querySelectorAll(".country-dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

function convertDateFormat(dateString) {
  if (!dateString) return "";

  // Check if date is in DD/MM/YYYY format
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return dateString;
}

function isAnyPartnerFieldFilled() {
  const partnerFields = [
    "partner-full-name",
    "partner-date-of-birth",
    "partner-phone-number",
    "partner-email-id",
    "partner-anniversary",
    "partner-social-media-handle",
  ];

  return partnerFields.some((fieldId) => {
    const field = document.getElementById(fieldId);
    return field && field.value.trim() !== "";
  });
}

function isAnyDependentFieldFilled(sectionIndex) {
  const fields = [
    `dependant-${sectionIndex}-full-name`,
    `dependant-${sectionIndex}-date-of-birth`,
    `dependant-${sectionIndex}-phone-number`,
    `dependant-${sectionIndex}-email`,
    `dependant-${sectionIndex}-relationship`,
    `dependant-${sectionIndex}-social-media`,
  ];

  return fields.some((fieldId) => {
    const field = document.getElementById(fieldId);
    return field && field.value.trim() !== "";
  });
}

function hasDependantData() {
  const dependantSections = document.querySelectorAll(
    "#dependants-container .form-section"
  );
  return Array.from(dependantSections).some((section, index) => {
    const sectionIndex = index + 1;
    return isAnyDependentFieldFilled(sectionIndex);
  });
}

function hasAdditionalInfoData() {
  // Check if any source is selected
  const sourceCheckboxes = document.querySelectorAll(
    '.checkbox-group input[type="checkbox"]'
  );
  const isAnySourceSelected = Array.from(sourceCheckboxes).some(
    (checkbox) => checkbox.checked
  );

  // Check member reference details if selected
  const memberCheckbox = document.getElementById("member");
  const referenceData = memberCheckbox?.checked
    ? {
        fullName: document
          .getElementById("reference-full-name")
          ?.value.trim(),
        phoneNumber: document
          .getElementById("reference-phone-number")
          ?.value.trim(),
        relationship: document
          .getElementById("reference-relationship")
          ?.value.trim(),
      }
    : null;

  // Check why and how fields
  const whyField = document.getElementById("why")?.value;
  const howField = document.getElementById("how")?.value;

  return (
    isAnySourceSelected ||
    (referenceData &&
      (referenceData.fullName ||
        referenceData.phoneNumber ||
        referenceData.relationship)) ||
    whyField ||
    howField
  );
}
// Validate a single field
function validateField(field) {
  const rules = VALIDATION_RULES[field.id];
  if (!rules) return true;

  let isValid = true;
  let errorMessage = "";

  // Remove any existing error message
  const existingError =
    field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Check if field is conditionally required
  const isRequired = rules.conditionallyRequired
    ? isAnyPartnerFieldFilled() && field.id.startsWith("partner-")
    : rules.required;

  // Required field validation
  if (isRequired && !field.value.trim()) {
    isValid = false;
    errorMessage = rules.conditionallyRequired
      ? "This field is required when any partner detail is provided"
      : `The Field is required`;
  }

  // Pattern validation (only if field has value or is required)
  if (
    isValid &&
    field.value.trim() &&
    rules.pattern &&
    !rules.pattern.test(field.value.trim())
  ) {
    isValid = false;
    errorMessage = rules.message;
  }

  // Minimum length validation (only if field has value or is required)
  if (
    isValid &&
    field.value.trim() &&
    rules.minLength &&
    field.value.trim().length < rules.minLength
  ) {
    isValid = false;
    errorMessage = `Must be at least ${rules.minLength} characters`;
  }

  // Display error message if validation failed
  if (!isValid) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    field.parentElement.appendChild(errorDiv);
    field.classList.add("error");
  } else {
    field.classList.remove("error");
  }

  return isValid;
}

function validateDependents() {
  const dependantSections = document.querySelectorAll(
    "#dependants-container .form-section"
  );
  let isValid = true;

  dependantSections.forEach((section, index) => {
    const sectionIndex = index + 1;

    if (isAnyDependentFieldFilled(sectionIndex)) {
      // Required fields if any field is filled
      const requiredFields = [
        {
          id: `dependant-${sectionIndex}-full-name`,
          label: "Full Name",
          pattern: /^[a-zA-Z\s'-]+$/,
        },
        {
          id: `dependant-${sectionIndex}-date-of-birth`,
          label: "Date of Birth",
          pattern:
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
        },
        {
          id: `dependant-${sectionIndex}-phone-number`,
          label: "Phone Number",
          pattern: /^\d{10}$/,
        },
        {
          id: `dependant-${sectionIndex}-email`,
          label: "Email",
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        {
          id: `dependant-${sectionIndex}-relationship`,
          label: "Relationship",
          pattern: /.+/,
        },
      ];

      requiredFields.forEach((field) => {
        const element = document.getElementById(field.id);
        const value = element.value.trim();

        // Remove existing error message
        const existingError =
          element.parentElement.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }
        element.classList.remove("error");

        if (!value) {
          isValid = false;
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.textContent = `${field.label} is required`;
          element.parentElement.appendChild(errorDiv);
          element.classList.add("error");
        } else if (field.pattern && !field.pattern.test(value)) {
          isValid = false;
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.textContent = `Please enter a valid ${field.label.toLowerCase()}`;
          element.parentElement.appendChild(errorDiv);
          element.classList.add("error");
        }
      });
    }
  });

  return isValid;
}

document.getElementById("member").addEventListener("change", function () {
  const referenceDetails = document.getElementById("reference-details");
  const referenceFullName = document.getElementById(
    "reference-full-name"
  );
  const referencePhoneNumber = document.getElementById(
    "reference-phone-number"
  );
  const referenceRelationship = document.getElementById(
    "reference-relationship"
  );

  if (this.checked) {
    referenceDetails.style.display = "block";
    referenceFullName.setAttribute("required", "true");
    referencePhoneNumber.setAttribute("required", "true");
    referenceRelationship.setAttribute("required", "true");
  } else {
    referenceDetails.style.display = "none";
    referenceFullName.removeAttribute("required");
    referencePhoneNumber.removeAttribute("required");
    referenceRelationship.removeAttribute("required");
  }
});

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.classList.remove("success", "error");
  toast.classList.add(type);
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

const partnerFields = document.querySelectorAll('[id^="partner-"]');

function saveFormData() {
  const formData = {
    familyType:
      document.querySelector('input[name="family"]:checked')?.value || "",
    homeName: document.getElementById("home-name")?.value || "",
    basicDetails: {
      fullName: document.getElementById("full-name")?.value || "",
      dateOfBirth: document.getElementById("date-of-birth")?.value || "",
      countryCode: document
        .querySelector("#basic-country-code span")
        .textContent.split(" ")[0],
      phoneNumber: document.getElementById("phone-number")?.value || "",
      emailId: document.getElementById("email-id")?.value || "",
      linkedinUrl: document.getElementById("linkedin-url")?.value || "", // Add this line
      socialMediaHandle:
        document.getElementById("social-media-handle")?.value || "",
    },
    address: {
      line1: document.getElementById("address-line-1")?.value || "",
      line2: document.getElementById("address-line-2")?.value || "",
      pincode: document.getElementById("pincode")?.value || "",
      state: document.getElementById("state")?.value || "",
    },
    goaAddress: {
      line1: document.getElementById("goa-address-line-1")?.value || "",
      line2: document.getElementById("goa-address-line-2")?.value || "",
      pincode: document.getElementById("goa-pincode")?.value || "",
      state: "Goa",
    },
    partnerDetails: {
      fullName: document.getElementById("partner-full-name")?.value || "",
      dateOfBirth:
        document.getElementById("partner-date-of-birth")?.value || "",
      phoneNumber:
        document.getElementById("partner-phone-number")?.value || "",
      emailId: document.getElementById("partner-email-id")?.value || "",
      linkedinUrl:
        document.getElementById("partner-linkedin-url")?.value || "", // Add this line
      anniversary:
        document.getElementById("partner-anniversary")?.value || "",
      socialMediaHandle:
        document.getElementById("partner-social-media-handle")?.value ||
        "",
    },
  };

  localStorage.setItem("membershipFormData", JSON.stringify(formData));
}

function saveDependantsData() {
  const dependants = [];
  const dependantSections = document.querySelectorAll(
    "#dependants-container .form-section"
  );

  dependantSections.forEach((section, index) => {
    const dependant = {
      fullName:
        document.getElementById(`dependant-${index + 1}-full-name`)
          ?.value || "",
      dateOfBirth:
        document.getElementById(`dependant-${index + 1}-date-of-birth`)
          ?.value || "",
      phoneNumber:
        document.getElementById(`dependant-${index + 1}-phone-number`)
          ?.value || "",
      emailId:
        document.getElementById(`dependant-${index + 1}-email`)?.value ||
        "",
      relationship:
        document.getElementById(`dependant-${index + 1}-relationship`)
          ?.value || "",
      socialMediaHandle:
        document.getElementById(`dependant-${index + 1}-social-media`)
          ?.value || "",
    };
    dependants.push(dependant);
  });

  localStorage.setItem("dependantsData", JSON.stringify(dependants));
  return dependants;
}

function validateSourceCheckboxes() {
  const checkboxes = document.querySelectorAll(
    ".checkbox-group input[type='checkbox']"
  );
  const errorElement = document.getElementById("source-error");
  const isMemberChecked = document.getElementById("member").checked;
  const isAnyChecked = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );

  if (!isAnyChecked) {
    errorElement.textContent = "Please select at least one option";
    errorElement.style.display = "block";
    return false;
  }

  if (isMemberChecked) {
    const referenceFullName = document
      .getElementById("reference-full-name")
      .value.trim();
    const referencePhoneNumber = document
      .getElementById("reference-phone-number")
      .value.trim();
    const referenceRelationship = document
      .getElementById("reference-relationship")
      .value.trim();

    if (
      !referenceFullName ||
      !referencePhoneNumber ||
      !referenceRelationship
    ) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent =
        "Please fill all required reference details (Full Name, Phone Number, Relationship)";
      const referenceDetails =
        document.querySelector("#reference-details");
      referenceDetails.appendChild(errorDiv);
      return false;
    }
  }

  errorElement.textContent = "";
  errorElement.style.display = "none";
  return true;
}

document
  .querySelectorAll(".form-field input, .form-field select")
  .forEach((input) => {
    input.addEventListener("focus", function () {
      const label = this.nextElementSibling;
      if (label && label.tagName === "LABEL") {
        label.classList.add("active");
      }
    });

    input.addEventListener("blur", function () {
      const label = this.nextElementSibling;
      if (label && label.tagName === "LABEL" && this.value === "") {
        label.classList.remove("active");
      }
      if (this.hasAttribute("required")) {
        validateField(this);
      }
    });
  });

document.querySelectorAll('input[name="family"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const homeNameField = document.getElementById("home-name-field");
    const goaAddressSection = document.getElementById(
      "goa-address-section"
    );

    if (
      this.value === "isprava_homeowner" ||
      this.value === "chapter_homeowner"
    ) {
      homeNameField.style.display = "block";
      goaAddressSection.style.display = "none";
    } else if (
      this.value === "not_yet" ||
      this.value === "lohono_platinum"
    ) {
      homeNameField.style.display = "none";
      goaAddressSection.style.display = "block";
    } else {
      homeNameField.style.display = "none";
      goaAddressSection.style.display = "none";
    }
  });
});

function validateForm() {
  const fields = document.querySelectorAll(
    "#initial-form input[required]"
  );
  let isValid = true;
  const familyType = document.querySelector(
    'input[name="family"]:checked'
  );

  // Validate family type selection
  if (!familyType) {
    isValid = false;
    const radioGroup = document.querySelector(".radio-group");
    if (!radioGroup.querySelector(".error-message")) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = "Please select your family type";
      const radioOptions = document.querySelector(".radio-options");
      radioGroup.appendChild(errorDiv);
    }
  } else {
    const radioGroup = document.querySelector(".radio-group");
    const existingError = radioGroup.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Validate home name if applicable
    if (
      ["isprava_homeowner", "chapter_homeowner"].includes(
        familyType.value
      )
    ) {
      const homeName = document.getElementById("home-name");
      if (!homeName.value.trim()) {
        isValid = false;
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = "Please enter your home name";
        homeName.parentElement.appendChild(errorDiv);
        homeName.classList.add("error");
      }
    }
  }

  // Validate all required fields
  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

const initialForm = document.getElementById("initial-form");
const dependantForm = document.getElementById("dependant-form");
const additionalForm = document.getElementById("additional-form");
const termsSection = document.querySelector(".terms-section");
const nextButton = document.getElementById("next-button");
const skipButton = document.getElementById("skip");
const previousButton = document.querySelector(".btn-previous");
const progressBar = document.querySelector(".progress");
const membershipForm = document.querySelector("#membership-applciation");

dependantForm.style.display = "none";
additionalForm.style.display = "none";

nextButton.addEventListener("click", async function (e) {
  if (nextButton.textContent.trim().toLowerCase() === "next") {
    // Validate membership type
    const isValidForm = validateForm();

    if (!isValidForm) {
      // Find the first error and scroll to it
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
  }

  try {
    if (nextButton.textContent.trim().toLowerCase() === "next") {
      // Disable button and show loading state
      nextButton.disabled = true;
      nextButton.classList.add("loading");
      let originalText = nextButton.textContent;
      nextButton.textContent = "Loading...";
      // Save form data to localStorage
      saveFormData();

      // Check if applicationSlug exists
      const applicationSlug = localStorage.getItem("applicationSlug");
      if (applicationSlug) {
        // Show next form
        const formData = JSON.parse(
          localStorage.getItem("membershipFormData")
        );
        const membershipType = formData?.familyType || "";
        showToast("Application exists. Moving to the next step");
        if (
          membershipType === "lohono_platinum" ||
          membershipType === "not_yet"
        ) {
          initialForm.classList.add("slide-out");
          additionalForm.style.display = "block";
          additionalForm.classList.add("slide-in");
          membershipForm.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          initialForm.classList.add("slide-out");
          dependantForm.style.display = "block";
          dependantForm.classList.add("slide-in");
          membershipForm.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          // skipButton.style.display = "block";
        }

        progressBar.style.width = "66.67%";
        nextButton.textContent = "Submit";
        termsSection.style.display = "block";
        originalText = "Submit";
        return;
      }

      // Make the API call
      const formData = JSON.parse(
        localStorage.getItem("membershipFormData")
      );
      const utmParams = JSON.parse(localStorage.getItem("utm_params"));
      const apiPayload = {
        application: {
          membership_type: formData.familyType,
          home_name: formData.homeName,
          name: formData.basicDetails.fullName,
          date_of_birth: convertDateFormat(
            formData.basicDetails.dateOfBirth
          ),
          email: formData.basicDetails.emailId,
          country_code: formData.basicDetails.countryCode || "",
          mobile: formData.basicDetails.phoneNumber,
          utm_source: (utmParams && utmParams.utm_source) || "",
          utm_medium: (utmParams && utmParams.utm_medium) || "",
          utm_campaign: (utmParams && utmParams.utm_campaign) || "",
          utm_term: (utmParams && utmParams.utm_term) || "",
          utm_content: (utmParams && utmParams.utm_content) || "",
          links: {
            linkedinUrl: formData.basicDetails.linkedinUrl || "",
            social_media_handle: formData.basicDetails.socialMediaHandle,
          },
          addresses_attributes: [
            {
              address_type: "permanent",
              line_1: formData.address.line1,
              line_2: formData.address.line2,
              pincode: formData.address.pincode,
              state: formData.address.state,
            },
            ...(formData.familyType === "lohono_platinum" ||
            formData.familyType === "not_yet"
              ? [
                  {
                    address_type: "goa",
                    line_1: formData.goaAddress.line1,
                    line_2: formData.goaAddress.line2,
                    pincode: formData.goaAddress.pincode,
                    state: formData.goaAddress.state,
                  },
                ]
              : []),
          ],
          partner_attributes: {
            full_name: formData.partnerDetails.fullName,
            date_of_birth: convertDateFormat(
              formData.partnerDetails.dateOfBirth
            ),
            email: formData.partnerDetails.emailId,
            country_code: "+91",
            mobile: formData.partnerDetails.phoneNumber,
            anniversary: convertDateFormat(
              formData.partnerDetails.anniversary
            ),
            social_media_handle:
              formData.partnerDetails.socialMediaHandle,
            linkedin_url: formData.partnerDetails.linkedinUrl, // Add this line
          },
        },
      };

      const response = await fetch(
        "https://api-staging.lohono.com/api/v1/solene/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create application");
      }

      const responseData = await response.json();

      if (responseData.application && responseData.application.slug) {
        localStorage.setItem(
          "applicationSlug",
          responseData.application.slug
        );

        if (
          formData.familyType === "lohono_platinum" ||
          formData.familyType === "not_yet"
        ) {
          initialForm.classList.add("slide-out");
          additionalForm.style.display = "block";
          additionalForm.classList.add("slide-in");
        } else {
          initialForm.classList.add("slide-out");
          dependantForm.style.display = "block";
          dependantForm.classList.add("slide-in");
        }

        progressBar.style.width = "66.67%";
        termsSection.style.display = "block";
        nextButton.textContent = "Submit";
        originalText = "Submit";
      } else {
        throw new Error("Invalid response from server");
      }
    } else if (nextButton.textContent.trim().toLowerCase() === "submit") {
      if (!validateTermsAndConditions()) {
        termsSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      const formData = JSON.parse(
        localStorage.getItem("membershipFormData")
      );
      const applicationSlug = localStorage.getItem("applicationSlug");
      nextButton.disabled = true;
      nextButton.classList.add("loading");
      if (!applicationSlug) {
        showToast("Application not found. Please try again.", error);
        return;
      }
      if (
        formData.familyType === "isprava_homeowner" ||
        formData.familyType === "chapter_homeowner"
      ) {
        // Validate dependents if any field is filled
        if (!validateDependents()) {
          const firstError = document.querySelector(".error-message");
          if (firstError) {
            firstError.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          return;
        }
      }
      if (
        formData.familyType === "lohono_platinum" ||
        formData.familyType === "not_yet"
      ) {
        // if (!validateSourceCheckboxes()) {
        //   document.querySelector(".checkbox-group")?.scrollIntoView({
        //     behavior: "smooth",
        //     block: "center",
        //   });
        //   return;
        // }
        if (!hasAdditionalInfoData()) {
          // Skip API call and proceed to success page
          showToast("Form submitted successfully!");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "success.html";
          }, 500);
          return;
        }
        const referenceFullName = document
          .getElementById("reference-full-name")
          .value.trim();
        const referencePhoneNumber = document
          .getElementById("reference-phone-number")
          .value.trim();
        const referenceRelationship = document
          .getElementById("reference-relationship")
          .value.trim();
        const additionalFormData = {
          sources_data: {
            hear_via_member: document.getElementById("member").checked,
            referrer: {
              name: referenceFullName,
              phone: referencePhoneNumber,
              relationship: referenceRelationship,
            },
          },
          additional_data: {
            reason_to_join: document.getElementById("why").value,
            usage_plan: document.getElementById("how").value,
          },
        };

        const response = await fetch(
          `https://api-staging.lohono.com/api/v1/solene/applications/${applicationSlug}/additional_information`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(additionalFormData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save additional information");
        }
      } else {
        if (!hasDependantData()) {
          // Skip API call and proceed to success page
          showToast("Form submitted successfully!");
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "success.html";
          }, 500);
          return;
        }
        const dependantSections = document.querySelectorAll(
          "#dependants-container .form-section"
        );
        const dependants = Array.from(dependantSections).map(
          (section, index) => ({
            full_name:
              document.getElementById(`dependant-${index + 1}-full-name`)
                ?.value || "",
            date_of_birth: convertDateFormat(
              document.getElementById(
                `dependant-${index + 1}-date-of-birth`
              )?.value || ""
            ),
            email:
              document.getElementById(`dependant-${index + 1}-email`)
                ?.value || "",
            country_code: "+91",
            mobile:
              document.getElementById(
                `dependant-${index + 1}-phone-number`
              )?.value || "",
            relationship:
              document.getElementById(
                `dependant-${index + 1}-relationship`
              )?.value || "",
            social_media_handle:
              document.getElementById(
                `dependant-${index + 1}-social-media`
              )?.value || "",
          })
        );

        const response = await fetch(
          `https://api-staging.lohono.com/api/v1/solene/applications/${applicationSlug}/dependants/add_multiple`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dependants }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save dependants");
        }
      }

      showToast("Form submitted successfully!");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "success.html";
      }, 500);
    }
  } catch (error) {
    console.error("Error:", error);
    showToast(
      error.message || "An error occurred. Please try again.",
      "error"
    );
  } finally {
    nextButton.disabled = false;
    nextButton.classList.remove("loading");
    nextButton.textContent = "Submit";
  }
});

previousButton.addEventListener("click", async function () {
  const familyType = await localStorage.getItem("familyType");
  initialForm.classList.remove("slide-out");
  dependantForm.classList.remove("slide-in");
  additionalForm.classList.remove("slide-in");
  termsSection.style.display = "none";
  progressBar.style.width = "33.33%";
  nextButton.textContent = "Next";
  skipButton.style.display = "none";
  originalText = "Next";
});

document
  .getElementById("add-dependant-btn")
  ?.addEventListener("click", function () {
    const dependantCount = document.querySelectorAll(
      "#dependants-container .form-section"
    ).length;

    const newDependantSection = document.createElement("div");
    newDependantSection.className = "form-section";
    newDependantSection.innerHTML = `
  <div class="dependant-header">
    <h3>Dependant ${dependantCount + 1}</h3>
    ${
      dependantCount > 0
        ? '<button class="remove-dependant">Remove</button>'
        : ""
    }
  </div>
  <div class="form-grid">
    <div class="form-field">
      <input type="text" id="dependant-${
        dependantCount + 1
      }-full-name" placeholder=" " required />
      <label for="dependant-${
        dependantCount + 1
      }-full-name">Full Name</label>
    </div>
    <div class="form-field">
      <input type="text" id="dependant-${
        dependantCount + 1
      }-date-of-birth" placeholder="DD/MM/YYYY" required />
      <label for="dependant-${
        dependantCount + 1
      }-date-of-birth" style="padding-right: 6px">Date of Birth</label>
    </div>
    <div class="form-field phone-field">
      <div class="country-code" id="dependant-${
        dependantCount + 1
      }-country-code">
        <span>+91 India</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div class="country-dropdown">
        <div class="country-option selected" data-code="+91" data-country="India">
          <span class="country-name">India</span>
          <span class="country-dial-code">+91</span>
        </div>
        <div class="country-option" data-code="+1" data-country="United States">
          <span class="country-name">United States</span>
          <span class="country-dial-code">+1</span>
        </div>
        <div class="country-option" data-code="+1" data-country="Canada">
          <span class="country-name">Canada</span>
          <span class="country-dial-code">+1</span>
        </div>
        <div class="country-option" data-code="+44" data-country="United Kingdom">
          <span class="country-name">United Kingdom</span>
          <span class="country-dial-code">+44</span>
        </div>
        <div class="country-option" data-code="+65" data-country="Singapore">
          <span class="country-name">Singapore</span>
          <span class="country-dial-code">+65</span>
        </div>
        <div class="country-option" data-code="+971" data-country="United arab emirates">
          <span class="country-name">United arab emirates</span>
          <span class="country-dial-code">+971</span>
        </div>
      </div>
      <div class="divider"></div>
      <input type="tel" id="dependant-${
        dependantCount + 1
      }-phone-number" placeholder=" " required />
      <label for="dependant-${
        dependantCount + 1
      }-phone-number">Phone Number</label>
    </div>
    <div class="form-field">
      <input type="email" id="dependant-${
        dependantCount + 1
      }-email" placeholder=" " required />
      <label for="dependant-${dependantCount + 1}-email">Email ID*</label>
    </div>
    <div class="form-field">
      <select id="dependant-${dependantCount + 1}-relationship" required>
        <option value="" disabled selected></option>
        <option value="mother">Mother</option>
        <option value="father">Father</option>
        <option value="son">Son</option>
        <option value="daughter">Daughter</option>
      </select>
      <label for="dependant-${
        dependantCount + 1
      }-relationship">Relationship*</label>
    </div>
    <div class="form-field">
      <input type="text" id="dependant-${
        dependantCount + 1
      }-social-media" placeholder=" " />
      <label for="dependant-${
        dependantCount + 1
      }-social-media">Social Media Handle</label>
    </div>
  </div>
`;

    const container = document.getElementById("dependants-container");
    const addDependantButton = container.querySelector(".add-dependant");
    container.insertBefore(newDependantSection, addDependantButton);
    container.insertBefore(
      document.createElement("div"),
      addDependantButton
    ).className = "separator";

    newDependantSection
      .querySelectorAll(".form-field input, .form-field select")
      .forEach((input) => {
        input.addEventListener("focus", function () {
          const label = this.nextElementSibling;
          if (label && label.tagName === "LABEL") {
            label.classList.add("active");
          }
        });

        input.addEventListener("blur", function () {
          const label = this.nextElementSibling;
          if (label && label.tagName === "LABEL" && this.value === "") {
            label.classList.remove("active");
          }
          if (this.hasAttribute("required")) {
            validateField(this);
          }
        });
      });

    initializeNewDependantDropdowns(newDependantSection);

    // Hide remove buttons on all sections except the last one
    const dependantSections = document.querySelectorAll(
      "#dependants-container .form-section"
    );
    dependantSections.forEach((section, index) => {
      const removeBtn = section.querySelector(".remove-dependant");
      if (removeBtn) {
        removeBtn.style.display =
          index === dependantSections.length - 1 ? "block" : "none";
      }
    });
  });

document
  .getElementById("dependants-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-dependant")) {
      const section = e.target.closest(".form-section");
      const separator = section.nextElementSibling;

      // Remove the section and its separator
      section.remove();
      if (separator && separator.classList.contains("separator")) {
        separator.remove();
      }

      // Update the numbering of remaining dependants
      const dependantSections = document.querySelectorAll(
        "#dependants-container .form-section"
      );
      dependantSections.forEach((section, index) => {
        const header = section.querySelector("h3");
        header.textContent = `Dependant ${index + 1}`;

        // Show remove button only for the last dependant
        const removeBtn = section.querySelector(".remove-dependant");
        if (removeBtn) {
          removeBtn.style.display =
            index === dependantSections.length - 1 && index > 0
              ? "block"
              : "none";
        }
      });

      // Save updated dependants data
      saveDependantsData();
    }
  });

document.getElementById("other")?.addEventListener("change", function () {
  const otherInput = document.querySelector(".other-input input");
  otherInput.disabled = !this.checked;
});

const savedFormData = localStorage.getItem("membershipFormData");
if (savedFormData) {
  const formData = JSON.parse(savedFormData);

  if (formData.familyType) {
    const radioButton = document.querySelector(
      `input[name="family"][value="${formData.familyType}"]`
    );
    if (radioButton) {
      radioButton.checked = true;
      if (
        ["isprava_homeowner", "chapter_homeowner"].includes(
          formData.familyType
        )
      ) {
        document.getElementById("home-name-field").style.display =
          "block";
      } else if (
        formData.familyType === "not_yet" ||
        formData.familyType === "lohono_platinum"
      ) {
        document.getElementById("goa-address-section").style.display =
          "block";
      }
    }
  }

  if (formData.homeName) {
    document.getElementById("home-name").value = formData.homeName;
  }

  const basicDetails = formData.basicDetails;
  if (basicDetails) {
    document.getElementById("full-name").value = basicDetails.fullName;
    document.getElementById("date-of-birth").value =
      basicDetails.dateOfBirth;
    document.getElementById("phone-number").value =
      basicDetails.phoneNumber;
    document.getElementById("email-id").value = basicDetails.emailId;
    document.getElementById("linkedin-url").value =
      basicDetails.linkedinUrl || "";
    document.getElementById("social-media-handle").value =
      basicDetails.socialMediaHandle;
  }

  const address = formData.address;
  if (address) {
    document.getElementById("address-line-1").value = address.line1;
    document.getElementById("address-line-2").value = address.line2;
    document.getElementById("pincode").value = address.pincode;
    document.getElementById("state").value = address.state;
  }

  const goaAddress = formData.goaAddress;
  if (goaAddress) {
    document.getElementById("goa-address-line-1").value =
      goaAddress.line1;
    document.getElementById("goa-address-line-2").value =
      goaAddress.line2;
    document.getElementById("goa-pincode").value = goaAddress.pincode;
  }

  const partnerDetails = formData.partnerDetails;
  if (partnerDetails) {
    document.getElementById("partner-full-name").value =
      partnerDetails.fullName;
    document.getElementById("partner-date-of-birth").value =
      partnerDetails.dateOfBirth;
    document.getElementById("partner-phone-number").value =
      partnerDetails.phoneNumber;
    document.getElementById("partner-email-id").value =
      partnerDetails.emailId;
    document.getElementById("partner-linkedin-url").value =
      partnerDetails.linkedinUrl || ""; // Add this line
    document.getElementById("partner-anniversary").value =
      partnerDetails.anniversary;
    document.getElementById("partner-social-media-handle").value =
      partnerDetails.socialMediaHandle;
  }

  document
    .querySelectorAll(".form-field input, .form-field select")
    .forEach((input) => {
      if (input.value) {
        const label = input.nextElementSibling;
        if (label && label.tagName === "LABEL") {
          label.classList.add("active");
        }
      }
    });
}

const savedDependantsData = localStorage.getItem("dependantsData");
if (savedDependantsData) {
  const dependants = JSON.parse(savedDependantsData);
  dependants.forEach((dependant, index) => {
    if (index > 0) {
      document.getElementById("add-dependant-btn")?.click();
    }

    document.getElementById(`dependant-${index + 1}-full-name`).value =
      dependant.fullName;
    document.getElementById(
      `dependant-${index + 1}-date-of-birth`
    ).value = dependant.dateOfBirth;
    document.getElementById(`dependant-${index + 1}-phone-number`).value =
      dependant.phoneNumber;
    document.getElementById(`dependant-${index + 1}-email`).value =
      dependant.emailId;
    document.getElementById(`dependant-${index + 1}-relationship`).value =
      dependant.relationship;
    document.getElementById(`dependant-${index + 1}-social-media`).value =
      dependant.socialMediaHandle;

    document
      .querySelectorAll(
        `#dependant-${index + 1}-full-name, #dependant-${
          index + 1
        }-date-of-birth, #dependant-${
          index + 1
        }-phone-number, #dependant-${index + 1}-email, #dependant-${
          index + 1
        }-relationship, #dependant-${index + 1}-social-media`
      )
      .forEach((input) => {
        if (input.value) {
          const label = input.nextElementSibling;
          if (label && label.tagName === "LABEL") {
            label.classList.add("active");
          }
        }
      });
  });
}

// Function to get UTM parameters from the query string
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const utmParams = {};

  // List of UTM parameters to check
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  utmKeys.forEach((key) => {
    if (params.has(key)) {
      utmParams[key] = params.get(key);
    }
  });

  return utmParams;
}

// Save UTM parameters to session storage
function saveUtmToSessionStorage() {
  const utmParams = getQueryParams();
  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem("utm_params", JSON.stringify(utmParams));
  }
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", saveUtmToSessionStorage);

// Update the radio button event listeners
document.querySelectorAll('input[name="family"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const homeNameField = document.getElementById("home-name-field");
    const goaAddressSection = document.getElementById(
      "goa-address-section"
    );
    const linkedinUrlField =
      document.getElementById("linkedin-url-field");
    const partnerLinkedinUrlField = document.getElementById(
      "partner-linkedin-url-field"
    );

    // Reset all conditional fields
    homeNameField.style.display = "none";
    goaAddressSection.style.display = "none";
    linkedinUrlField.style.display = "none";
    partnerLinkedinUrlField.style.display = "none";

    // Show appropriate fields based on selection
    if (
      this.value === "isprava_homeowner" ||
      this.value === "chapter_homeowner"
    ) {
      homeNameField.style.display = "block";
    } else if (
      this.value === "not_yet" ||
      this.value === "lohono_platinum"
    ) {
      goaAddressSection.style.display = "block";
      linkedinUrlField.style.display = "block";
      partnerLinkedinUrlField.style.display = "block";
    }
  });
});