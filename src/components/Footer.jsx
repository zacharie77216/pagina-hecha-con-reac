import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-section">
          <div className="footer-icon">🎓</div>
          <div>
            <h4 className="footer-title">Sección</h4>
            <p className="footer-text">2026/O TI3031/D-FB50-N3-P13-C1/D<br/>La Granja FB5</p>
          </div>
        </div>
        
        <div className="footer-divider"></div>

        <div className="footer-section">
          <div className="footer-icon">👨‍🏫</div>
          <div>
            <h4 className="footer-title">Docente</h4>
            <p className="footer-text">Víctor Armando Vásquez Muñoz</p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-section">
          <div className="footer-icon">👨‍💻</div>
          <div>
            <h4 className="footer-title">Estudiante</h4>
            <p className="footer-text">Gabriel Ignacio Diaz Cespedes</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Proyecto Académico. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
