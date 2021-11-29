DROP TABLE IF EXISTS "salary";

CREATE TABLE "salary" (
  salary_id integer NULL,
  hourly_salary_amount float NULL,
  PRIMARY KEY (salary_id)
);

INSERT INTO salary (salary_id,hourly_salary_amount)
VALUES
  (0,15),
  (1,15),
  (2,15),
  (3,17),
  (4,17),
  (5,17),
  (6,19);
