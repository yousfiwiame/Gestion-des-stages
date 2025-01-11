import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../../service/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutMessage = localStorage.getItem('logoutMessage');
    if (logoutMessage) {
      setMessage(logoutMessage);
      localStorage.removeItem('logoutMessage');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Entrez votre email et mot de passe');
      return;
    }

    try {
      const response = await AuthService.login(email, password);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setMessage('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setMessage('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
          {message && <div className='alert alert-danger'>{message}</div>}
          <form onSubmit={handleLogin}>
            <div className="d-flex align-items-center justify-content-center flex-column mb-3 pb-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Ensias2.jpg" style={{ width: '120px', height: '100px' }} alt="logo" />
              <br />
              <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                Connectez-vous à votre compte
              </h5>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="text"
                id="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">Mot de Passe</label>
              <div className="password-container">
                <input type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="password-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
            </div>
            <div className="pt-1 mb-4" style={{ textAlign: 'center' }}>
              <button className="btn btn-dark btn-lg btn-block" type="submit">Se Connecter</button>
              <br />
              <br />
              <span>Mot de Passe oublié ? <Link to="forgot-password">Cliquez ici !</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
