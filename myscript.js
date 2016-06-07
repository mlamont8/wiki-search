$(document).ready(function () {
	var searchTerm;
    
    // wikipedias API url
	var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch=';

	// for autocomplete
	$(".searchbox").autocomplete({
		source: function (request, response) {
			$.ajax({
				url: "http://en.wikipedia.org/w/api.php",
				dataType: "jsonp",
				data: {
					'action': "opensearch",
					'format': "json",
					'search': request.term
				},
				success: function (data) {
					response(data[1]);
				}
			});
		}
	});
	// when submit button is clicked
	$(".but-submit").on('click', function () {
		//fadeout top
		$(".jumbotron").fadeOut(1000, function () {
			$(this).remove();
		});
		event.preventDefault();
		// run search
		searchTerm = url + $('.searchbox').val();
		console.log(searchTerm);
		getData(searchTerm);

	});



	function getData(searchTerm) {
		$.ajax({
			url: searchTerm,
			dataType: 'jsonp',
			headers: {
				'Api-User-Agent': 'Example/1.0'
			},
			success: function (data) {

				console.log('success', data);
				//clear results
				$('#results').empty();
				// cycle through results
				for (var i = 0; i < data.query.search.length; i++) {

					var ret = "<p><h3>" + data.query.search[i].title + "</h3></p><p>" + data.query.search[i].snippet + "</p>";
					$('#results').append("<div id='entry'><p><a href='https://en.wikipedia.org/wiki/" + data.query.search[i].title + "'" +
						ret + "</a></p></div>");
				}
			},
			// in case of problem with connection to API
			error: function () {
				$('#results').append("Network Error");

			}

		});
	}
});