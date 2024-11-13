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
      </v-list>
    </v-navigation-drawer>

    <!-- Profile -->
    <v-app>
      <v-app-bar v-if="isProfilePage" app>
        <!-- Contenido del app-bar -->
        <div class="d-flex flex-column">
          <div class="text-h6 font-weight-bold">
            Hi, {{ patientName }}
          </div>
          <div class="text-h4 font-weight-bold">
            Profile
          </div>
        </div>
        <v-spacer />
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang)">
              <v-list-item-title>{{ lang }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-avatar class="ml-2">
          <img :src="patientPhoto" alt="Patient photo">
        </v-avatar>
        <span class="ml-2 font-weight-bold">{{ patientName }}</span>
      </v-app-bar>
      <!-- Botones de navegación -->
      <v-container v-if="isProfilePage" class="d-flex justify-space-around mt-16 pt-3">
        <nuxt-link to="/profile/general">
          <v-btn color="primary" outlined>
            General
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/profile/consultation-history">
          <v-btn color="primary" outlined>
            Consultation History
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/profile/patient-documents">
          <v-btn color="primary" outlined>
            Patient Documents
          </v-btn>
        </nuxt-link>
      </v-container>

      <!-- Contenedor principal -->
      <v-main>
        <v-container class="mt-10">
          <!-- Renderiza el contenido de la página -->
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
    <!-- Contenido principal -->
    <v-main>
      <nuxt />
    </v-main>
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
      miniVariant: false,
      right: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard'
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
          icon: 'mdi-help-circle',
          title: 'Help',
          to: '/help'
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
      console.log(`Idioma cambiado a: ${lang}`)
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  background-color: white;
  margin-bottom: 10px;
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
  margin-bottom: 16px;
}

.logo-text {
  color: #3B9AB8;
  font-weight: bold;
  font-size: 24px;
}
</style>
