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
//reference and thanks to "https://github.com/codyseibert/youtube/blob/master/js-contact-form-validation/index.html" for the code sample 
const form = document.querySelector("form[name='contact-form']");
const successMsg = document.querySelector(".success-msg");
const nameContact = document.querySelector("input[name='name']");
const emailContact = document.querySelector("input[name='email']");
const phoneContact = document.querySelector("input[name='phone']");
const messageContact = document.querySelector("textarea[name='message']");

nameContact.isValid = () => !!nameContact.value;
emailContact.isValid = () => isValidEmail(emailContact.value);
phoneContact.isValid = () => isValidPhone(phoneContact.value);
messageContact.isValid = () => !!messageContact.value;

const inputFields = [nameContact, emailContact, phoneContact, messageContact];

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

let formValidate = false;
let isFormValidation = false;

const validateInputs = () => {
  console.log("checked inputs entered");
  if (!formValidate) return;

  isFormValidation = true;
  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hide");

    if (!input.isValid()) {
      input.classList.add("invalid");
      isFormValidation = false;
      input.nextElementSibling.classList.remove("hide");
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidate = true;
  validateInputs();
  if (isFormValidation) {
    form.remove();
    successMsg.classList.remove("hide")
  }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));

