import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../service/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
      setIsLoading(true);
      setMessage('');
      const redirectPath = await login({ email, password });
      navigate(redirectPath);
    } catch (error) {
      setMessage(error.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-body">
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleLogin}>
            <div className="d-flex align-items-center justify-content-center flex-column mb-3 pb-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/13/Ensias2.jpg"
                style={{ width: '120px', height: '100px' }}
                alt="logo"
              />
              <br />
              <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                Connectez-vous à votre compte
              </h5>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">
                Mot de Passe
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <span className="password-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
            </div>
            <div className="pt-1 mb-4" style={{ textAlign: 'center' }}>
              <button 
                className="btn btn-dark btn-lg btn-block" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se Connecter'}
              </button>
              <br />
              <br />
              <span>
                Mot de Passe oublié ? <Link to="forgot-password">Cliquez ici !</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;