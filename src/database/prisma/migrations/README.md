# Migration guide using Prisma

**_The workflow to maintain database_**

**Author** _@kbnopro_

# 1. Problem

Maintaining database using [Prisma ORM](https://github.com/prisma/prisma) can be much easier than using normal SQL. **Prisma** is used as a query-generator, act as database documentation and support testing and deploying changes to production database.

However, due to codefun's migration to **PostgreSQL** which is a **modern relational database management system (RDBMS)**, some features are not currently supported by **Prisma**, at least in the near future.

As a result, the normal workflow(s) provided by **Prisma** is not suitable for the complex needs of the project. A custom workflow utilizing **Prisma** current features is required so the database can be properly maintained.

## 1.1 Database description

This is database for [Codefun Debug](debug.codefun.vn), which is a subdomain of [Codefun.vn](codefun.vn), an onlline judge developed and maintained by _@natsukagami_. The two websites' databases are hosted together in the same server. However, the **Codefun's** database is maintained by _@natsukagami_, while the **Codefun-Debug's** database is maintained here using **Prisma**.

The fact that changes would be made both from the database and from **Prisma** itself, some efforts should be made to properly track database changes.

## 1.2 Missing features from Prisma

After some researches, I find several Prisma's limitations as followed:

- **Partial Indexs**

  **PostgreSQL** supports [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html) for optimizations, which is utilizes by **Codefun**.

  **Prisma** is currently not supporting this feature. In this [feature request](https://github.com/prisma/prisma/issues/6974#issuecomment-1483792245), we learn that Partial indexes will be treated as not existing.

- **Check constraints**

  **PostgreSQL** support [Check constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS) for additional check when inserting data. Some notes can be found in the provided link.

  **Prisma** does not supports this feature too (which is shown by this [feature request](https://github.com/prisma/prisma/issues/3388))

- **Views**

  **PostgreSQL** support [View](https://www.postgresql.org/docs/current/sql-createview.html), which is utilizes by **Codefun** and possibly **Codefun-Debug**.

  **Prisma** is supporting this feature as a [preview feature](https://www.prisma.io/docs/orm/prisma-schema/data-model/views#use-views-with-prisma-migrate-and-db-push). This means by briefly modifying the schema after instropection, we can query directly from vies. However, creating views is not currently supported by, so some additional steps are required to create view.
