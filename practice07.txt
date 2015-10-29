-- Ex 1
CREATE DATABASE college;
use college;
CREATE TABLE student(
	student_id integer not null primary key,
	name varchar(10) not null,
	year tinyint default 1 not null,
	dept_no integer not null,
	major varchar(20)
);
CREATE TABLE department(
	dept_no integer not null primary key auto_increment,
	dept_name varchar(20) not null,
	office varchar(20) not null,
	office_tel varchar(13),
	unique key(dept_name)
);
ALTER TABLE student CHANGE COLUMN major major varchar(40);
ALTER TABLE student ADD COLUMN gender varchar(1);
ALTER TABLE department CHANGE COLUMN dept_name dept_name varchar(40);
ALTER TABLE department CHANGE COLUMN office office varchar(30);

-- Ex 2
ALTER TABLE student DROP COLUMN gender;
INSERT INTO student VALUES(20070002, 'James Bond', 3, 4, 'Business Administration');
INSERT INTO student VALUES(20060001, 'Queenie', 4, 4, 'Business Administration');
INSERT INTO student VALUES(20030001, 'Reonardo', 4, 2, 'Electronic Engineering');
INSERT INTO student VALUES(20040003, 'Julia', 3, 2, 'Electronic Engineering');
INSERT INTO student VALUES(20060002, 'Roosevelt', 3, 1, 'Computer Science');
INSERT INTO student VALUES(20100002, 'Fearne', 3, 4, 'Business Administration');
INSERT INTO student VALUES(20110001, 'Chloe', 2, 1, 'Computer Science');
INSERT INTO student VALUES(20080003, 'Amy', 4, 3, 'Law');
INSERT INTO student VALUES(20040002, 'Selina', 4, 5, 'English Literature');
INSERT INTO student VALUES(20070001, 'Ellen', 4, 4, 'Business Administration');
INSERT INTO student VALUES(20100001, 'Kathy', 3, 4, 'Business Administration');
INSERT INTO student VALUES(20110002, 'Lucy', 2, 2, 'Electronic Engineering');
INSERT INTO student VALUES(20030002, 'Michelle', 5, 1, 'Computer Science');
INSERT INTO student VALUES(20070003, 'April', 4, 3, 'Law'); 
INSERT INTO student VALUES(20070005, 'Alicia', 2, 5, 'English Literature');
INSERT INTO student VALUES(20100003, 'Yullia', 3, 1, 'Computer Science'); 
INSERT INTO student VALUES(20070007, 'Ashlee', 2, 4, 'Business Administration');
INSERT INTO department(dept_name, office, office_tel) VALUES('Computer Science', 'Engineering building', '02-3290-0123');
INSERT INTO department(dept_name, office, office_tel) VALUES('Electronic Engineering', 'Engineering building', '02-3290-2345');
INSERT INTO department(dept_name, office, office_tel) VALUES('Law', 'Law building', '02-3290-7896');
INSERT INTO department(dept_name, office, office_tel) VALUES( 'Business Administration', 'Administration building', '02-3290-1112');
INSERT INTO department(dept_name, office, office_tel) VALUES('English Literature', 'Literature building', '02-3290-4412');

-- Ex 3
UPDATE department SET dept_name="Electronic and Electrical Engineering" WHERE dept_name="Electronic engineering";
INSERT INTO department(dept_name, office, office_tel) VALUES('Education','Education','02-3290-2347');
UPDATE student SET dept_no=6 WHERE name='Chloe';
DELETE FROM student WHERE name='Michelle';
DELETE FROM student WHERE name='Fearne';

-- Ex 4
SELECT name FROM student WHERE major='Computer Science';
SELECT student_id,year,major FROM student;
SELECT name FROM student WHERE year=3;
SELECT name FROM student WHERE year=1 OR year=2;
SELECT name FROM student ss JOIN department dd ON ss.dept_no=dd.dept_no WHERE major='Business Administration';

-- Ex 5
SELECT name FROM student WHERE student_id LIKE '%2007%';
SELECT name FROM student ORDER BY student_id;
SELECT name FROM student GROUP BY major HAVING avg(year)>3;
SELECT name FROm student WHERE major='Business Administration' AND student_id LIKE '%2007%' LIMIT 2;

-- Ex 6
use imdb;
SELECT rr.role FROM roles rr JOIN movies mm ON rr.movie_id = mm.id WHERE mm.name = 'Pi';
SELECT aa.first_name, aa.last_name, rr.role FROM actors aa JOIN roles rr ON rr.actor_id = aa.id JOIN movies mm ON rr.movie_id = mm.id WHERE mm.name = 'Pi';
SELECT aa.first_name, aa.last_name FROM actors aa JOIN roles rr1 ON aa.id = rr1.actor_id JOIN roles rr2 ON aa.id = rr2.actor_id JOIN movies mm1 ON rr1.movie_id = mm1.id JOIN movies mm2 ON rr2.movie_id = mm2.id WHERE mm1.name = 'Kill Bill: Vol. 1' AND mm2.name = 'Kill Bill: Vol. 2';
SELECT aa.first_name, aa.last_name, count(aa.id) howmany FROM actors aa JOIN roles rr ON aa.id=rr.actor_id GROUP BY aa.id ORDER BY count(aa.id) DESC LIMIT 7;
SELECT mg.genre genre, count(mg.genre) howmany FROM movies_genres mg GROUP BY mg.genre ORDER BY count(mg.genre) DESC LIMIT 3;
SELECT dd.first_name, dd.last_name, count(dd.id) howmany FROM directors dd JOIN movies_directors md ON dd.id=md.director_id JOIN movies_genres mg ON md.movie_id=mg.movie_id WHERE mg.genre = "Thriller" GROUP BY dd.id ORDER BY count(dd.id) DESC LIMIT 1;

-- Ex 7
use simpsons;
SELECT gg.grade FROM grades gg JOIN courses cc ON gg.course_id = cc.id WHERE cc.name = 'Computer Science 143';
SELECT ss.name, gg.grade FROM students ss JOIN grades gg ON ss.id = gg.student_id JOIN courses cc ON gg.course_id = cc.id WHERE cc.name = 'Computer Science 143' AND gg.grade <= 'B-';
SELECT ss.name, cc.name, gg.grade FROM students ss JOIN grades gg ON ss.id = gg.student_id JOIN courses cc ON gg.course_id = cc.id WHERE gg.grade <= 'B-';
SELECT cc.name, count(*) howmany FROM students ss JOIN grades gg ON ss.id = gg.student_id JOIN courses cc ON gg.course_id = cc.id GROUP BY cc.name HAVING count(*) >= 2;

-- Extra
use imdb;
SELECT name FROM movies WHERE year = 1995;
SELECT count(*) FROM movies mm JOIN roles rr ON mm.id = rr.movie_id WHERE name='Lost in Translation';
SELECT aa.first_name, aa.last_name FROM movies mm JOIN roles rr ON mm.id = rr.movie_id JOIN actors aa ON rr.actor_id = aa.id WHERE name='Lost in Translation';
SELECT dd.first_name, dd.last_name FROM directors dd JOIN movies_directors md ON dd.id=md.director_id JOIN movies mm ON md.movie_id = mm.id WHERE mm.name='Fight Club';
SELECT count(*) FROM directors dd JOIN movies_directors md ON dd.id=md.director_id JOIN movies mm ON md.movie_id = mm.id WHERE dd.first_name='Clint' AND dd.last_name='Eastwood';
SELECT mm.name, dd.first_name, dd.last_name FROM movies mm JOIN movies_directors md ON mm.id = md.movie_id JOIN directors dd ON md.director_id = dd.id WHERE dd.first_name ="Clint" AND dd.last_name ="Eastwood";
SELECT dd.first_name, dd.last_name FROM directors dd JOIN movies_directors md ON dd.id=md.director_id JOIN movies_genres mg ON md.movie_id = mg.movie_id WHERE mg.genre='horror' GROUP BY md.director_id HAVING count(md.director_id)>=1; 
SELECT DISTINCT aa.first_name, aa.last_name FROM directors dd JOIN movies_directors md ON dd.id = md.director_id NATURAL JOIN roles rr JOIN actors aa ON rr.actor_id = aa.id WHERE dd.first_name='Christopher' AND dd.last_name='Nolan';
