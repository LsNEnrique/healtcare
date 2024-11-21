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

    <!-- Patient Records -->
    <div class="app-background">
      <!-- Div que se muestra solo en la vista de perfil -->
      <div v-if="isPatientPage" class="header-container">
        <!-- Encabezado personalizado -->
        <div class="app-bar">
          <div class="d-flex flex-column">
            <div class="text-h6 font-weight-bold">
              Hi, {{ patientName }}
            </div>
            <div class="text-h4 font-weight-bold">
              Patient Records
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
          <nuxt-link to="/patient-records/yesterday">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'yesterday' }" outlined @click="selectButton('yesterday')">
                Yesterday
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/patient-records/today">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'today' }" outlined @click="selectButton('today')">
                Today
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/patient-records/past">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'past' }" outlined @click="selectButton('past')">
                Past
              </v-btn>
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>
    </div>

    <!-- My Availabity -->
    <div class="app-background">
      <!-- Div que se muestra solo en la vista de perfil -->
      <div v-if="isAvailabityPage" class="header-container">
        <!-- Encabezado personalizado -->
        <div class="app-bar">
          <div class="d-flex flex-column">
            <div class="text-h6 font-weight-bold">
              Hi, {{ patientName }}
            </div>
            <div class="text-h4 font-weight-bold">
              My Availabity
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
      </div>

      <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>
    </div>

    <!-- My Consults -->
    <div class="app-background">
      <!-- Div que se muestra solo en la vista de perfil -->
      <div v-if="isConsultsPage" class="header-container">
        <!-- Encabezado personalizado -->
        <div class="app-bar">
          <div class="d-flex flex-column">
            <div class="text-h6 font-weight-bold">
              Hi, {{ patientName }}
            </div>
            <div class="text-h4 font-weight-bold">
              Booking
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
          <nuxt-link to="/my-consults/upcoming">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'upcoming' }" outlined @click="selectButton('upcoming')">
                Upcoming
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/my-consults/past">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'past' }" outlined @click="selectButton('past')">
                Past
              </v-btn>
            </div>
          </nuxt-link>
          <nuxt-link to="/my-consults/cancelled">
            <div class="button-row">
              <v-btn class="nav-btn mr-5" :class="{ 'selected-btn': selectedButton === 'cancelled' }" outlined @click="selectButton('cancelled')">
                Cancelled
              </v-btn>
            </div>
          </nuxt-link>

          <div class="month-year-select">
            <select v-model="selectedMonthYear" @change="onMonthYearChange">
              <option value="" disabled selected>
                Select Month & Year
              </option>
              <!-- Mostrar meses con su respectivo año -->
              <option v-for="(month, index) in months" :key="index" :value="`${month} ${selectedYear}`">
                {{ month }} {{ selectedYear }}
              </option>
            </select>
          </div>

          <!-- Botón para crear nueva cita -->
          <button class="new-appointment-btn" @click="createNewAppointment">
            + New Appointment
          </button>
        </div>
      </div>

      <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>
    </div>

    <!-- Online consult -->
    <div class="app-background">
      <!-- Div que se muestra solo en la vista de perfil -->
      <div v-if="isOnlinePage" class="header-container">
        <!-- Encabezado personalizado -->
        <div class="app-bar">
          <div class="d-flex flex-column">
            <div class="text-h6 font-weight-bold">
              Hi, {{ patientName }}
            </div>
            <div class="text-h4 font-weight-bold">
              Online Consult
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
      </div>

      <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayoutDoctor',
  data () {
    return {
      patientName: 'John Doe',
      patientPhoto: 'https://example.com/path/to/photo.jpg',
      languages: ['English', 'Spanish', 'French'],
      selectedButton: 'null',
      miniVariant: false,
      right: false,
      selectedMonth: null,
      selectedYear: 2024,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard-doctor'
        },
        {
          icon: 'mdi-file-document-multiple-outline',
          title: 'Patient Records',
          to: '/patient-records'
        },
        {
          icon: 'mdi-calendar',
          title: 'My Availabity',
          to: '/my-availabity'
        },
        {
          icon: 'mdi-account',
          title: 'My Consults',
          to: '/my-consults'
        },
        {
          icon: 'mdi-video-outline',
          title: 'Online Consult',
          to: '/online-consult'
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
    isPatientPage () {
      return this.$route.path.startsWith('/patient-records')
    },
    isAvailabityPage () {
      return this.$route.path.startsWith('/my-availabity')
    },
    isConsultsPage () {
      return this.$route.path.startsWith('/my-consults')
    },
    isOnlinePage () {
      return this.$route.path.startsWith('/online-consult')
    }
  },
  methods: {
    changeLanguage (lang) {
    },
    selectButton (button) {
      this.selectedButton = button
    },
    selectMonthYear () {
    },
    createNewAppointment () {
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
    margin-left: auto;
    padding: 16px;
    background-color: white;
    position: relative;
    top: 0;
    right: 0;
    z-index: 1000;

  }
  .app-background {
    background-color: white;
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
    background-color: white;
  }

  .button-row {
    margin-bottom: 0; /* Elimina el margen inferior */
  }

  .nav-btn {
    border-color: white;
    color: black;
  }
  .selected-btn {
    background-color: white !important;
    border-color: white !important;
    color: #f5f5f5 !important;
  }

  .month-year-select select {
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.new-appointment-btn {
  background-color: #1976D2;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.new-appointment-btn:hover {
  background-color: #1976D2;
  color: white;
  opacity: 0.9;
}
  </style>
