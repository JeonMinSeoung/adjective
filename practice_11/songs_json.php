<?php
// $SONGS_FILE = "songs.txt";
$SONGS_FILE = "songs_shuffled.txt";

if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "GET") {
	header("HTTP/1.1 400 Invalid Request");
	die("ERROR 400: Invalid request - This service accepts only GET requests.");
}

$top = "";

if (isset($_REQUEST["top"])) {
	$top = preg_replace("/[^0-9]*/", "", $_REQUEST["top"]);
}

if (!file_exists($SONGS_FILE)) {
	header("HTTP/1.1 500 Server Error");
	die("ERROR 500: Server error - Unable to read input file: $SONGS_FILE");
}

header("Content-type: application/json");

print "{\n  \"songs\": [\n";

// write a code to : 
// 1. read the "songs.txt" (or "songs_shuffled.txt" for extra mark!)
// 2. search all the songs that are under the given top rank 
// 3. generate the result in JSON data format 
$lines = file($SONGS_FILE);

for ($i=0; $i<count($lines); $i++) {
	for($j = 0; $j < 10; $j++){
		list($title, $artist, $rank, $genre, $time) = explode("|", trim($lines[$j]));
		if($i == ($rank-1)){
			$tmp = $j;
			break;
		}
	}
	list($title, $artist, $rank, $genre, $time) = explode("|", trim($lines[$tmp]));
	if ($rank <= $top) {
		if($rank < $top) print "     {\"rank\": \"$rank\", \"title\": \"$title\", \"artist\": \"$artist\", \"genre\": \"$genre\", \"time\": \"$time\"},\n";
		else print "     {\"rank\": \"$rank\", \"title\": \"$title\", \"artist\": \"$artist\", \"genre\": \"$genre\", \"time\": \"$time\"}\n";
	}
};

print "  ]\n}\n";

?>
