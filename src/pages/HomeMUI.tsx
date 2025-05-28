import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  TrendingUp,
  People,
  Public,
  ArrowForward,
} from '@mui/icons-material';

export function HomeMUI() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdff 0%, #ccf7fe 100%)' }}>
      {/* Hero/Header */}
      <Container maxWidth="md" sx={{ pt: { xs: 6, md: 10 }, pb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {/* Logo compuesto: solo texto */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              userSelect: 'none',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: 'Sora, Poppins, sans-serif',
                fontWeight: 700,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
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
                fontSize: { xs: '2.2rem', md: '2.8rem' },
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
            variant="h6"
            sx={{
              color: '#525252',
              mb: 3,
              maxWidth: 500,
              textAlign: 'center',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Plataforma de publicidad digital inteligente para optimizar tus campañas.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                background: 'linear-gradient(90deg, #0891b2 0%, #a855f7 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(8,145,178,0.10)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0e7490 0%, #9333ea 100%)',
                },
              }}
            >
              Comenzar Gratis
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#0891b2',
                color: '#0891b2',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#0e7490',
                  background: '#f0fdff',
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 700, 
            color: '#262626', 
            mb: 6, 
            textAlign: 'center',
            fontFamily: 'Sora, sans-serif',
            letterSpacing: '-1px',
          }}
        >
          Características
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {[
            {
              icon: <BarChart sx={{ fontSize: 56, color: '#0891b2' }} />,
              title: 'Analytics Avanzados',
              description: 'Métricas detalladas y visualizaciones para optimizar tus campañas publicitarias',
            },
            {
              icon: <TrendingUp sx={{ fontSize: 56, color: '#a855f7' }} />,
              title: 'Optimización Automática',
              description: 'IA que ajusta automáticamente tus campañas para maximizar conversiones',
            },
            {
              icon: <People sx={{ fontSize: 56, color: '#0ea5e9' }} />,
              title: 'Targeting Inteligente',
              description: 'Segmentación precisa de audiencias usando machine learning avanzado',
            },
            {
              icon: <Public sx={{ fontSize: 56, color: '#0891b2' }} />,
              title: 'Multi-Plataforma',
              description: 'Gestiona campañas en Google, Facebook, Instagram y más desde un solo lugar',
            },
          ].map((feature, index) => (
            <Box 
              key={index} 
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', lg: '1 1 calc(25% - 24px)' },
                maxWidth: 320,
                minWidth: 220,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 2px 12px 0 rgba(8,145,178,0.08)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.03)',
                    boxShadow: '0 8px 32px 0 rgba(8,145,178,0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#262626', mb: 2, fontFamily: 'Sora, sans-serif' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#525252', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Footer simple con enlace a términos */}
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Box sx={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', pt: 4 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem',
            }}
          >
            <Button
              component={Link}
              to="/terms"
              variant="text"
              size="small"
              sx={{
                color: '#0891b2',
                textDecoration: 'underline',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  color: '#0e7490',
                  textDecoration: 'underline',
                },
              }}
            >
              Términos y Condiciones
            </Button>
            {' • '}
            <Button
              component={Link}
              to="/terms"
              variant="text"
              size="small"
              sx={{
                color: '#0891b2',
                textDecoration: 'underline',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  color: '#0e7490',
                  textDecoration: 'underline',
                },
              }}
            >
              Política de Privacidad
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 