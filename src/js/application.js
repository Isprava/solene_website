// Add these validation functions at the top of your file
// function validateMembershipType() {
//   const selectedFamily = document.querySelector('input[name="family"]:checked');
//   const errorElement = document.createElement('span');
//   errorElement.className = 'error-message';
  
//   if (!selectedFamily) {
//     const radioGroup = document.querySelector('.radio-group');
//     const existingError = radioGroup.querySelector('.error-message');
    
//     if (!existingError) {
//       errorElement.textContent = 'Please select a membership type';
//       radioGroup.appendChild(errorElement);
//     }
//     return false;
//   }
  
//   const existingError = document.querySelector('.radio-group .error-message');
//   if (existingError) {
//     existingError.remove();
//   }
//   return true;
// }

// function validateHomeNameField() {
//   const selectedFamily = document.querySelector('input[name="family"]:checked')?.value;
//   if (selectedFamily === 'isprava_homeowner' || selectedFamily === 'chapter_homeowner') {
//     const homeName = document.getElementById('home-name');
//     if (!homeName.value.trim()) {
//       const errorElement = document.getElementById('home-name-error') || document.createElement('span');
//       errorElement.id = 'home-name-error';
//       errorElement.className = 'error-message';
//       errorElement.textContent = 'Please enter your home name';
      
//       if (!document.getElementById('home-name-error')) {
//         homeName.parentNode.appendChild(errorElement);
//       }
//       return false;
//     }
//   }
//   return true;
// }
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
    conditionallyRequired: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter a valid name'
  },
  'partner-date-of-birth': {
    conditionallyRequired: true,
    pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    message: 'Please enter a valid date in DD/MM/YYYY format'
  },
  'partner-phone-number': {
    conditionallyRequired: true,
    pattern: /^\d{10}$/,
    message: 'Please enter a valid 10-digit phone number'
  },
  'partner-email-id': {
    conditionallyRequired: true,
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
  let errorMessage = "";

  // Remove any existing error message
  const existingError = field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Get the label element
  const label = field.nextElementSibling;
  if (label && label.tagName === "LABEL") {
    // Always add active class when validating (field has been interacted with)
    label.classList.add("active");
  }

  // Required field validation
  if (rules.required && !field.value.trim()) {
    isValid = false;
    errorMessage = rules.message || "This field is required";
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
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    field.parentElement.appendChild(errorDiv);
    field.classList.add("error");
  } else {
    field.classList.remove("error");
    // Only remove active class if field is empty and valid
    if (label && label.tagName === "LABEL" && !field.value.trim()) {
      label.classList.remove("active");
    }
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


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function saveFormData() {
  const formData = {
    familyType:
      document.querySelector('input[name="family"]:checked')?.value || "",
    homeName: document.getElementById("home-name")?.value || "",
    basicDetails: {
      fullName: document.getElementById("full-name")?.value || "",
      dateOfBirth: document.getElementById("date-of-birth")?.value || "",
      phoneNumber: document.getElementById("phone-number")?.value || "",
      emailId: document.getElementById("email-id")?.value || "",
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
      anniversary: document.getElementById("anniversary")?.value || "",
      socialMediaHandle:
        document.getElementById("partner-social-media-handle")?.value ||
        "",
    },
  };

  localStorage.setItem("membershipFormData", JSON.stringify(formData));
}

function saveDependentsData() {
  const dependents = [];
  const dependentSections = document.querySelectorAll(
    "#dependants-container .form-section"
  );

  dependentSections.forEach((section, index) => {
    const dependent = {
      fullName:
        document.getElementById(`dependent-${index + 1}-full-name`)
          ?.value || "",
      dateOfBirth:
        document.getElementById(`dependent-${index + 1}-date-of-birth`)
          ?.value || "",
      phoneNumber:
        document.getElementById(`dependent-${index + 1}-phone-number`)
          ?.value || "",
      emailId:
        document.getElementById(`dependent-${index + 1}-email`)?.value ||
        "",
      relationship:
        document.getElementById(`dependent-${index + 1}-relationship`)
          ?.value || "",
      socialMediaHandle:
        document.getElementById(`dependent-${index + 1}-social-media`)
          ?.value || "",
    };
    dependents.push(dependent);
  });

  localStorage.setItem("dependentsData", JSON.stringify(dependents));
  return dependents;
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
      errorElement.textContent =
        "Please fill all required reference details (Full Name, Phone Number, Relationship)";
      errorElement.style.display = "block";
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

const initialForm = document.getElementById("initial-form");
const dependantForm = document.getElementById("dependant-form");
const additionalForm = document.getElementById("additional-form");
const termsSection = document.querySelector(".terms-section");
const nextButton = document.getElementById("next-button");
const previousButton = document.querySelector(".btn-previous");
const progressBar = document.querySelector(".progress");

dependantForm.style.display = "none";
additionalForm.style.display = "none";

nextButton.addEventListener("click", async function (e) {
  if (nextButton.textContent.trim().toLowerCase() === "next") {
    // Validate membership type
    const isValidForm = validateForm();

    if (!isValidForm) {
      // Find the first error and scroll to it
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Disable button and show loading state
    nextButton.disabled = true;
    nextButton.classList.add('loading');
    const originalText = nextButton.textContent;
    nextButton.textContent = 'Loading...';

    try {
      if (nextButton.textContent.trim().toLowerCase() === "next") {
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
          } else {
            initialForm.classList.add("slide-out");
            dependantForm.style.display = "block";
            dependantForm.classList.add("slide-in");
          }

          progressBar.style.width = "66.67%";
          nextButton.textContent = "Submit";
          originalText = "Submit";
          return;
        }

        // Make the API call
        const formData = JSON.parse(
          localStorage.getItem("membershipFormData")
        );
        const apiPayload = {
          application: {
            membership_type: formData.familyType,
            home_name: formData.homeName,
            name: formData.basicDetails.fullName,
            date_of_birth: formData.basicDetails.dateOfBirth,
            email: formData.basicDetails.emailId,
            country_code: "+91",
            mobile: formData.basicDetails.phoneNumber,
            links: {
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
              date_of_birth: formData.partnerDetails.dateOfBirth,
              email: formData.partnerDetails.emailId,
              country_code: "+91",
              mobile: formData.partnerDetails.phoneNumber,
              anniversary: formData.partnerDetails.anniversary,
              social_media_handle:
                formData.partnerDetails.socialMediaHandle,
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
          nextButton.textContent = "Submit";
          originalText = "Submit";
        } else {
          throw new Error("Invalid response from server");
        }
      } else if (nextButton.textContent.trim().toLowerCase() === "submit") {
        const formData = JSON.parse(
          localStorage.getItem("membershipFormData")
        );
        const applicationSlug = localStorage.getItem("applicationSlug");
        nextButton.disabled = true;
        nextButton.classList.add("loading");
        if (!applicationSlug) {
          showToast("Application not found. Please try again.");
          return;
        }

        if (
          formData.familyType === "lohono_platinum" ||
          formData.familyType === "not_yet"
        ) {
          if (!validateSourceCheckboxes()) {
            document.querySelector(".checkbox-group")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
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
          const dependentSections = document.querySelectorAll(
            "#dependants-container .form-section"
          );
          const dependents = Array.from(dependentSections).map(
            (section, index) => ({
              full_name:
                document.getElementById(`dependent-${index + 1}-full-name`)
                  ?.value || "",
              date_of_birth:
                document.getElementById(
                  `dependent-${index + 1}-date-of-birth`
                )?.value || "",
              email:
                document.getElementById(`dependent-${index + 1}-email`)
                  ?.value || "",
              country_code: "+91",
              mobile:
                document.getElementById(
                  `dependent-${index + 1}-phone-number`
                )?.value || "",
              relationship:
                document.getElementById(
                  `dependent-${index + 1}-relationship`
                )?.value || "",
              social_media_handle:
                document.getElementById(
                  `dependent-${index + 1}-social-media`
                )?.value || "",
            })
          );

          const response = await fetch(
            `https://api-staging.lohono.com/api/v1/solene/applications/${applicationSlug}/dependents/add_multiple`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ dependents }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to save dependents");
          }
        }

        showToast("Form submitted successfully!");
        setTimeout(() => {
          window.location.href = "success.html";
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "An error occurred. Please try again.");
    } finally {
      nextButton.disabled = false;
      nextButton.classList.remove('loading');
      nextButton.textContent = originalText;
    }
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
    <h3>Dependant ${dependantCount + 1}</h3>
    <div class="form-grid">
      <div class="form-field">
        <input type="text" id="dependent-${
          dependantCount + 1
        }-full-name" placeholder=" " required />
        <label for="dependent-${
          dependantCount + 1
        }-full-name">Full Name*</label>
      </div>
      <div class="form-field">
        <input type="text" id="dependent-${
          dependantCount + 1
        }-date-of-birth" placeholder="DD/MM/YYYY" required />
        <label for="dependent-${
          dependantCount + 1
        }-date-of-birth">Date of Birth*</label>
      </div>
      <div class="form-field phone-field">
        <div class="country-code">
          <span>+91 India</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="divider"></div>
        <input type="tel" id="dependent-${
          dependantCount + 1
        }-phone-number" placeholder=" " required />
        <label for="dependent-${
          dependantCount + 1
        }-phone-number">Phone Number*</label>
      </div>
      <div class="form-field">
        <input type="email" id="dependent-${
          dependantCount + 1
        }-email" placeholder=" " required />
        <label for="dependent-${
          dependantCount + 1
        }-email">Email ID*</label>
      </div>
      <div class="form-field">
        <select id="dependent-${
          dependantCount + 1
        }-relationship" required>
          <option value="" disabled selected></option>
          <option value="child">Child</option>
          <option value="parent">Parent</option>
        </select>
        <label for="dependent-${
          dependantCount + 1
        }-relationship">Relationship*</label>
      </div>
      <div class="form-field">
        <input type="text" id="dependent-${
          dependantCount + 1
        }-social-media" placeholder=" " />
        <label for="dependent-${
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
    document.getElementById("anniversary").value =
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

const savedDependentsData = localStorage.getItem("dependentsData");
if (savedDependentsData) {
  const dependents = JSON.parse(savedDependentsData);
  dependents.forEach((dependent, index) => {
    if (index > 0) {
      document.getElementById("add-dependant-btn")?.click();
    }

    document.getElementById(`dependent-${index + 1}-full-name`).value =
      dependent.fullName;
    document.getElementById(
      `dependent-${index + 1}-date-of-birth`
    ).value = dependent.dateOfBirth;
    document.getElementById(`dependent-${index + 1}-phone-number`).value =
      dependent.phoneNumber;
    document.getElementById(`dependent-${index + 1}-email`).value =
      dependent.emailId;
    document.getElementById(`dependent-${index + 1}-relationship`).value =
      dependent.relationship;
    document.getElementById(`dependent-${index + 1}-social-media`).value =
      dependent.socialMediaHandle;

    document
      .querySelectorAll(
        `#dependent-${index + 1}-full-name, #dependent-${
          index + 1
        }-date-of-birth, #dependent-${
          index + 1
        }-phone-number, #dependent-${index + 1}-email, #dependent-${
          index + 1
        }-relationship, #dependent-${index + 1}-social-media`
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
    sessionStorage.setItem("utm_params", JSON.stringify(utmParams));
  }
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", saveUtmToSessionStorage);

// Check if any partner field is filled
function isAnyPartnerFieldFilled() {
  const partnerFields = [
    'partner-full-name',
    'partner-date-of-birth',
    'partner-phone-number',
    'partner-email-id',
    'anniversary',
    'partner-social-media-handle'
  ];

  return partnerFields.some(fieldId => {
    const field = document.getElementById(fieldId);
    return field && field.value.trim() !== '';
  });
}