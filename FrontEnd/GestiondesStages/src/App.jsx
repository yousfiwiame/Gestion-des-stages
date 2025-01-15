import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/Admin/AuthenticationComponents/PrivateRoute';
import LoginComponent from './components/Admin/AuthenticationComponents/LoginComponent';
import ForgotPasswordComponent from './components/Admin/AuthenticationComponents/forgotPasswordComponent';
import ResetPasswordComponent from './components/Admin/AuthenticationComponents/resetPasswordComponent';
import AdminDashboardComponent from './components/Admin/DashboardComponents/AdminDashboardComponent';
import AddEntrepriseComponent from './components/Entreprises/AddEntrepriseComponent';
import ListEntrepriseComponent from "./components/Entreprises/ListEntrepriseComponent";
import ViewEntrepriseComponent from "./components/Entreprises/ViewEntrepriseComponent";
import AddEtudiantComponent from './components/Etudiants/AddEtudiantComponent';
import ListEtudiantComponent from "./components/Etudiants/ListEtudiantComponent";
import ViewEtudiantComponent from "./components/Etudiants/ViewEtudiantComponent";
import AdminProfile from './components/Admin/AccountComponents/AdminProfile';
import AddOffreStageComponent from './components/OffresDeStages/AddOffreStageComponent';
import ListOffreStageComponent from './components/OffresDeStages/ListOffreStageComponent';
import ViewOffreStageComponent from './components/OffresDeStages/ViewOffreStageComponent';
import EntrepriseDashboardComponent from './components/Entreprises/DashboardComponents/EntrepriseDashboardComponent';
import EntrepriseProfile from './components/Entreprises/AccountComponents/EntrepriseProfile';
import EtudiantDashboardComponent from './components/Etudiants/DashboardComponents/EtudiantDashboardComponent';
import EtudiantProfile from './components/Etudiants/AccountComponents/EtudiantProfile';
import OffreStageComponent from './components/OffresDeStages/OffreStageComponent';
import VoirOffreStageComponent from './components/OffresDeStages/VoirOffreStageComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/reset-password/:token" element={<ResetPasswordComponent />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AdminDashboardComponent />
          </PrivateRoute>
        } />
        <Route path="/admin/account" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AdminProfile />
          </PrivateRoute>
        } />

        {/* Student Management */}
        <Route path="/students/list" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <ListEtudiantComponent />
          </PrivateRoute>
        } />
        <Route path="/add-student" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AddEtudiantComponent />
          </PrivateRoute>
        } />
        <Route path="/update-student/:id" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AddEtudiantComponent />
          </PrivateRoute>
        } />
        <Route path="/view-student/:id" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <ViewEtudiantComponent />
          </PrivateRoute>
        } />

        {/* Company Management */}
        <Route path="/companies/list" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <ListEntrepriseComponent />
          </PrivateRoute>
        } />
        <Route path="/add-company" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AddEntrepriseComponent />
          </PrivateRoute>
        } />
        <Route path="/update-company/:id" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AddEntrepriseComponent />
          </PrivateRoute>
        } />
        <Route path="/view-company/:id" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <ViewEntrepriseComponent />
          </PrivateRoute>
        } />

        {/* Company routes */}

        <Route path="/company/dashboard" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <EntrepriseDashboardComponent />
          </PrivateRoute>
        } />
        <Route path="/company/account" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <EntrepriseProfile />
          </PrivateRoute>
        } />

        {/* Internship Offers Management */}
        <Route path="/stages-offres/list" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <ListOffreStageComponent />
          </PrivateRoute>
        } />
        <Route path="/add-offre-stage" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <AddOffreStageComponent />
          </PrivateRoute>
        } />
        <Route path="/update-offre-stage/:id" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <AddOffreStageComponent />
          </PrivateRoute>
        } />
        <Route path="/view-offre-stage/:id" element={
          <PrivateRoute allowedRoles={['ENTREPRISE']}>
            <ViewOffreStageComponent />
          </PrivateRoute>
        } />

        {/* Student routes */}

        <Route path="/student/dashboard" element={
          <PrivateRoute allowedRoles={['ETUDIANT']}>
            <EtudiantDashboardComponent />
          </PrivateRoute>
        } />
        <Route path="/student/account" element={
          <PrivateRoute allowedRoles={['ETUDIANT']}>
            <EtudiantProfile />
          </PrivateRoute>
        } />

        {/* Internship Offers Management */}
        <Route path="/offre-stage/list" element={
          <PrivateRoute allowedRoles={['ETUDIANT']}>
            <OffreStageComponent />
          </PrivateRoute>
        } />

        <Route path="/view-offre/:id" element={
          <PrivateRoute allowedRoles={['ETUDIANT']}>
            <VoirOffreStageComponent />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
