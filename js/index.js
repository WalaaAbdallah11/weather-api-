var searchInput = document.getElementById("searchInput")

let allWheather = [];
async function getWheather(city) {
   try{
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ba79885679154caea0f162114240712&q=${city}&days=3`)
    if (response.ok) {
        let data = await response.json();
        console.log(data)
        displayCurrent(data.location,data.current);
        console.log(displayCurrent(data.location,data.current))
        displayAnother(data.forecast.forecastday);
    }else{
        console.log("response failed")
    }
   }catch(error){
    console.error(error)

   }
}


function displayCurrent(data , response) {
    // if(null != response){
    var cartona ="";
     cartona = `
         <div class="col-md-4">
                    <div class="card text-white  ">
                        <div class="card-header d-flex justify-content-between pb-0 align-items-center">
                         <p>${new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                         <p>${response.last_updated}</p>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title text-start">${data.name}</h5>
                          <h6 class="degree">${response.temp_c}<sup>°</sup>C</h6>
                       
                         <p>${response.condition.text}</p>
                          <div class="icons" >
                            <span>
                                <img src="./images/icon-umberella.png">
                                ${response.humidity}%
                            </span>
                            <span>
                                <img src="./images/icon-wind.png">
                                ${response.wind_kph} km/h
                            </span>
                            <span>
                                <img src="./images/icon-compass.png">
                                ${response.wind_dir}
                            </span>
                          </div>
                        </div>
                        
                      </div>
                </div>
        `
    
    document.getElementById("rowData").innerHTML = cartona;
    // }
}
function displayAnother(data) {
    var cartona = "";
    for (let i = 0; i < data.length; i++) {
        cartona += `
         <div class=" col-sm-12 col-md-4 ">
                    <div class="card text-white text-center">
                    <div class="card-header pb-0">
                        <p>${new Date(data[i].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    </div>
                    <div class="card-body">
                        <img src="https:${data[i].day.condition.icon}">
                        <h6 class="degree1 pt-3">${data[i].day.avgtemp_c}<sup>°</sup>C</h6>
                        <span>${data[i].day.maxtemp_c}<sup>°</sup>C</span>
                        <p class="pt-4">${data[i].day.condition.text}</p>
                    </div>
                </div>
                </div>
        `
    }
    document.getElementById("rowData").innerHTML = cartona;
}


searchInput.addEventListener("input",function(){
    getWheather(searchInput.value)
})
getWheather("cairo")


