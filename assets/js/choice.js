var currentLocation = sessionStorage.getItem('currentLocationValue');

const dropdownPlaces = document.querySelector('.dropdownPlaces');

// Event listener to store the selected value in session storage

if(dropdownPlaces != null) {

  dropdownPlaces.addEventListener('change', function() {
    
    currentLocation = dropdownPlaces.value;
    console.log(currentLocation);

    if(currentLocation === null) {
      currentLocation = "ju";
    }

    sessionStorage.setItem('currentLocationValue', currentLocation);
  });
}

const letsGoButton = document.querySelector('.letsGoButton');

if(letsGoButton != null) {

  letsGoButton.addEventListener('click', function() {

    // Load the navigation.html page
    window.location.href = 'navigation.html';
  });
}
