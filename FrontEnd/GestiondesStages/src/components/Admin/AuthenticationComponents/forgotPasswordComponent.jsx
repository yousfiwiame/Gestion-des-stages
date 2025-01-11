import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import AuthService from '../../../service/AuthService';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.forgotPassword(email);
      if (response.status === 200) {
        setSuccess(true);
        setError(false);
      } else {
        setSuccess(false);
        setError(true);
      }
    } catch (error) {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <div className="forgotPassword-container">
      <div className="card">
        <div className="card-body p-3 p-lg-5 text-black">
          <form onSubmit={handleSubmit}>
            {success && (
              <div className="success-container">
                <div className="alert alert-success text-white">
                  Un e-mail vous a été envoyé pour réinitialiser votre mot de passe. Veuillez vérifier votre courrier indésirable si l'e-mail n'est pas visible !
                </div>
              </div>
            )}
            {error && (
              <div className="error-container">
                <div className="alert alert-danger text-white">
                  L'adresse e-mail est invalide ou le jeton a expiré. Veuillez vérifier les informations fournies.
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center flex-column mb-3 pb-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Ensias2.jpg" style={{ width: '120px', height: '100px' }} alt="logo" />
              <br />
              <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                Réinitialiser votre mot de passe
              </h5>
              <p>
                Entrez votre adresse e-mail, afin que nous puissions vous envoyer les instructions pour vous aider à réinitialiser votre mot de passe.
              </p>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-1 mb-4" style={{ textAlign: 'center' }}>
              <button className="btn btn-dark btn-lg btn-block" type="submit">Envoyer</button>
              <br />
              <br />
              <Link className="small text-muted" to="/login">Se Connecter</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
