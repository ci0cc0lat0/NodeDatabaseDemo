/* PK can be changed to just benefit code */
DROP TABLE IF EXISTS "benefits";

CREATE TABLE "benefits" (
  benefit_code TEXT NULL,
  benefit_type TEXT NULL,
  benefit_amount TEXT NULL,
  PRIMARY KEY (benefit_code, benefit_type)
);

INSERT INTO benefits (benefit_code,benefit_type,benefit_amount)
VALUES
  (0,'full',50000),
  (1,'full',40000),
  (2,'full',30000),
  (3,'partial',15000),
  (4,'partial',10000),
  (5,'partial',5000),
  (6,'minimum',3000),
  (7,'minimum',2000),
  (8,'minimum',1000);
