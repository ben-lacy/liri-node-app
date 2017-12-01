// SWITCHES BETWEEN LANDING PAGE AND WEATHER DISPLAY
function switchPages(){
  $("#landing-page").toggleClass('hidden');
  $("#weather-display").toggleClass('hidden');
}

// ICONS FOR FORECAST SKYDATA
var smallicons = {
  Cloudy: "/images/small-icons/CLOUDY.png",
  Partly:"/images/small-icons/PARTLY-CLOUDY.png",
  Rain: "/images/small-icons/RAIN.png",
  Showers: "/images/small-icons/RAIN.png",
  Storm: "/images/small-icons/STORM.png",
  Sunny: "/images/small-icons/SUNNY.png",
  Clear: "/images/small-icons/SUNNY.png",
  Snow: "/images/small-icons/WIND.png"
};

var bigicons = {
  Cloudy: "/images/forecast-icons/cloudy-icon-01.png",
  Partly:"/images/forecast-icons/partlycloudy-icon-01.png",
  Rain: "/images/forecast-icons/rainy-icon-01.png",
  Showers: "/images/forecast-icons/rainy-icon-01.png",
  Storm: "/images/forecast-icons/rainy-icon-01.png",
  Sunny: "/images/forecast-icons/sunny-icon-01.png",
  Clear: "/images/forecast-icons/sunny-icon-01.png",
  Snow: "/images/forecast-icons/rainy-icon-01.png"
};

function sendItUp (event){
  event.preventDefault();
  if ($("#loc-input").val().trim()) {
    var loc = $("#loc-input").val().trim();
    switchPages();
  } else {
    var loc = $("#loc-input-2").val().trim();
  }
  $("#loc-input").val("");
  $("#loc-input-2").val("");
  loc = { location: loc };
  var currentURL = window.location.origin;
  $.post(currentURL + '/api/location', loc, function(data){
    // CURRENT CONDITIONS
    $("#city-state").html(data.current.name);
    $("#tempLg").html(data.current.temp + "&deg;");
    $("#feels-like").html(data.current.feelslike);
    $("#high").html(data.current.high);
    $("#low").html(data.current.low);
    $("#skytext").html(data.current.skytext);
    $("#rain").html(data.current.rain);
    $("#wind").html(data.current.wind);
    $("#date").html(data.current.date);
    $("#time").html(data.current.time);
    // FORECAST DAY 1
    $("#fc1-day").html(data.forecast1.day);
    $("#fc1-date").html(data.forecast1.date);
    $("#fc1-skytext").html(data.forecast1.skytext);
    $("#fc1-high").html(data.forecast1.high);
    $("#fc1-low").html(data.forecast1.low);
    $("#fc1-rain").html(data.forecast1.rain);
    // FORECAST DAY 2
    $("#fc2-day").html(data.forecast2.day);
    $("#fc2-date").html(data.forecast2.date);
    $("#fc2-skytext").html(data.forecast2.skytext);
    $("#fc2-high").html(data.forecast2.high);
    $("#fc2-low").html(data.forecast2.low);
    $("#fc2-rain").html(data.forecast2.rain);
    // FORECAST DAY 3
    $("#fc3-day").html(data.forecast3.day);
    $("#fc3-date").html(data.forecast3.date);
    $("#fc3-skytext").html(data.forecast3.skytext);
    $("#fc3-high").html(data.forecast3.high);
    $("#fc3-low").html(data.forecast3.low);
    $("#fc3-rain").html(data.forecast3.rain);

    // PICK APPROPRIATE ICON FOR THE SKYTEXT
    var currentSky = data.current.skytext;
    if (currentSky.indexOf(" ") !== -1) {
      currentSky = currentSky.split(" ");
      if (currentSky[0] === "Partly") {
        currentSky = currentSky[0];
      } else {
        currentSky = currentSky[1];
      }
    }
    var fc1Sky = data.forecast1.skytext;
    if (fc1Sky.indexOf(" ") !== -1) {
      fc1Sky = fc1Sky.split(" ");
      if (fc1Sky[0] === "Partly") {
        fc1Sky = fc1Sky[0];
      } else {
        fc1Sky = fc1Sky[1];
      }
    }
    var fc2Sky = data.forecast2.skytext;
    if (fc2Sky.indexOf(" ") !== -1) {
      var fc2Sky = fc2Sky.split(" ");
      if (fc2Sky[0] === "Partly") {
        fc2Sky = fc2Sky[0];
      } else {
        fc2Sky = fc2Sky[1];
      }
    }
    var fc3Sky = data.forecast3.skytext;
    if (fc3Sky.indexOf(" ") !== -1) {
      fc3Sky = fc3Sky.split(" ");
      if (fc3Sky[0] === "Partly") {
        fc3Sky = fc3Sky[0];
      } else {
        fc3Sky = fc3Sky[1];
      }
    }
    
    for (var key in smallicons) {
      if (smallicons.hasOwnProperty(key)) {
        if (currentSky === key) {
          $("#current-skytext-img").attr("src", smallicons[key]);
        }
      }
    }
    for (var key in bigicons) {
      if (bigicons.hasOwnProperty(key)) {
        if (fc1Sky === key) {
          $("#fc1-image").attr("src", bigicons[key]);
        }
        if (fc2Sky === key) {
          $("#fc2-image").attr("src", bigicons[key]);          
        }
        if (fc3Sky === key) {
          $("#fc3-image").attr("src", bigicons[key]);          
        }
      }
    }
  });
};
$("#loc-input-btn").click(sendItUp);
$("#nav-submit").click(sendItUp);


// CHOOSES A RANDOM BACKGROUND AND MESSAGE FOR THE LANDING PAGE
var messages = [
  "Shorts or jeans?",
  "Will it be hot today?",
  "Should I bring an umbrella?",
  "Is it going to rain?",
  "Should I pack a jacket?",
  "Is winter really coming?",
  "Will I need a sweater?",
  "Long or short sleeves?"
];
var bgs = [
  "url('/images/background-images/background-HOT.jpg')",
  "url('/images/background-images/background-HOT.jpg')",
  "url('/images/background-images/background-RAINY.jpg')",
  "url('/images/background-images/background-RAINY.jpg')",
  "url('/images/background-images/background-SNOW.jpg')",
  "url('/images/background-images/background-SNOW.jpg')",
  "url('/images/background-images/background-SUNNY.jpg')",
  "url('/images/background-images/background-SUNNY.jpg')",
];

function randomizeMe(){
  var pickOne = Math.floor((Math.random() * 8) + 0);
  $("#landing-page").css("background-image", bgs[pickOne]);
  $("#main-message").text(messages[pickOne]);
  
}
randomizeMe();