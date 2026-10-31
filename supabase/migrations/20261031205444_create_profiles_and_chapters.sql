/*
# Create profiles, chapters, and onboarding tables

## Overview
This migration sets up the core data model for the Believers Network member
platform. It creates tables for user profiles, geographical chapters, and the
join between them. It also tracks onboarding progress so the frontend can guide
new members through a multi-step setup flow.

## 1. New Tables

### profiles
- `id` (uuid, primary key) — matches the auth.users id (1-to-1 with each
  authenticated user). Defaults to auth.uid() so client inserts work.
- `display_name` (text) — the name shown to other members.
- `bio` (text) — a short personal description.
- `stage_of_life` (text) — e.g. "Student", "Entrepreneur", "Professional".
- `profession` (text) — the member's field or industry.
- `interests` (text[]) — tags the member chooses.
- `location` (text) — free-text city/region/country.
- `country` (text) — country name for grouping.
- `primary_chapter_id` (uuid, FK to chapters) — the member's primary chapter.
- `visibility` (text) — privacy setting: 'public', 'members', or 'private'.
- `onboarding_completed` (boolean) — whether the member finished onboarding.
- `onboarding_step` (text) — which step the member is on, for resuming.
- `created_at` (timestamptz).
- `updated_at` (timestamptz).

### chapters
- `id` (uuid, primary key).
- `name` (text), `description` (text), `location` (text), `country` (text).
- `created_at` (timestamptz).

### chapter_members
- Join table between profiles and chapters (many-to-many).
- `user_id` (uuid, FK to auth.users), `chapter_id` (uuid, FK to chapters).
- `is_primary` (boolean) — marks the member's primary chapter.
- `joined_at` (timestamptz). Unique on (user_id, chapter_id).

## 2. Security (RLS + Grants)
- profiles: authenticated can SELECT all, INSERT/UPDATE only own row.
- chapters: authenticated can SELECT all (read-only, managed server-side).
- chapter_members: authenticated can SELECT all, CRUD only own memberships.

## 3. Notes
- profiles.id defaults to auth.uid() so client inserts satisfy WITH CHECK.
- A trigger updates profiles.updated_at automatically.
*/

-- chapters must exist before profiles references it
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location text,
  country text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON chapters TO authenticated;

DROP POLICY IF EXISTS "select_chapters" ON chapters;
CREATE POLICY "select_chapters" ON chapters FOR SELECT
  TO authenticated USING (true);

-- profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  bio text,
  stage_of_life text,
  profession text,
  interests text[] DEFAULT '{}',
  location text,
  country text,
  primary_chapter_id uuid REFERENCES chapters(id) ON DELETE SET NULL,
  visibility text NOT NULL DEFAULT 'members',
  onboarding_completed boolean NOT NULL DEFAULT false,
  onboarding_step text DEFAULT 'profile',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

DROP POLICY IF EXISTS "select_profiles" ON profiles;
CREATE POLICY "select_profiles" ON profiles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- chapter_members
CREATE TABLE IF NOT EXISTS chapter_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_id uuid NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  is_primary boolean NOT NULL DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  UNIQUE (user_id, chapter_id)
);

ALTER TABLE chapter_members ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON chapter_members TO authenticated;

DROP POLICY IF EXISTS "select_chapter_members" ON chapter_members;
CREATE POLICY "select_chapter_members" ON chapter_members FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_chapter_membership" ON chapter_members;
CREATE POLICY "insert_own_chapter_membership" ON chapter_members FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_chapter_membership" ON chapter_members;
CREATE POLICY "update_own_chapter_membership" ON chapter_members FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_chapter_membership" ON chapter_members;
CREATE POLICY "delete_own_chapter_membership" ON chapter_members FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
