import { Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbSchema } from "@/lib/structured-data";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ customItems, className = "" }: BreadcrumbsProps) => {
  const location = useLocation();
  
  const getPathSegments = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Create readable names for segments
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name,
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getPathSegments();
  
  // Don't show breadcrumbs on the home page
  if (location.pathname === '/' && !customItems) {
    return null;
  }

  // Generate structured data for SEO
  const structuredData = breadcrumbSchema(
    breadcrumbs.map(item => ({
      name: item.name,
      url: `https://vizeel.com${item.path}`
    }))
  );

  return (
    <>
      {/* Structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Breadcrumb navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}
        role="navigation"
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    className="w-4 h-4 mx-1 text-muted-foreground/50" 
                    aria-hidden="true"
                  />
                )}
                
                {isLast ? (
                  <span 
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-foreground transition-colors duration-200 flex items-center"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {index === 0 && (
                      <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                    )}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;