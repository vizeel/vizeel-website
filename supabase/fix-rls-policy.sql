-- Fix RLS Policy for waitlist_signups table
-- Run this in your Supabase SQL Editor

-- First, check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist_signups';

-- Enable RLS if not already enabled
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts to waitlist_signups" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated users to read waitlist_signups" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated users to update waitlist_signups" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Allow authenticated users to delete waitlist_signups" ON public.waitlist_signups;

-- Create policy to allow anonymous users to insert (for public forms)
CREATE POLICY "Allow anonymous inserts to waitlist_signups" 
ON public.waitlist_signups 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow authenticated users to read (for admin)
CREATE POLICY "Allow authenticated users to read waitlist_signups" 
ON public.waitlist_signups 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to allow authenticated users to update (for admin)
CREATE POLICY "Allow authenticated users to update waitlist_signups" 
ON public.waitlist_signups 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete (for admin)
CREATE POLICY "Allow authenticated users to delete waitlist_signups" 
ON public.waitlist_signups 
FOR DELETE 
TO authenticated 
USING (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist_signups';
