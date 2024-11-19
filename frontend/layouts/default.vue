<template>
  <v-app color="white">
    <!-- Sidebar fijo sin fondo negro -->
    <v-navigation-drawer
      app
      elevation="1"
      color="white"
      :mini-variant="miniVariant"
      :right="right"
    >
      <v-list>
        <!-- Logo and Text -->
        <v-list-item class="logo-container">
          <v-icon color="#3B9AB8" class="mr-2">
            mdi-medication
          </v-icon>
          <v-list-item-title class="logo-text">
            Healthi
          </v-list-item-title>
        </v-list-item>

        <!-- Sidebar Items -->
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          link
          class="sidebar-item"
          :class="{ 'selected-item': $route.path === item.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="bottom-container">
          <div class="background-image-container">
            <v-img :src="require('@/assets/default-gopro.png')" alt="Dashboard Image" contain />
          </div>
          <div class="bottom-content">
            <v-list-item-title class="bottom-text">
              <br>Get faster<br>and better<br>Healthcare
            </v-list-item-title>
            <v-btn class="gopro-btn" text @click="$router.push('/gopro')">
              Go Pro
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Profile -->
    <div class="app-background">
      <!-- Div que se muestra solo en la vista de perfil -->
      <div v-if="isProfilePage" class="profile-container">
        <!-- Encabezado personalizado -->
        <div class="app-bar">
          <div class="d-flex flex-column">
            <div class="text-h6 font-weight-bold">
              Hi, {{ patientName }}
            </div>
            <div class="text-h4 font-weight-bold">
              Profile
            </div>
          </div>
          <div class="d-flex">
            <div class="menu-wrapper">
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <div v-bind="attrs" class="icon-button" v-on="on">
                    <v-icon>mdi-translate</v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang)">
                    <v-list-item-title>{{ lang }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="icon-button">
              <v-icon>mdi-bell</v-icon>
            </div>
            <div class="ml-2">
              <v-avatar>
                <img :src="patientPhoto" alt="Patient photo">
              </v-avatar>
            </div>
            <span class="ml-2 font-weight-bold">{{ patientName }}</span>
          </div>
        </div>
        <div class="navigation-buttons mt-1 mb-2 pt-3">
          <nuxt-link to="/profile/general">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'general' }" outlined @click="selectButton('general')">
                General
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/profile/consultation">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'consultation' }" outlined @click="selectButton('consultation')">
                Consultation History
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/profile/patientdocuments">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'documents' }" outlined @click="selectButton('documents')">
                Patient Documents
              </v-btn>
            </div>
          </nuxt-link>
        </div>
      </div>    <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      patientName: 'John Doe',
      patientPhoto: 'https://example.com/path/to/photo.jpg',
      languages: ['English', 'Spanish', 'French'],
      selectedButton: 'general',
      miniVariant: false,
      right: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard-after'
        },
        {
          icon: 'mdi-calendar',
          title: 'Calendar',
          to: '/calendar'
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile/general'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/'
        }
      ]
    }
  },
  computed: {
    // Verifica si la página actual es parte de la sección `profile`
    isProfilePage () {
      return this.$route.path.startsWith('/profile')
    }
  },
  methods: {
    changeLanguage (lang) {
    },
    selectButton (button) {
      this.selectedButton = button
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  background-color: white;
}

.selected-item {
  background-color: #3B9AB8 !important;
}

.v-list-item-icon {
  margin-right: 8px;
  color: black;
}

.v-list-item-title {
  margin-left: 0;
  color: black;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 20px;
  margin-left: 32px;
}

.bottom-container {
  position: absolute;
  bottom: -50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: bottom;
  justify-content: bottom;
  overflow: hidden;
  z-index: 1;
}

.background-image-container {
  position: relative;
  left: 0;
  bottom:-20px;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 0;
}

.bottom-content {
  position: relative;
  z-index: 3;
  text-align: center;
  background-color: black;
  bottom: 0;
  width: 100%;
  border-top-left-radius: 95px; /* Rounded top left */
  border-top-right-radius: 95px; /* Rounded top right */
}

.bottom-text {
  color: white;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px; /* Space between text and button */
}

.gopro-btn {
  background-color: #3B9AB8 !important;
  color: white !important;
  transition: background-color 0.3s, color 0.3s;
}

.logo-text {
  color: #3B9AB8;
  font-weight: bold;
  font-size: 32px;
}

.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 83.1%;
  margin-left: auto; /* Alinea la barra a la derecha */
  padding: 16px;
  background-color: #f5f5f5;
  position: relative;
  top: 0;
  right: 0;
  z-index: 1000;

}
.app-background {
  background-color: #f5f5f5; /* Mismo color que el app-bar */
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.app-main {
  margin-top: 80px;
}

.icon-button {
  cursor: pointer;
  margin-left: 8px;
}

.navigation-buttons {
  display: flex;
  width: 82.3%;
  flex-direction: row;
  margin-left: auto;
  align-items: flex-start;
  background-color: #f5f5f5;
}

.button-row {
  margin-bottom: 0; /* Elimina el margen inferior */
}

.nav-btn {
  border-color: #e0e0e0;
  color: #e0e0e0;
}
.selected-btn {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  color: #000000 !important;
}
</style>
