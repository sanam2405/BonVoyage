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



  

  // Send the login data to the server
  const handleLoginForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email1");
    const password = formData.get("password1");
  
    // Send the login data to the server
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formValue: "form1",
        email,
        password,
      }),
    });
  
    const data = await response.json();
  
    if (data.username) {
      // If login is successful, store the user data in local storage
      localStorage.setItem("userData", JSON.stringify(data));
      // Redirect to the dashboard page with the username
      window.location.href = `/dashboard?username=${data.username}`;
    } else {
      // If login fails, display the error message
      alert(data);
    }
  };

// Function to handle the signup form submission
const handleSignupForm = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmpassword = formData.get("confirmpassword");

  // Send the signup data to the server
  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formValue: "form2",
      email,
      username,
      password,
      confirmpassword,
    }),
  });

  const data = await response.json();

  // Display the response message in the alert-box div
  const alertContainer = document.querySelector('.alert-box');
  const alertMsg = document.querySelector('.alert');
  alertMsg.innerHTML = data;

  alertContainer.style.top = `5%`;
  setTimeout(() => {
      alertContainer.style.top = `-100%`;
  }, 5000);
};

// Add event listeners to the login and signup forms
const loginForm = document.querySelector(".login_form form");
const signupForm = document.querySelector(".signup_form form");

if (loginForm) {
  loginForm.addEventListener("submit", handleLoginForm);
}

if (signupForm) {
  signupForm.addEventListener("submit", handleSignupForm);
}

