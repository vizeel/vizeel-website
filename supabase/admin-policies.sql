-- Enable RLS on the waitlist_signups table
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert (for the public form)
CREATE POLICY "Allow anonymous inserts to waitlist_signups" 
ON public.waitlist_signups 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy to allow authenticated users to read all signups (for admin)
CREATE POLICY "Allow authenticated users to read waitlist_signups" 
ON public.waitlist_signups 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy to allow authenticated users to update signups (for admin)
CREATE POLICY "Allow authenticated users to update waitlist_signups" 
ON public.waitlist_signups 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Policy to allow authenticated users to delete signups (for admin)
CREATE POLICY "Allow authenticated users to delete waitlist_signups" 
ON public.waitlist_signups 
FOR DELETE 
TO authenticated 
USING (true);

-- Add the is_contacted column if it doesn't exist
ALTER TABLE public.waitlist_signups 
ADD COLUMN IF NOT EXISTS is_contacted boolean DEFAULT false;
