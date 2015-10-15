<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?php
        $filename = "courses.tsv";
        $lines = file("courses.tsv");
        $filesize = filesize("courses.tsv");
    ?>
    <p>
        Course list has <?= count($lines) ?> total courses
        and
        size of <?= $filesize ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            $numberOfCourses = 3;
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
//                implement here.
                $temp = $listOfCourses;
                shuffle($temp);
                $resultArray = array_slice($temp,0,$numberOfCourses);
                return $resultArray;
            }
            if(isset($_GET["number_of_courses"])) $numberOfCourses=$_GET["number_of_courses"];
            if(!($numberOfCourses)){
                $numberOfCourses = 3;
            }
            $todaysCourses = getCoursesByNumber($lines,$numberOfCourses);
        ?>
        <ol>
            <?php
                foreach ($todaysCourses as $tc) {
                    $temp = explode("\t",$tc);
                ?>
                <li><?= $temp[0]." - ".$temp[1] ?></li>
                <?php
                }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
            $character = 'C';
            function getCoursesByCharacter($listOfCourses, $character){
                $resultArray = array();
//                implement here.
                foreach ($listOfCourses as $lc) {
                    $temp = explode("\t", $lc);
                    if($temp[0][0]==$startCharacter) array_push($resultArray,$lc);
                }
                return $resultArray;
            }
            if(isset($_GET["character"])) $character=$_GET["character"];
            if(!($character)){
                $character = 'C';
            }
            $searchedCourses = getCoursesByCharacter($lines,$character);
        ?>
        <p>
            Courses that started by <strong><?= $character ?></strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($searchedCourses as $sc) {
                    $temp = explode("\t",$sc);
                ?>
                <li><?= $temp[0]." - ".$temp[1] ?></li>
                <?php
                }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php
        $orderby = 0;
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;
//                implement here.
                if($orderby==0) sort($resultArray);
                elseif($orderby==1) rsort($resultArray);
                return $resultArray;
            }
            if(isset($_GET["orderby"])) $orderby=$_GET["orderby"];
            if(!($orderby)){
                $orderby = 0;
            }
            $orderedCourses = getCoursesByOrder($lines,$orderby);
        ?>
        <p>
            All of courses ordered by <strong>alphabetical order</strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($orderedCourses as $get) {
                    $temp = explode("\t",$get);
                    if (strlen($temp[0])>20){
                        ?><li class="long"><?= $temp[0]." - ".$temp[1] ?></li>
                    <?php }
                    else {
                        ?> <li><?= $temp[0]." - ".$temp[1] ?></li>
                    <?php }   
            } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <?php
            if(isset($_GET["newCourse"]) && isset($_GET["codeOfCourse"])){
                $newCourse = $_GET["newCourse"];
                $codeOfCourse = $_GET["codeOfCourse"];
                $course = "\n" . $newCourse . "\t" . $codeOfCourse;
            }
            if(file_put_contents($filename, $course, FILE_APPEND)){ ?>
                <p>Adding a course is success!</p>
            <?php }
            else{
                ?> <p>Input course or code of the course doesn't exist.</p>
            <?php }
        ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>
