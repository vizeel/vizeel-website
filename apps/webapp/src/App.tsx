import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Affiliates from "./pages/Affiliates";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import AdminLayout from "./pages/admin/AdminLayout";
import WaitList from "./pages/admin/WaitList";
import AdminBlogPost from "./pages/admin/BlogPost";
import Places from "./pages/admin/Places";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ReCaptchaProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/price" element={<Navigate to="/pricing" replace />} />
              <Route path="/affiliates" element={<Affiliates />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="wait-list" element={<WaitList />} />
                <Route path="blog-post" element={<AdminBlogPost />} />
                <Route path="places" element={<Places />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ReCaptchaProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
