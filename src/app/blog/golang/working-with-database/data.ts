export const date = "18 Nov 2026";

export const tableOfContent = [
	{
		num: "01",
		id: "why-pgx-and-sqlc",
		label: "Why PostgreSQL, pgx & sqlc?",
	},
	{
		num: "02",
		id: "step-1-schema",
		label: "Step 1: Database Schema (schema.sql)",
	},
	{
		num: "03",
		id: "step-2-queries",
		label: "Step 2: CRUD Queries (query.sql)",
	},
	{
		num: "04",
		id: "step-3-sqlc-config",
		label: "Step 3: sqlc Configuration & Generation",
	},
	{
		num: "05",
		id: "step-4-pgxpool",
		label: "Step 4: Connecting with pgxpool",
	},
	{
		num: "06",
		id: "step-5-crud-in-action",
		label: "Step 5: Executing CRUD in Go",
	},
	{
		num: "07",
		id: "summary-best-practices",
		label: "Key Takeaways & Best Practices",
	},
];

export const calloutWhySqlc = [
	{
		k: "THE ZERO-REFLECTION ADVANTAGE",
		d: "Unlike traditional ORMs that use runtime reflection to map database rows, sqlc compiles raw SQL queries into native Go structs and methods ahead of time. You get full compile-time type safety, zero boilerplate, and pure raw SQL execution speed.",
		bad: false,
		title: "COMPILE-TIME TYPE SAFETY",
	},
];

export const calloutPgxNative = [
	{
		k: "PGXPOOL VS GENERIC DATABASE/SQL",
		d: "pgx connects directly via PostgreSQL's binary wire protocol, bypassing the generic database/sql translation layer. It offers automatic prepared statement caching, native support for PostgreSQL types, and built-in concurrent connection pooling.",
		bad: false,
		title: "NATIVE PERFORMANCE",
	},
];

export const calloutSqlInjection = [
	{
		k: "BUILT-IN PARAMETERIZATION",
		d: "sqlc enforces parameterized queries ($1, $2) by design. It makes writing dangerous string concatenation impossible, protecting your application from SQL injection vulnerabilities automatically.",
		bad: false,
		title: "SECURITY BY DEFAULT",
	},
];

export const breadcrumbs = [
	{ link: "/blog", text: "Blog" },
	{ link: "/blog/golang/introduction-to-golang", text: "Golang" },
	{ link: "", text: "PostgreSQL with pgx & sqlc" },
];

export const schemaSqlCode = `CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`;

export const querySqlCode = `-- name: CreateUser :one
INSERT INTO users (name, email, bio)
VALUES ($1, $2, $3)
RETURNING id, name, email, bio, created_at;

-- name: GetUserByID :one
SELECT id, name, email, bio, created_at
FROM users
WHERE id = $1;

-- name: ListUsers :many
SELECT id, name, email, bio, created_at
FROM users
ORDER BY id ASC
LIMIT $1;

-- name: UpdateUserBio :one
UPDATE users
SET bio = $2
WHERE id = $1
RETURNING id, name, email, bio, created_at;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;`;

export const sqlcYamlCode = `version: "2"
sql:
  - engine: "postgresql"
    schema: "schema.sql"
    queries: "query.sql"
    gen:
      go:
        package: "db"
        out: "db"
        sql_package: "pgx/v5"`;

export const sqlcGenerateCommand = `sqlc generate
# Output: generates db/models.go and db/query.sql.go`;

export const generatedModelsCode = `package db

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

type User struct {
	ID        int64
	Name      string
	Email     string
	Bio       pgtype.Text
	CreatedAt time.Time
}

type CreateUserParams struct {
	Name  string
	Email string
	Bio   pgtype.Text
}

type UpdateUserBioParams struct {
	ID  int64
	Bio pgtype.Text
}`;

export const poolConfigCode = `package main

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	ctx := context.Background()
	dsn := "postgres://postgres:secret@localhost:5432/myapp?sslmode=disable"

	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		fmt.Printf("Parse config error: %v\\n", err)
		return
	}

	config.MaxConns = 25
	config.MinConns = 5
	config.MaxConnLifetime = 1 * time.Hour

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		fmt.Printf("Connection error: %v\\n", err)
		return
	}
	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		fmt.Printf("Ping error: %v\\n", err)
		return
	}

	fmt.Println("Connected to PostgreSQL successfully with pgxpool!")
	// Output: Connected to PostgreSQL successfully with pgxpool!
}`;

export const crudMainCode = `package main

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"yourmodule/db"
)

func main() {
	ctx := context.Background()
	dsn := "postgres://postgres:secret@localhost:5432/myapp?sslmode=disable"

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		fmt.Printf("Unable to connect: %v\\n", err)
		return
	}
	defer pool.Close()

	queries := db.New(pool)

	created, err := queries.CreateUser(ctx, db.CreateUserParams{
		Name:  "Prakash Choudhary",
		Email: "prakash@example.com",
		Bio:   pgtype.Text{String: "Systems Engineer", Valid: true},
	})
	if err != nil {
		fmt.Printf("Create failed: %v\\n", err)
		return
	}
	fmt.Printf("Created: ID=%d Name=%s Email=%s\\n", created.ID, created.Name, created.Email)
	// Output: Created: ID=1 Name=Prakash Choudhary Email=prakash@example.com

	user, err := queries.GetUserByID(ctx, created.ID)
	if err != nil {
		fmt.Printf("Get failed: %v\\n", err)
		return
	}
	fmt.Printf("Fetched: ID=%d Name=%s Bio=%s\\n", user.ID, user.Name, user.Bio.String)
	// Output: Fetched: ID=1 Name=Prakash Choudhary Bio=Systems Engineer

	updated, err := queries.UpdateUserBio(ctx, db.UpdateUserBioParams{
		ID:  created.ID,
		Bio: pgtype.Text{String: "Distributed Systems & Go Developer", Valid: true},
	})
	if err != nil {
		fmt.Printf("Update failed: %v\\n", err)
		return
	}
	fmt.Printf("Updated Bio: %s\\n", updated.Bio.String)
	// Output: Updated Bio: Distributed Systems & Go Developer

	allUsers, err := queries.ListUsers(ctx, 10)
	if err != nil {
		fmt.Printf("List failed: %v\\n", err)
		return
	}
	fmt.Printf("Total users fetched: %d\\n", len(allUsers))
	// Output: Total users fetched: 1

	err = queries.DeleteUser(ctx, created.ID)
	if err != nil {
		fmt.Printf("Delete failed: %v\\n", err)
		return
	}
	fmt.Println("User deleted successfully")
	// Output: User deleted successfully
}`;
