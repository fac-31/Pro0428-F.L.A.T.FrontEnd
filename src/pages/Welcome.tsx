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
import pythonApi from '../api/pythonApi';

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

  // Get auth token from localStorage
  const authToken = localStorage.getItem('token');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchWelcome = async () => {
      setLoading(true);
      try {
        const initialMessage: Message = { role: 'user', content: 'Hello' };
        setMessageHistory([initialMessage]);

        // Use the Python API for welcome chat
        const res = await pythonApi.post('/welcome', {
          messages: [initialMessage],
        });

        const data = res.data;
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

  const sendMessage = async () => {
    if (!input.trim() || isConversationComplete) return;

    const userMessage: Message = { role: 'user', content: input };
    const userChatMessage: ChatMessage = { sender: 'user', text: input };

    setMessages((prev) => [...prev, userChatMessage]);
    setMessageHistory((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Use the Python API for preferences
      const res = await pythonApi.post('/preferences', {
        messages: [...messageHistory, userMessage],
      });

      const data: WelcomeResponse = res.data;
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
        
        // Store the preferences
        setHousePreferences({
          summary: data.response,
          details: data.response,
          features: data.housePreferences.features,
        });

        // Save the final preferences using the Python API
        try {
          if (!authToken) {
            throw new Error('No authentication token found');
          }

          const saveRes = await pythonApi.post(
            '/save-preferences',
            {
              user_preferences: data.userPreferences,
              house_preferences: data.housePreferences,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (saveRes.data.success) {
            console.log('Preferences saved successfully');
            navigate('/house-dashboard');
          }
        } catch (error) {
          console.error('Error saving preferences:', error);
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
