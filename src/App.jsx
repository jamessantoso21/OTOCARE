import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ScrollToTop from './UniversalComponents/ScrollToTop';

// Keep Login and Register with regular imports since they're entry points
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';

// Lazy load all protected routes
const HomePage = lazy(() => import('./components/Home/HomePage'));
const ProfilePage = lazy(() => import('./components/Profile/ProfilePage'));
const PaymentPage = lazy(() => import('./components/Payment/PaymentPage'));
const RepairShops = lazy(() => import('./components/RepairShops/RepairShops'));
const ShopServices = lazy(() => import('./components/ShopServices/ShopServices'));
const Services = lazy(() => import('./components/Services/Services'));
const ConfirmationPage = lazy(() => import('./components/Confirmation/ConfirmationPage'));
const Orders = lazy(() => import('./components/Orders/Orders'));
const WorkshopHome = lazy(() => import('./components/workshop-home/workshop-home'));
const WorkshopFormPage = lazy(() => import('./components/workshop-form/WorkshopFormPage'));
const WorkshopOrder = lazy(() => import('./components/workshop-order/workshop-order'));
const WorkshopConfirmation = lazy(() => import('./components/workshop-confirmation/workshop-confirmation'));

function App() {
  const { currentUser } = useContext(AuthContext);

  // RequireAuth component to check the role and ensure access
  const RequireAuth = ({ children, allowedRoles }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    // Check if the user's role is allowed for this route
    if (!allowedRoles.includes(currentUser.role)) {
      // If not allowed, redirect based on role
      if (currentUser.role === 'Customer') {
        return <Navigate to="/" />;
      } else if (currentUser.role === 'Workshop') {
        return <Navigate to="/workshopHome" />;
      }
    }
  
    return children;
  };
  

  // Loading component for Suspense fallback
  const LoadingSpinner = () => (
    <div className="loading-spinner">Loading...</div>
  );

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public routes */}
        <Route
          path="/"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth allowedRoles={['Customer', 'Workshop']}>
              <Suspense fallback={<LoadingSpinner />}>
                <ProfilePage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/payment/:searchID"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <PaymentPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/repairShops"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <RepairShops />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/shopServices/:searchID"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <ShopServices />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/services"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <Services />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/confirmation"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <ConfirmationPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth allowedRoles={['Customer']}>
              <Suspense fallback={<LoadingSpinner />}>
                <Orders />
              </Suspense>
            </RequireAuth>
          }
        />

        {/* Workshop-only routes */}
        <Route
          path="/workshopHome"
          element={
            <RequireAuth allowedRoles={['Workshop']}>
              <Suspense fallback={<LoadingSpinner />}>
                <WorkshopHome />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/workshopForm"
          element={
            <RequireAuth allowedRoles={['Workshop']}>
              <Suspense fallback={<LoadingSpinner />}>
                <WorkshopFormPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/workshopOrder"
          element={
            <RequireAuth allowedRoles={['Workshop']}>
              <Suspense fallback={<LoadingSpinner />}>
                <WorkshopOrder />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/workshopConfirmation"
          element={
            <RequireAuth allowedRoles={['Workshop']}>
              <Suspense fallback={<LoadingSpinner />}>
                <WorkshopConfirmation />
              </Suspense>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
