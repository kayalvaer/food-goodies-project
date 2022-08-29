let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

// load API results

const searchForm = document.querySelector(".search-recipe");
const loadResults = document.querySelector(".recipe-container");
const resultsContainer = document.querySelector(".search-container");
let searchQuery = "";
const APP_ID = "2a1e1456";
const APP_key = "3e018b677de2a90c3b66ba5f36cd73b9";
// console.log(container)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  //   console.log(searchQuery);
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  //   console.log(response);
  const data = await response.json();
  loadedHTML(data.hits);
  console.log(data);
}

function loadedHTML(results) {
  //   container.classList.remove("initial");
  let loadedHTML = "";
  results.map((result) => {
    loadedHTML += `
        <div class="recipe-wrap">
            <div class="recipe-img">
                <img src="${result.recipe.image}" alt="recipe img">
            </div>
                <h3>${result.recipe.label}</h3>
                <h2>Calories taken: ${result.recipe.calories.toFixed(2)}</h2>
                <p class="item-data">Diet label: ${
                  result.recipe.dietLabels.length > 0
                    ? result.recipe.dietLabels
                    : "Empty Data Found"
                }
                </p>
                <p class="item-data">Dish Type: ${result.recipe.dishType}</p>
                <i class="bx bx-heart"></i>
                <a class="recipe-btn" href="${
                  result.recipe.url
                }">view recipe</a>
        </div>
    `;
  });
  loadResults.innerHTML = loadedHTML;
}


// Form validation

var nameValidation = document.getElementById('name-fail');
var phoneValidation = document.getElementById('phone-fail');
var emailValidation = document.getElementById('email-fail');
var msgValidation = document.getElementById('msg-fail');
var submitValidation = document.getElementById('submit-fail');

function validatePerson(){
    var name = document.getElementById('person-name').value;

    if(name.length == 0){
        nameValidation.innerHTML = 'Correct name required';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameValidation.innerHTML = 'Fullname required';
        return false;
    }
    nameValidation.innerHTML = 'Correct name input';
    return true;

}

function validatePhone(){
    var phone = document.getElementById('person-phone').value;

    if(phone.length !== 10){
        phoneValidation.innerHTML = 'Correct phone number required';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)){
        phoneValidation.innerHTML = 'Correct telephone required';
        return false;
    }

    phoneValidation.innerHTML = 'Correct phone input';
    return true;

}

function validateEmail(){
    var email = document.getElementById('person-email').value;

    if(email.length == 0){
        emailValidation.innerHTML = 'Enter correct email format'
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailValidation.innerHTML = 'Invalid email entry'
        return false;
    }

    emailValidation.innerHTML = 'Correct email input';
    return true;

}

function validateMsg(){
    var message = document.getElementById('person-msg').value;
    var required = 25;
    var left = required - message.length;

    if(left > 0){
        msgValidation.innerHTML = left + 'Enter required message characters'
        return false;
    }

    msgValidation.innerHTML = 'Correct message input';
    return true;
}