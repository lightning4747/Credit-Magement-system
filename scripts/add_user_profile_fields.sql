-- Add username and department columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Create an index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
