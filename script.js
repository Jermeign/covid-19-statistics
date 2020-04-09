const content = document.getElementById("page-content");
let provinces = [];

// Get API Data

fetch("https://covid-19-statistics.p.rapidapi.com/reports?iso=USA", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
    "x-rapidapi-key": "b03d7d572amshc95be450b16561cp1af1ccjsn4db1b677c5d4",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((element) => {
      addProvinceToDOM(element);
    });
  })
  .catch((err) => {
    console.log(err);
  });



// Format Numbers w/ Comma(s)

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toPercent(x) {
  return String((x * 100).toFixed(2) + "%");
}

// Create Province Objects with API Data

function createProvince(element) {
  const newProvince = {
    province: element["region"].province,
    confirmed_cases: element["confirmed"],
    related_deaths: element["deaths"],
    recovered: element["recovered"],
    confirmed_diff: element["confirmed_diff"],
    deaths_diff: element["deaths_diff"],
    recovered_diff: element["recovered_diff"],
    mortality_rate: element["fatality_rate"],
  };

  provinces.push(newProvince);
}

function addProvinceToDOM(data) {
  // Create Province Summary Container

  var summary = document.createElement("div");
  summary.classList.add("province-summary");

  // Summary Header Element

  var header = document.createElement("h2");
  header.innerHTML = data["region"].province;

  // Summary Stats Container

  var summary_stats = document.createElement("div");
  summary_stats.classList.add("summary-stats");

  // Confirmed Cases Element

  var confirmed = document.createElement("p");
  confirmed.classList.add("stats");
  confirmed.innerHTML = `Confirmed Cases:<span>${formatNumber(
    data["confirmed"]
  )}</span>`;
  summary_stats.appendChild(confirmed);

  // Deaths Element

  var deaths = document.createElement("p");
  deaths.classList.add("stats");
  deaths.innerHTML = `Reported Deaths:<span>${formatNumber(
    data["deaths"]
  )}</span>`;
  summary_stats.appendChild(deaths);

  // Recovered Element

  var recovered = document.createElement("p");
  recovered.classList.add("stats");
  recovered.innerHTML = `Recovered:<span>${formatNumber(
    data["recovered"]
  )}</span>`;
  summary_stats.appendChild(recovered);

  // Confirmed Change Element

  var conf_chng = document.createElement("p");
  conf_chng.classList.add("stats");
  conf_chng.innerHTML = `Confirmed (Changed):<span>${formatNumber(
    data["confirmed_diff"]
  )}</span>`;
  summary_stats.appendChild(conf_chng);

  // Deaths Change Element

  var deaths_chng = document.createElement("p");
  deaths_chng.classList.add("stats");
  deaths_chng.innerHTML = `Deaths (Changed):<span>${formatNumber(
    data["deaths_diff"]
  )}</span>`;
  summary_stats.appendChild(deaths_chng);

  // Deaths Change Element

  var mortality = document.createElement("p");
  mortality.classList.add("stats");
  mortality.innerHTML = `Mortality Rate:<span>${toPercent(
    data["fatality_rate"]
  )}</span>`;
  summary_stats.appendChild(mortality);

  summary.appendChild(header);
  summary.appendChild(summary_stats);
  content.appendChild(summary);
}
