# AI Usage Log

## AI Tools Used

* ChatGPT (GPT-5)
* Cursor AI

---

## Purpose

AI tools were used to accelerate development, generate boilerplate code, assist with TypeScript issues, and provide architecture guidance.

---

## Example Prompts

### Backend

Generate a TypeScript Express backend for an uptime monitoring application using MongoDB and Mongoose.

### Validation

Create a reusable Zod validation schema for monitor creation.

### Monitoring

Build a node-cron service that checks registered URLs every minute using Axios and stores results in MongoDB.

### Frontend

Create a React dashboard using Redux Toolkit and Tailwind CSS that displays website uptime status and response times.

### State Management

Generate Redux Toolkit async thunks for fetching, creating, and deleting monitors.

---

## Human Decisions

The following decisions were made manually:

* Chose MongoDB Atlas for deployment simplicity.
* Selected Node Cron for scheduled monitoring.
* Designed API response format.
* Implemented global error handling architecture.
* Improved dashboard UI using Tailwind CSS.
* Added aggregation-based monitor status retrieval.

---

## Debugging and Corrections

### Issue 1

TypeScript runtime error caused by importing interfaces as values.

Fix:

```ts
import type { Monitor } from "./monitorTypes";
```

---

### Issue 2

Express Async Handler type mismatch caused by returning Response objects.

Fix:

Response helpers were updated to return void.

---

### Issue 3

Mongo aggregation optimization.

Initial implementation performed N+1 queries.

Fix:

Replaced with aggregation pipeline and mapping strategy.

---

## Verification

All generated code was reviewed, modified, tested, and validated manually before inclusion in the final project.
