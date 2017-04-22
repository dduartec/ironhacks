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
	rentHouses();
	libraries();
	policeStations();
	fireStations();
	IGS();
	CGS();
	bikeRacks();
	condomD();
	clinics();
	/*searchHouses(marker);*/
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
					index: i
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
				rh[i]={marker: marker, circle: radius};				
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
			for(var i=0;i<2/*row.length*/;i++){
				if(row[i].getElementsByTagName("location")[0]==undefined){
					continue;
				}
				var marker = new google.maps.Marker({ 
					position: new google.maps.LatLng(					
					row[i].getElementsByTagName("location")[0].getAttribute("latitude"),
					row[i].getElementsByTagName("location")[0].getAttribute("longitude")
					),
					icon: 'markers/c.png',	
					map:map	
					
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

var radius
function searchHouses(center,v){
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
		if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),rh[i].marker.getPosition())<=val){
			rh[i].marker.setMap(map);
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
	if($("#libraries").is(":checked")){
		for(var i=0;i<libs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),libs[i].getPosition())<=2000){
				libs[i].setMap(map);
			}
		}
	}
	if($("#fs").is(":checked")){	
		for(var i=0;i<fs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),fs[i].getPosition())<=2000){
				fs[i].setMap(map);
			}
		}
	}
	if($("#ps").is(":checked")){	
		for(var i=0;i<ps.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),ps[i].getPosition())<=2000){
				ps[i].setMap(map);
			}
		}
	}
	if($("#cd").is(":checked")){	
		for(var i=0;i<cd.length;i++){
			if(cd[i]==undefined){
					continue;
				}
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),cd[i].getPosition())<=2000){
				cd[i].setMap(map);
			}
		}
	}
	if($("#br").is(":checked")){	
		for(var i=0;i<br.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),br[i].getPosition())<=2000){
				br[i].setMap(map);
			}
		}
	}
	if($("#clinics").is(":checked")){	
		for(var i=0;i<clinic.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),clinic[i].getPosition())<=2000){
				clinic[i].setMap(map);
			}
		}
	}
	if($("#igs").is(":checked")){	
		for(var i=0;i<igs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),igs[i].getPosition())<=2000){
				igs[i].setMap(map);
			}
		}
	}
	if($("#cgs").is(":checked")){	
		for(var i=0;i<cgs.length;i++){
			if(google.maps.geometry.spherical.computeDistanceBetween (center.getPosition(),cgs[i].getPosition())<=2000){
				cgs[i].setMap(map);
			}
		}
	}
}
	
	$(document).ready(function(){
		superplaceholder({
			el: document.getElementById("in1"),
			sentences: [ "Only numbers"]
		});
		$("#butt1").click(function(){
			var v=$("#in1").val();
			searchHouses(university,v);
			
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
