CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"youtube_link" TEXT NOT NULL,
	"score" integer NOT NULL DEFAULT 0,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




