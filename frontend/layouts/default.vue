<template>
  <v-app color="white">
    <!-- Sidebar fijo sin fondo negro -->
    <v-navigation-drawer
      app
      clipped
      :mini-variant="miniVariant"
      :right="right"
      color="#0484b4"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          link
          class="sidebar-item"
        >
          <v-list-item-icon style="margin-right: 4px;">
            <v-icon style="color:white">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: white; margin-left: 0;">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra de navegación superior que se superpone -->
    <v-app-bar app color="#003A70" clipped-left style="z-index: 1000; color:white">
      <!-- Contenedor para la imagen y el título -->
      <div style="display: flex; align-items: center;">
        <img src="/escudo1.png" alt="Company Logo" class="nav-company-logo" style="margin-right: 8px;">
      </div>
      <!-- Empuja cualquier otro contenido a la derecha -->
      <v-spacer />
    </v-app-bar>

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
      clipped: false,
      miniVariant: false,
      right: false,
      title: 'Administrador de archivos',
      items: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          to: '/inicio'
        },
        {
          icon: 'mdi-magnify',
          title: 'Consulta de expediente',
          to: '/consulta-expediente'
        },
        {
          icon: 'mdi-handshake',
          title: 'Solicitud de préstamo',
          to: '/solicitud-prestamo'
        },
        {
          icon: 'mdi-school',
          title: 'Solicitud de asesoría',
          to: '/asesoria'
        },
        {
          icon: 'mdi-swap-horizontal',
          title: 'Solicitud de transferencia',
          to: '/solicitud-transferencia'
        },
        {
          icon: 'mdi-file-document',
          title: 'Consulta de expedientes',
          to: '/consulta-expediente'
        },
        {
          icon: 'mdi-history',
          title: 'Historial de transferencias',
          to: '/historial-transferencia'
        }
      ]
    }
  }
}
</script>

<style>
.sidebar-item {
  margin-bottom: 10px;
}

.v-list-item-icon {
  margin-right: 4px;
}

.v-list-item-title {
  margin-left: 0;
}

.nav-company-logo {
  width: 30%;
  height: auto;
  margin-left: 20px;
  margin-right: auto;
}
</style>
