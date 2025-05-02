export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
    // In a real implementation, this would call ElevenLabs API
    // For now, we'll simulate a response
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock response
    res.status(200).json({
      audioUrl: null, // In a real implementation, this would be a URL to an audio file
      transcript: `Here's my advice about "${question}": Focus on building rapport first before discussing technical details.`
    });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Failed to process question' });
  }
} 