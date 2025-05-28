import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface DashboardMetrics {
  totalRevenue: number;
  activeCustomers: number;
  conversionRate: number;
  averageOrder: number;
  revenueChange: number;
  customersChange: number;
  conversionChange: number;
  orderChange: number;
}

interface CampaignData {
  id: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  change: number;
}

interface UseDashboardReturn {
  metrics: DashboardMetrics;
  campaigns: CampaignData[];
  trafficSources: TrafficSource[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    activeCustomers: 0,
    conversionRate: 0,
    averageOrder: 0,
    revenueChange: 0,
    customersChange: 0,
    conversionChange: 0,
    orderChange: 0,
  });

  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      // Por ahora, usar datos simulados
      // En el futuro, esto se conectará a las tablas reales de Supabase
      const mockMetrics: DashboardMetrics = {
        totalRevenue: 45230.50,
        activeCustomers: 1247,
        conversionRate: 3.2,
        averageOrder: 89.50,
        revenueChange: 12.5,
        customersChange: 8.3,
        conversionChange: -2.1,
        orderChange: 5.7,
      };

      setMetrics(mockMetrics);
      console.log('🟩 Métricas del dashboard cargadas exitosamente');
    } catch (err) {
      console.error('🟥 Error al cargar métricas:', err);
      setError('Error al cargar las métricas del dashboard');
    }
  }, []);

  const fetchCampaigns = useCallback(async () => {
    try {
      // Datos simulados de campañas
      const mockCampaigns: CampaignData[] = [
        {
          id: '1',
          name: 'Summer Sale 2024',
          spend: 2500,
          impressions: 125000,
          clicks: 3750,
          ctr: 3.0,
          cpc: 0.67,
          conversions: 187,
          status: 'active',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Brand Awareness Q1',
          spend: 1800,
          impressions: 98000,
          clicks: 2940,
          ctr: 3.0,
          cpc: 0.61,
          conversions: 147,
          status: 'active',
          createdAt: '2024-01-10',
        },
      ];

      setCampaigns(mockCampaigns);
      console.log('🟩 Campañas cargadas exitosamente');
    } catch (err) {
      console.error('🟥 Error al cargar campañas:', err);
      setError('Error al cargar las campañas');
    }
  }, []);

  const fetchTrafficSources = useCallback(async () => {
    try {
      // Datos simulados de fuentes de tráfico
      const mockTrafficSources: TrafficSource[] = [
        { source: 'Google Ads', visitors: 12500, percentage: 45.2, change: 8.3 },
        { source: 'Facebook Ads', visitors: 8200, percentage: 29.6, change: -2.1 },
        { source: 'Organic Search', visitors: 4800, percentage: 17.3, change: 12.7 },
        { source: 'Direct', visitors: 2200, percentage: 7.9, change: 3.4 },
      ];

      setTrafficSources(mockTrafficSources);
      console.log('🟩 Fuentes de tráfico cargadas exitosamente');
    } catch (err) {
      console.error('🟥 Error al cargar fuentes de tráfico:', err);
      setError('Error al cargar las fuentes de tráfico');
    }
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        fetchMetrics(),
        fetchCampaigns(),
        fetchTrafficSources(),
      ]);
    } catch (err) {
      console.error('🟥 Error al refrescar datos del dashboard:', err);
      setError('Error al refrescar los datos');
    } finally {
      setLoading(false);
    }
  }, [fetchMetrics, fetchCampaigns, fetchTrafficSources]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    metrics,
    campaigns,
    trafficSources,
    loading,
    error,
    refreshData,
    clearError,
  };
} 