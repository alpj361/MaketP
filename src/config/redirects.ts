export interface AppConfig {
    name: string;
    hostname: string;
    dashboardUrl: string;
    authVerifyUrl: string;
    loginUrl: string;
    registerUrl: string;
  }
  
  // Configuración de aplicaciones
  export const APP_CONFIGS: AppConfig[] = [
    {
      name: 'publinetix',
      hostname: 'publinetix',
      dashboardUrl: 'https://publinetix.standatpd.com/dashboard',
      authVerifyUrl: 'https://publinetix.standatpd.com/auth/verify',
      loginUrl: 'https://publinetix.standatpd.com/login',
      registerUrl: 'https://publinetix.standatpd.com/register'
    },
    {
      name: 'jornal',
      hostname: 'jornal',
      dashboardUrl: 'https://jornal.standatpd.com/dashboard',
      authVerifyUrl: 'https://jornal.standatpd.com/auth/verify',
      loginUrl: 'https://jornal.standatpd.com/login',
      registerUrl: 'https://jornal.standatpd.com/register'
    }
  ];
  
  // Configuración para desarrollo local
  export const LOCAL_CONFIG: AppConfig = {
    name: 'publinetix-local',
    hostname: 'localhost',
    dashboardUrl: `${window.location.origin}/dashboard`,
    authVerifyUrl: `${window.location.origin}/auth/verify`,
    loginUrl: `${window.location.origin}/login`,
    registerUrl: `${window.location.origin}/register`
  };
  
  /**
   * Detecta la aplicación actual basada en el hostname
   */
  export function getCurrentApp(): AppConfig {
    const currentHost = window.location.hostname;
  
    console.log('🔍 Detectando aplicación actual...');
    console.log('🌐 Hostname actual:', currentHost);
  
    // Si estamos en desarrollo local
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      console.log('🏠 Entorno local detectado - usando configuración de Publinetix');
      return LOCAL_CONFIG;
    }
  
    // Buscar configuración por hostname
    const appConfig = APP_CONFIGS.find(config =>
      currentHost.includes(config.hostname)
    );
  
    if (appConfig) {
      console.log(`✅ Aplicación detectada: ${appConfig.name}`);
      return appConfig;
    }
  
    // Fallback a Publinetix si no se encuentra
    console.log('⚠️ No se pudo detectar la aplicación, usando Publinetix por defecto');
    return APP_CONFIGS[0]; // Publinetix por defecto
  }
  
  /**
   * Obtiene la URL de redirección para OAuth
   */
  export function getOAuthRedirectUrl(): string {
    const currentApp = getCurrentApp();
    const redirectUrl = currentApp.authVerifyUrl;
  
    console.log('🔄 URL de redirección OAuth:', redirectUrl);
    return redirectUrl;
  }
  
  /**
   * Obtiene la URL del dashboard para la aplicación actual
   */
  export function getDashboardUrl(): string {
    const currentApp = getCurrentApp();
    return currentApp.dashboardUrl;
  }
  
  /**
   * Obtiene la URL de login para la aplicación actual
   */
  export function getLoginUrl(): string {
    const currentApp = getCurrentApp();
    return currentApp.loginUrl;
  }
  
  /**
   * Obtiene la URL de registro para la aplicación actual
   */
  export function getRegisterUrl(): string {
    const currentApp = getCurrentApp();
    return currentApp.registerUrl;
  }
  
  export function getOAuthCallbackUrl(): string {
    const currentApp = getCurrentApp();
    // Siempre usar /auth/callback para Google OAuth
    return currentApp.authVerifyUrl.replace('/auth/verify', '/auth/callback');
  }