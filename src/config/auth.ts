// Configuración de autenticación para MarketP
export const authConfig = {
  // Configuración de Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
  
  // Configuración de tablas
  tables: {
    loginData: 'LoginData',
    users: 'users',
    profiles: 'profiles',
  },
  
  // Configuración de rutas
  routes: {
    login: '/login',
    register: '/register',
    dashboard: '/',
    home: '/home',
  },
  
  // Configuración de sesión
  session: {
    storageKey: 'marketp_session',
    expirationTime: 24 * 60 * 60 * 1000, // 24 horas
  },
  
  // Configuración de validación
  validation: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
    },
  },
};

export type AuthConfig = typeof authConfig; 