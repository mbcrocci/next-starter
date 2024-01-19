# Create MC App

This is a specific [T3 Stack](https://create.t3.gg/) starter project with:
- drizzle + planetscale for the database
- lucia for authentication
- shadcn's ui for ui components

## Usage

Create a repo using this template and change package name in `package.json`
and tableName in `src/server/db/schema.ts`.

## Guidelines

1. Try to use server actions 
2. Move functionality to the server and use `import "server-only"`
3. Use `async components` and wrap them in `Suspense` to show data
4. Use a layout with multiple pages to design different sections of a route
5. Don't be afraid to use the URL to pass state
