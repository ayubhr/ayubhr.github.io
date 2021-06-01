var pageRain = document.querySelectorAll("#page-rain") 

if (pageRain.length ) {
  var image = pageRain[0];
  image.onload = function () {
    var engine = new RainyDay({
      image: this,
      parentElement: document.getElementsByClassName('section-overlay')[0]
    });
    engine.rain([[1, 2, 4000]]); 
    engine.rain(
      [
        [3, 3, 1], [5, 5, 1], [6, 2, 1]
      ],
      100); 
  };
  image.crossOrigin = 'anonymous';
  image.src = 'img/page-image-rain.jpg';
}



const  openSection = (evt, SectionName) =>  {

  var i, x, tablinks;

  document.getElementById("main").style.display = "none";
  x = document.getElementsByClassName("section");
  for (i = 0; i < x.length; i++) {

      x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {

      tablinks[i].className = tablinks[i].className.replace("border-red", "");

    }

  document.getElementById(SectionName).style.display = "block";

  evt.currentTarget.firstElementChild.className += " border-red";
  
}


const DateFormated = () => {


   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];   
   let date = new Date();

   let day_name = days[date.getDay()];

   let day     = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

   let month_name = monthNames[date.getMonth()];


   let final_date =  `${day_name}, ${day} ${month_name}`

   document.getElementById("dateF").innerHTML = final_date;

}

const clock = () => {


      let date = new Date();
      let hrs = date.getHours();
      let mins = date.getMinutes();
      let secs = date.getSeconds();
      let period = "AM";
    
      if (hrs == 0) hrs = 12;
      if (hrs > 12) {
        hrs = hrs - 12;
        period = "PM";
      }
    
      hrs = hrs < 10 ? `0${hrs}` : hrs;
      mins = mins < 10 ? `0${mins}` : mins;
      secs = secs < 10 ? `0${secs}` : secs;
    
      let time = `${hrs}:${mins}:${secs} ${period}`;
      document.getElementById("clock").innerText = time;
}

function getLocation() {

    if (navigator.geolocation) {

        return navigator.geolocation.getCurrentPosition(setPosition);

    } else { 
        
        alert("unm");
    }
}


function setPosition(position) {
   
       var lat = position.coords.latitude;   
       var lon = position.coords.longitude;

       localStorage.setItem("lat",lat);
       localStorage.setItem("lon",lon);
   
}

const Init = () => {


getLocation();
DateFormated();

let lat  = localStorage.getItem("lat");
let lon  = localStorage.getItem("lon");

  document.getElementById("loaderWeather").style.display = "block";

  
  const apiKey = '3f4e574646125b325b6d9a70b193b9bb';

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

          document.getElementById('country_city').innerText = data.name;
          document.getElementById('country_code').innerText = data.sys.country;
          document.getElementById('weather_degre').innerText = Math.round(data.main.temp)+"°";
          document.getElementById('weather_state').innerText = data.weather[0].description;

          var case_state;
          if(data.weather[0].main === "Clear"){

              case_state = "sun";

          }else if(data.weather[0].main === "Rain"){

              case_state = "rain";

          }else if(data.weather[0].main === "Snow"){


              case_state = "snow";

          }else if(data.weather[0].main === "Thunderstorm"){


              case_state = "hurricane";

          }else if(data.weather[0].main === "Clouds"){


              case_state = "cloud";

          }else if(data.weather[0].main === "Mist"){


              case_state = "wind";

          }


          var xhReq = new XMLHttpRequest();
              xhReq.open("GET", `weather_icons/${case_state}.html`, false);
              xhReq.send(null);
              var serverResponse = xhReq.responseText;
              if (xhReq.status == 200)  {
                  xbody = serverResponse;
                  
              }

          document.getElementById("weath_icon").innerHTML = xbody;
          document.getElementById("loaderWeather").style.display = "none";
          document.getElementById("weath").classList.remove("hidden");
          document.getElementById("weath").classList.add("Fade");



    })
    .catch(() => {
      
      console.log("failed")

    });





}

    

setInterval(function(){

  document.getElementById("MyApp").classList.toggle('pulse');
  clock();


},1000);

