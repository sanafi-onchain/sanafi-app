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

    // Check if OpenRouter API key is available
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'OpenRouter API key not configured',
        message: 'Please configure the OPENROUTER_API_KEY environment variable'
      });
    }

    // Prepare system message for Islamic finance focus
    const systemMessage = {
      role: 'system',
      content: 'You are an expert in Islamic finance and Sharia-compliant investing. Provide accurate, helpful information about Islamic financial principles, products, and practices. If asked about non-Islamic finance topics, gently redirect to Islamic finance related topics. Be precise and concise.'
    };

    // Prepare the messages array with system message first
    const formattedMessages = [
      systemMessage,
      ...messages
    ];

    console.log('Making OpenRouter API request');
    
    try {
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://sanafi.ai', // Domain for API tracking
          'X-Title': 'Sanafi AI - Islamic Finance Assistant'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick:free', 
          messages: formattedMessages,
          temperature: 0.3,
          max_tokens: 1000,
          stream: false
        })
      });

      if (!openRouterResponse.ok) {
        let errorData;
        try {
          errorData = await openRouterResponse.json();
        } catch (e) {
          errorData = await openRouterResponse.text();
        }
        console.error('OpenRouter API error:', errorData);
        return res.status(openRouterResponse.status).json({
          error: 'Failed to get response from OpenRouter',
          details: errorData
        });
      }

      const data = await openRouterResponse.json();
      console.log('OpenRouter response received');
      
      // Extract and format the response, with better error handling
      let responseContent = 'Sorry, I could not generate a response.';
      if (data && data.choices && data.choices.length > 0) {
        if (data.choices[0].message && data.choices[0].message.content) {
          responseContent = data.choices[0].message.content;
        } else if (data.choices[0].text) {
          // Handle potential alternative format
          responseContent = data.choices[0].text;
        }
      }
      
      // OpenRouter doesn't provide citations in the same format as Perplexity
      // We'll send an empty array for compatibility with the frontend
      const citations: string[] = [];

      return res.json({
        content: responseContent,
        citations: citations
      });
    } catch (apiError) {
      console.error('OpenRouter API call error:', apiError);
      return res.status(500).json({
        error: 'Error calling OpenRouter API',
        message: apiError instanceof Error ? apiError.message : 'Unknown API error' 
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;