const cityname = document.getElementById('cityname');
var Btn = document.getElementById("submitBtn");
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const invisible = document.querySelector(".middle_layer");


var getinfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityname.value;

    if(cityVal===""){
        city_name.innerText = 'Please write the city name before search';
        invisible.classList.add("invisible");
    }else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=625eb2f8fe5c0a321ab6549b6b9107e0`;
            const response= await fetch(url);
            //to convert JSON to object
            const data =await response.json();
            //to get the data we need to convert the object into array
            const arrData = [data];

            //to get the temp val
            city_name.innerText= `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            //condition to check sunny or cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML = 
                "<i class ='fas fa-sun' style ='color: #eccc68;'></i>";
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = 
                "<i class ='fas fa-cloud' style ='color: #f1f2f6;'></i>";
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = 
                "<i class ='fas fa-rain' style ='color: #a4b0be;'></i>";
            }else{
                temp_status.innerHTML = 
                "<i class ='fas fa-cloud' style ='color: #f1f2f6;'></i>";
            }

            invisible.classList.remove("invisible");
        }catch{
            city_name.innerText = 'Please eneter the city name properly';
            invisible.classList.add("invisible");
        }
        
    }
    
}


Btn.addEventListener("click", getinfo);

