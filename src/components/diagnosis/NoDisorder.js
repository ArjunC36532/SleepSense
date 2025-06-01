import React from 'react';
import './diagnose.css';
import HeadBar from '../headbar/headbar';

function NoDisorder() {
  return (
    <>
      <HeadBar />
      <div className="diagnose-page">
        <h1 className="diagnose-heading">Results</h1>

        <p className="diagnose-summary">
          Good news! No significant sleep disorders were detected in your assessment.
        </p>

        <section className="diagnose-resources">
          <h2>Maintaining Healthy Sleep</h2>
          <p>While no disorders were detected, here are some tips to maintain good sleep health:</p>
          <ul>
            <li>
              <a href="https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips">
                Sleep Foundation: Tips for Better Sleep
              </a>
            </li>
            <li>
              <a href="https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html">
                CDC: Sleep Hygiene
              </a>
            </li>
            <li>
              <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379">
                Mayo Clinic: 7 Steps to Better Sleep
              </a>
            </li>
          </ul>
        </section>

        <section className="wellness-tips">
          <h2>Wellness Tips</h2>
          <ul>
            <li>Maintain a consistent sleep schedule</li>
            <li>Create a relaxing bedtime routine</li>
            <li>Keep your bedroom cool, dark, and quiet</li>
            <li>Limit screen time before bed</li>
            <li>Exercise regularly, but not too close to bedtime</li>
            <li>Watch your caffeine and alcohol intake</li>
          </ul>
        </section>

        <footer className="diagnose-disclaimer">
          <p>
            <strong>Note:</strong> While no sleep disorders were detected, it's always good to maintain healthy sleep habits. If you experience any changes in your sleep patterns or have concerns, please consult a healthcare professional.
          </p>
        </footer>
      </div>
    </>
  );
}

export default NoDisorder; 