import React from 'react';
import './Landingpage.css'; // CSS file for styles
import heroImg from '../../assets/img/hero/étudiante.png'; // Placeholder for hero image
import logo from '../../assets/img/hero/ensias.png'; // Placeholder for logo image

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <a href="#" className="logo">
        <img src={logo} alt="Logo" />
      </a>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>Find Your Dream Internship</h1>
        <p>Discover exciting internship opportunities and kickstart your career with us.</p>
        <a href="#services" className="btn">Get Started</a>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Hero" />
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="services">
    <div className="container">
      <h2>Our Services</h2>
      <div className="services-content">
        <div className="service">
          <h3>For Students</h3>
          <p>Explore various internships tailored to your field of study and gain valuable experience.</p>
        </div>
        <div className="service">
          <h3>For Companies</h3>
          <p>Post internship opportunities and find talented students eager to contribute to your projects.</p>
        </div>
        <div className="service">
          <h3>Support</h3>
          <p>Get guidance and support throughout the internship application process.</p>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="testimonials">
    <div className="container">
      <h2>What People Say</h2>
      <div className="testimonials-content">
        <div className="testimonial">
          <p>"This platform helped me find the perfect internship and gain valuable experience."</p>
          <h4>- Student</h4>
        </div>
        <div className="testimonial">
          <p>"We discovered talented interns who made a significant impact on our projects."</p>
          <h4>- Company</h4>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="container">
      <p>© 2025 Internship Website. All rights reserved.</p>
    </div>
  </footer>
);

const LandingPage = () => (
  <div>
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <TestimonialsSection />
    <Footer />
  </div>
);

export default LandingPage;