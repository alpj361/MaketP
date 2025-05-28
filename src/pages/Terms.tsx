import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Alert, 
  Tabs, 
  Tab,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink
} from '@mui/material';
import { Warning, Info, ContactMail, Security } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`terms-tabpanel-${index}`}
      aria-labelledby={`terms-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function Terms() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="términos y privacidad">
            <Tab label="Términos y Condiciones" />
            <Tab label="Política de Privacidad" />
          </Tabs>
        </Box>

        {/* Términos y Condiciones */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            color: '#2c3e50',
            borderBottom: '3px solid #3498db',
            pb: 1
          }}>
            Términos y Condiciones de Servicio
          </Typography>
          
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666', mb: 3 }}>
            <strong>Última actualización:</strong> Mayo 2025
          </Typography>
          
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 3,
              background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
              color: 'white',
              '& .MuiAlert-icon': { color: 'white' }
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              ⚠️ AVISO IMPORTANTE - FASE ALPHA: Publinetix se encuentra actualmente en fase de desarrollo Alpha. 
              Esto significa que la plataforma está en pruebas y puede experimentar cambios significativos, 
              interrupciones del servicio o funcionalidades limitadas.
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>
            Bienvenido a <strong>Publinetix</strong>, una plataforma especializada en promoción digital, 
            distribución estratégica de campañas publicitarias y posicionamiento de marcas en redes sociales 
            como Facebook, Instagram, TikTok, entre otras. Publinetix opera bajo <strong>StandAtPd</strong>.
          </Typography>

          <Typography variant="body1" paragraph>
            Al usar nuestros servicios, aceptas expresamente estos Términos y Condiciones. 
            Por favor, léelos detenidamente.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            1. Estado de desarrollo - Fase Alpha
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Publinetix se encuentra en fase Alpha de desarrollo.</strong> Durante esta etapa:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Los servicios pueden estar sujetos a interrupciones, errores o funcionalidades incompletas." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Las características y funciones pueden cambiar o eliminarse sin previo aviso." />
            </ListItem>
            <ListItem>
              <ListItemText primary="No garantizamos la continuidad o estabilidad completa del servicio." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Algunos datos pueden perderse durante actualizaciones o mantenimientos." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tu feedback y reportes de errores son fundamentales para mejorar la plataforma." />
            </ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            2. Registro y uso de cuenta
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Debes crear una cuenta con información veraz y actualizada." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Es tu responsabilidad mantener en confidencialidad tus credenciales de acceso." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Debes notificar cualquier uso no autorizado inmediatamente." />
            </ListItem>
            <ListItem>
              <ListItemText primary="No puedes transferir tu cuenta sin autorización escrita de Publinetix." />
            </ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            3. Uso adecuado del sitio
          </Typography>
          <Typography variant="body1" paragraph>
            El uso de Publinetix debe ser conforme a la legislación de Guatemala. No se permite:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Publicar contenido ilegal, ofensivo o que infrinja derechos de terceros." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Alterar la seguridad o funcionamiento del sitio." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Usar bots, scripts o inyecciones de código maliciosas." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Realizar pruebas de penetración o ataques sin autorización expresa." />
            </ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            4. Contenido publicitario
          </Typography>
          <Typography variant="body1" paragraph>
            Eres completamente responsable del contenido que cargas o publicas. 
            Debes contar con todos los derechos necesarios para su uso.
          </Typography>
          <Typography variant="body1" paragraph>
            Publinetix se reserva el derecho de eliminar contenido que infrinja normas legales o estos términos.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            5. Propiedad intelectual
          </Typography>
          <Typography variant="body1" paragraph>
            Todo contenido propio de Publinetix está protegido por derechos de autor y propiedad intelectual. 
            No puedes reproducir, distribuir ni modificar ningún elemento sin autorización expresa por escrito.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            6. Limitación de responsabilidad
          </Typography>
          
          <Typography variant="body1" paragraph>
            Publinetix no garantiza resultados específicos ni se responsabiliza por:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Fallos en redes sociales u otras plataformas externas." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Problemas técnicos ajenos a Publinetix." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Daños o pérdidas derivadas del uso de la plataforma." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Pérdida de datos durante actualizaciones del sistema." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Interrupciones del servicio por mantenimiento o mejoras." />
            </ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            7. Privacidad y protección de datos
          </Typography>
          <Typography variant="body1" paragraph>
            Tratamos tus datos personales conforme a la Ley de Acceso a la Información Pública (Decreto 57-2008) 
            y normativas aplicables en Guatemala. Implementamos medidas de seguridad apropiadas y no compartimos 
            tu información personal sin tu consentimiento expreso.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            8. Modificaciones y actualizaciones
          </Typography>
          <Typography variant="body1" paragraph>
            Estos términos pueden actualizarse ocasionalmente. Te notificaremos los cambios importantes 
            a través del sitio web o por correo electrónico. Tu uso continuado de la plataforma se considera 
            como aceptación de los términos modificados.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            9. Legislación aplicable y resolución de disputas
          </Typography>
          <Typography variant="body1" paragraph>
            Estos términos se rigen por la legislación de la República de Guatemala. Cualquier disputa será 
            resuelta preferentemente a través de mediación y, en su defecto, en los tribunales competentes 
            de la ciudad de Guatemala.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            10. Contacto y soporte
          </Typography>
          <Box sx={{ 
            backgroundColor: '#e8f4fd', 
            padding: 2, 
            borderRadius: 1, 
            borderLeft: '4px solid #3498db',
            mb: 3 
          }}>
            <Typography variant="body1" paragraph>
              Para consultas, comentarios o soporte técnico:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> <MuiLink href="mailto:support@standatpd.com">support@standatpd.com</MuiLink>
            </Typography>
            <Typography variant="body1">
              <strong>Empresa:</strong> StandAtPd
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, fontSize: '0.9em', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
            Al usar Publinetix, reconoces haber leído, entendido y aceptado estos Términos y Condiciones en su totalidad.
          </Typography>
        </TabPanel>

        {/* Política de Privacidad */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            color: '#2c3e50',
            borderBottom: '3px solid #3498db',
            pb: 1
          }}>
            Política de Privacidad
          </Typography>
          
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666', mb: 3 }}>
            <strong>Última actualización:</strong> Mayo 2025
          </Typography>

          <Typography variant="body1" paragraph>
            En <strong>Publinetix</strong>, valoramos tu privacidad y nos comprometemos a proteger tu información personal. 
            Esta política explica cómo recolectamos, usamos y protegemos tus datos.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            1. Información que recolectamos
          </Typography>
          
          <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#2c3e50', mt: 2 }}>
            1.1 Datos personales de registro
          </Typography>
          <Typography variant="body1" paragraph>Cuando te registras en Publinetix, recolectamos:</Typography>
          <List>
            <ListItem><ListItemText primary="Nombre completo" /></ListItem>
            <ListItem><ListItemText primary="Dirección de correo electrónico" /></ListItem>
            <ListItem><ListItemText primary="Número de teléfono" /></ListItem>
            <ListItem><ListItemText primary="Nombre de empresa u organización" /></ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#2c3e50', mt: 2 }}>
            1.2 Datos de redes sociales
          </Typography>
          <Typography variant="body1" paragraph>
            A través de nuestras integraciones con Facebook e Instagram (Meta), obtenemos:
          </Typography>
          <List>
            <ListItem><ListItemText primary="Datos de publicidad y campañas" /></ListItem>
            <ListItem><ListItemText primary="Insights y métricas de rendimiento" /></ListItem>
            <ListItem><ListItemText primary="Estadísticas de audiencia" /></ListItem>
            <ListItem><ListItemText primary="Información proporcionada por Meta Ads API" /></ListItem>
          </List>

          <Alert severity="info" sx={{ my: 2 }}>
            <Typography variant="body1">
              <strong>Nota importante:</strong> Actualmente NO utilizamos cookies en nuestro sitio web.
            </Typography>
          </Alert>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            2. Servicios y herramientas de terceros
          </Typography>
          
          <Typography variant="body1" paragraph>
            Para brindarte nuestros servicios, utilizamos las siguientes herramientas:
          </Typography>

          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Servicio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Proveedor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Propósito</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Base de datos</TableCell>
                  <TableCell>Supabase</TableCell>
                  <TableCell>Almacenamiento seguro de datos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Autenticación</TableCell>
                  <TableCell>Google</TableCell>
                  <TableCell>Inicio de sesión seguro</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Automatización</TableCell>
                  <TableCell>Make</TableCell>
                  <TableCell>Procesos automatizados</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inteligencia Artificial</TableCell>
                  <TableCell>OpenAI (ChatGPT), Anthropic (Claude)</TableCell>
                  <TableCell>Funcionalidades de IA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Redes Sociales</TableCell>
                  <TableCell>Meta (Facebook/Instagram)</TableCell>
                  <TableCell>Gestión de campañas publicitarias</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            3. Compartir información
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Política clara:</strong> NO vendemos, alquilamos ni compartimos tu información personal con terceros para propósitos comerciales.
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>Solo compartimos información en casos muy específicos:</Typography>
          <List>
            <ListItem><ListItemText primary="Con tu consentimiento explícito" /></ListItem>
            <ListItem><ListItemText primary="Por requerimiento legal: Si la ley guatemalteca lo requiere" /></ListItem>
            <ListItem><ListItemText primary="Protección de derechos: Para proteger nuestros derechos legales" /></ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            4. Tus derechos como usuario
          </Typography>

          <Box sx={{ 
            backgroundColor: '#d4edda', 
            border: '1px solid #c3e6cb', 
            borderRadius: 1, 
            padding: 2, 
            borderLeft: '4px solid #28a745',
            mb: 2 
          }}>
            <Typography variant="h6" gutterBottom>Tienes los siguientes derechos sobre tus datos:</Typography>
            
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              <strong>🔍 Derecho de Acceso:</strong> Puedes solicitar una copia de todos los datos personales que tenemos sobre ti.
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>✏️ Derecho de Rectificación:</strong> Puedes corregir información incorrecta o incompleta en cualquier momento.
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>🗑️ Derecho de Eliminación:</strong> Puedes solicitar que eliminemos tu cuenta y todos tus datos personales.
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>📋 Derecho de Portabilidad:</strong> Puedes solicitar exportar tus datos en un formato legible y estructurado.
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>⛔ Derecho de Oposición:</strong> Puedes objetar ciertos usos de tus datos personales.
            </Typography>
            
            <Typography variant="body1">
              <strong>⏸️ Derecho de Limitación:</strong> Puedes solicitar que restrinjamos el procesamiento de tus datos en ciertas circunstancias.
            </Typography>
          </Box>

          <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#2c3e50', mt: 2 }}>
            4.1 Cómo ejercer tus derechos
          </Typography>
          <Typography variant="body1" paragraph>
            Para ejercer cualquiera de estos derechos, contáctanos a{' '}
            <MuiLink href="mailto:support@standatpd.com">support@standatpd.com</MuiLink>{' '}
            con el asunto "PRIVACIDAD - [Tu solicitud]".
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            5. Seguridad de datos
          </Typography>

          <Typography variant="body1" paragraph>Implementamos medidas de seguridad apropiadas para proteger tu información:</Typography>
          <List>
            <ListItem><ListItemText primary="Cifrado: Tus datos se transmiten usando conexiones seguras (HTTPS)" /></ListItem>
            <ListItem><ListItemText primary="Acceso limitado: Solo personal autorizado accede a datos personales" /></ListItem>
            <ListItem><ListItemText primary="Monitoreo: Supervisamos actividades sospechosas" /></ListItem>
            <ListItem><ListItemText primary="Actualizaciones: Mantenemos nuestros sistemas actualizados" /></ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            6. Retención de datos
          </Typography>

          <Typography variant="body1" paragraph>Conservamos tu información personal mientras:</Typography>
          <List>
            <ListItem><ListItemText primary="Mantengas una cuenta activa con nosotros" /></ListItem>
            <ListItem><ListItemText primary="Sea necesario para cumplir propósitos legales" /></ListItem>
            <ListItem><ListItemText primary="Sea requerido por ley guatemalteca" /></ListItem>
          </List>

          <Typography variant="body1" paragraph>
            Al eliminar tu cuenta, procederemos a eliminar tus datos personales dentro de 30 días, 
            salvo obligaciones legales que requieran conservarlos.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            7. Legislación aplicable
          </Typography>

          <Typography variant="body1" paragraph>Esta política se rige por las leyes de la República de Guatemala, incluyendo:</Typography>
          <List>
            <ListItem><ListItemText primary="Ley de Acceso a la Información Pública (Decreto 57-2008)" /></ListItem>
            <ListItem><ListItemText primary="Código Civil de Guatemala" /></ListItem>
            <ListItem><ListItemText primary="Normativas aplicables sobre protección de datos" /></ListItem>
          </List>

          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#34495e', mt: 3 }}>
            8. Contacto y consultas
          </Typography>

          <Box sx={{ 
            backgroundColor: '#e8f4fd', 
            padding: 2, 
            borderRadius: 1, 
            borderLeft: '4px solid #3498db',
            mb: 3 
          }}>
            <Typography variant="body1" paragraph>
              Para cualquier consulta sobre esta política de privacidad o el manejo de tus datos:
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>📧 Email de Privacidad:</strong> <MuiLink href="mailto:support@standatpd.com">support@standatpd.com</MuiLink>
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>📋 Asunto sugerido:</strong> "PRIVACIDAD - [Describir tu consulta]"
            </Typography>
            <Typography variant="body1">
              <strong>⏱️ Tiempo de respuesta:</strong> Respondemos consultas de privacidad dentro de 5 días hábiles
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, fontSize: '0.9em', color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
            Al usar Publinetix, confirmas que has leído y entendido esta Política de Privacidad. Tu privacidad es importante para nosotros.
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
} 