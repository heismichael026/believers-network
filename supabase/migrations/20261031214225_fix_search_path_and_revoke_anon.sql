/*
# Fix function search_path and revoke anon privileges

## Changes
1. Set a fixed search_path on handle_updated_at() to resolve the security
   advisor warning about mutable search_path.
2. Revoke all privileges from the anon role on profiles, chapters, and
   chapter_members. These tables are for authenticated members only — the
   anon role should not be able to reach them at all. RLS policies are
   already scoped to authenticated, but the grants were too broad.
*/

-- Fix search_path on the trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Revoke anon privileges — these are authenticated-only tables
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.chapters FROM anon;
REVOKE ALL ON public.chapter_members FROM anon;
