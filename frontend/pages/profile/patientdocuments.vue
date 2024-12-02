<template>
  <div class="document-container">
    <!-- Contenedor con título y botón -->
    <div class="header">
      <h1 class="title">
        Documents
      </h1>
      <v-btn class="new-document-btn" color="blue" dark @click="showUploadModal = true">
        + New Document
      </v-btn>
    </div>

    <!-- Modal para subir documentos -->
    <v-dialog v-model="showUploadModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Upload Document</span>
        </v-card-title>
        <v-card-text>
          <input type="file" @change="handleFileUpload">
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="uploadDocument">
            Upload
          </v-btn>
          <v-btn color="grey" text @click="showUploadModal = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Recuadros con documentos -->
    <div class="documents-grid">
      <div v-for="(document, index) in documents" :key="index" class="document-box">
        <div class="document-header">
          <v-icon :color="document.starred ? 'yellow' : 'grey'" @click="toggleStar(document)">
            mdi-star
          </v-icon>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item @click="deleteDocument(index)">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="document-preview">
            <embed :src="document.url" width="150" height="150" type="application/pdf">
            <p>{{ document.name }}</p>
            <p>{{ document.date }}</p>
          </div>
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
      showUploadModal: false,
      documents: [],
      newDocument: null
    }
  },
  methods: {
    handleFileUpload (event) {
      this.newDocument = event.target.files[0]
    },
    uploadDocument () {
      if (this.newDocument) {
        const document = {
          url: URL.createObjectURL(this.newDocument),
          name: this.newDocument.name,
          date: new Date().toLocaleDateString(),
          starred: false
        }
        this.documents.push(document)
        this.newDocument = null
        this.showUploadModal = false
      }
    },
    toggleStar (document) {
      document.starred = !document.starred
    },
    deleteDocument (index) {
      this.documents.splice(index, 1)

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
