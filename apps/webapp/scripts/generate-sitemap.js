import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://vizeel.com';

// Static routes from your App.tsx
const staticRoutes = [
  '',
  '/product',
  '/pricing',
  '/affiliates',
  '/blog',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/faq'
];

// Function to get current date in XML format
const getCurrentDate = () => {
  return new Date().toISOString();
};

// Function to generate sitemap XML
const generateSitemap = async () => {
  const currentDate = getCurrentDate();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add static routes
  staticRoutes.forEach(route => {
    const url = `${DOMAIN}${route}`;
    const priority = route === '' ? '1.0' : '0.8';
    const changefreq = route === '' ? 'weekly' : 'monthly';
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  // Add blog posts (if you have a blog API or static files)
  // This would need to be customized based on how you store blog posts
  try {
    // Check if there's a blog posts API or data source
    // For now, we'll add a placeholder for the blog index
    sitemap += `  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  } catch (error) {
    console.log('No blog posts found, skipping...');
  }

  sitemap += `</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
  console.log(`📄 Total URLs: ${staticRoutes.length}`);
};

// Generate robots.txt with sitemap reference
const generateRobotsTxt = () => {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml

# Disallow admin pages
Disallow: /admin/

# Disallow temporary files
Disallow: /*.json$
Disallow: /api/
`;

  const publicDir = path.join(process.cwd(), 'public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`✅ robots.txt updated at ${robotsPath}`);
};

// Main execution
const main = async () => {
  try {
    await generateSitemap();
    generateRobotsTxt();
    console.log('🎉 SEO files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

main();