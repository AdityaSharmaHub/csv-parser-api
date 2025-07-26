# CSV to JSON Parser API

A Node.js API that converts CSV files to JSON and uploads data to PostgreSQL database with age distribution analysis.

## Features

- Custom CSV parser (no external libraries)
- Handles nested properties with dot notation (e.g., `name.firstName`, `address.city`)
- PostgreSQL database integration
- Age distribution analysis
- RESTful API endpoint

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your database credentials and CSV file path.

3. **Create PostgreSQL database table:**
   ```sql
   CREATE TABLE public.users (
     "name" varchar NOT NULL,
     age int4 NOT NULL,
     address jsonb NULL,
     additional_info jsonb NULL,
     id serial4 NOT NULL
   );
   ```

4. **Start the server:**
   ```bash
   node index.js
   ```

## API Endpoints

### GET /upload
Processes the CSV file and uploads data to the database.

**Response:**
```json
{
  "success": true,
  "message": "Upload complete and age distribution printed",
  "usersProcessed": 10
}
```

## CSV Format

The CSV file should have headers with dot notation for nested properties:
```
name.firstName,name.lastName,age,address.line1,address.city,gender
Rohit,Prasad,35,A-563 Rakshak Society,Pune,male
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `CSV_FILE_PATH` - Path to CSV file (default: ./uploads/users.csv)
- `PGHOST` - PostgreSQL host
- `PGUSER` - PostgreSQL username
- `PGPASSWORD` - PostgreSQL password
- `PGDATABASE` - PostgreSQL database name
- `PGPORT` - PostgreSQL port (default: 5432)