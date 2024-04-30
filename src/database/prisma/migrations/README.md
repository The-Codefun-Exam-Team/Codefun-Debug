# Migration guide using Prisma

**_Documentation to maintain PostgreSQL database using Prisma_**

**Author** _@kbnopro_

## Table of contents

- [1. Problems](#1-problems)
  - [1.1 Database descriptions](#11-database-descriptions)
  - [1.2 Unsupported features from Prisma](#12-unsupported-features-from-prisma)
- [2. Solutions](#2-solutions)
  - [2.1 Baseline database](#21-baseline-database)
    - [2.1.1 Enable preview features](#211-enable-preview-features)
    - [2.1.2 Introspect database](#212-instropect-database)
    - [2.1.3 Modify prisma schema](#213-modify-prisma-schema)
    - [2.1.4 Generate the SQL migration for databases](#214-generate-the-sql-migration-for-database)
    - [2.1.5 Modify the migration to show unsupported features](#215-modify-the-migration-to-show-unsupported-features)
    - [2.1.6 Mark the migration as applied](#216-mark-the-migration-as-applied)
  - [2.2 If changes are made directly to the database](#22-if-changes-are-made-directly-to-the-database)
    - [2.2.1. Generate diff files for migration](#221-generate-diff-files-for-migration)
    - [2.2.2. Check the **migration.sql** file generated](#222-check-the-migrationsql-file-generated)
    - [2.2.3 Update and ensure Prisma schema integrity](#223-update-and-ensure-prisma-schema-integrity)
  - [2.3 If changes are made to the Prisma schema](#23-if-changes-are-made-to-the-prisma-schema)
    - [2.3.1 Make changes to the schema](#231-make-changes-to-the-schema)
    - [2.3.2 Generate SQL to reflect schema changes](#232-generate-sql-to-reflect-schema-changes)
    - [2.3.3 Custom migration](#233-custom-migration)
    - [2.3.4 Apply the migration](#234-apply-the-migration)
    - [2.3.5 Error when applying migration](#235-error-when-applying-migration)
    - [2.3.6 Update and ensure Prisma schema integrity](#236-update-and-ensure-prisma-schema-integrity)

# 1. Problems

Maintaining databases using [Prisma ORM](https://github.com/prisma/prisma) can be much easier than using normal SQL. **Prisma** is used as a query generator, acts as database documentation and supports testing and deploying changes to the production database.

However, because **PostgreSQL** is a **modern relational database management system (RDBMS)**, some features have not been supported by **Prisma** yet.

As a result, the normal workflow(s) provided by **Prisma** are not suitable for the complex needs of the project. A custom workflow utilizing **Prisma's** current features is required so the database can be properly maintained.

## 1.1 Database descriptions

This is a database for [Codefun Debug](debug.codefun.vn), which is a subdomain of [Codefun](codefun.vn), an online judge developed and maintained by _@natsukagami_. The two websites' databases are hosted together on the same server. However, the **Codefun's** database is maintained by _@natsukagami_, while the **Codefun-Debug's** database is maintained here using **Prisma**.

The fact that changes would be made both from the database and from **Prisma** itself, some efforts should be made to properly track those changes.

## 1.2 Unsupported features from Prisma

After some research, I found several limitations of Prisma as follows:

**Partial Indexes**

- **PostgreSQL** supports [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html) for optimizations, which are utilized by **Codefun**.
  **Prisma** hasn't supported this feature yet. In this [feature request](https://github.com/prisma/prisma/issues/6974#issuecomment-1483792245), we learned that Partial indexes will be treated as not existing. It's also important to note that the `INCLUDE` keyword isn't fully supported by Prisma, so some modifications should be made to ensure the baseline integrity.

**Check constraints**

- **PostgreSQL** supports [Check constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS) for additional checks when inserting data. Some notes can be found in the provided link.

- **Prisma** hasn't supported this feature too (which is shown by this [feature request](https://github.com/prisma/prisma/issues/3388))

**Views**

- **PostgreSQL** supports [View](https://www.postgresql.org/docs/current/sql-createview.html), which is utilized by **Codefun** and possibly **Codefun-Debug**.

- **Prisma** is supporting this feature as a [preview feature](https://www.prisma.io/docs/orm/prisma-schema/data-model/views#use-views-with-prisma-migrate-and-db-push). This means by briefly modifying the schema after introspections, we can query directly from views. However, creating views is not currently supported, so some additional steps are required to create views.

**Multi Schemas**

- **PostgreSQL** documentation of schemas can be found [here](https://www.postgresql.org/docs/current/ddl-schemas.html)
- **Prisma** is currently supporting multi-schema as a preview feature. The doc can be found [here](https://www.prisma.io/docs/orm/prisma-schema/data-model/multi-schema#how-to-enable-the-multischema-preview-feature), and there is a [GitHub issue](https://github.com/prisma/prisma/issues/1122) for this preview feature.

**Functions and rules**

# 2. Solutions

This section includes the initial steps to set up **Prisma** with **PostgreSQL**, as well as solutions to maintain the integrity of the Prisma schema and migrations folder. This **README** serves as documentation and a guide for future maintenance.

## 2.1 Baseline database

### 2.1.1 Enable preview features

First, we need to enable preview features in the [Prisma schema](/src/database/prisma/schema.prisma#L1) as follows:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema", "views"]
}
```

### 2.1.2 Introspect database

Then, we introspect the database by running:

```sh
pnpm prisma db pull
```

### 2.1.3 Modify prisma schema

After introspection, views will be ignored due to missing unique fields. We have to figure out which field or set of fields should be unique and check if other fields are required or not to make sure that **Prisma** generates the right type. Note that the [activities](/src/database/prisma/schema.prisma#L329) view is unique on composite fields of **comment_id** and **unique_id**. However,

```prisma
@@unique([post_id,comment_id])
```

is not currently supported by **Prisma** because because **comment_id** is optional. A way to work around this is to simply mark post_id as unique. Although it's not true, it hasn't ruined the behaviors just yet. If it does, **@@ignore** will be the choice.

After setting up the schema, we need to baseline the database.

### 2.1.4 Generate the SQL migration for databases

Run this command to generate the initial SQL for the database

```sh
pnpm prisma migrate diff `
 --from-empty `
 --to-schema-datamodel ./src/database/prisma/schema.prisma `
 --script `
 -o ./src/database/prisma/migrations/0_init/migration.sql
```

### 2.1.5 Modify the migration to show unsupported features

Currently, unsupported features won't show up when using migrate diff. As a result, we need to manually add those features to the migration.sql to show these features.

### 2.1.6 Mark the migration as applied

After having done all those steps, we can mark the migration as applied

```sh
pnpm prisma migrate resolve --applied 0_init
```

Having done these steps, we have finished setting up everything.

## 2.2 If changes are made directly to the database

**NOTE: These commands are written for PowerShell.**

To check if changes are made to the database, run

```sh
pnpm prisma migrate dev
```

If there are schema drifts, follow the steps below.

### 2.2.1. Generate diff files for migration

Run these commands to generate the diff file

```sh
$prisma_migration_time = Get-Date ([datetime]::UtcNow) -Format "yyyMMddHHmmss"

$prisma_migration_name = Read-Host 'Enter a name for the new migration'

$prisma_migration_foldername = $prisma_migration_time + '_' + $prisma_migration_name

pnpm prisma migrate diff `
  --from-schema-datamodel ./src/database/prisma/schema.prisma `
  --to-schema-datasource ./src/database/prisma/schema.prisma `
  --script `
  -o ./src/database/prisma/migrations/$prisma_migration_foldername/migration.sql
```

### 2.2.2. Check the **migration.sql** file generated

Similar to how we set up the database, unsupported features won't be reflected by the SQL file. As a result, we have to manually add those changes by hand.

To mark the migration as applied if there is any change, run

```sh
pnpm prisma migrate resolve --applied $prisma_migration_foldername
```

### 2.2.3 Update and ensure Prisma schema integrity

**NOTE: Don't run this step first because the older schema version is needed to generate diff.**

To update the schema according to changes made to the database simply run:

```sh
pnpm prisma db pull
```

Checking the integrity of migration, schema and database by running

```sh
pnpm prisma migrate dev
```

## 2.3 If changes are made to the Prisma schema

This is a much more straightforward process, as it's the normal **Prisma** workflow. However, due to the lack of features from **Prisma**, some additional steps are required.

### 2.3.1 Make changes to the schema

First, we change the Prisma schema to make changes that can be reflected by **Prisma**. This includes almost everything except the missing features listed in [1.2](#12-missing-features-from-prisma).

Additionally, we can plot view in the Prisma schema. Although this won’t be reflected by Prisma, it will be very convenient as no additional modification is required after pulling.

### 2.3.2 Generate SQL to reflect schema changes

After changing the schema, we can generate the migration by running:

```sh
pnpm prisma migrate dev --create-only
```

### 2.3.3 Custom migration

Customize the newly generated SQL to add unsupported features. This includes creating new views, partial indexes, check constraints,...

### 2.3.4 Apply the migration

The **Prisma** documentation said we could simply run:

```sh
  pnpm prisma migrate dev
```

### 2.3.5 Error when applying migration

If some changes are made in the migration.sql that can be reflected by Prisma, applying migration using migrate dev won't work. In that case, we apply the migration manually by using:

```sh
  pnpm db execute --file <path_to_migration.sql>
```

then mark the migration as applied by:

```sh
  pnpm prisma migrate resolve --applied <migration_name>
```

### 2.3.6 Update and ensure Prisma schema integrity

To update the schema according to changes made to the database simply run:

```sh
pnpm prisma db pull
```

Checking the integrity of migration, schema and database by running

```sh
pnpm prisma migrate dev
```
