export default function handler(req, res) {
  // This would normally fetch from a database or file
  const scenario = {
    rounds: [
      {
        ceoText: "Hi, I'm Alex Morgan, CEO of 23andMe. I understand OpenAI is interested in discussing a potential partnership?",
        tipKey: "I",
        options: {
          A: { 
            text: "Alex, thank you for taking the time to meet. We're excited about the potential synergies between our companies and would love to explore how we might work together.", 
            correct: true 
          },
          B: { 
            text: "We want to buy access to your genetic data to train our AI models. How much would it cost?", 
            correct: false 
          }
        }
      },
      {
        ceoText: "I appreciate your interest. Before we dive into details, I'm curious - what specifically interests OpenAI about 23andMe's capabilities?",
        tipKey: "E",
        options: {
          A: { 
            text: "We believe there's potential to develop AI tools that could help analyze genetic predispositions and provide personalized health insights, while maintaining strict privacy standards.", 
            correct: true 
          },
          B: { 
            text: "Your genetic database is the largest in the private sector. We want to use it to make our models smarter about human biology.", 
            correct: false 
          }
        }
      },
      {
        ceoText: "That's an interesting approach. Privacy is our top concern - our customers trust us with their most personal data. How would you address those concerns?",
        tipKey: "N",
        options: {
          A: { 
            text: "We'd implement a federated learning approach where models are trained on anonymized data without ever accessing the raw genetic information. Your team would maintain full control.", 
            correct: true 
          },
          B: { 
            text: "We have strong security protocols. We'd sign an NDA and ensure the data is encrypted during transfer to our systems.", 
            correct: false 
          }
        }
      },
      {
        ceoText: "Perfect—please send the draft agreement and we can move forward with the next steps.",
        tipKey: "Debrief"
      }
    ],
    tips: {
      "I": { videoUrl: "/videos/placeholder-tip.mp4" },
      "E": { videoUrl: "/videos/placeholder-tip.mp4" },
      "N": { videoUrl: "/videos/placeholder-tip.mp4" },
      "Debrief": { videoUrl: "/videos/placeholder-debrief.mp4" }
    }
  };
  
  res.status(200).json(scenario);
} 