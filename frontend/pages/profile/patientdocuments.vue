<template>
  <div class="document-container">
    <!-- Contenedor con título y botón -->
    <div class="header">
      <h1 class="title">
        Documents
      </h1>
      <nuxt-link to="/profile/new-document">
        <v-btn class="new-document-btn" color="blue" dark>
          + New Document
        </v-btn>
      </nuxt-link>
    </div>

    <!-- Recuadros con documentos -->
    <div class="documents-grid">
      <div v-for="(document, index) in documents" :key="index" class="document-box">
        <div class="document-preview">
          <p>{{ document.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'DefaultLayout'
}
</script>

<style scoped>
template{
  background-color: #f5f5f5;
}

.document-container {
  padding: 20px;
  background-color: white; /* Fondo blanco */
  border: 1px solid #ddd; /* Borde gris claro */
  border-radius: 8px; /* Bordes redondeados */
  width: 98%;
  margin-left: 1%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-size: 24px;
}

.new-document-btn {
  background-color: #1976D2; /* Color azul */
  color: white;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.document-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.document-preview {
  text-align: center;
  color: #333;
  font-size: 16px;
}
</style>
