CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"youtube_link" TEXT NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




