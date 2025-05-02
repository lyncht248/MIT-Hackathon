import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../styles/Debrief.css';

function Debrief() {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const debriefCategories = [
    {
      id: 'institutional',
      title: 'Institutional',
      content: 'Understanding the institutional context helps frame negotiations properly. In this case, OpenAI and 23andMe operate in different but overlapping sectors with distinct regulatory environments.'
    },
    {
      id: 'relational',
      title: 'Relational',
      content: 'Building rapport before diving into business details establishes trust. Notice how the successful approach acknowledged the CEO\'s perspective first.'
    },
    {
      id: 'situational',
      title: 'Situational',
      content: 'Each negotiation has unique circumstances. Here, the timing and market conditions created specific leverage points that could be utilized.'
    },
    {
      id: 'personal',
      title: 'Personal',
      content: 'Understanding the personal motivations of the other party is crucial. The 23andMe CEO had specific concerns about data privacy and company legacy that influenced their position.'
    }
  ];

  return (
    <div className="debrief-container">
      <h1>Negotiation Debrief</h1>
      
      <div className="debrief-video">
        <ReactPlayer 
          url="/videos/placeholder-debrief.mp4" 
          width="100%" 
          height="100%" 
          controls={true}
        />
      </div>
      
      <div className="debrief-categories">
        <h2>Key Negotiation Insights</h2>
        
        {debriefCategories.map(category => (
          <div key={category.id} className="category-card">
            <div 
              className="category-header" 
              onClick={() => toggleCategory(category.id)}
            >
              <h3>{category.title}</h3>
              <span>{expandedCategory === category.id ? '−' : '+'}</span>
            </div>
            
            {expandedCategory === category.id && (
              <div className="category-content">
                <p>{category.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        className="restart-button"
        onClick={() => navigate('/')}
      >
        Return to Start
      </button>
    </div>
  );
}

export default Debrief; 