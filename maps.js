function init() {
	
	
	
	
	var mapOptions = {
		center : new google.maps.LatLng(0, 0),
		zoom : 5
	};
	
	jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?address=edmontonA&key=AIzaSyAfq1O3VN-WuF_3IuuN4dIPDdYoEDG37uw", "", function(data) {
		mapOptions.center=data.results[0].geometry.location;
		draw(mapOptions);
	});
	
	
}

function parseCSV(data){
	var dataByLine= data.split("\n");
	
	var locArr=new Array();
	
	dataByLine.forEach(function(item, i) {
		var lnArr=item.split(",");
		if(i>1){
			if(!locArr.includes(lnArr[0])){
				locArr.push(lnArr[0]);
			}
			if(!locArr.includes(lnArr[1])){
				locArr.push(lnArr[1]);
			}
		}
		
	});
	
	return locArr;
}

function draw(mapOptions){
	var mapCanvas = document.getElementById("map");
	
	var map = new google.maps.Map(mapCanvas, mapOptions);
	
	var that=this;
	jQuery.post("/returnLocationData.php", "", function(data) {
		var parsed=parseCSV(data);
		
		parsed.forEach(function(item, i) {
			//console.log(item);
			jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + item + " Canada&key=AIzaSyAfq1O3VN-WuF_3IuuN4dIPDdYoEDG37uw", "", function(latlngData) {
				var marker=new google.maps.Marker({
					position: latlngData.results[0].geometry.location
				});
				
				marker.setMap(map);
				
			});
		});
		
	}, "text");
	
	
	
	

	
	
}