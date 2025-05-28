import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import { getCurrentApp, getDashboardUrl, getLoginUrl, getRegisterUrl } from '../config/redirects';

export default function AuthVerification() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'checking' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando autenticación...');

  // Función para verificar si un usuario está registrado en la base de datos
  const checkUserExists = async (userEmail: string): Promise<boolean> => {
    try {
      console.log('🔍 AuthVerification - Verificando email:', userEmail);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', userEmail)
        .single();
      
      console.log('🔍 AuthVerification - Data:', data);
      console.log('🔍 AuthVerification - Error:', error);
      
      const exists = !error && !!data;
      console.log('🔍 AuthVerification - Usuario existe en profiles:', exists);
      return exists;
    } catch (error) {
      console.error('❌ AuthVerification - Error verificando usuario:', error);
      return false;
    }
  };

  // Función para eliminar usuario de Supabase Auth cuando no está registrado
  const deleteUnregisteredUser = async (userId: string): Promise<void> => {
    try {
      console.log('🗑️ AuthVerification - Eliminando usuario no registrado:', userId);
      
      // Nota: Esta operación requiere permisos especiales
      // Como alternativa, podemos usar una función RPC si está disponible
      const { error } = await supabase.rpc('delete_unregistered_user', {
        user_id: userId
      });
      
      if (error) {
        console.error('❌ Error eliminando usuario:', error);
        // Si no funciona la función RPC, al menos cerramos la sesión
        await supabase.auth.signOut();
      } else {
        console.log('✅ Usuario eliminado exitosamente');
      }
    } catch (error) {
      console.error('❌ Error eliminando usuario:', error);
      // Fallback: cerrar sesión
      await supabase.auth.signOut();
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log('🔍 AuthVerification - Iniciando verificación de usuario');
        setStatus('checking');
        setMessage('Verificando tu cuenta...');
        
        // Esperar un momento para que la sesión se establezca
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Obtener la sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('🔍 AuthVerification - Session data:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          sessionError
        });
        
        if (sessionError) {
          console.error('❌ AuthVerification - Error obteniendo sesión:', sessionError);
          setStatus('error');
          setMessage('Error de autenticación');
          setTimeout(() => window.location.href = getLoginUrl(), 2000);
          return;
        }

        if (!session || !session.user || !session.user.email) {
          console.log('❌ AuthVerification - No hay sesión válida, redirigiendo a login');
          window.location.href = getLoginUrl();
          return;
        }

        const userEmail = session.user.email;
        const userId = session.user.id;
        
        console.log('🔍 AuthVerification - Verificando si el usuario está registrado');
        console.log('🔍 AuthVerification - Email:', userEmail);
        
        // Verificar si el usuario existe en la tabla profiles
        const userExists = await checkUserExists(userEmail);
        
        if (userExists) {
          // Usuario registrado, redirigir al dashboard
          console.log('✅ AuthVerification - Usuario verificado, redirigiendo al dashboard');
          setMessage('¡Bienvenido! Redirigiendo...');
          setTimeout(() => window.location.href = getDashboardUrl(), 1000);
        } else {
          // Usuario no registrado
          console.log('❌ AuthVerification - Usuario no registrado');
          setMessage('Cuenta no registrada. Redirigiendo...');
          
          // Cerrar sesión
          await supabase.auth.signOut();
          
          // Redirigir a registro con mensaje
          window.location.href = `${getRegisterUrl()}?error=not_registered&message=Debes registrarte con un código de acceso válido`;
        }
        
      } catch (error) {
        console.error('❌ AuthVerification - Error en verificación:', error);
        setStatus('error');
        setMessage('Error verificando tu cuenta');
        setTimeout(() => window.location.href = getLoginUrl(), 2000);
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdff 0%, #ccf7fe 100%)',
        px: 2
      }}
    >
      {/* Logo Publinetix */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          userSelect: 'none',
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: 'Sora, Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '2.5rem',
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
            fontSize: '2.5rem',
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

      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#0891b2',
            mb: 3
          }} 
        />
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#262626',
            fontFamily: 'Sora, sans-serif',
            mb: 1
          }}
        >
          {message}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#525252',
            maxWidth: 400
          }}
        >
          Por favor espera mientras verificamos tu cuenta...
        </Typography>

        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 3, maxWidth: 400 }}>
            Hubo un problema verificando tu cuenta. Serás redirigido al login.
          </Alert>
        )}
      </Box>
    </Box>
  );
} 