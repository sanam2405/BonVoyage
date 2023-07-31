var currentLocation = sessionStorage.getItem('currentLocationValue');

const dropdownPlaces = document.querySelector('.dropdownPlaces');

// Event listener to store the selected value in session storage

if (dropdownPlaces != null) {
  dropdownPlaces.addEventListener('change', function () {

    currentLocation = dropdownPlaces.value;
    
    if (currentLocation === null) {
      currentLocation = "ju";
    }

    sessionStorage.setItem('currentLocationValue', currentLocation);
  });
}

const letsGoButton = document.querySelector('.letsGoButton');

if (letsGoButton != null) {

  letsGoButton.addEventListener('click', function () {

    if (dropdownPlaces.value != "placeholder") {

      // Load the navigation.html page
      window.location.href = '/navigation';
    }
  });
}

const selectElement = document.getElementById('placesSelect');

if(selectElement != null) {

  // Populate the select element with options from the JSON data
  fetch('../json/location.json')
    .then(response => response.json())
    .then(jsonData => {
      // Populate the select element with options from the JSON data
      //console.log(jsonData);
      jsonData.forEach(option => {
        const { _id, name } = option;
        var newOption = document.createElement("option");
        newOption.value = _id;
        newOption.textContent = name;
        selectElement.appendChild(newOption);
      });
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
  }


const formOpenBtn = document.querySelector('#form_open'),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"), 
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click",()=>home.classList.add("show"));
formCloseBtn.addEventListener("click",()=>home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});