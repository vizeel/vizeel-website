# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for managing waitlist signups.

## Prerequisites

- Supabase project configured
- Node.js and npm installed
- Access to Supabase dashboard

## Setup Steps

### 1. Install Dependencies

The AG Grid dependencies have been installed. If you need to reinstall:

```bash
npm install ag-grid-react ag-grid-community
```

### 2. Configure Supabase RLS Policies

Run the following SQL in your Supabase SQL Editor:

```sql
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
```

### 3. Create Admin User

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter admin email and password
5. Make sure to confirm the email

#### Option B: Using the Script

1. Get your service role key from Supabase dashboard (Settings > API)
2. Update the `scripts/create-admin-user.js` file with your service role key
3. Run the script:

```bash
node scripts/create-admin-user.js
```

### 4. Access the Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/admin` in your browser
3. Login with the admin credentials you created

## Features

The admin dashboard includes:

- **Authentication**: Secure login with Supabase Auth
- **Data Grid**: AG Grid with pagination, sorting, and filtering
- **Search**: Real-time search across email, phone, and source fields
- **Editing**: Inline editing of signup data
- **Contact Status**: Toggle contacted status with checkboxes
- **Delete**: Remove signups with confirmation
- **Responsive Design**: Works on desktop and mobile

## Security

- Uses Supabase Row Level Security (RLS)
- Authenticated users only can read/update/delete data
- Anonymous users can only insert new signups
- Session management with automatic logout

## Customization

### Changing Admin Credentials

To change admin credentials:

1. Go to Supabase dashboard > Authentication > Users
2. Find your admin user
3. Click "Edit" to change email/password

### Adding More Fields

To add more fields to the grid:

1. Update the `WaitlistSignup` interface in `src/pages/Admin.tsx`
2. Add new column definitions to the `columnDefs` array
3. Update the search filter in `filteredSignups`

### Styling

The admin dashboard uses:
- Tailwind CSS for styling
- Shadcn/ui components
- AG Grid Alpine theme

## Troubleshooting

### RLS Policy Errors

If you get RLS policy errors:

1. Check that all policies are created correctly
2. Ensure the user is authenticated
3. Verify the table has RLS enabled

### Authentication Issues

If login fails:

1. Check that the admin user exists in Supabase
2. Verify email/password are correct
3. Ensure email is confirmed

### Grid Not Loading

If the grid doesn't load:

1. Check browser console for errors
2. Verify AG Grid CSS is imported
3. Ensure data is being fetched from Supabase

## Production Deployment

For production:

1. Use environment variables for Supabase credentials
2. Implement proper error handling
3. Add rate limiting
4. Consider adding audit logs
5. Use HTTPS only
6. Implement proper session management
