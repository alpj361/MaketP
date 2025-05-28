import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe2, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Target
} from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="text-xl font-bold text-neutral-800">MarketPulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
              Marketing Intelligence
              <span className="block bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Redefinido
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Transforma datos en decisiones inteligentes. MarketPulse te ofrece análisis avanzados, 
              tendencias en tiempo real y insights accionables para impulsar tu estrategia de marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                Comenzar Gratis
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-200"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Características Principales
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Herramientas poderosas diseñadas para maximizar el ROI de tus campañas de marketing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Analytics Avanzados</h3>
              <p className="text-neutral-600">Métricas detalladas y visualizaciones interactivas para entender tu audiencia</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary-50 to-primary-50 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Tendencias en Tiempo Real</h3>
              <p className="text-neutral-600">Monitoreo continuo de tendencias del mercado y comportamiento del consumidor</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent-50 to-secondary-50 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Segmentación Inteligente</h3>
              <p className="text-neutral-600">Identifica y segmenta tu audiencia con precisión usando IA</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe2 className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Alcance Global</h3>
              <p className="text-neutral-600">Análisis de mercados internacionales y oportunidades de expansión</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
                ¿Por qué elegir MarketPulse?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-primary-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Implementación Rápida</h3>
                    <p className="text-neutral-600">Configura tu dashboard en menos de 5 minutos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="text-accent-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Insights Instantáneos</h3>
                    <p className="text-neutral-600">Obtén recomendaciones accionables en tiempo real</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="text-secondary-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">Seguridad Empresarial</h3>
                    <p className="text-neutral-600">Protección de datos de nivel bancario</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="text-primary-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-neutral-800">ROI Comprobado</h3>
                    <p className="text-neutral-600">Incrementa la efectividad de tus campañas hasta un 300%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Conversión Rate</span>
                    <span className="text-2xl font-bold text-primary-600">+127%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Customer Acquisition</span>
                    <span className="text-2xl font-bold text-accent-600">+89%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Revenue Growth</span>
                    <span className="text-2xl font-bold text-secondary-600">+245%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Comienza tu transformación digital hoy
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Únete a más de 10,000 empresas que ya confían en MarketPulse para impulsar su crecimiento
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 inline-flex items-center"
          >
            Empezar Gratis Ahora
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="text-xl font-bold text-white">MarketPulse</span>
            </div>
            <p className="text-neutral-400">
              © 2024 MarketPulse. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 