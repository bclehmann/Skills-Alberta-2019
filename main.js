function toggleMenu(){
	$("#mobileLinks").slideToggle();
}

$(document).ready(function(){
	if (window.screen.width >= 1024 && window.screen.height >= 768) {//Desktop
		$("body").addClass("bgImage");
	  
	}else{//Mobile
		$("#title, #links").css("display", "none");
		$("#displayLinks").css("display", "initial");
		$("#mobileNav").removeClass("displayNone");
		document.getElementById("displayLinks").addEventListener("click", toggleMenu);
	}
	
	$(".flightSearch").addClass("form-control");
});