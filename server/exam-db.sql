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
	user_id INT,
	PRIMARY KEY(class_name),
	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
			REFERENCES users(user_id)
			ON DELETE CASCADE
);

CREATE TABLE exams (
	exam_id INT GENERATED ALWAYS AS IDENTITY,
	class_name VARCHAR (35) NOT NULL,
	time_min NUMERIC NOT NULL,
	score NUMERIC(6,2) NOT NULL,
	is_outlier BOOLEAN NOT NULL,
	PRIMARY KEY(exam_id),
	CONSTRAINT fk_class
		FOREIGN KEY (class_name)
			REFERENCES classes(class_name)
			ON DELETE CASCADE
);

INSERT INTO users (email, username) 
	VALUES ('test@test.com', 'TestUser');

