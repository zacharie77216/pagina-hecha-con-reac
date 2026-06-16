import React, { useState } from 'react';
import './FormsModal.css';

export default function FormsModal({ open, initialTab = 'login', onClose, onRegister }) {
  const [tab, setTab] = useState(initialTab);

  const [registerForm, setRegisterForm] = useState({ nombre: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  if (!open) return null;

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!registerForm.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!registerForm.email.trim()) newErrors.email = 'El email es obligatorio.';
    else if (!validateEmail(registerForm.email)) newErrors.email = 'Formato de email inválido.';
    if (!registerForm.password.trim()) newErrors.password = 'La contraseña es obligatoria.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onRegister(registerForm);
    setSuccessMsg('¡Inscripción exitosa! Ahora puedes iniciar sesión.');
    setRegisterForm({ nombre: '', email: '', password: '' });
    setTimeout(() => {
      setSuccessMsg('');
      setTab('login');
    }, 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!loginForm.email.trim()) newErrors.email = 'El email es obligatorio.';
    else if (!validateEmail(loginForm.email)) newErrors.email = 'Formato de email inválido.';
    if (!loginForm.password.trim()) newErrors.password = 'La contraseña es obligatoria.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMsg('¡Inicio de sesión exitoso!');
    setLoginForm({ email: '', password: '' });
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!contactForm.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!contactForm.email.trim()) newErrors.email = 'El email es obligatorio.';
    else if (!validateEmail(contactForm.email)) newErrors.email = 'Formato de email inválido.';
    if (!contactForm.mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMsg('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    setContactForm({ nombre: '', email: '', mensaje: '' });
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 2000);
  };

  // Se usa stopPropagation en el content para que el click en el overlay lo cierre, pero dentro no.
  return (
    <div className="modal-overlay forms-modal-overlay" onClick={onClose}>
      <div className="forms-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="forms-modal-close" onClick={onClose}>&times;</button>
        
        <div className="forms-tabs">
          <button className={`form-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setErrors({}); setSuccessMsg(''); }}>Login</button>
          <button className={`form-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setErrors({}); setSuccessMsg(''); }}>Registro</button>
          <button className={`form-tab ${tab === 'contact' ? 'active' : ''}`} onClick={() => { setTab('contact'); setErrors({}); setSuccessMsg(''); }}>Contacto</button>
        </div>

        <div className="forms-body">
          {successMsg && <div className="forms-success">{successMsg}</div>}

          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="beautiful-form" noValidate>
              <h3 className="form-title">Crear Cuenta</h3>
              <div className="form-group">
                <label htmlFor="reg-nombre">Nombre Completo</label>
                <input 
                  type="text" 
                  id="reg-nombre" 
                  value={registerForm.nombre} 
                  onChange={(e) => setRegisterForm({...registerForm, nombre: e.target.value})}
                  placeholder="Ej. Mario Bros"
                />
                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="reg-email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="reg-email" 
                  value={registerForm.email} 
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  placeholder="mario@nintendo.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Contraseña</label>
                <input 
                  type="password" 
                  id="reg-password" 
                  value={registerForm.password} 
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  placeholder="••••••••"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>
              <button type="submit" className="btn-pill btn-primary form-submit">Inscribirse</button>
            </form>
          )}

          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="beautiful-form" noValidate>
              <h3 className="form-title">Iniciar Sesión</h3>
              <div className="form-group">
                <label htmlFor="log-email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="log-email" 
                  value={loginForm.email} 
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="mario@nintendo.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="log-password">Contraseña</label>
                <input 
                  type="password" 
                  id="log-password" 
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="••••••••"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>
              <button type="submit" className="btn-pill btn-primary form-submit">Entrar</button>
            </form>
          )}

          {tab === 'contact' && (
            <form onSubmit={handleContactSubmit} className="beautiful-form" noValidate>
              <h3 className="form-title">Contáctanos</h3>
              <div className="form-group">
                <label htmlFor="con-nombre">Nombre</label>
                <input 
                  type="text" 
                  id="con-nombre" 
                  value={contactForm.nombre} 
                  onChange={(e) => setContactForm({...contactForm, nombre: e.target.value})}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="con-email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="con-email" 
                  value={contactForm.email} 
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="Tu correo"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="con-mensaje">Mensaje</label>
                <textarea 
                  id="con-mensaje" 
                  value={contactForm.mensaje} 
                  onChange={(e) => setContactForm({...contactForm, mensaje: e.target.value})}
                  placeholder="¿En qué te podemos ayudar?"
                  rows="4"
                ></textarea>
                {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
              </div>
              <button type="submit" className="btn-pill btn-primary form-submit">Enviar Mensaje</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
