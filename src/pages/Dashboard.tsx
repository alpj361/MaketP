import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { OverviewMetrics } from '../components/dashboard/OverviewMetrics';
import { TrafficSources } from '../components/dashboard/TrafficSources';
import { RecentCampaigns } from '../components/dashboard/RecentCampaigns';
import { UserSegmentation } from '../components/dashboard/UserSegmentation';
import { useDashboard } from '../hooks/useDashboard';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button, Box, Typography } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { metrics, campaigns, trafficSources, loading, error, refreshData, clearError } = useDashboard();
  const navigate = useNavigate();

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Error al cargar datos</h3>
            <p className="text-neutral-600 mb-4">{error}</p>
            <button
              onClick={() => {
                clearError();
                handleRefresh();
              }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Dashboard de Publinetix
          </h1>
          <p className="text-neutral-600 mt-1">
            Bienvenido de vuelta, {user?.email || 'Usuario'}
          </p>
        </div>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 bg-white border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: '#0891b2',
              color: '#0891b2',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#0e7490',
                backgroundColor: '#f0fdff',
              },
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </div>
      
      {/* Métricas principales */}
      <OverviewMetrics metrics={metrics} loading={loading} />
      
      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserSegmentation />
        <TrafficSources sources={trafficSources} loading={loading} />
      </div>
      
      {/* Campañas recientes */}
      <div className="mt-6">
        <RecentCampaigns campaigns={campaigns} loading={loading} />
      </div>
      
      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Rendimiento Semanal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Impresiones</span>
              <span className="font-semibold text-neutral-800">
                {loading ? '...' : '2.4M'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Clics</span>
              <span className="font-semibold text-neutral-800">
                {loading ? '...' : '72.5K'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">CTR</span>
              <span className="font-semibold text-primary-600">
                {loading ? '...' : '3.02%'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Objetivos del Mes</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-neutral-600">Revenue</span>
                <span className="text-sm text-neutral-500">78%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-neutral-600">Conversiones</span>
                <span className="text-sm text-neutral-500">92%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full w-11/12"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Insight del Día</h3>
          <p className="text-neutral-600 text-sm mb-3">
            Las campañas de video están generando un 23% más de engagement que el promedio.
          </p>
          <button className="text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors">
            Ver análisis completo →
          </button>
        </div>
      </div>
    </Layout>
  );
}