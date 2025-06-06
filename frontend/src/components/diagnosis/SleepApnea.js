import React from 'react';
import './diagnose.css';
import HeadBar from '../headbar/headbar';
import { useLocation } from "react-router-dom";

function SleepAnea() {
  const result = "Sleep Apnea"
  return (
    <>
      <HeadBar />
      <div className="diagnose-page">
        <h1 className="diagnose-heading">Results</h1>

        <p className="diagnose-summary">
          You may be at risk of <strong>{result}</strong>.
        </p>

        <section className="diagnose-resources">
          <h2>Further Reading</h2>
          <p>Explore more about your potential sleep issue:</p>
          <ul>
            <li>
              <a href = " https://www.sleepfoundation.org/sleep-apnea">
                Sleep Foundation: Understanding {result}
              </a>
            </li>
            <li>
              <a href = " https://www.mayoclinic.org/diseases-conditions/sleep-apnea">
                CDC: About {result}
              </a>
            </li>
            <li>
              <a href="https://www.mayoclinic.org/diseases-conditions/sleep-disorders">
                Mayo Clinic: Sleep Disorders Overview
              </a>
            </li>
          </ul>
        </section>

        <footer className="diagnose-disclaimer">
          <p>
            <strong>Disclaimer:</strong> This result is informational only and not a substitute for professional medical advice. Please consult a licensed healthcare provider for diagnosis and treatment.
          </p>
        </footer>
      </div>
    </>
  );
}

export default SleepAnea;
