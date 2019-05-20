CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(120) NOT NULL,
  "path"  VARCHAR(120) NOT NULL
);

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL
);

INSERT INTO "images" ("title", "path")
VALUES 
('Abstract Shapes', 'images/AbstractShapes.jpg'),
('Chroma Blast', 'images/Chroma.jpg'),
('Color Burst', 'images/ColorBurst.jpg'),
('Flower', 'images/Flower.jpg'),
('Reflection', 'images/Reflection.jpg');

INSERT INTO "tags" ("name")
VALUES 
('Energy'),
('Calming'),
('Inspirational'),
('Frantic'),
('Vertigo');

CREATE TABLE "images_tags" (
  "id" SERIAL PRIMARY KEY,
  "images_id" INT REFERENCES "images",
  "tags_id" INT REFERENCES "tags"
);

INSERT INTO "images_tags" ("images_id","tags_id")
VALUES('1','1'),('1','2'),('2','1'),('2','2'),('3','3'),('3','4'),('4','2'),('4','3'),('5','5'),('5','4');

SELECT * FROM "tags"
JOIN "images_tags" ON images_tags.tags_id = tags.id
WHERE "images_tags".images_id = 1;

INSERT INTO "images_tags" ("images_id", "tags_id")
        VALUES ('1', '5');
