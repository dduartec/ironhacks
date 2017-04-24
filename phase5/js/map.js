var map;
var university;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8708, lng: -87.667577},
    zoom: 12
  });	  
  university = new google.maps.Marker({ 
		position: {lat: 41.8708, lng: -87.667577}, 
		map: map,
		title: 'University of Illinois', 
		icon: 'markers/un.PNG'
	})
	loadCrimes();	
	rentHouses();
	libraries();
	policeStations();
	fireStations();
	IGS();
	CGS();
	bikeRacks();
	condomD();
	clinics();
}

var rh=[];
function rentHouses(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {			
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");
			for(var i=0;i<row.length;i++){
				if(row[i].getElementsByTagName("location")[0]==undefined){
					continue;
				}
				var pos=new google.maps.LatLng(
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					);
				var marker = new google.maps.Marker({ 
					position: pos,
					icon: 'markers/rh.png',					
					title: row[i].getElementsByTagName("property_name")[0].childNodes[0].nodeValue ,
					index: i,
					name:row[i].getElementsByTagName("property_name")[0].childNodes[0].nodeValue,
					address:row[i].getElementsByTagName("address")[0].childNodes[0].nodeValue ,
					number: row[i].getElementsByTagName("phone_number")[0].childNodes[0].nodeValue,
					type:row[i].getElementsByTagName("property_type")[0].childNodes[0].nodeValue
				});
				var radius = new google.maps.Circle({
					  strokeColor: '#FF0000',
					  strokeOpacity: 0.8,
					  strokeWeight: 2,
					  fillColor: '#FF0000',
					  fillOpacity: 0.1,
					  center: pos,
					  radius: 2000
				});
				rh[i]={marker: marker, circle: radius, crimes: 0 };				
				rh[i].marker.addListener('click',function(){
					uncheckCircles();
					map.setZoom(14);
					map.panTo(this.getPosition());
					rh[this.index].circle.setMap(map);
					radiusSearch(this);				
				})
				
			}
			
		}	
	}

}

var libs=[];
function libraries(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/wa2i-tm5d/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/books.png',					
				});
				libs[i]=marker;
			}
		}
	}
}
var ps=[];
function policeStations(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				if(row[i].getElementsByTagName("location")[0]==undefined){
					continue;
				}
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/police.png',					
				});
				ps[i]=marker;
				
			}
		}
	}
}
var fs=[];
function fireStations(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/fire.png',				
					
				});
				fs[i]=marker;
			}
		}
	}
}
var br=[];
function bikeRacks(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/cbyb-69xx/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/bike.png',			
					
				});
				br[i]=marker;
			}
		}
	}
}
var cd=[];
function condomD(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/azpf-uc4s/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				if(row[i].getElementsByTagName("location")[0]==undefined){
					continue;
				}
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/c.png',
					
				});
				cd[i]=marker;
			}
		}
	}
}
var igs=[];
function IGS(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/IGS.png',
					
				});
				igs[i]=marker;
			}
		}
	}
}
var cgs=[];
function CGS(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/CGS.png',				
					
				});
				cgs[i]=marker;
			}
		}
	}
}
var clinic=[];
function clinics(){
	var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();		
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");			
			for(var i=0;i<row.length;i++){
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/clinic.png',		
					
				});
				clinic[i]=marker;
			}
		}
	}
}
var crimes=[];
function loadCrimes(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
		type: "GET",
		data: {
			"$limit" : 10000,
			//don't fetch crimes with no location
			"$where" : "latitude > 0",
			//public token
			"$$app_token" : "bjp8KrRvAPtuf809u1UXnI0Z8"
		}
	}).done(function(data){
		//alert("Retrieved " + data.length + " records from dataset");
		for (var i = 0; i < data.length; i++) {
			var node = data[i];
			var position = new google.maps.LatLng(data[i].latitude,data[i].longitude);
			var marker = new google.maps.Marker({
				position: position,
			});
			crimes[i]=position;
		};
	});
	/*var xmlhttp = new XMLHttpRequest();	
	var url = "https://data.cityofchicago.org/api/views/d62x-nvdr/rows.xml";
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc=xmlhttp.responseXML;
			var row=xmlDoc.getElementsByTagName("row");						
			for(var i=0;i<3000;i++){
				if(row[i].getElementsByTagName("location")[0]==undefined){
					continue;
				}
				var position= new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					);
				crimes[i]=position;
			}
		}
	}*/
}
var heatmap;
function drawCrimeHeatmap(){
	    heatmap = new google.maps.visualization.HeatmapLayer({
	      data: crimes,
	      radius: 80,
	      map:map
	    });
}

var average;
function calculateCrimes(){
	var aux=0;
	for(var i=0;i<rh.length;i++){
		if(rh[i]==undefined){
			continue;
		}
		for(var j=0;j<crimes.length;j++){
			if(crimes[j]==undefined){
				continue;
			}
			if(google.maps.geometry.spherical.computeDistanceBetween (rh[i].marker.getPosition(),crimes[j])<=2000){
				rh[i].crimes+=1;
			}
		}		
		aux+=rh[i].crimes;
	}
	average=aux/rh.length;
}

var radius
var ok=0;
function searchHouses(center,v,c,cb){
	if(ok==0){
		calculateCrimes();
		drawCrimeHeatmap();
		ok++;
	}
	
	if(cb==false){
		heatmap.setMap(null);
	}
	if(cb==true){
		heatmap.setMap(map);
	}
	map.setCenter(center.getPosition());
	clearMap();
	if(radius!=undefined){
		radius.setMap(null);
	}
	var val=parseInt(v);
	for(var i=0;i<rh.length;i++){
		if(rh[i]==undefined){
			continue;
		}
		switch(c){
			case "All":
				if((google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),rh[i].marker.getPosition())<=val)){
					rh[i].marker.setMap(map);
				};
				break;
			case "Safe":
				if((google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),rh[i].marker.getPosition())<=val)&&(rh[i].crimes<=average)){
					rh[i].marker.setMap(map);
				};
				break;
			case "Safer":
				if((google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),rh[i].marker.getPosition())<=val)&&(rh[i].crimes<=average*(3/5))){
					rh[i].marker.setMap(map);
				};
				break;

		}
	}
	radius = new google.maps.Circle({
		strokeColor: '#001AFF',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#001AFF',
		fillOpacity: 0.1,
		center: center.getPosition(),
		radius: val, 
		map: map
	});
	
}

function radiusSearch(center){
	uncheckLibraries();
	uncheckFS();
	uncheckCD();
	uncheckPS();
	uncheckClinics();
	uncheckBR();
	uncheckIGS();
	uncheckCGS();
	$("#lb1").text(center.name);
	$("#lb2").text(center.address);
	$("#lb3").text(center.number);
	$("#lb4").text(center.type);
	var l=0;
	if($("#libraries").is(":checked")){
		for(var i=0;i<libs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),libs[i].getPosition())<=2000){
				libs[i].setMap(map);
				l++;
			}
		}
	}
	var f=0;
	if($("#fs").is(":checked")){	
		for(var i=0;i<fs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),fs[i].getPosition())<=2000){
				fs[i].setMap(map);
				f++;
			}
		}
	}
	var p=0;
	if($("#ps").is(":checked")){	
		for(var i=0;i<ps.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),ps[i].getPosition())<=2000){
				ps[i].setMap(map);
				p++;
			}
		}
	}
	var c=0;
	if($("#cd").is(":checked")){	
		for(var i=0;i<cd.length;i++){
			if(cd[i]==undefined){
					continue;
				}
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),cd[i].getPosition())<=2000){
				cd[i].setMap(map);
				c++;
			}
		}
	}
	var b=0;
	if($("#br").is(":checked")){	
		for(var i=0;i<br.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),br[i].getPosition())<=2000){
				br[i].setMap(map);
				b++;
			}
		}
	}
	var cl=0;
	if($("#clinics").is(":checked")){	
		for(var i=0;i<clinic.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),clinic[i].getPosition())<=2000){
				clinic[i].setMap(map);
				cl++;
			}
		}
	}
	var ig=0;
	if($("#igs").is(":checked")){	
		for(var i=0;i<igs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),igs[i].getPosition())<=2000){
				igs[i].setMap(map);
				ig++;
			}
		}
	}
	var cg=0;
	if($("#cgs").is(":checked")){	
		for(var i=0;i<cgs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),cgs[i].getPosition())<=2000){
				cgs[i].setMap(map);
				cg++;
			}
		}
	}
	var chart = c3.generate({
	    bindto: '#chart',
	    data: {
	      columns: [
            ['libraries', l],
            ['police stations', p],
            ['fire stations', f],
            ['condom distribution centers', c],
            ['clinics', cl],
            ['independent grocery stores', ig],
            ['chain grocery stores', cg]
        ],
        type : 'pie'
	    },
	    pie: {
        label: {
            format: function (value, ratio, id) {
                return d3.format('')(value);
            }
        }
    }
	});
}

	
	$(document).ready(function(){
		superplaceholder({
			el: document.getElementById("in1"),
			sentences: [ "Only numbers"]
		});
		$("#butt1").click(function(){
			var v=$("#in1").val();
			var c=$("#sel1").val();
			var cb= $("#cb").is(":checked");
			searchHouses(university,v,c,cb);
			
		})
		/*$("#libraries").change(function(){
			alert($("#libraries").is(":checked"));
			if(this.checked){
				checkLibraries();
				
			}else{
				uncheckLibraries();
			}
			
		
		});
		
		$("#fs").change(function(){
			if(this.checked){
				checkFS();
				
			}else{
				uncheckFS();
			}		
		})
		$("#ps").change(function(){
			if(this.checked){
				checkPS();
				
			}else{
				uncheckPS();
			}		
		})*/
	});

function clearMap(){
	uncheckRH();
	uncheckFS();
	uncheckLibraries();
	uncheckCircles();
	uncheckCD();
	uncheckPS();
	uncheckClinics();
	uncheckBR();
	uncheckIGS();
	uncheckCGS();
}
function uncheckRH(){
	for(var i=0;i<rh.length;i++){
		if(rh[i]==undefined){
			continue;
		}
		rh[i].marker.setMap(null);
	}

}
function uncheckCircles(){
	for(var i=0;i<rh.length;i++){
		if(rh[i]==undefined){
			continue;
		}
		rh[i].circle.setMap(null);
	}	
}
function uncheckFS(){
	for(var i=0;i<fs.length;i++){
		fs[i].setMap(null);
	}	
}
function uncheckLibraries(){
	for(var i=0;i<libs.length;i++){
		libs[i].setMap(null);
	}	
}
function uncheckPS(){
	for(var i=0;i<ps.length;i++){
		ps[i].setMap(null);
	}	
}
function uncheckCD(){
	for(var i=0;i<cd.length;i++){
		cd[i].setMap(null);
	}	
}
function uncheckBR(){
	for(var i=0;i<br.length;i++){
		br[i].setMap(null);
	}	
}
function uncheckClinics(){
	for(var i=0;i<clinic.length;i++){
		clinic[i].setMap(null);
	}	
}
function uncheckIGS(){
	for(var i=0;i<igs.length;i++){
		igs[i].setMap(null);
	}	
}
function uncheckCGS(){
	for(var i=0;i<ps.length;i++){
		cgs[i].setMap(null);
	}	
}
	
/*function checkLibraries(){
	for(var i=0;i<libs.length;i++){
		libs[i].setMap(map);
	}	
}

function checkFS(){
	for(var i=0;i<fs.length;i++){
		fs[i].setMap(map);
	}	
}

function checkPS(){
	for(var i=0;i<ps.length;i++){
		ps[i].setMap(map);
	}	
}*/
