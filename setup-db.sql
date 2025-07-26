-- Database setup script for CSV Parser API
-- Run this script in your PostgreSQL database

CREATE TABLE IF NOT EXISTS public.users (
    "name" varchar NOT NULL,
    age int4 NOT NULL,
    address jsonb NULL,
    additional_info jsonb NULL,
    id serial4 NOT NULL,
    PRIMARY KEY (id)
);

-- Add some indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_age ON public.users(age);
CREATE INDEX IF NOT EXISTS idx_users_name ON public.users(name);

-- Optional: Clear existing data if needed
-- TRUNCATE TABLE public.users RESTART IDENTITY CASCADE; 