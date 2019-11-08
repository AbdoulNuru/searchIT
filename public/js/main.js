const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const sBox = document.getElementById("searchBox");
const mainContainer = document.getElementById("myData");
const model = document.getElementById("myModel");
const span = document.getElementById("close");
const modelContainer = document.getElementById("details");

//Display data on html
const appendData = (data, x) => {
  mainContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (x != "") {
      const bothKeys = data[i].city + " " + data[i].state;
      if (
        data[i].city.indexOf(x) != -1 ||
        data[i].state.indexOf(x) != -1 ||
        bothKeys.indexOf(x) != -1
      ) {
        if (parseInt(data[i].growth_from_2000_to_2013, 10) < 0) {
          let rd =
            "<span style='color:red'>" +
            data[i].growth_from_2000_to_2013 +
            "</span>";
          const cityQueryHighlighted = data[i].city.replace(
            new RegExp(x, "gi"),
            str => `<span style="color:#EEE8AA">${str}</span>`
          );
          const stateQueryHighlighted = data[i].state.replace(
            new RegExp(x, "gi"),
            str => `<span style="color:#EEE8AA">${str}</span>`
          );
          const div = document.createElement("p");
          div.innerHTML =
            "City:   " +
            cityQueryHighlighted +
            ", " +
            " State: " +
            stateQueryHighlighted +
            ", " +
            " Population: " +
            parseInt(data[i].population, 10).toLocaleString() +
            ", " +
            " Growth %: " +
            rd;
          mainContainer.appendChild(div);
        } else {
          let gr =
            "<span style='color:#7FFF00'>" +
            data[i].growth_from_2000_to_2013 +
            "</span>";
          const cityQueryHighlighted = data[i].city.replace(
            new RegExp(x, "gi"),
            str => `<span style="color:#EEE8AA">${str}</span>`
          );
          const stateQueryHighlighted = data[i].state.replace(
            new RegExp(x, "gi"),
            str => `<span style="color:#EEE8AA">${str}</span>`
          );
          const div = document.createElement("p");
          div.innerHTML =
            "City:   " +
            cityQueryHighlighted +
            ", " +
            " State: " +
            stateQueryHighlighted +
            ", " +
            " Population: " +
            parseInt(data[i].population, 10).toLocaleString() +
            ", " +
            " Growth %: " +
            gr;
          mainContainer.appendChild(div);
        }
      }
    }
  }
};
//Listen to user inputs, fetch data, search through and display
sBox.addEventListener("input", function(evt) {
  let x = this.value;
  fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
      return appendData(data, x.trimLeft());
    })

    .catch(function(error) {
      console.log(error);
    });
});

// showing the model when a user click on a result

//Show the model on click
mainContainer.onclick = function() {
  model.style.display = "block";
  modelContainer.innerHTML = mainContainer.innerHTML;
};

//close the model when a user click on x icon
span.onclick = () => {
  model.style.display = "none";
};

//close the model when a user click outside the model
window.onclick = event => {
  if (event.target == model) {
    model.style.display = "none";
  }
};
