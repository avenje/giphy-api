
$(document).ready(function() {

	var index = ["Bike Crashes", "Skate Crashes", "Snowboard Crashes", "Car Crashes", "Diving Crashes", "Construction Crashes", "Computer Crashes", "People Crashes", "Boat Crashes", "UFO Crashes"];

	function displayGifs() {

		var query = $(this).data("search");
		// console.log(query);

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=a7d68e7a5655455497020731b11e6af8&limit=10";

		// console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			// console.log(results);
			for (var i = 0; i < results.length; i++) {

				var showDiv = $("<div class='col-md-4'>");

				var defaultAnimatedSrc = results[i].images.fixed_height.url;
				var staticSrc = results[i].images.fixed_height_still.url;
				var showImage = $("<img>");
				var p = $("<p>").text("Rating: " + rating);
				var rating = results[i].rating;

				showImage.attr("src", staticSrc);
				showImage.addClass("queryGiphy");
				showImage.attr("data-state", "still");
				showImage.attr("data-still", staticSrc);
				showImage.attr("data-animate", defaultAnimatedSrc);
				showDiv.append(p);
				showDiv.append(showImage);
				$("#gifArea").prepend(showDiv);
			}
		});
	}

 
  $("#addShow").on("click", function(event) {
  	event.preventDefault();
  	var newShow = $("#searchInput").val().trim();
  	index.push(newShow);
  	// console.log(index);
  	$("#searchInput").val('');
  	displayButtons();
  });


  function displayButtons() {
  	$("#myButtons").empty();
  	for (var i = 0; i < index.length; i++) {
  		var a = $('<button class="btn btn-danger">');
  		a.attr("id", "show");
  		a.attr("data-search", index[i]);
  		a.text(index[i]);
  		$("#myButtons").append(a);
  	}
  }


  displayButtons();

  $(document).on("click", "#show", displayGifs);

  $(document).on("click", ".queryGiphy", playStop);

  function playStop() {
  	var state = $(this).attr("data-state");
  	if (state === "still") {
  		$(this).attr("src", $(this).attr("data-animate"));
  		$(this).attr("data-state", "animate");
  	} else {
  		$(this).attr("src", $(this).attr("data-still"));
  		$(this).attr("data-state", "still");
  	}
  }



});
