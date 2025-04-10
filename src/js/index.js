

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
      document.querySelector("#contact")?.scrollIntoView({
        behavior: "smooth",
      });
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
            "ccb7d800735d492f34855c128717dac6c319f62abe1a2db9c5d2b347bf198360",
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

// Run the function on page load
document.addEventListener("DOMContentLoaded", saveUtmToSessionStorage);