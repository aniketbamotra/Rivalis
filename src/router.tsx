import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy load pages for code splitting
const ContractReview = React.lazy(() => import('./pages/Services/ContractReview').then(m => ({ default: m.ContractReview })));
const DataPrivacy = React.lazy(() => import('./pages/Services/DataPrivacy').then(m => ({ default: m.DataPrivacy })));
const Immigration = React.lazy(() => import('./pages/Services/Immigration').then(m => ({ default: m.Immigration })));
const EmploymentLaw = React.lazy(() => import('./pages/Services/EmploymentLaw').then(m => ({ default: m.EmploymentLaw })));
const EntityFormation = React.lazy(() => import('./pages/Services/EntityFormation').then(m => ({ default: m.EntityFormation })));
const IPStrategy = React.lazy(() => import('./pages/Services/IPStrategy').then(m => ({ default: m.IPStrategy })));
const FraudInvestigation = React.lazy(() => import('./pages/Services/FraudInvestigation').then(m => ({ default: m.FraudInvestigation })));
const Fundraising = React.lazy(() => import('./pages/Services/Fundraising').then(m => ({ default: m.Fundraising })));
const GovernanceCompliance = React.lazy(() => import('./pages/Services/GovernanceCompliance').then(m => ({ default: m.GovernanceCompliance })));
const MAndA = React.lazy(() => import('./pages/Services/MAndA').then(m => ({ default: m.MAndA })));

// Immigration sub-pages
const WorkVisas = React.lazy(() => import('./pages/Services/Immigration/WorkVisas').then(m => ({ default: m.default })));
const EB1ExtraordinaryAbility = React.lazy(() => import('./pages/Services/Immigration/EB1ExtraordinaryAbility').then(m => ({ default: m.default })));
const EB2NIW = React.lazy(() => import('./pages/Services/Immigration/EB2NIW').then(m => ({ default: m.default })));
const EB5Investor = React.lazy(() => import('./pages/Services/Immigration/EB5Investor').then(m => ({ default: m.default })));

// Form pages
const ImmigrationIntake = React.lazy(() => import('./pages/Forms/ImmigrationIntake').then(m => ({ default: m.ImmigrationIntake })));
const AIGovernanceIntake = React.lazy(() => import('./pages/Forms/AIGovernanceIntake').then(m => ({ default: m.AIGovernanceIntake })));
const FraudInvestigationIntake = React.lazy(() => import('./pages/Forms/FraudInvestigationIntake').then(m => ({ default: m.FraudInvestigationIntake })));
const MAIntake = React.lazy(() => import('./pages/Forms/MAIntake').then(m => ({ default: m.MAIntake })));
const ContractReviewIntake = React.lazy(() => import('./pages/Forms/ContractReviewIntake'));
const DataPrivacyIntake = React.lazy(() => import('./pages/Forms/DataPrivacyIntake'));
const IPStrategyIntake = React.lazy(() => import('./pages/Forms/IPStrategyIntake'));
const EmploymentLawIntake = React.lazy(() => import('./pages/Forms/EmploymentLawIntake'));
const EntityFormationIntake = React.lazy(() => import('./pages/Forms/EntityFormationIntake'));
const FundraisingIntake = React.lazy(() => import('./pages/Forms/FundraisingIntake'));
const WorkVisaIntake = React.lazy(() => import('./pages/Forms/WorkVisaIntake').then(m => ({ default: m.default })));
const EB1Intake = React.lazy(() => import('./pages/Forms/EB1Intake').then(m => ({ default: m.default })));
const EB2NIWIntake = React.lazy(() => import('./pages/Forms/EB2NIWIntake').then(m => ({ default: m.default })));
const EB5Intake = React.lazy(() => import('./pages/Forms/EB5Intake').then(m => ({ default: m.default })));

// Legal pages
const Terms = React.lazy(() => import('./pages/Legal/Terms').then(m => ({ default: m.Terms })));
const Privacy = React.lazy(() => import('./pages/Legal/Privacy').then(m => ({ default: m.Privacy })));
const Disclaimers = React.lazy(() => import('./pages/Legal/Disclaimers').then(m => ({ default: m.Disclaimers })));
const LegalInformation = React.lazy(() => import('./pages/Legal/LegalInformation').then(m => ({ default: m.LegalInformation })));

// Auth pages
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = React.lazy(() => import('./pages/Auth/SignupPage').then(m => ({ default: m.SignupPage })));

// Payment pages
const PaymentSuccess = React.lazy(() => import('./pages/PaymentSuccess').then(m => ({ default: m.PaymentSuccess })));

// Dashboard pages
const UserDashboard = React.lazy(() => import('./pages/Dashboard/UserDashboard').then(m => ({ default: m.UserDashboard })));
const AdminDashboard = React.lazy(() => import('./pages/Dashboard/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <ServicesProvider>
          <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />

        {/* Service Pages */}
        <Route
          path="/services/contracts"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <ContractReview />
            </React.Suspense>
          }
        />
        <Route
          path="/services/data-privacy"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <DataPrivacy />
            </React.Suspense>
          }
        />
        <Route
          path="/services/immigration"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <Immigration />
            </React.Suspense>
          }
        />
        <Route
          path="/services/immigration/work-visas"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <WorkVisas />
            </React.Suspense>
          }
        />
        <Route
          path="/services/immigration/eb1"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB1ExtraordinaryAbility />
            </React.Suspense>
          }
        />
        <Route
          path="/services/immigration/eb2-niw"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB2NIW />
            </React.Suspense>
          }
        />
        <Route
          path="/services/immigration/eb5"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB5Investor />
            </React.Suspense>
          }
        />
        <Route
          path="/services/employment"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EmploymentLaw />
            </React.Suspense>
          }
        />
        <Route
          path="/services/entity-formation"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EntityFormation />
            </React.Suspense>
          }
        />
        <Route
          path="/services/ip-strategy"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <IPStrategy />
            </React.Suspense>
          }
        />
        <Route
          path="/services/fraud-investigation"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <FraudInvestigation />
            </React.Suspense>
          }
        />
        <Route
          path="/services/fundraising"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <Fundraising />
            </React.Suspense>
          }
        />
        <Route
          path="/services/governance"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <GovernanceCompliance />
            </React.Suspense>
          }
        />
        <Route
          path="/services/ma"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <MAndA />
            </React.Suspense>
          }
        />

        {/* Form Pages */}
        <Route
          path="/forms/immigration"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <ImmigrationIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/work-visa-intake"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <WorkVisaIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/eb1-intake"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB1Intake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/eb2-niw-intake"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB2NIWIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/eb5-intake"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EB5Intake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/ai-governance"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <AIGovernanceIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/fraud-investigation"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <FraudInvestigationIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/ma"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <MAIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/contracts"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <ContractReviewIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/data-privacy"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <DataPrivacyIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/ip-strategy"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <IPStrategyIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/employment-law"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EmploymentLawIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/entity-formation"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <EntityFormationIntake />
            </React.Suspense>
          }
        />
        <Route
          path="/forms/fundraising"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <FundraisingIntake />
            </React.Suspense>
          }
        />

        {/* Legal Pages */}
        <Route
          path="/legal"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <LegalInformation />
            </React.Suspense>
          }
        />
        <Route
          path="/legal/terms"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <Terms />
            </React.Suspense>
          }
        />
        <Route
          path="/legal/privacy"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <Privacy />
            </React.Suspense>
          }
        />
        <Route
          path="/legal/disclaimers"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <Disclaimers />
            </React.Suspense>
          }
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <SignupPage />
            </React.Suspense>
          }
        />

        {/* Payment Pages */}
        <Route
          path="/payment-success"
          element={
            <React.Suspense fallback={<PageLoader />}>
              <PaymentSuccess />
            </React.Suspense>
          }
        />

        {/* Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<PageLoader />}>
                <UserDashboard />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <React.Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
        </ServicesProvider>
      </AuthProvider>
    </Router>
  );
};
