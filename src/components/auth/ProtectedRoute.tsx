import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
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
            }}
          >
            Cargando...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
} 