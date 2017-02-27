var dataObject={};
var requestX = new XMLHttpRequest();


  function getMyLocation() {
    if(navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(displayLocation);
    }
  }

  function displayLocation(position){
   
    dataObject.location.longitude=position.coords.longitude;
    dataObject.location.latitude=position.coords.latitude;

    var url= "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=d69f846aaa4701a4e92e532e4f760d80";

    requestX.open("GET", url, true);
      requestX.send(null);
  }

  requestX.onreadystatechange = function () {
    if(requestX.readyState===4 && requestX.status===200){
   console.log(requestX.responseText);
   dataObject.weather=JSON.parse(requestX.responseText);
   update();

  }
  }
  getMyLocation();






function update(){
  let{weather:[Obj], name, main:{temp}}=dataObject.weather;
  var cod = Obj.description;
  document.getElementById("description").innerHTML=cod;
  document.getElementById("place").innerHTML=name;

  var result =Math.floor(temp-273);


  
  document.getElementById("temprature").innerHTML=String(result)+"  C";
  switch(cod){
    case "clear sky":
      document.getElementById("view").innerHTML='div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
    break;
    case "few clouds":
        view.innerHTMl='<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';     
    break;
    case "scattered clouds":
        view.innerHTMl='<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;
    case "broken clouds":
        view.innerHTMl='<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;
    case "shower rain":
        view.innerHTMl='<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';
    break;
    case "rain":
        view.innerHTMl='<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
    break;
    case "thunderstorm":
        view.innerHTMl='<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
    break;
    case "snow":
        view.innerHTMl='<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
    break;
    case 'haze':
        view.innerHTMl='<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;  
  }

}
