import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { getOAuthCallbackUrl } from '../config/redirects';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Si el usuario ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (user) {
      navigate('/auth/verify');
    }
  }, [user, navigate]);

  // Verificar si hay mensajes de error en los parámetros de URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    
    if (errorParam === 'auth_failed') {
      setError('Error en la autenticación. Por favor, intenta de nuevo.');
    } else if (errorParam === 'callback_failed') {
      setError('Error procesando la autenticación. Por favor, intenta de nuevo.');
    }
  }, [searchParams]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      navigate('/auth/verify');
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Login - Iniciando autenticación con Google...');
      // Obtener URL de redirección dinámica para callback
      const redirectUrl = getOAuthCallbackUrl();
      console.log('🔄 Login - URL de redirección:', redirectUrl);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account'
          }
        }
      });
      if (error) {
        console.error('❌ Error en signInWithOAuth:', error);
        throw error;
      }
      console.log('✅ OAuth iniciado correctamente');
    } catch (error: any) {
      console.error('❌ Error completo en handleGoogleLogin:', error);
      setError('Error al iniciar sesión con Google: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdff 0%, #ccf7fe 100%)',
        py: 6,
        px: { xs: 2, sm: 4 }
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 'sm',
          width: '100%',
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* Logo Publinetix */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              userSelect: 'none',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: 'Sora, Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '2rem',
                color: '#111',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              publine
            </Typography>
            <Typography
              component="span"
              sx={{
                fontFamily: 'Sora, Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '2rem',
                background: 'linear-gradient(90deg, #00c8ff 0%, #c200ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                ml: 0.5,
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              tix
            </Typography>
          </Box>
          
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ 
              fontFamily: 'Sora, sans-serif',
              color: '#262626'
            }}
          >
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accede a tu cuenta de Publinetix
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleEmailLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#0891b2',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#0891b2',
                },
              },
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              background: 'linear-gradient(90deg, #0891b2 0%, #a855f7 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #0e7490 0%, #9333ea 100%)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            o continúa con
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{
            py: 1.5,
            borderColor: '#0891b2',
            color: '#0891b2',
            '&:hover': {
              borderColor: '#0e7490',
              backgroundColor: '#f0fdff',
            },
          }}
        >
          Iniciar sesión con Google
        </Button>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            ¿No tienes cuenta?{' '}
            <Link 
              component={RouterLink} 
              to="/register" 
              sx={{ 
                color: '#0891b2',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Registrarse
            </Link>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link 
            component={RouterLink} 
            to="/home" 
            sx={{ 
              color: '#525252',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            ← Volver al inicio
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}