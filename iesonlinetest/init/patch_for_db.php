<?php 

$dbCon = pg_connect("host = localhost port = 50000 dbname = institution user = ies password = welcome123") or die("Cant Find the db..!");

$query1 = "CREATE TABLE onlinetesttablerepos
(
  id serial NOT NULL,
  tablename character varying NOT NULL,
  testid integer,
  status smallint DEFAULT 0,
  timeremaining bigint,
  dateofupdate abstime,
  systemname character varying,
  CONSTRAINT pk_onlinetesttablerepos PRIMARY KEY (id)
)";

$query2 = "CREATE TABLE onlinetestresultrepository
(
  id serial NOT NULL,
  username character varying NOT NULL,
  testdate character varying NOT NULL,
  testcategoryid integer NOT NULL,
  testid integer NOT NULL,
  netscore numeric(5,2) NOT NULL,
  result character varying NOT NULL,
  maxmarks numeric(5,2),
  passmarks numeric(5,2),
  rightanswers integer,
  wronganswers integer,
  visited integer,
  notvisited integer,
  CONSTRAINT onlinetestresultrepository_pkey PRIMARY KEY (id)
)";

$result1 = pg_query($dbCon, $query1);
$result2 = pg_query($dbCon, $query2);

 ?>