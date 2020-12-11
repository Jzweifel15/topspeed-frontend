document.addEventListener("DOMContentLoaded", function() {
  const ROOT_URL = "http://localhost:3000/";
  const CARS_URL = `${ROOT_URL}/cars`;

  let driversSection = document.getElementsByClassName("drivers");
  let driversData = [];

  fetch(ROOT_URL)
  .then(response => response.json())
  .then(drivers => {
    //console.log(drivers);  // For debugging
    drivers.forEach(driver => {
      let card = document.createElement("div");
      card.className = "card";

      let driverNameHeader = document.createElement("h2");
      driverNameHeader.className = "driver-header";
      driverNameHeader.innerText = driver.name;
      //console.log(driverNameHeader);   // for debugging

      card.appendChild(driverNameHeader);
      console.log(card);    // for debugging

      driversData.push(card);
    })
  }); 

  console.log(driversData);

});