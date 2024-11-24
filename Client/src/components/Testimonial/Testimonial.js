import React from 'react';
import './Testimonial.css';

function Testimonial() {
  return (
    <section className="testimonial">
      <h2 className="testimonial-heading">What Our Users Say</h2>
      <div className="testimonial-cards">
        <div className="testimonial-card">
          <p>"I found my lost ID card within hours thanks to NITConnect!"</p>
          <p>- John Doe</p>
        </div>
        <div className="testimonial-card">
          <p>"This platform has made connecting with the campus community so much easier."</p>
          <p>- Jane Smith</p>
        </div>
        <div className="testimonial-card">
          <p>"Highly recommend NITConnect to anyone on campus."</p>
          <p>- Ravi Kumar</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
