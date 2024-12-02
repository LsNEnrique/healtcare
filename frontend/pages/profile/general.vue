<template>
  <div class="container">
    <!-- Doctor Card -->
    <div class="doctor-card">
      <div class="profile">
        <img :src="doctor.image" alt="Profile Picture" class="profile-image">
        <div class="details">
          <p class="name">
            {{ doctor.name }} <span class="gender">({{ doctor.gender }})</span>
          </p>
          <p class="specialty">
            {{ doctor.specialty }}
          </p>
          <p class="location">
            {{ doctor.location }}
          </p>
        </div>
      </div>
      <button class="edit-button" @click="openEditDoctorModal">
        <i class="mdi mdi-pencil" /> Edit
      </button>
    </div>

    <!-- Personal Information Card -->
    <div class="info-card">
      <div class="header">
        <h2>Personal Information</h2>
        <button class="edit-button" @click="openEditPersonalInfoModal">
          <i class="mdi mdi-pencil" /> Edit
        </button>
      </div>
      <div class="body">
        <div class="info-item">
          <strong>Name</strong>
          <p>{{ doctor.name }}</p>
        </div>
        <div class="info-item">
          <strong>Date of Birth</strong>
          <p>{{ doctor.dob }}</p>
        </div>
        <div class="info-item">
          <strong>Age</strong>
          <p>{{ doctor.age }}</p>
        </div>
        <div class="info-item">
          <strong>Phone Number</strong>
          <p>{{ doctor.phone }}</p>
        </div>
        <div class="info-item">
          <strong>Email Address</strong>
          <p>{{ doctor.email }}</p>
        </div>
        <div class="info-item">
          <strong>Speciality</strong>
          <p>{{ doctor.specialty }}</p>
        </div>
      </div>
    </div>

    <!-- Pre-existing Diseases Card -->
    <div class="info-card">
      <div class="header">
        <h2>Pre-existing Diseases</h2>
      </div>
      <div class="body">
        <!-- Speech Diseases -->
        <div class="diseases-section">
          <strong>Speech</strong>
          <div class="diseases-list">
            <div v-for="(disease, index) in doctor.speechDiseases" :key="'speech-' + index" class="disease-item">
              {{ disease }}
              <span class="remove-item" @click="removeDisease('speech', disease)">❌</span>
            </div>
            <input v-model="newSpeechDisease" type="text" placeholder="Add new speech disease">
            <button @click="addDisease('speech', newSpeechDisease)">
              Add Disease
            </button>
          </div>
        </div>

        <!-- Physical Diseases -->
        <div class="diseases-section">
          <strong>Physical</strong>
          <div class="diseases-list">
            <div v-for="(disease, index) in doctor.physicalDiseases" :key="'physical-' + index" class="disease-item">
              {{ disease }}
              <span class="remove-item" @click="removeDisease('physical', disease)">❌</span>
            </div>
            <input v-model="newPhysicalDisease" type="text" placeholder="Add new physical disease">
            <button @click="addDisease('physical', newPhysicalDisease)">
              Add Disease
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Edit Doctor Modal -->
    <div v-if="showEditDoctorModal" class="modal">
      <div class="modal-content">
        <h2>Edit Doctor Profile</h2>
        <label for="name">Name</label>
        <input id="name" v-model="doctor.name" type="text" placeholder="Enter name">

        <label for="specialty">Specialty</label>
        <input id="specialty" v-model="doctor.specialty" type="text" placeholder="Enter specialty">

        <label for="location">Location</label>
        <input id="location" v-model="doctor.location" type="text" placeholder="Enter location">

        <button @click="updateDoctor">
          Save
        </button>
        <button @click="closeEditDoctorModal">
          Cancel
        </button>
      </div>
    </div>

    <!-- Edit Personal Information Modal -->
    <div v-if="showEditPersonalInfoModal" class="modal">
      <div class="modal-content">
        <h2>Edit Personal Information</h2>
        <label for="dob">Date of Birth</label>
        <input id="dob" v-model="doctor.dob" type="date">

        <label for="phone">Phone Number</label>
        <input id="phone" v-model="doctor.phone" type="text" placeholder="Enter phone number">

        <label for="email">Email Address</label>
        <input id="email" v-model="doctor.email" type="email" placeholder="Enter email">

        <button @click="updatePersonalInfo">
          Save
        </button>
        <button @click="closeEditPersonalInfoModal">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'DefaultLayout',
  data () {
    return {
      doctor: {
        id: null,
        name: '',
        gender: '',
        specialty: '',
        location: '',
        dob: '',
        age: '',
        phone: '',
        email: '',
        speechDiseases: [],
        physicalDiseases: [],
        image: '/path/to/image.jpg' // Definir la imagen por defecto
      },
      showEditDoctorModal: false,
      showEditPersonalInfoModal: false,
      newSpeechDisease: '',
      newPhysicalDisease: ''
    }
  },
  async created () {
    const doctorId = 1 // Este ID debe ser dinámico, puedes pasarlo como un parámetro de ruta
    await this.fetchDoctorData(doctorId)
  },
  methods: {
    // Obtener los datos del doctor
    async fetchDoctorData (id) {
      try {
        const response = await this.$axios.post(`/getuser/${id}`)
        const doctorData = response.data

        // Asignar los datos al objeto doctor
        this.doctor = { ...this.doctor, ...doctorData }
      } catch (error) {
        alert('Error fetching doctor data: ' + error.message)
      }
    },

    // Abrir el modal de editar perfil del doctor
    openEditDoctorModal () {
      this.showEditDoctorModal = true
    },

    // Cerrar el modal de editar perfil del doctor
    closeEditDoctorModal () {
      this.showEditDoctorModal = false
    },

    // Abrir el modal de editar información personal
    openEditPersonalInfoModal () {
      this.showEditPersonalInfoModal = true
    },

    // Cerrar el modal de editar información personal
    closeEditPersonalInfoModal () {
      this.showEditPersonalInfoModal = false
    },

    // Actualizar los datos del doctor en la base de datos
    async updateDoctor () {
      try {
        await axios.put(`/users/${this.doctor.id}`, {
          name: this.doctor.name,
          specialty: this.doctor.specialty,
          location: this.doctor.location
        })

        alert('Doctor profile updated successfully!')
        this.closeEditDoctorModal() // Cerrar el modal después de actualizar
      } catch (error) {
        alert('Error updating doctor profile: ' + error.message)
      }
    },

    // Actualizar los datos de la información personal en la base de datos
    async updatePersonalInfo () {
      try {
        await this.$axios.put(`/users/${this.doctor.id}`, {
          dob: this.doctor.dob,
          phone: this.doctor.phone,
          email: this.doctor.email
        })

        alert('Personal information updated successfully!')
        this.closeEditPersonalInfoModal() // Cerrar el modal después de actualizar
      } catch (error) {
        alert('Error updating personal information: ' + error.message)
      }
    },

    // Agregar enfermedad a la lista de enfermedades
    addDisease (type, disease) {
      if (disease && !this.doctor[`${type}Diseases`].includes(disease)) {
        this.doctor[`${type}Diseases`].push(disease)
        this[type === 'speech' ? 'newSpeechDisease' : 'newPhysicalDisease'] = '' // Limpiar el campo de entrada
      } else {
        alert('Invalid or duplicate disease')
      }
    },

    // Eliminar enfermedad de la lista de enfermedades
    removeDisease (type, disease) {
      const index = this.doctor[`${type}Diseases`].indexOf(disease)
      if (index !== -1) {
        this.doctor[`${type}Diseases`].splice(index, 1)
      }
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.doctor-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 104.5%;
  margin-left: 1%;
  background-color: white;
  box-sizing: border-box;
}

.profile {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.details p {
  margin: 0;
  line-height: 1.4;
}

.details .gender, .details .specialty, .details .location {
  color: lightgray;
}

.edit-button {
  border: 1px solid black;
  background-color: transparent;
  color: black;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.icon-edit {
  margin-right: 5px;
}

.info-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  width: 104.5%;
  margin-top: 1%;
  margin-left: 1%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.body .info-item {
  margin-bottom: 5px;
}

.body .info-item strong {
  display: block;
  color: #aaa;
}

.body p {
  margin: 0;
}

.diseases-section {
  margin-bottom: 20px;
}

.diseases-section strong {
  display: block;
  margin-bottom: 10px;
}

.diseases-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.disease-item {
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.remove-item {
  cursor: pointer;
  color: red;
  font-size: 1.2em;
  margin-left: 10px;
}
.general-section {
  display: flex;
  justify-content: space-between;
}

.change-password {
  display: flex;
  align-items: center;
  margin-right: 5%;
}

.change-btn {
  border: 1px solid #2196F3;
  background-color: transparent;
  color: #2196F3;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.notifications {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 50px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 50px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

button {
  padding: 10px;
  margin-top: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1976D2;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
