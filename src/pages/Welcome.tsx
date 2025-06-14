import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  Divider,
} from '@mui/material';

const API_URL = import.meta.env.VITE_PYTHON_API_URL;

interface Message {
  role: string;
  content: string;
}

interface ChatMessage {
  sender: string;
  text: string;
}

interface UserPreferences {
  preferences: string[];
  requirements: string[];
}

interface HousePreferences {
  summary: string;
  details: string;
  features: string[];
}

interface WelcomeResponse {
  response: string;
  isComplete: boolean;
  userPreferences?: UserPreferences;
  housePreferences?: HousePreferences;
  saveSuccess: boolean;
}

const Welcome = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const [housePreferences, setHousePreferences] = useState<HousePreferences | null>(null);

  useEffect(() => {
    // Fetch initial welcome message from the AI agent
    const fetchWelcome = async () => {
      setLoading(true);
      try {
        const initialMessage: Message = { role: 'user', content: 'Hello' };
        setMessageHistory([initialMessage]);

        const res = await fetch(`${API_URL}/api/welcome`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [initialMessage],
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const aiMessage: Message = { role: 'assistant', content: data.response };
        setMessageHistory((prev) => [...prev, aiMessage]);
        setMessages([{ sender: 'ai', text: data.response }]);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
        setMessages([{ sender: 'ai', text: 'Failed to fetch welcome message.' }]);
      } finally {
        setLoading(false);
      }
    };
    fetchWelcome();
  }, []);

  /* replaced by new completion check: data.isComplete
  const checkConversationComplete = (response: string): boolean => {
    const completionPhrases = [
      'summary of your preferences',
      'all preferences collected',
      'preferences have been recorded',
      'thank you for sharing your preferences',
      'preferences have been saved',
    ];
    return completionPhrases.some((phrase) => response.toLowerCase().includes(phrase));
  };*/

  const sendMessage = async () => {
    if (!input.trim() || isConversationComplete) return;

    const userMessage: Message = { role: 'user', content: input };
    const userChatMessage: ChatMessage = { sender: 'user', text: input };

    setMessages((prev) => [...prev, userChatMessage]);
    setMessageHistory((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // If conversation is not complete, continue with welcome agent
      const endpoint = isConversationComplete ? '/api/preferences' : '/api/welcome';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messageHistory, userMessage],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: WelcomeResponse = await res.json();
      const aiMessage: Message = { role: 'assistant', content: data.response };
      setMessageHistory((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);

      // Check if conversation is complete based on backend response
      if (
        !isConversationComplete &&
        data.isComplete &&
        data.userPreferences &&
        data.housePreferences
      ) {
        setIsConversationComplete(true);

        // Store the preferences locally
        setHousePreferences({
          summary: data.response,
          details: data.response,
          features: data.housePreferences.features,
        });

        // The Python backend will handle saving to Express/Supabase
        // We just need to check if the save was successful
        if (data.saveSuccess) {
          console.log('Preferences saved successfully');
          navigate('/house-dashboard');
        } else {
          console.error('Failed to save preferences');
          navigate('/welcome');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Failed to get response from AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Welcome!
          </Typography>

          <List sx={{ minHeight: 120, maxHeight: 300, overflow: 'auto', mb: 2 }}>
            {messages.map((msg, idx) => (
              <ListItem
                key={idx}
                sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <Box
                  sx={{
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '80%',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>

          {isConversationComplete && housePreferences && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  House Preferences Summary
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {housePreferences.summary}
                </Typography>
              </Box>
            </>
          )}

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={
                isConversationComplete ? 'Conversation complete!' : 'Type your message...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || isConversationComplete}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={loading || !input.trim() || isConversationComplete}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Welcome;
