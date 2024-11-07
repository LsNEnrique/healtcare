<template>
    <v-app>
      <v-app-bar color="#003A70" fixed app elevation="0" class="app-bar">
        <!-- Logo Image -->
        <img src="/escudo-horizontal.png" alt="Company Logo" class="nav-company-logo">
  
        <!-- Container for Centered Buttons -->
        <v-spacer />
        <v-spacer />
  
        <!-- Right Button (Login) -->
        <v-btn class="login-btn" text @click="$router.push('/login')">
          Login
        </v-btn>
      </v-app-bar>
  
      <!-- Agregar margen superior para evitar superposición -->
      <v-container class="mt-8 pt-8">
        <!-- Fondo blanco -->
        <v-card class="mt-5">
          <v-row>
            <!-- Columna 1: Carrusel de imágenes -->
            <v-col cols="12" md="6" class="pl-4">
              <!-- Agregar margen interno a la izquierda -->
              <v-carousel cycle interval="4000">
                <v-carousel-item v-for="(image, i) in images" :key="i">
                  <v-img :src="require(`@/assets/carrusel/${image}`)" alt="Imagen Carrusel" contain /> <!-- Cambios aquí -->
                </v-carousel-item>
              </v-carousel>
            </v-col>
  
            <!-- Columna 2: Texto de bienvenida -->
            <v-col cols="12" md="6">
              <v-card-title class="text-black">
                <h2>¡Bienvenido al portal Administración</h2>
                <h2>de Archivos de la Universidad de</h2>
                <h2>Guanajuato!</h2>
              </v-card-title>
              <v-card-text class="text-black justify-text">
                <p>La Universidad de Guanajuato te da una calurosa bienvenida a tu portal, dado que tú eres la razón de ser de la Universidad y nuestra máxima prioridad en nuestros servicios.</p>
                <p>Esperando que este nuevo portal y el esfuerzo de todos los que en él participan te sean de utilidad. Sabiendo que mantenemos una constante labor para brindarte lo mejor en cuanto a sistemas y herramientas, siéntete en plena confianza de hacernos llegar tus comentarios o sugerencias que nos permitan mejorar aún más en beneficio de toda la comunidad estudiantil.</p>
              </v-card-text>
            </v-col>
          </v-row>
  
          <!-- Footer dentro de la tarjeta -->
          <v-footer color="#f5f5f5" class="text-center text-black justify-text footer">
            <!-- Íconos de redes sociales -->
            <v-col>
              <div class="social-icons">
                <v-icon large color="#003A70">
                  mdi-facebook
                </v-icon>
                <v-icon large color="#003A70">
                  mdi-twitter
                </v-icon>
                <v-icon large color="#003A70">
                  mdi-instagram
                </v-icon>
                <v-icon large color="#003A70">
                  mdi-youtube
                </v-icon>
              </div>
              Lascuráin de Retana No. 5, Col. Centro C.P. 36000 Guanajuato, Gto., México
              <br>
              Tel: +52 (473) 732 00 06 | <a href="mailto:soporte@ugto.mx">soporte@ugto.mx</a>
            </v-col>
          </v-footer>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    layout: 'no-sideBar',
    data () {
      return {
        images: [
          'edificio-ug.jpg',
          'dicis.jpg'
        ]
      }
    },
    head () {
      return {
        title: 'Portal Intranet UG',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /*-----------------------------------------------------------------*/
  /*------------------------ NAVBAR'Styles --------------------------*/
  /*-----------------------------------------------------------------*/
  .app-bar {
    display: flex;
    align-items: center;
  }
  
  .nav-company-logo {
    width: 8%;
    height: auto;
    margin-left: 20px;
    margin-right: auto;
  }
  
  .login-btn {
    color: white !important; /* Texto blanco */
    background-color: transparent !important; /* Fondo transparente */
    border: none; /* Sin borde */
    margin-right: 30px; /* Mover un poco hacia la izquierda */
    transition: background-color 0.3s, color 0.3s; /* Animación suave */
  }
  
  .login-btn:hover {
    background-color: white !important; /* Fondo blanco al pasar el cursor */
    color: #003A70 !important; /* Texto azul al pasar el cursor */
  }
  
  /* Fondo de la aplicación y la carta de bienvenida */
  .v-container {
    background-color: white;
  }
  
  .v-card {
    background-color: white;
  }
  
  .v-application {
    background-color: white !important;
  }
  
  .v-carousel-item img {
    width: 100%;
    height: auto;
  }
  
  /* Cambiar color de texto a negro */
  .text-black {
    color: black;
  }
  
  /* Justificar el texto */
  .justify-text {
    text-align: justify;
  }
  
  /* Estilos para el footer */
  .footer {
    margin: 16px 0; /* Margen superior e inferior */
    padding: 10px; /* Ajusta el relleno interno del footer */
  }
  
  /* Estilos para los iconos de redes sociales */
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 16px; /* Espaciado entre los iconos */
  }
  </style>
  