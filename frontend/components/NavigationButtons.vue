<template>
  <div class="navigation-buttons">
    <nuxt-link v-for="button in buttons" :key="button.name" :to="button.to">
      <v-btn
        class="nav-btn mr-5"
        :class="{ 'selected-btn': selectedButton === button.name }"
        outlined
        @click="$emit('select-button', button.name)"
      >
        {{ button.label }}
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    buttons: Array,
    selectedButton: String
  }
}
</script>

<style scoped>
.navigation-buttons {
  display: flex;
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

.nav-btn {
  border: 1px solid #3b9ab8;
  color: #3b9ab8;
  font-weight: bold;
  text-transform: none;
  border-radius: 8px;
  padding: 6px 12px;
}

.nav-btn.selected-btn {
  background-color: #3b9ab8;
  color: white;
}
</style>
