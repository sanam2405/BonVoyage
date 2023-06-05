var menuItems = [];

// Load and populate menuItems from zoo.json
fetch('./assets/js/zoo.json')
  .then(response => response.json())
  .then(data => {

    // console.log(data);
    // Clear existing menuItems
    menuItems.length = 0;

    // Iterate through the data from zoo.json
    data.forEach(item => {
      // Check if the category already exists in menuItems
      var existingCategory = menuItems.find(category => category.label === item.category);

      // If the category doesn't exist, create a new menu item object
      if (!existingCategory) {
        var menuItem = {
          label: item.category,
          subItems: []
        };

        menuItem.subItems.push(item.description.name);

        // Add the menu item to menuItems
        menuItems.push(menuItem);
      }
      // If the category already exists, add the subItem to the existing category
      else {
        existingCategory.subItems.push(item.description.name);
      }

    });

  })
  .catch(error => {
    console.error('Error:', error);
  });

// console.log(menuItems);

// function to render differently 
function shiftMarker() {
  if(window.innerHeight > window.innerWidth)
    return 0.357*window.innerHeight;
  else
    return 0.252*window.innerHeight;
}

//------------------------------------------------

// Function to create the HTML code
function createHTML() {
  var container = document.getElementById("container");

  // Create the <ul> element with class "dropdown"
  var dropdown = document.createElement("ul");
  dropdown.className = "dropdown";

  // Iterate through the menuItems list
  menuItems.forEach(function (menuItem) {
    // Create the <li> element with class "dropdown-item"
    var listItem = document.createElement("li");
    listItem.className = "dropdown-item";
    listItem.textContent = menuItem.label;

    // Check if the submenu has items
    if (menuItem.subItems.length > 0) {
      // Create the nested <ul> element with class "sub-dropdown"
      var subDropdown = document.createElement("ul");
      subDropdown.className = "sub-dropdown";

      // Iterate through the submenu items
      menuItem.subItems.forEach(function (subItem) {
        // Create the nested <li> elements with class "sub-dropdown-item"
        var subListItem = document.createElement("li");
        subListItem.className = "sub-dropdown-item";
        subListItem.textContent = subItem;

        // Add event listener to the sub-item
        subListItem.addEventListener("click", function () {
          showSubItemDetails(subItem); // Call your function and pass the sub-item ID or other relevant data

          const location = locationMap.get(subItem);
          if (location) {
            const { latitude, longitude } = location;
            // Change the center of the map dynamically
            map.panTo({ lat: latitude, lng: longitude }); 
            map.panBy(0,-shiftMarker());
            // Show the marker
            window.addMarker(latitude, longitude, subItem); 
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          } else {
            console.log(`Location not found for name: ${name}`);
          }

        });

        // Append the nested <li> elements to the nested <ul> element
        subDropdown.appendChild(subListItem);
      });

      // Append the nested <ul> element to the parent <li> element
      listItem.appendChild(subDropdown);
    }

    // Append the <li> element to the <ul> element
    dropdown.appendChild(listItem);
  });

  // Append the <ul> element to the container
  container.appendChild(dropdown);
  toggleDropdown();
}

// Function to show sub-item details
function showSubItemDetails(subItem) {
  // Your code to show details based on the sub-item ID or other relevant data
  console.log("Showing details for sub-item:", subItem);
}

// Add click event listener to the createButton
var createButton = document.querySelector('.menu');
createButton.addEventListener("click", createHTML);

function toggleDropdown() {
  var dropdown = document.querySelector(".dropdown");

  if (dropdown != null) {
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
      // dropdown.style.flexDirection = "column";
    } else {
      dropdown.style.display = "none";
    }
  }
}

//hiding the dropdown list after clicking one of the buttons ".avatar" or ".go" button

function hideDropdown() {
  var dropdown = document.querySelector(".dropdown");
  if(dropdown != null){
    dropdown.style.display = "none";
  }
}

let avatarButton = document.querySelector(".avatar")
avatarButton.addEventListener("click",hideDropdown)
let goButton = document.querySelector(".go")
goButton.addEventListener("click",hideDropdown)

window.onload = function () {
  var button = document.querySelector('.menu');
  button.click();
};
