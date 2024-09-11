const cardNumber = document.getElementById("card-number");
const cardName = document.getElementById("card-name");
const cardMonth = document.getElementById("card-month");
const cardYear = document.getElementById("card-year");
const cvc = document.getElementById("cvc");
const cardCvc = document.getElementById("cardCvc");

const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");

const numberInput = document.getElementById("numberInput");
const numberError = document.getElementById("numberError");

const cvcError = document.getElementById("cvcError");

const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dateError = document.getElementById("dateError");
const submitBtn = document.getElementById("submitBtn");

const myForm = document.getElementById("myForm");

const nameText = nameInput.value;
const cn = numberInput.value;
const mm = monthInput.value;

// Linking the inputs to the card images

const ValidateName = () => {
  const text = nameInput.value.trim();

  if (text === "") {
    nameError.classList.remove("hidden");
    nameError.textContent = "PLease provide the information above";
    return false;
  } else {
    nameError.classList.add("hidden");
    cardName.innerHTML = text;
    return true;
  }
};
// Linking the cardholder input to the card
nameInput.addEventListener("input", ValidateName);

const formatCardNumber = (number) => number.replace(/(\d{4})(?=\d)/g, "$1 ");

const ValidateNumber = () => {
  let value = numberInput.value.replace(/\s+/g, ""); // Remove any spaces first

  // Check for non-digit characters
  if (!/^\d*$/.test(value)) {
    numberError.classList.remove("hidden");
    numberError.classList.add("block");
    numberError.textContent = "Only numbers are allowed.";
    return false;
  }

  // Ensure the length is not more than 16 digits
  if (value.length > 16) {
    value = value.slice(0, 16);
  }

  if (value === "") {
    numberError.classList.remove("hidden");
    numberError.classList.add("block");
    numberError.textContent = "Please provide the information above";
    return false;
  }

  // Format the card number while typing
  numberInput.value = formatCardNumber(value);

  // Clear error if input is valid
  numberError.classList.add("hidden");
  numberError.classList.remove("block");

  // Optionally, update a separate card display element
  cardNumber.innerHTML = formatCardNumber(value);

  return true;
};

// Add an event listener to the input field for real-time validation and formatting
numberInput.addEventListener("input", ValidateNumber);

// month validation

const validateMonth = () => {
  let cmonth = monthInput.value; // Get input value and remove extra spaces

  // Check if the input is empty
  if (cmonth === "") {
    dateError.classList.remove("hidden");
    dateError.classList.add("block");
    dateError.textContent = "Field can't be left Empty.";
    return false;
  }

  // Check if the input is numeric and between 01 and 12
  // const month = parseInt(value, 10);
  if (!/^\d{2}$/.test(cmonth) || cmonth < 1 || cmonth > 12) {
    dateError.classList.remove("hidden");
    dateError.classList.add("block");
    dateError.textContent = "Invalid month. Enter a value between 01 and 12.";
    return false;
  }

  // Hide the error if the month is valid
  dateError.classList.add("hidden");
  dateError.classList.remove("block");

  cardMonth.innerHTML = cmonth;

  return true;
};

// Add an input event listener to validate the month while typing
monthInput.addEventListener("input", validateMonth);

// for the year validation
const validateYear = () => {
  let cyear = yearInput.value; // Get input value and remove extra spaces

  // Check if the input is empty
  if (cyear === "") {
    dateError.classList.remove("hidden");
    dateError.classList.add("block");
    dateError.textContent = "Field can't be left Empty.";
    return false;
  }

  // Check if the input is numeric and between 01 and 12
  // const month = parseInt(value, 10);
  if (!/^\d{2}$/.test(cyear) || cyear < 20 || cyear > 24) {
    dateError.classList.remove("hidden");
    dateError.classList.add("block");
    dateError.textContent = "Invalid year. Enter a year between 20 - 24";
    return false;
  }

  // Hide the error if the month is valid
  dateError.classList.add("hidden");
  dateError.classList.remove("block");

  cardYear.innerHTML = cyear;

  return true;
};
yearInput.addEventListener("input", validateYear);

// for cvc validation
const validateCvc = () => {
  let CVC = cvc.value; // Get input value and remove extra spaces

  // Check if the input is empty
  if (CVC === "") {
    cvcError.classList.remove("hidden");
    cvcError.classList.add("block");
    cvcError.textContent = "Field can't be left Empty.";
    return false;
  }

  // Check if the input is numeric and between 01 and 12
  // const month = parseInt(value, 10);
  if (!/^\d{3}$/.test(CVC) || CVC < 1 || CVC > 1000) {
    cvcError.classList.remove("hidden");
    cvcError.classList.add("block");
    cvcError.textContent = "Please enter a valid CVC";
    return false;
  }

  // Hide the error if the month is valid
  cvcError.classList.add("hidden");
  cvcError.classList.remove("block");

  cardCvc.innerHTML = CVC;

  return true;
};
cvc.addEventListener("input", validateCvc);


const hideAllErrors = () => {
  const errors = document.querySelectorAll(".error-message"); // Select all error message elements
  errors.forEach((error) => {
    error.classList.add("hidden");
    error.classList.remove("d-block");
  });
};

// Function to reset the form and hide success message
const resetForm = () => {
  document.getElementById('successMessage').classList.add('hidden');
  document.getElementById('successMessage').classList.remove('d-block');
  hideAllErrors();
  // Optionally, reset form fields if needed
  document.getElementById('myForm').reset(); // Uncomment if you have a form with id 'myForm'
};
window.addEventListener("DOMContentLoaded", resetForm);

const SubmitBtn = (e) => {
  e.preventDefault();

  const isName = ValidateName();
  const isNumber = ValidateNumber();
  const isMonth = validateMonth();
  const isYear = validateYear();
  const isCvc = validateCvc();

  if (isName && isNumber && isMonth && isYear && isCvc) {
    document.getElementById('notComplete').classList.add("hidden");
    document.getElementById('complete').classList.remove('hidden');
    myForm.reset();

  }
  else{
    document.getElementById('notComplete').classList.remove("hidden");
    document.getElementById('complete').classList.add('hidden');
  }
};
document.getElementById('btn').addEventListener('click', () => {
  window.location.reload();
})
submitBtn.addEventListener("click", SubmitBtn);
