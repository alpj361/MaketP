import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
  Link,
  CircularProgress,
  InputAdornment,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Register() {
  const [step, setStep] = useState(1); // 1: código, 2: registro completo
  const [validatedCode, setValidatedCode] = useState('');
  const [email, setEmail] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Si el usuario ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Verificar si hay un mensaje de error en los parámetros de URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    const messageParam = searchParams.get('message');
    
    if (errorParam === 'not_registered' && messageParam) {
      setError(decodeURIComponent(messageParam));
    } else if (errorParam === 'invalid_code' && messageParam) {
      setError(decodeURIComponent(messageParam));
    } else if (errorParam === 'profile_creation_failed' && messageParam) {
      setError(decodeURIComponent(messageParam));
    }
  }, [searchParams]);

  const validateInvitationCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('invitation_codes')
        .select('*')
        .eq('code', code)
        .eq('used', false)
        .single();
      
      return !error && data;
    } catch (error) {
      // Fallback temporal para desarrollo - códigos de ejemplo
      const validCodes = ['JOURNALIST2024', 'PRESS-INVITE', 'MEDIA-ACCESS', 'PUBLINETIX2024'];
      return validCodes.includes(code.toUpperCase());
    }
  };

  const handleCodeValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar código de invitación
    if (!invitationCode.trim()) {
      setError('El código de invitación es requerido');
      setLoading(false);
      return;
    }

    const isValidCode = await validateInvitationCode(invitationCode);
    if (!isValidCode) {
      setError('Código de invitación inválido o ya utilizado');
      setLoading(false);
      return;
    }

    // Si es válido, guardar el código y avanzar al paso 2
    setValidatedCode(invitationCode);
    setStep(2);
    setLoading(false);
    setError(null);
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) throw error;
      
      // Si el registro fue exitoso, guardar el número en profiles y marcar código como usado
      if (data.user) {
        await supabase.from('profiles').upsert({ 
          id: data.user.id,
          email: data.user.email,
          phone
        });
      }
      
      setSuccess('Se ha enviado un enlace de confirmación a tu correo electrónico.');
      
      // Redirigir a login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    // El código ya está validado, proceder con Google
    try {
      const callbackUrl = `${window.location.origin}/auth/callback?code=${validatedCode}`;
      
      console.log('🔧 Register Callback URL:', callbackUrl);

      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account'
          }
        }
      });
      
      if (error) {
        console.error('❌ Error en Google Register:', error);
        throw error;
      }
      
      console.log('✅ Google Register OAuth iniciado correctamente');
    } catch (error: any) {
      console.error('❌ Error completo en handleGoogleRegister:', error);
      setError('Error al registrarse con Google: ' + error.message);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setValidatedCode('');
    setError(null);
  };

  // Renderizar paso 1: Validación de código
  if (step === 1) {
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
          <Box sx={{ textAlign: 'center' }}>
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
              Acceso por Invitación
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Ingresa tu código único para continuar con el registro
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={0} sx={{ mt: 3, mb: 4 }}>
            <Step>
              <StepLabel>Código de Invitación</StepLabel>
            </Step>
            <Step>
              <StepLabel>Crear Cuenta</StepLabel>
            </Step>
          </Stepper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleCodeValidation}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="invitation-code"
              label="Código de invitación único"
              name="invitationCode"
              placeholder="Ej: PUBLINETIX2024"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon sx={{ color: '#0891b2' }} />
                  </InputAdornment>
                ),
              }}
              helperText="Solicita tu código de invitación al administrador"
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
              endIcon={<ArrowForwardIcon />}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Siguiente'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes cuenta?{' '}
              <Link 
                component={RouterLink} 
                to="/login" 
                sx={{ 
                  color: '#0891b2',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Iniciar sesión
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

  // Renderizar paso 2: Registro completo
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
          maxWidth: 'md',
          width: '100%',
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
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
            Crear tu cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Código validado: <strong>{validatedCode}</strong>
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={1} sx={{ mt: 3, mb: 4 }}>
          <Step completed>
            <StepLabel>Código de Invitación</StepLabel>
          </Step>
          <Step>
            <StepLabel>Crear Cuenta</StepLabel>
          </Step>
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Opción de Google */}
        <Box sx={{ mb: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleRegister}
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
            Registrarse con Google
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            o registrarse con email
          </Typography>
        </Divider>

        {/* Formulario de registro */}
        <Box component="form" onSubmit={handleEmailRegister}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
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
              fullWidth
              id="phone"
              label="Teléfono (opcional)"
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#0891b2',
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#0891b2',
                  },
                },
              }}
            />
          </Box>
          
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear Cuenta'}
          </Button>
        </Box>

        {/* Botón para volver */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={goBackToStep1}
            sx={{ color: '#525252' }}
          >
            Volver al código
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}