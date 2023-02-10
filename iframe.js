function formValidation() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const phone = document.getElementById("contact").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regPhone = /^\d{10}$/;
  const regName = /^[a-zA-Z]{4,10}$/;
  const errors = {};
  if (name == "" || !name.match(regName)) {
    errors["Name"] = "Name should be in between 4 to 10 characters";
  }
  if (date == "") {
    errors["Date"] = "Date is required";
  }
  if (phone == "" || !phone.match(regPhone)) {
    errors["Phone"] = "Phone should be 10 digits long";
  }
  if (country == "") {
    errors["Country"] = "Country is required";
  }
  if (state == "") {
    errors["State"] = "State is required";
  }
  if (email == "" || !email.match(regEmail)) {
    errors["Email"] = "Email should be in proper format";
  }

  if (Object.keys(errors).length === 0) {
    errors["Success"] = "All fields are valid";
  }

  window.parent.postMessage({ Result: errors }, "*");
}

window.onload = function () {
  const fetchCountries = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
    );
    const data = await response.json();
    const select = document.getElementById("country");
    data.map((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.text = country.name;
      select.appendChild(option);
    });

    fillStates(data);
  };
  fetchCountries();
};

const selectCountry = document.getElementById("country");
selectCountry.addEventListener("change", fetchStates);

function fillStates(data) {
  const selectCountry = document.getElementById("country").value;
  const countryState = data.filter((c) => c.name == selectCountry);
  const s = [];
  countryState[0].states.map((state) => {
    s.push(`
    <option value="${state.name}">${state.name}</option>
    `);
  });

  if (s.length == 0) {
    s.push(`
    <option value="">No states found</option>
    `);
    document.getElementById("state").innerHTML = s.join("");
  } else {
    document.getElementById("state").innerHTML = s.join("");
  }
}

function fetchStates() {
  const fetchStatesInner = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
    );
    const data = await response.json();
    fillStates(data);
  };
  fetchStatesInner();
}
