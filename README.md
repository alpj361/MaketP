# Publinetix - Plataforma de Publicidad Digital Inteligente

## Descripción
Plataforma moderna de publicidad digital con sistema de autenticación robusto, códigos de invitación y dashboard de métricas avanzadas.

## Características principales

### 🔐 Sistema de autenticación con códigos de invitación
- Autenticación con Supabase (email/password y Google OAuth)
- Sistema de códigos de invitación únicos para registro
- Solo usuarios con códigos válidos pueden registrarse
- Verificación automática de usuarios registrados
- Limpieza automática de usuarios no registrados

### 📊 Dashboard de métricas publicitarias
- Visualización de métricas de campañas en tiempo real
- Gráficos interactivos con Chart.js
- Métricas de CTR, ROAS, conversiones y costos
- Análisis de rendimiento por plataforma

### 🎨 Diseño moderno con branding Publinetix
- Paleta de colores basada en el logo de Publinetix
- Interfaz moderna con Material UI
- Tipografía Google Fonts (Sora)
- Gradientes y efectos visuales atractivos

## Arquitectura del sistema de autenticación

### Flujo de registro
1. **Validación de código**: Usuario ingresa código de invitación único
2. **Verificación**: Sistema valida código en base de datos
3. **Registro**: Usuario completa registro con email/password o Google
4. **Creación de perfil**: Sistema crea perfil en tabla `profiles`
5. **Marcado de código**: Código se marca como usado

### Flujo de login
1. **Autenticación**: Usuario inicia sesión con email/password o Google
2. **Verificación**: Sistema verifica si usuario existe en `profiles`
3. **Acceso**: Si existe, redirige a dashboard
4. **Limpieza**: Si no existe, elimina usuario de auth y redirige a registro

### Páginas del sistema
- `/home` - Landing page con información de Publinetix
- `/login` - Página de inicio de sesión
- `/register` - Registro con códigos de invitación (2 pasos)
- `/auth/verify` - Verificación automática de usuarios
- `/auth/callback` - Callback para OAuth de Google
- `/dashboard` - Dashboard principal (protegido)

## Configuración

### Variables de entorno requeridas
Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### Configuración de Supabase

#### 1. Crear tabla `profiles`
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios puedan ver/editar su propio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### 2. Crear tabla `invitation_codes`
```sql
CREATE TABLE public.invitation_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  used BOOLEAN DEFAULT FALSE,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0
);

-- Habilitar RLS
ALTER TABLE public.invitation_codes ENABLE ROW LEVEL SECURITY;

-- Política para verificar códigos válidos (para registro)
CREATE POLICY "Anyone can check valid codes for registration" ON public.invitation_codes
  FOR SELECT USING (
    used = FALSE 
    AND (expires_at IS NULL OR expires_at > NOW())
    AND current_uses < max_uses
  );
```

#### 3. Función para eliminar usuarios no registrados
```sql
CREATE OR REPLACE FUNCTION delete_unregistered_user(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar si el usuario existe en profiles
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
    -- Si no existe en profiles, eliminar de auth.users
    DELETE FROM auth.users WHERE id = user_id;
    
    IF NOT FOUND THEN
      RETURN FALSE;
    END IF;
    
    RETURN TRUE;
  ELSE
    -- El usuario está registrado, no eliminar
    RETURN FALSE;
  END IF;
END;
$$;
```

#### 4. Función para marcar códigos como usados
```sql
CREATE OR REPLACE FUNCTION mark_invitation_code_used(
  invitation_code TEXT,
  user_id UUID
) RETURNS BOOLEAN AS $$
DECLARE
  code_record RECORD;
BEGIN
  -- Buscar el código
  SELECT * INTO code_record 
  FROM public.invitation_codes 
  WHERE code = invitation_code AND used = FALSE;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Marcar como usado
  UPDATE public.invitation_codes 
  SET 
    used = TRUE,
    used_by = user_id,
    used_at = NOW(),
    current_uses = current_uses + 1
  WHERE code = invitation_code;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

### Configuración de Google OAuth (opcional)
1. Ir a Google Cloud Console
2. Crear proyecto o seleccionar existente
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Agregar dominios autorizados en Supabase Auth

## Códigos de invitación de ejemplo

Para desarrollo, puedes usar estos códigos temporales:
- `JOURNALIST2024`
- `PRESS-INVITE`
- `MEDIA-ACCESS`
- `PUBLINETIX2024`

## Instalación

```bash
# Clonar repositorio
git clone [url-del-repo]
cd MaketP

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## Paleta de colores Publinetix

- **Primary**: `#0891b2` (azul cian del logo)
- **Secondary**: `#a855f7` (púrpura del gradiente)
- **Accent**: `#0ea5e9` (azul complementario)
- **Neutral**: `#262626` (negro del logo)
- **Background**: Gradientes de `#f0fdff` a `#ccf7fe`

## Estructura del proyecto

```
src/
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx     # Componente para rutas protegidas
├── context/
│   └── AuthContext.tsx            # Contexto de autenticación con Supabase
├── pages/
│   ├── HomeMUI.tsx               # Landing page con branding Publinetix
│   ├── Login.tsx                 # Página de inicio de sesión
│   ├── Register.tsx              # Registro con códigos de invitación
│   ├── AuthVerification.tsx      # Verificación de usuarios registrados
│   ├── AuthCallback.tsx          # Callback para OAuth
│   └── Dashboard.tsx             # Dashboard principal
├── lib/
│   └── supabase.ts               # Cliente de Supabase
└── config/
    └── theme.ts                  # Configuración de tema y colores
```

## Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter de código

## Tecnologías utilizadas

- **React 18** con TypeScript
- **Material UI** para componentes
- **Supabase** para autenticación y base de datos
- **React Router** para navegación
- **Vite** como bundler
- **Google Fonts** (Sora) para tipografía

## Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

MIT License - ver archivo LICENSE para detalles.