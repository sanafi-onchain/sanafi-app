import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

// Schema for validating chat requests
const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string()
    })
  )
});

router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = chatRequestSchema.parse(req.body);
    const { messages } = validatedData;

    // Check service connections
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error('Missing PERPLEXITY_API_KEY environment variable');
      return res.status(500).json({
        error: 'Perplexity API configuration error',
        message: 'Chat service is not properly configured'
      });
    }

    // Test Perplexity API connection
    try {
      const testResponse = await fetch('https://api.perplexity.ai/health', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!testResponse.ok) {
        console.error('Perplexity API connection failed:', await testResponse.text());
        return res.status(503).json({
          error: 'Perplexity API connection error',
          message: 'Unable to connect to chat service'
        });
      }
    } catch (error) {
      console.error('Perplexity API connection error:', error);
      return res.status(503).json({
        error: 'Perplexity API connection error',
        message: 'Unable to connect to chat service'
      });
    }

    // Prepare system message for Islamic finance focus
    const systemMessage = {
      role: 'system',
      content: 'You are an expert in Islamic finance and Sharia-compliant investing. Provide accurate, helpful information about Islamic financial principles, products, and practices. If asked about non-Islamic finance topics, gently redirect to Islamic finance related topics. Be precise and concise.\n\nUse markdown formatting for better readability: use **bold text** for important concepts and *italic text* for emphasis. Use paragraph breaks for better structure. For lists, use proper formatting with bullet points or numbers. Use headings with # when appropriate.'
    };

    // Completely rebuild the messages array to ensure proper ordering
    // Always start with the system message
    let formattedMessages = [systemMessage];
    
    // Make sure the final message is from the user
    let lastUserMessage = null;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserMessage = messages[i];
        break;
      }
    }
    
    if (!lastUserMessage) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'No user message provided'
      });
    }
    
    // For chat history context, only use the most recent exchange
    formattedMessages.push(lastUserMessage);
    
    // Debug logging to understand message structure
    console.log('Perplexity API Request - Formatted Messages:', 
      JSON.stringify(formattedMessages.map(m => ({ role: m.role, contentLength: m.content.length })), null, 2));

    // Call Perplexity API
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: formattedMessages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 500,
        search_domain_filter: [], // Optional: can add specific domains if needed
        return_citations: true
      })
    });

    if (!perplexityResponse.ok) {
      const errorData = await perplexityResponse.json();
      console.error('Perplexity API error:', errorData);
      return res.status(perplexityResponse.status).json({
        error: 'Failed to get response from Perplexity',
        details: errorData
      });
    }

    const data = await perplexityResponse.json();
    
    // Extract and format the response
    const responseContent = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    // Format citations if available
    const citations = data.citations || [];

    return res.json({
      content: responseContent,
      citations: citations
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;