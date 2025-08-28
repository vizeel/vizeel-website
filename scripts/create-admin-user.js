// Utility script to create an admin user in Supabase
// Run this with: node scripts/create-admin-user.js

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase URL and service role key
const SUPABASE_URL = 'https://lvmdsvxfzeevdtolhoin.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY'; // Get this from Supabase dashboard

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function createAdminUser() {
  const adminEmail = 'admin@vizeel.com';
  const adminPassword = 'admin123456'; // Change this to a secure password

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }

    console.log('Admin user created successfully:', data.user.email);
    console.log('Login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdminUser();
