DROP TABLE IF EXISTS users, classes, exams CASCADE;


CREATE TABLE users (
	user_id INT GENERATED ALWAYS AS IDENTITY,
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	PRIMARY KEY(user_id)
);


CREATE TABLE classes (
	class_name VARCHAR (35) NOT NULL, 
	course_number VARCHAR(10) NOT NULL,
	semester VARCHAR(20) NOT NULL,
	class_year NUMERIC(4,0) NOT NULL,
	user_id INT REFERENCES users ON DELETE CASCADE,
	PRIMARY KEY(class_name)
);

CREATE TABLE exams (
	exam_id INT GENERATED ALWAYS AS IDENTITY,
	class_name VARCHAR (35) REFERENCES classes ON DELETE CASCADE,
	time_min NUMERIC NOT NULL,
	score NUMERIC(6,2) NOT NULL,
	experience BOOLEAN NOT NULL,
	stressor BOOLEAN NOT NULL,
	is_outlier BOOLEAN NOT NULL,
	PRIMARY KEY(exam_id)
);


CREATE OR REPLACE FUNCTION fn_replace_on_conflict (
	classname VARCHAR,
	coursenumber VARCHAR,
	semester VARCHAR,
	classyear NUMERIC,
	user_id INT
)
RETURNS INTEGER 
AS
$fn_replace_on_conflict$
DECLARE row_exists INTEGER;
BEGIN
	SELECT 1
	INTO row_exists
	FROM classes
	WHERE class_name = classname;
	
	IF (row_exists > 0) THEN
		DELETE FROM classes WHERE class_name = classname;
		INSERT INTO classes(class_name, course_number, semester, class_year, user_id)
		VALUES (classname, coursenumber, semester, classyear, user_id);
		RETURN 0;
	ELSE
		INSERT INTO classes(class_name, course_number, semester, class_year, user_id)
		VALUES (classname, coursenumber, semester, classyear, user_id);
		RETURN 1;
	END IF;
END;
$fn_replace_on_conflict$
LANGUAGE plpgsql;

INSERT INTO users (email, username) 
	VALUES ('test@test.com', 'TestUser');

