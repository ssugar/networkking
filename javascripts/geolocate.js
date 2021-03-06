(function() {
	var noGeolocation = function() {
		alert("Unable to determine location");
	};

	if (!navigator.geolocation || !document.querySelector) {
		noGeolocation();
	}
	else {
		navigator.geolocation.getCurrentPosition(
			function(p) {
				document.querySelector("[name='latitude']").value = p.coords.latitude;
				document.querySelector("[name='longitude']").value = p.coords.longitude;
				document.querySelector("[type='submit']").removeAttribute("disabled");
			},
			function(err) {
				noGeolocation();
			}
		);
	}
})();
