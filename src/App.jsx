import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Negotiation from './pages/Negotiation';
import Debrief from './pages/Debrief';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/debrief" element={<Debrief />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 