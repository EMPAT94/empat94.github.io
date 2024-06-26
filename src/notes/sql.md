# SQL

## Sqlite3

- Show all tables

  ```sql
  .tables
  ```

- Create table (don't forget semicolon at end)

  ```sql
  create table [if not exists] <name> ( ... );
  ```

- Describe table

  ```sql
  .schema <table>
  ```

  - NOTE: no `;` at the end

  ```sql
  .header on
  .mode column
  pragma table_info("<table>")
  ```

- Insert Query

  ```sql
  insert into <table> (<col1>, <col2>, ...) values (<v1>, <v2>, ...), (<vk>, <vl>, ...);
  ```

- Update Query

  ```sql
  update <table> set <key> = <val>, ... [from select ...] where <key> = <val>;
  ```

- Distinct Query

  ```sql
  select distinct col1, col2 from table;
  ```

- Delete Query

  ```sql
  delete from table where col = val;
  ```

- Count Query

  ```sql
  select count(*) from table;
  ```

- Backup Sqlite3 (non-interactively)

  ```shell
  $ sqlite3 <name>.db ".backup '<name>.backup.db'"
  ```

  - Alternatively, compress it with `xz`

  ```shell
  $ xz --compress --threads=0 --quiet <name>.backup.db
  ```

### MAP1 Databases (Sqlite) Lecture Notes

- [MAP1 Course](../map1-course.md)

## [Postgres](./postgresql.md)

## MySQL

## VoltDB

## Scylla

## Redis

## IndexDB

## MongoDB

## Realm

## Neo4j

## ArrangoDB

## CouchDB
