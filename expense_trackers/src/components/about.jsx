// About.jsx
import React from 'react';
import './styles.css';

function About() {
  return (
    <div className='Z'>
      <div className="about-page">
        <header className="about-header">
          <h1>About Expense Tracker</h1>
        </header>

        <section className="about-section" id="project-description">
          <h2>Welcome to Expense Tracker</h2>
          <p>
            At Expense Tracker, we are passionate about helping you manage and track your expenses efficiently. Our dedicated team works tirelessly to provide a user-friendly platform that simplifies expense tracking.
          </p>
        </section>

        <section className="about-section" id="mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower individuals and businesses to make informed financial decisions. We believe in financial transparency and aim to help users achieve their financial goals.
          </p>
        </section>

        <section className="about-section" id="team">
          <h2>The Expense Tracker Team</h2>

          <article className="team-member">
            <h3>Madhan Kumar K</h3>
            
            </article>

          <article className="team-member">
            <h3>Suganth B</h3>
           </article>

          <article className="team-member">
            <h3>Kumaresan D</h3>
          </article>
        </section>
      </div>
    </div>
  );
}

export default About;
