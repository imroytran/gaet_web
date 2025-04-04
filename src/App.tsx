
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BusinessArea from "./pages/BusinessArea";
import BusinessPage from "./pages/BusinessPage";
import NewsDetail from "./pages/NewsDetail";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import SubsidiariesPage from "./pages/SubsidiariesPage";
import HistoryPage from "./pages/about/HistoryPage";
import LeadershipPage from "./pages/about/LeadershipPage";
import OrganizationPage from "./pages/about/OrganizationPage";
import VisionPage from "./pages/about/VisionPage";
import ContactPage from "./pages/ContactPage";
import { SubsidiaryDetail } from "./pages/subsidiaries";
import Auth from "./pages/admin/Auth";
import Dashboard from "./pages/admin/Dashboard";
import NewsManagement from "./pages/admin/NewsManagement";
import NewsEditor from "./pages/admin/NewsEditor";
import BusinessAreaManagement from "./pages/admin/BusinessAreaManagement";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/history" element={<HistoryPage />} />
              <Route path="/about/leadership" element={<LeadershipPage />} />
              <Route path="/about/organization" element={<OrganizationPage />} />
              <Route path="/about/vision" element={<VisionPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/business" element={<BusinessPage />} />
              <Route path="/business/:areaId" element={<BusinessArea />} />
              <Route path="/subsidiaries" element={<SubsidiariesPage />} />
              <Route path="/subsidiaries/:slug" element={<SubsidiaryDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/auth" element={<Auth />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/news" 
                element={
                  <ProtectedRoute>
                    <NewsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/news/edit" 
                element={
                  <ProtectedRoute>
                    <NewsEditor />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/news/edit/:id" 
                element={
                  <ProtectedRoute>
                    <NewsEditor />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/business-areas" 
                element={
                  <ProtectedRoute>
                    <BusinessAreaManagement />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute>
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
