

function showPopup() {
  document.querySelector(".backdrop").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closePopup() {
  document.querySelector(".backdrop").style.display = "none";
  document.body.style.overflow = "";
  try {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Error in logo click handler:", error);
  }
}

document.querySelector(".close-btn")?.addEventListener("click", closePopup);

try {
  // Logo click handler
  document.querySelector(".logo")?.addEventListener("click", function () {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error in logo click handler:", error);
    }
  });

  // Contact button click handler
  document.querySelector(".contact-btn")?.addEventListener("click", function () {
    try {
      document.querySelector("#contact")?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error in contact button click handler:", error);
    }
  });

   // Contact button click handler for responsive design
   document.querySelector(".mobile-cta")?.addEventListener("click", function () {
    try {
      // document.querySelector("#contact")?.scrollIntoView({
      //   behavior: "smooth",
      // });
      window.location.href = '08326620696'
    } catch (error) {
      console.error("Error in contact button click handler:", error);
    }
  });


  // Scroll handler for header opacity
  window.addEventListener("scroll", function () {
    try {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header?.classList.add("opaque");
      } else {
        header?.classList.remove("opaque");
      }
    } catch (error) {
      console.error("Error in scroll handler:", error);
    }
  });

  // Country code selector functionality
  const countryCode = document.querySelector(".country-code");
  const countryDropdown = document.querySelector(".country-dropdown");
  const countryOptions = document.querySelectorAll(".country-option");
  const countryCodeText = document.querySelector(".country-code span");
  const phoneInput = document.querySelector('input[name="mobile"]');

  // Only allow numbers in phone input
  phoneInput?.addEventListener("input", function (e) {
    try {
      this.value = this.value.replace(/\D/g, "");
      clearError(this);
    } catch (error) {
      console.error("Error in phone input handler:", error);
    }
  });

  countryCode?.addEventListener("click", () => {
    try {
      countryDropdown?.classList.toggle("active");
      countryCode?.classList.toggle("active");
    } catch (error) {
      console.error("Error in country code click handler:", error);
    }
  });

  countryOptions?.forEach((option) => {
    option.addEventListener("click", () => {
      try {
        const code = option.dataset.code;
        const country = option.dataset.country;
        if (countryCodeText && code && country) {
          countryCodeText.textContent = `${code} ${country}`;
          countryDropdown?.classList.remove("active");
          countryCode?.classList.remove("active");

          // Update selected state
          countryOptions.forEach((opt) =>
            opt.classList.remove("selected")
          );
          option.classList.add("selected");
        }
      } catch (error) {
        console.error("Error in country option click handler:", error);
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    try {
      if (!e.target.closest(".phone-input-wrapper")) {
        countryDropdown?.classList.remove("active");
        countryCode?.classList.remove("active");
      }
    } catch (error) {
      console.error("Error in document click handler:", error);
    }
  });

  // Form validation and submission
  const form = document.querySelector(".contact-form");

  function showError(input, message) {
    const errorElement = input
      .closest(".form-group")
      .querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
    input.classList.add("error");
  }

  function clearError(input) {
    const errorElement = input
      .closest(".form-group")
      .querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    input.classList.remove("error");
  }

  function validatePhoneNumber(number, countryCode) {
    const phoneRegex = {
      "+91": /^[6-9]\d{9}$/, // India: 10 digits, starting with 6-9
      "+1": /^\d{10}$/, // US/Canada: 10 digits
      "+44": /^[1-9]\d{9}$/, // UK: 10 digits, not starting with 0
    };

    const selectedRegex = phoneRegex[countryCode] || /^\d{10}$/;
    return selectedRegex.test(number);
  }

  function validateForm() {
    let isValid = true;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const mobileInput = form.querySelector('input[name="mobile"]');
    const selectedCountryCode = document
      .querySelector(".country-code span")
      .textContent.split(" ")[0];

    // Clear previous errors
    form
      .querySelectorAll(".error-message")
      .forEach((error) => (error.style.display = "none"));
    form
      .querySelectorAll(".error")
      .forEach((input) => input.classList.remove("error"));

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    // Validate phone
    if (!mobileInput.value.trim()) {
      showError(mobileInput, "Phone number is required");
      isValid = false;
    } else if (
      !validatePhoneNumber(mobileInput.value.trim(), selectedCountryCode)
    ) {
      showError(mobileInput, "Please enter a valid phone number");
      isValid = false;
    }

    return isValid;
  }

  form?.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const formData = {
        name: form.querySelector('input[name="name"]').value.trim(),
        email: form.querySelector('input[name="email"]').value.trim(),
        mobile: form.querySelector('input[name="mobile"]').value.trim(),
        country_code: document
          .querySelector(".country-code span")
          .textContent.split(" ")[0],
        interested_in: "solene",
        meta: {},
      };

      const response = await fetch(`https://${API_URL}/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "fcb43e7d7256b623e8f9ef7c2b5ecb83ff2650cc8b636a8dcdaf12cbe3cff4aa",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Clear form
      form.reset();

      // Show success popup
      showPopup();
    } catch (error) {
      console.error("Error in form submission:", error);
      alert(
        "Sorry, there was an error submitting the form. Please try again."
      );
    }
  });

  // Input event listeners for real-time validation
  form?.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      clearError(this);
    });
  });
} catch (error) {
  console.error("Error during script initialization:", error);
}

// Function to get query parameters from the URL
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
const countries = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States and Canada" },
  { code: "+1242", name: "Bahamas" },
  { code: "+1246", name: "Barbados" },
  { code: "+1264", name: "Anguilla" },
  { code: "+1268", name: "Antigua and Barbuda" },
  { code: "+1284", name: "British Virgin Islands" },
  { code: "+1340", name: "U.S. Virgin Islands" },
  { code: "+1345", name: "Cayman Islands" },
  { code: "+1441", name: "Bermuda" },
  { code: "+1473", name: "Grenada" },
  { code: "+1649", name: "Turks and Caicos Islands" },
  { code: "+1664", name: "Montserrat" },
  { code: "+1670", name: "Northern Mariana Islands" },
  { code: "+1671", name: "Guam" },
  { code: "+1684", name: "American Samoa" },
  { code: "+1758", name: "Saint Lucia" },
  { code: "+1767", name: "Dominica" },
  { code: "+1784", name: "Saint Vincent and the Grenadines" },
  { code: "+1787", name: "Puerto Rico" },
  { code: "+1809", name: "Dominican Republic" },
  { code: "+1868", name: "Trinidad and Tobago" },
  { code: "+1869", name: "Saint Kitts and Nevis" },
  { code: "+1876", name: "Jamaica" },
  { code: "+20", name: "Egypt" },
  { code: "+212", name: "Morocco" },
  { code: "+213", name: "Algeria" },
  { code: "+216", name: "Tunisia" },
  { code: "+218", name: "Libya" },
  { code: "+220", name: "Gambia" },
  { code: "+221", name: "Senegal" },
  { code: "+222", name: "Mauritania" },
  { code: "+223", name: "Mali" },
  { code: "+224", name: "Guinea" },
  { code: "+225", name: "Ivory Coast" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+227", name: "Niger" },
  { code: "+228", name: "Togo" },
  { code: "+229", name: "Benin" },
  { code: "+230", name: "Mauritius" },
  { code: "+231", name: "Liberia" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+233", name: "Ghana" },
  { code: "+234", name: "Nigeria" },
  { code: "+235", name: "Chad" },
  { code: "+236", name: "Central African Republic" },
  { code: "+237", name: "Cameroon" },
  { code: "+238", name: "Cape Verde" },
  { code: "+239", name: "Sao Tome and Principe" },
  { code: "+240", name: "Equatorial Guinea" },
  { code: "+241", name: "Gabon" },
  { code: "+242", name: "Republic of the Congo" },
  { code: "+243", name: "Democratic Republic of the Congo" },
  { code: "+244", name: "Angola" },
  { code: "+245", name: "Guinea-Bissau" },
  { code: "+246", name: "British Indian Ocean Territory" },
  { code: "+248", name: "Seychelles" },
  { code: "+249", name: "Sudan" },
  { code: "+250", name: "Rwanda" },
  { code: "+251", name: "Ethiopia" },
  { code: "+252", name: "Somalia" },
  { code: "+253", name: "Djibouti" },
  { code: "+254", name: "Kenya" },
  { code: "+255", name: "Tanzania" },
  { code: "+256", name: "Uganda" },
  { code: "+257", name: "Burundi" },
  { code: "+258", name: "Mozambique" },
  { code: "+260", name: "Zambia" },
  { code: "+261", name: "Madagascar" },
  { code: "+262", name: "Reunion" },
  { code: "+263", name: "Zimbabwe" },
  { code: "+264", name: "Namibia" },
  { code: "+265", name: "Malawi" },
  { code: "+266", name: "Lesotho" },
  { code: "+267", name: "Botswana" },
  { code: "+268", name: "Eswatini" },
  { code: "+269", name: "Comoros" },
  { code: "+27", name: "South Africa" },
  { code: "+290", name: "Saint Helena" },
  { code: "+291", name: "Eritrea" },
  { code: "+297", name: "Aruba" },
  { code: "+298", name: "Faroe Islands" },
  { code: "+299", name: "Greenland" },
  { code: "+30", name: "Greece" },
  { code: "+31", name: "Netherlands" },
  { code: "+32", name: "Belgium" },
  { code: "+33", name: "France" },
  { code: "+34", name: "Spain" },
  { code: "+350", name: "Gibraltar" },
  { code: "+351", name: "Portugal" },
  { code: "+352", name: "Luxembourg" },
  { code: "+353", name: "Ireland" },
  { code: "+354", name: "Iceland" },
  { code: "+355", name: "Albania" },
  { code: "+356", name: "Malta" },
  { code: "+357", name: "Cyprus" },
  { code: "+358", name: "Finland" },
  { code: "+359", name: "Bulgaria" },
  { code: "+36", name: "Hungary" },
  { code: "+370", name: "Lithuania" },
  { code: "+371", name: "Latvia" },
  { code: "+372", name: "Estonia" },
  { code: "+373", name: "Moldova" },
  { code: "+374", name: "Armenia" },
  { code: "+375", name: "Belarus" },
  { code: "+376", name: "Andorra" },
  { code: "+377", name: "Monaco" },
  { code: "+378", name: "San Marino" },
  { code: "+380", name: "Ukraine" },
  { code: "+381", name: "Serbia" },
  { code: "+385", name: "Croatia" },
  { code: "+386", name: "Slovenia" },
  { code: "+387", name: "Bosnia and Herzegovina" },
  { code: "+389", name: "North Macedonia" },
  { code: "+39", name: "Italy" },
  { code: "+40", name: "Romania" },
  { code: "+41", name: "Switzerland" },
  { code: "+420", name: "Czech Republic" },
  { code: "+421", name: "Slovakia" },
  { code: "+423", name: "Liechtenstein" },
  { code: "+43", name: "Austria" },
  { code: "+44", name: "United Kingdom" },
  { code: "+45", name: "Denmark" },
  { code: "+46", name: "Sweden" },
  { code: "+47", name: "Norway" },
  { code: "+48", name: "Poland" },
  { code: "+49", name: "Germany" },
  { code: "+51", name: "Peru" },
  { code: "+52", name: "Mexico" },
  { code: "+53", name: "Cuba" },
  { code: "+54", name: "Argentina" },
  { code: "+55", name: "Brazil" },
  { code: "+56", name: "Chile" },
  { code: "+57", name: "Colombia" },
  { code: "+58", name: "Venezuela" },
  { code: "+60", name: "Malaysia" },
  { code: "+61", name: "Australia" },
  { code: "+62", name: "Indonesia" },
  { code: "+63", name: "Philippines" },
  { code: "+64", name: "New Zealand" },
  { code: "+65", name: "Singapore" },
  { code: "+66", name: "Thailand" },
  { code: "+7", name: "Russia / Kazakhstan" },
  { code: "+81", name: "Japan" },
  { code: "+82", name: "South Korea" },
  { code: "+84", name: "Vietnam" },
  { code: "+86", name: "China" },
  { code: "+90", name: "Turkey" },
  { code: "+91", name: "India" },
  { code: "+92", name: "Pakistan" },
  { code: "+93", name: "Afghanistan" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+95", name: "Myanmar" },
  { code: "+98", name: "Iran" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+972", name: "Israel" },
  { code: "+973", name: "Bahrain" },
  { code: "+974", name: "Qatar" },
  { code: "+975", name: "Bhutan" },
  { code: "+976", name: "Mongolia" },
  { code: "+977", name: "Nepal" },
  { code: "+992", name: "Tajikistan" },
  { code: "+993", name: "Turkmenistan" },
  { code: "+994", name: "Azerbaijan" },
  { code: "+995", name: "Georgia" },
  { code: "+996", name: "Kyrgyzstan" },
  { code: "+998", name: "Uzbekistan" }
];

function populateCountryDropdown() {
    const dropdown = document.querySelector('.country-dropdown');
    dropdown.innerHTML = ''; // Clear existing options

    countries.forEach((country, index) => {
        const option = document.createElement('div');
        option.className = 'country-option' + (index === 0 ? ' selected' : '');
        option.setAttribute('data-code', country.code);
        option.setAttribute('data-country', country.name);
        
        option.innerHTML = `
            <span class="country-name">${country.name}</span>
            <span class="country-dial-code">${country.code}</span>
        `;
        option.onclick = () => {
          try {
            const code = option.dataset.code;
            const country = option.dataset.country;
            countryCodeText = option.getFirstElementChild("span");
            if (countryCodeText && code && country) {
              countryCodeText.textContent = `${code} ${country}`;
              countryDropdown?.classList.remove("active");
              countryCode?.classList.remove("active");
    
              // Update selected state
              countryOptions.forEach((opt) =>
                opt.classList.remove("selected")
              );
              option.classList.add("selected");
            }
          } catch (error) {
            console.error("Error in country option click handler:", error);
          }
        }
        dropdown.appendChild(option);
    });
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", () => {saveUtmToSessionStorage(); populateCountryDropdown()});