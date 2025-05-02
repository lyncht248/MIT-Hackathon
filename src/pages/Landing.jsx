import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="disclaimer-box">
        <h1>Kirk Kinnel Negotiation Experience</h1>
        <div className="disclaimer">
          <h2>Disclaimer</h2>
          <p>
            This is a fictional negotiation scenario created for training purposes only. 
            In this simulation, you will play the role of OpenAI negotiating with 23andMe.
            All characters and scenarios are fictional and any resemblance to real 
            negotiations or individuals is coincidental.
          </p>
        </div>
        <button 
          className="start-button"
          onClick={() => navigate('/negotiation')}
        >
          Start Negotiation
        </button>
      </div>
    </div>
  );
}

export default Landing; 