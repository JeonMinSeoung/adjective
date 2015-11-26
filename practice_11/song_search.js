document.observe("dom:loaded", function() {
    $("b_xml").observe("click", function(){
    	//construct a Prototype Ajax.request object
    	new Ajax.Request("songs_xml.php",{
			method: "GET",
			parameters: {top: $("top").value},
			onSuccess: showSongs_XML,
			onFailure: ajaxFailed,
	        onException: ajaxFailed
    	});
    });
    $("b_json").observe("click", function(){
        //construct a Prototype Ajax.request object
    	new Ajax.Request("songs_json.php",{
			method: "GET",
			parameters: {top: $("top").value},
			onSuccess: showSongs_JSON,
			onFailure: ajaxFailed,
	        onException: ajaxFailed
    	});
    });
});

function showSongs_XML(ajax) {
	alert(ajax.responseText);
	$("songs").innerHTML = "";
	var songs = ajax.responseXML.getElementsByTagName("song");
	for(var i=0; i<songs.length; i++){
		var newLi = document.createElement("li");
		var title = songs[i].getElementsByTagName("title")[0].firstChild.nodeValue;
		var artist = songs[i].getElementsByTagName("artist")[0].firstChild.nodeValue;
		var genre = songs[i].getElementsByTagName("genre")[0].firstChild.nodeValue;
		var time = songs[i].getElementsByTagName("time")[0].firstChild.nodeValue;
		newLi.innerHTML = title + " - " + artist + " [" + genre + "] (" + time + ")";
		$("songs").appendChild(newLi);
	}
}

function showSongs_JSON(ajax) {
	alert(ajax.responseText);
	$("songs").innerHTML = "";
	var songs = JSON.parse(ajax.responseText);
	for(var i=0; i<songs.songs.length; i++){
		var newLi = document.createElement("li");
		newLi.innerHTML = songs.songs[i].title + " - " + songs.songs[i].artist + " [" + songs.songs[i].genre + "] (" + songs.songs[i].time + ")";
		$("songs").appendChild(newLi);
	}
}

function ajaxFailed(ajax, exception) {
	var errorMessage = "Error making Ajax request:\n\n";
	if (exception) {
		errorMessage += "Exception: " + exception.message;
	} else {
		errorMessage += "Server status:\n" + ajax.status + " " + ajax.statusText + 
		                "\n\nServer response text:\n" + ajax.responseText;
	}
	alert(errorMessage);
}