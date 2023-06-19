const dropdown = document.querySelector('.dropdown');

// Event listener to store the selected value in session storage
dropdown.addEventListener('change', function() {
  const selectedValue = dropdown.value;
  sessionStorage.setItem('selectedValue', selectedValue);
});


// Retrieve the stored value from session storage
const storedValue = sessionStorage.getItem('selectedValue');

// Set the selected value in the dropdown if it exists in session storage
if (storedValue) {
    dropdown.value = storedValue;
  }