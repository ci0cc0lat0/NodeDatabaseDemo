DROP TABLE IF EXISTS "department";

CREATE TABLE "department" (
  dep_id integer NULL,
  dep_name TEXT NULL,
  location_type TEXT NULL,
  PRIMARY KEY (dep_id)
);

INSERT INTO department(dep_id,dep_name,location_type)
VALUES
  (0,'flight_crew','on_flight'),
  (1,'passenger_handling','in_office'),
  (2,'catering','in_office'),
  (3,'cargo','in_office'),
  (4,'sale/marketing','in_office'),
  (5,'technical','in_office'),
  (6,'operations','in_office'),
  (7,'administration','in_office');
