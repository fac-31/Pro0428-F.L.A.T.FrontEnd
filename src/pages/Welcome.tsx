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
const NODE_API_URL = import.meta.env.VITE_API_URL;

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

const parsePreferences = (
  data: WelcomeResponse
): { userPreferences: UserPreferences; housePreferences: HousePreferences } => {
  // If the server response already includes structured preferences, use those
  if (data.userPreferences && data.housePreferences) {
    return {
      userPreferences: data.userPreferences,
      housePreferences: data.housePreferences,
    };
  }

  // Fallback to parsing from response text
  try {
    // Look for a JSON-like structure in the response
    const jsonMatch = data.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.userPreferences && parsed.housePreferences) {
        return {
          userPreferences: parsed.userPreferences,
          housePreferences: parsed.housePreferences,
        };
      }
    }
  } catch (e) {
    console.warn('Failed to parse preferences from response:', e);
  }

  // If parsing fails, create basic structures from the response text
  return {
    userPreferences: {
      preferences: [data.response],
      requirements: [data.response],
    },
    housePreferences: {
      summary: data.response,
      details: data.response,
      features: [data.response],
    },
  };
};

const Welcome = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const [housePreferences, setHousePreferences] = useState<HousePreferences | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const houseId = localStorage.getItem('house_id');

    if (!token) {
      console.error('No token found');
      navigate('/login');
      return;
    }

    if (!houseId) {
      console.error('No house_id found');
      navigate('/house-setup');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch initial welcome message from the AI agent
    const fetchWelcome = async () => {
      setLoading(true);
      try {
        const initialMessage: Message = { role: 'user', content: 'Hello' };
        setMessageHistory([initialMessage]);

        const res = await fetch(`${API_URL}/welcome`, {
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

    const token = localStorage.getItem('token');
    const houseId = localStorage.getItem('house_id');

    if (!token || !houseId) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Please complete house setup before continuing.',
        },
      ]);
      navigate('/house-setup');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    const userChatMessage: ChatMessage = { sender: 'user', text: input };

    setMessages((prev) => [...prev, userChatMessage]);
    setMessageHistory((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send to Python server
      const res = await fetch(`${API_URL}/welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messageHistory, userMessage],
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const aiMessage: Message = { role: 'assistant', content: data.response };
      setMessageHistory((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);

      // If conversation is complete, save preferences
      if (data.isComplete) {
        try {
          const { userPreferences: parsedUserPrefs, housePreferences: parsedHousePrefs } =
            parsePreferences(data);

          setUserPreferences(parsedUserPrefs);
          setHousePreferences(parsedHousePrefs);

          const saveRes = await fetch(`${NODE_API_URL}/save-preferences`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              user_preferences: parsedUserPrefs,
              house_preferences: parsedHousePrefs,
              userId: localStorage.getItem('user_id'),
              houseId: houseId,
            }),
          });

          if (!saveRes.ok) {
            if (saveRes.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('user_id');
              localStorage.removeItem('house_id');
              navigate('/login');
              return;
            }
            throw new Error('Failed to save preferences');
          }

          const saveData = await saveRes.json();
          if (saveData.success) {
            setIsConversationComplete(true);
            navigate('/house-dashboard');
          } else {
            throw new Error(saveData.error || 'Failed to save preferences');
          }
        } catch (saveError) {
          console.error('Error saving preferences:', saveError);
          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: 'Failed to save preferences. Please try again.',
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Failed to get response from AI.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

          {isConversationComplete && housePreferences && userPreferences && (
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
              <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Preferences
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {userPreferences.preferences.join(', ')}
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
