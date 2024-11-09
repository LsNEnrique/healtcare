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
