import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import AuthService from '../../../service/AuthService';

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    setPasswordError('');
    try {
      const response = await AuthService.resetPassword(token, newPassword);
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
    <div className="resetPassword-container">
      <div className="card">
        <div className="card-body p-3 p-lg-5 text-black">
          <form onSubmit={handleResetPassword}>
            {success && (
              <div className="success-container">
                <div className="alert alert-success text-white">
                  Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.
                </div>
              </div>
            )}
            {error && (
              <div className="error-container">
                <div className="alert alert-danger text-white">
                  Les mots de passe ne correspondent pas. Veuillez vérifier les informations fournies.
                </div>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center flex-column mb-3 pb-1">
              <img src="https://www.mamda-mcma.ma/sites/default/files/logo.png" style={{ width: '200px', height: '100px' }} alt="logo" />
              <br />
              <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                Modifiez votre mot de passe
              </h5>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="newPassword">Mot de Passe</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control form-control-lg"
                placeholder="Entrez votre nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="confirmPassword">Confirmation du mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control form-control-lg"
                placeholder="Confirmez votre nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => {
                  if (newPassword !== confirmPassword) {
                    setPasswordError('Les mots de passe ne correspondent pas');
                  } else {
                    setPasswordError('');
                  }
                }}
              />
              {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
            </div>
            <div className="pt-1 mb-4" style={{ textAlign: 'center' }}>
              <button className="btn btn-dark btn-lg btn-block" type="submit">
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
