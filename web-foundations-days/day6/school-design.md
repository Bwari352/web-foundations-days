
# School Database Design

## 1. Students Table

The students table stores information about students. It contains student_id as the primary key, student_name, and email. The email column is UNIQUE and NOT NULL to prevent duplicate or missing email addresses.

## 2. Courses Table

The courses table stores information about courses offered by the school. It contains course_id as the primary key, course_name, and course_description. The course name is required.

## 3. Enrolments Table

The enrolments table records which students are taking which courses. It contains enrolment_id as the primary key, student_id, course_id and grade. The student_id and course_id columns are foreign keys referencing the students and courses tables. Both foreign keys are NOT NULL because every enrolment must belong to a student and a course. The grade can be NULL until a grade is assigned.

The UNIQUE constraint on (student_id, course_id) prevents the same student from enrolling in the same course more than once.

## 4. Relationships Between Tables

There is a one-to-many relationship between students and enrolments because one student can have several enrolments, but each enrolment belongs to one student.

There is also a one-to-many relationship between courses and enrolments because one course can have several enrolments, but each enrolment refers to one course.

Students and courses have a many-to-many relationship because a student can take several courses, and each course can have several students. The enrolments table acts as a join table that resolves this many-to-many relationship. It also stores additional information, such as the grade earned by each student in each course.

## 5. Recommended Index

I would add an index on enrolments(student_id). This can make searches for a particular student's enrolments faster, especially as the database grows. It can also help queries that join students to enrolments using student_id. The index requires additional storage and may slightly slow down inserts and updates.

## 6. SQL or NoSQL?

I would choose a relational SQL database such as SQLite for this school system. The data has clear relationships between students, courses and enrolments and each enrolment must reference a valid student and course. SQL supports primary keys, foreign keys, unique constraints, and joins, which help maintain data accuracy and retrieve related information. It is also suitable for updating grades and counting enrolments. A NoSQL database could be useful for more flexible or unstructured data, but its flexibility is not necessary for this system's main requirements.
