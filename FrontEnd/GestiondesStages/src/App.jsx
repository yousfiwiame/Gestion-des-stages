import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Homepage/Indexpage';
import LoginComponent from './components/Admin/AuthenticationComponents/LoginComponent';
import ForgotPasswordComponent from './components/Admin/AuthenticationComponents/forgotPasswordComponent';
import ResetPasswordComponent from './components/Admin/AuthenticationComponents/resetPasswordComponent';
import DashboardComponent from './components/Admin/DashboardComponents/DashboardComponent';
import AddEntrepriseComponent from './components/Entreprises/AddEntrepriseComponent';
import ListEntrepriseComponent from "./components/Entreprises/ListEntrepriseComponent";
import ViewEntrepriseComponent from "./components/Entreprises/ViewEntrepriseComponent";
import AddEtudiantComponent from './components/Etudiants/AddEtudiantComponent';
import ListEtudiantComponent from "./components/Etudiants/ListEtudiantComponent";
import AddProductComponent from './components/Products/AddProductComponent';
import ListProductComponent from "./components/Products/ListProductComponent";
import ViewEtudiantComponent from "./components/Etudiants/ViewEtudiantComponent";
import AssignProductsComponent from "./components/Products/AssignProductComponent";
import ViewProductComponent from "./components/Products/ViewProductComponent";
import AssignProductToEmployeeComponent from "./components/Products/AssignProductToEmployeeComponent";
import PrivateRoute from "./components/Admin/AuthenticationComponents/PrivateRoute";
import AdminProfile from './components/Admin/AccountComponents/AdminProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/login/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/login/reset-password/:token" element={<ResetPasswordComponent />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<DashboardComponent />} />
          <Route path="/admin/account" element={<AdminProfile />} />
          <Route path="/students/list" element={<ListEtudiantComponent />} />
          <Route path="/add-student" element={<AddEtudiantComponent />} />
          <Route path="/update-student/:id" element={<AddEtudiantComponent />} />
          <Route path="/view-student/:id" element={<ViewEtudiantComponent />} />
          <Route path="/companies/list" element={<ListEntrepriseComponent />} />
          <Route path="/add-company" element={<AddEntrepriseComponent />} />
          <Route path="/update-company/:id" element={<AddEntrepriseComponent />} />
          <Route path="/view-company/:id" element={<ViewEntrepriseComponent />} />
          <Route path="/assign-products/:id" element={<AssignProductsComponent />} />
          <Route path="/products" element={<ListProductComponent />} />
          <Route path="/add-product" element={<AddProductComponent />} />
          <Route path="/update-product/:id" element={<AddProductComponent />} />
          <Route path="/view-product/:id" element={<ViewProductComponent />} />
          <Route path="/assign-product/:id" element={<AssignProductToEmployeeComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
