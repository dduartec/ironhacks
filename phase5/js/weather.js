
var xmlhttp = new XMLHttpRequest();
var url = "api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
		tmax=json.main.temp_max-273.15;
		tmin=json.main.temp_min-273.15;
        document.getElementById("w").innerHTML = "<p>Today the weather is <b>" + json.weather[0].main+"</b>.</p> " + 
		"Temp Max: <b>" + tmax+" C°</b>" + "  Temp Min: <b>" + tmin+" C°</b>" 
		var icon= "weather/"+json.weather[0].icon +".png";
		var img = new Image();
		var div = document.getElementById('icon');
		img.onload = function() {
			div.appendChild(img);
		};
		img.src = icon;
    }
};
