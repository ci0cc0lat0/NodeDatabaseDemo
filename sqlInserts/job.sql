DROP TABLE IF EXISTS "job";

CREATE TABLE "job" (
  job_id integer PRIMARY KEY NULL,
  job_title TEXT NULL,
  dep_id integer NULL,
  benefit_code integer NULL,
  salary_id integer NULL
);

INSERT INTO job (job_id,job_title,dep_id,benefit_code,salary_id)
VALUES
  (0,'pilot',0,4,6),
  (1,'flight_attendant',0,1,3),
  (2,'checkin_agent',1,0,0),
  (3,'ticket_sales',1,0,0),
  (4,'ground_handling',1,0,0),
  (5,'food_prep',2,0,2),
  (6,'catering_logistics',2,0,2),
  (7,'shipping_agent',3,0,1),
  (8,'cargo_logistics',3,0,1),
  (9,'sales',4,2,5),
  (10,'advertising',4,2,5),
  (11,'call_center',4,2,5),
  (12,'technician',5,2,5),
  (13,'support',5,2,5),
  (14,'flight_planning',6,3,5),
  (15,'weight_balance',6,3,5),
  (16,'finance',7,5,4),
  (17,'hr_personnel',7,5,4);
