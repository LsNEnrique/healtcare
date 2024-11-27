<template>
  <div class="app-bar">
    <div class="d-flex flex-column">
      <div class="text-h6 font-weight-bold">
        Hi, {{ patientName }}
      </div>
      <div class="text-h4 font-weight-bold">
        {{ title }}
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
            <v-list-item v-for="(lang, index) in languages" :key="index" @click="$emit('change-language', lang)">
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
</template>

<script>
export default {
  props: {
    title: String,
    patientName: String,
    patientPhoto: String,
    languages: Array
  }
}
</script>

<style scoped>
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 83.1%;
  margin-left: auto; /* Alinea la barra a la derecha */
  padding: 16px;
  background-color: white;
  position: relative;
  top: 0;
  right: 0;
  z-index: 1;
}

.menu-wrapper .icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: #f7f9fc;
  border-radius: 50%;
  cursor: pointer;
}
</style>
