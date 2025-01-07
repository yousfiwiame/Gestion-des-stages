import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/Admin/AuthenticationComponents/LoginComponent';
import ForgotPasswordComponent from './components/Admin/AuthenticationComponents/forgotPasswordComponent';
import ResetPasswordComponent from './components/Admin/AuthenticationComponents/resetPasswordComponent';
import DashboardComponent from './components/Admin/DashboardComponents/DashboardComponent';
import AddEmployeeComponent from './components/Employees/AddEmployeeComponent';
import ListEmployeeComponent from "./components/Employees/ListEmployeeComponent";
import AddProductComponent from './components/Products/AddProductComponent';
import ListProductComponent from "./components/Products/ListProductComponent";
import ViewEmployeeComponent from "./components/Employees/ViewEmployeeComponent";
import AssignProductsComponent from "./components/Products/AssignProductComponent";
import ViewProductComponent from "./components/Products/ViewProductComponent";
import AssignProductToEmployeeComponent from "./components/Products/AssignProductToEmployeeComponent";
import PrivateRoute from "./components/Admin/AuthenticationComponents/PrivateRoute";
import AdminProfile from './components/Admin/AccountComponents/AdminProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/reset-password/:token" element={<ResetPasswordComponent />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/account" element={<AdminProfile />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<AddEmployeeComponent />} />
          <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
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
