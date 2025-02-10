import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container
} from '@mui/material';
import { Lock as LockIcon } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication - replace with actual authentication logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        // Call the login function from auth context
        login({ 
          email: credentials.email,
          name: 'Test User'
        });
        
        // Navigate to dashboard
        navigate('/', { replace: true });
      } else {
        setError('Invalid email or password. Please use the demo credentials.');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardContent className="space-y-6">
          <Box className="text-center mb-6">
            <Box className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <LockIcon className="text-white" size={24} />
              </div>
            </Box>
            <Typography variant="h5" component="h1" className="font-bold">
              Portfolio Manager Login
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              disabled={loading}
              className="mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Typography variant="body2" color="textSecondary" align="center" className="mt-4">
            Demo credentials: user@example.com / password
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;