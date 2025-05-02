import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useNegotiationStore from '../store/negotiationStore';
import '../styles/Negotiation.css';

function Negotiation() {
  const navigate = useNavigate();
  const { 
    currentRound, 
    scenario, 
    loadScenario, 
    advanceRound, 
    restartNegotiation 
  } = useNegotiationStore();
  
  const [showTip, setShowTip] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const [audioResponse, setAudioResponse] = useState(null);

  useEffect(() => {
    // Load scenario data when component mounts
    loadScenario();
  }, [loadScenario]);

  // Handle when user reaches the end of the negotiation
  useEffect(() => {
    if (scenario && currentRound >= scenario.rounds.length - 1) {
      navigate('/debrief');
    }
  }, [currentRound, scenario, navigate]);

  const handleOptionClick = (isCorrect) => {
    setIsCorrect(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      // Wait 2 seconds before advancing to next round
      setTimeout(() => {
        setShowFeedback(false);
        advanceRound();
      }, 2000);
    } else {
      // Wait 2 seconds before restarting
      setTimeout(() => {
        setShowFeedback(false);
        restartNegotiation();
      }, 2000);
    }
  };

  const handleAskTip = () => {
    setShowTip(true);
  };

  const handleCloseTip = () => {
    setShowTip(false);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setAskingQuestion(true);
    
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        setAudioResponse({
          transcript: `Here's my advice about "${question}": Focus on building rapport first before discussing technical details.`
        });
        setAskingQuestion(false);
      }, 1500);
    } catch (error) {
      console.error('Error asking question:', error);
      setAskingQuestion(false);
    }
  };

  if (!scenario || !scenario.rounds || scenario.rounds.length === 0) {
    return <div className="loading">Loading negotiation...</div>;
  }

  const round = scenario.rounds[currentRound];
  const tipVideo = scenario.tips && round.tipKey ? scenario.tips[round.tipKey]?.videoUrl : null;

  return (
    <div className="negotiation-container">
      <div className="negotiation-left">
        <div className="avatar-container">
          <div className="video-placeholder">
            {tipVideo ? (
              <ReactPlayer 
                url="/videos/placeholder-tip.mp4" 
                width="100%" 
                height="100%" 
                controls={false}
                playing={showTip}
              />
            ) : (
              <div className="kirk-avatar">Kirk Kinnell</div>
            )}
          </div>
          <button className="ask-tip-button" onClick={handleAskTip}>
            Ask Tip
          </button>
        </div>
        
        <div className="question-area">
          <input
            type="text"
            placeholder="Ask Kirk a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={askingQuestion}
          />
          <button 
            onClick={handleAskQuestion}
            disabled={askingQuestion || !question.trim()}
          >
            {askingQuestion ? 'Asking...' : 'Ask'}
          </button>
        </div>
        
        {audioResponse && (
          <div className="audio-response">
            <p>{audioResponse.transcript}</p>
            <button onClick={() => setAudioResponse(null)}>Close</button>
          </div>
        )}
      </div>
      
      <div className="negotiation-right">
        <div className="chat-container">
          <div className="ceo-message">
            <div className="message-bubble">
              {round.ceoText}
            </div>
          </div>
          
          <div className="options-container">
            {round.options && (
              <>
                <button 
                  className="option-button"
                  onClick={() => handleOptionClick(round.options.A.correct)}
                >
                  {round.options.A.text}
                </button>
                <button 
                  className="option-button"
                  onClick={() => handleOptionClick(round.options.B.correct)}
                >
                  {round.options.B.text}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {showTip && (
        <div className="tip-modal">
          <div className="tip-content">
            <h3>Kirk's Tip</h3>
            <div className="tip-video">
              {/* Placeholder for tip video */}
              <ReactPlayer 
                url="/videos/placeholder-tip.mp4" 
                width="100%" 
                height="100%" 
                controls={true}
                playing={true}
              />
            </div>
            <button onClick={handleCloseTip}>Close</button>
          </div>
        </div>
      )}
      
      {showFeedback && (
        <div className="feedback-overlay">
          <div className={`feedback-content ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <h2>Correct!</h2>
                <p>Moving to the next round...</p>
              </>
            ) : (
              <>
                <h2>Incorrect</h2>
                <p>Let's try again from the beginning...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Negotiation; 