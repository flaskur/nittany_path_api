-- checking info
select enrolls.student_email, courses.course_id, courses.course_name, courses.course_description, courses.late_drop_deadline, professors.email, professors.name, professors.office_address
from enrolls join courses on (enrolls.course_id = courses.course_id)
  join professors on (courses.course_id = professors.teaching)
where enrolls.student_email = '';

  select students.email as email, students.password as password
  from students
  where email = ''
UNION
  select professors.email as email, professors.password as password
  from professors
  where email = '';

