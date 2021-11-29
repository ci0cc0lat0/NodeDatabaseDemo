DROP TABLE IF EXISTS "benefit";

CREATE TABLE "benefit" (
  benefit_code integer NULL,
  benefit_amount integer NULL,
  PRIMARY KEY (benefit_code,benefit_amount)

);

INSERT INTO benefit (benefit_code,benefit_amount)
VALUES
  (0,90644),
  (1,114955),
  (2,127837),
  (3,176200),
  (4,205996),
  (5,241183);
