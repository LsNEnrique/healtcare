<template>
  <div class="document-container">
    <!-- Contenedor con título y botón -->
    <div class="header">
      <h1 class="title">
        Documents
      </h1>
      <v-btn class="new-document-btn" color="blue" dark @click="showModal = true">
        + New Document
      </v-btn>
    </div>

    <!-- Recuadros con documentos -->
    <div class="documents-grid">
      <div v-for="(document, index) in documents" :key="index" class="document-box">
        <div class="document-preview">
          <p>{{ document.title }}</p>
          <p>Uploaded on: {{ formatDate(document.created_at) }}</p> <!-- Fecha y hora de subida -->
        </div>
      </div>
    </div>

    <!-- Modal para subir un nuevo documento -->
    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Upload New Document</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="newDocument.title"
              label="Document Title"
              outlined
              required
            />
            <v-file-input
              v-model="newDocument.file"
              label="Select File"
              accept=".pdf,.doc,.docx,.txt"
              outlined
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="closeModal">
            Cancel
          </v-btn>
          <v-btn color="blue" text @click="submitNewDocument">
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'DefaultLayout',
  data () {
    return {
      documents: [], // Almacenará los documentos obtenidos
      showModal: false, // Controla la visibilidad del modal
      formValid: false, // Controla la validación del formulario
      newDocument: { title: '', file: null } // Datos del nuevo documento
    }
  },
  async created () {
    await this.fetchDocuments() // Llamada para obtener los documentos al crear el componente
  },
  methods: {
    // Método para obtener los documentos
    async fetchDocuments () {
      try {
        const response = await axios.get('/patientdocuments') // Ruta GET para obtener documentos
        this.documents = response.data // Asignamos los documentos al array
      } catch (error) {
        alert('Error fetching documents: ' + error.message) // Reemplazado por alert
      }
    },

    // Método para agregar un nuevo documento
    async submitNewDocument () {
      if (this.formValid) {
        const formData = new FormData()
        formData.append('title', this.newDocument.title)
        formData.append('file', this.newDocument.file)

        try {
          const response = await axios.post('/newdocument', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Especificamos que se enviarán archivos
            }
          })

          if (response.status === 200) {
            this.fetchDocuments() // Volver a obtener los documentos después de agregar uno nuevo
            this.closeModal() // Cerrar el modal
            this.newDocument = { title: '', file: null } // Limpiar los campos del formulario
            alert('Document uploaded successfully!') // Notificación de éxito
          }
        } catch (error) {
          alert('Error uploading document: ' + error.message) // Reemplazado por alert
        }
      }
    },

    // Método para cerrar el modal
    closeModal () {
      this.showModal = false
    },

    // Método para formatear la fecha en formato legible
    formatDate (dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, options)
    }
  }
}
</script>

<style scoped>
.template {
  background-color: #f5f5f5;
}

.document-container {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
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
  background-color: #1976d2;
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

.v-dialog {
  overflow: visible;
}
</style>
