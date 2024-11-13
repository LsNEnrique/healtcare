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

    <!-- Contenido principal -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
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
          to: '/profile'
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
</style>
