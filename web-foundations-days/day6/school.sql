
-- Create the students table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Create the courses table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL,
    course_description TEXT
);

-- Create the enrolments table
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,

    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),

    UNIQUE (student_id, course_id)
);

-- Insert sample students
INSERT INTO students (student_id, student_name, email) VALUES
(1, 'Alice Kamau', 'alice@example.com'),
(2, 'Brian Otieno', 'brian@example.com'),
(3, 'Carol Wanjiku', 'carol@example.com'),
(4, 'David Mwangi', 'david@example.com');

-- Insert sample courses
INSERT INTO courses (course_id, course_name, course_description) VALUES
(1, 'Database Systems', 'Introduction to databases and SQL'),
(2, 'Web Development', 'Building websites and web applications'),
(3, 'Computer Networks', 'Fundamentals of computer networking');


-- Insert sample enrolments
INSERT INTO enrolments
    (enrolment_id, student_id, course_id, grade)
VALUES
    (1, 1, 1, 'A'),
    (2, 1, 2, 'B'),
    (3, 2, 1, 'B'),
    (4, 2, 3, 'A'),
    (5, 3, 2, 'A'),
    (6, 3, 3, 'B');


-- Query 1: Find all courses taken by Alice Kamau
SELECT s.student_name, c.course_name, e.grade
FROM students AS s
JOIN enrolments AS e ON s.student_id = e.student_id
JOIN courses AS c ON e.course_id = c.course_id
WHERE s.student_name = 'Alice Kamau';


-- Query 2: Find all students taking Web Development
SELECT s.student_name, c.course_name, e.grade
FROM students AS s
JOIN enrolments AS e ON s.student_id = e.student_id
JOIN courses AS c ON e.course_id = c.course_id
WHERE c.course_name = 'Web Development';


-- Query 3: Count students enrolled in each course
SELECT
    c.course_name,
    COUNT(e.student_id) AS number_of_students
FROM courses AS c
LEFT JOIN enrolments AS e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
ORDER BY c.course_name;

-- Query 4: Find students who have no enrolments
SELECT s.student_id, s.student_name, s.email
FROM students AS s
LEFT JOIN enrolments AS e
    ON s.student_id = e.student_id
WHERE e.student_id IS NULL;


-- Query 5: Update Alice's Database Systems grade
UPDATE enrolments
SET grade = 'A+'
WHERE student_id = 1 AND course_id = 1;

-- Verify the updated grade
SELECT s.student_name, c.course_name, e.grade
FROM enrolments AS e
JOIN students AS s ON e.student_id = s.student_id
JOIN courses AS c ON e.course_id = c.course_id
WHERE e.student_id = 1 AND e.course_id = 1;
