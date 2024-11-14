<template>
  <div class="appointment-history-container">
    <!-- Contenedor con título y botones -->
    <div class="header">
      <h1 class="title">
        History
      </h1>

      <!-- Contenedor para los botones y el menú -->
      <div class="button-container">
        <!-- Menú desplegable para seleccionar mes y año -->
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

    <!-- Historial de citas -->
    <div class="appointments">
      <div v-for="(appointment, index) in groupedAppointments" :key="index" class="appointment-group">
        <h3>{{ appointment.dateLabel }}</h3>
        <div v-for="(appointmentItem, index) in appointment.appointments" :key="index" class="appointment-box">
          <p>{{ appointmentItem.time }} - {{ appointmentItem.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'DefaultLayout',
  data () {
    return {
      selectedMonth: null, // Mes seleccionado
      selectedYear: 2024, // Año seleccionado
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      appointments: [
        { date: this.getYesterday(), time: '10:00 AM', description: 'Check-up' },
        { date: this.getToday(), time: '2:00 PM', description: 'Follow-up' },
        { date: this.getTomorrow(), time: '9:00 AM', description: 'Consultation' },
        { date: this.getToday(), time: '11:00 AM', description: 'Vaccination' },
        { date: this.getYesterday(), time: '1:00 PM', description: 'Routine check' }
      ]
    }
  },
  computed: {
    groupedAppointments () {
      const groups = [
        { dateLabel: 'Yesterday', appointments: [] },
        { dateLabel: 'Today', appointments: [] },
        { dateLabel: 'Tomorrow', appointments: [] }
      ]

      this.appointments.forEach((appointment) => {
        const dateStr = appointment.date
        if (dateStr === this.getYesterday()) {
          groups[0].appointments.push(appointment)
        } else if (dateStr === this.getToday()) {
          groups[1].appointments.push(appointment)
        } else if (dateStr === this.getTomorrow()) {
          groups[2].appointments.push(appointment)
        }
      })

      return groups
    }
  },
  methods: {
    getYesterday () {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return this.formatDate(yesterday)
    },
    getToday () {
      const today = new Date()
      return this.formatDate(today)
    },
    getTomorrow () {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return this.formatDate(tomorrow)
    },
    formatDate (date) {
      return date.toISOString().split('T')[0] // YYYY-MM-DD
    },
    selectMonthYear () {
      console.log('Select Month/Year clicked')
      // Lógica para seleccionar mes/año
    },
    createNewAppointment () {
      console.log('Create New Appointment clicked')
      // Lógica para crear una nueva cita
    }
  }
}
</script>

<style scoped>
.appointment-history-container {
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

.button-container {
  display: flex;
  gap: 5px;
  align-items: center;
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
  background-color: #1976D2;  /* Mantiene el azul */
  color: white;  /* Letras blancas */
  opacity: 0.9;  /* Efecto hover */
}

.appointments {
  margin-top: 20px;
}

.appointment-group {
  margin-bottom: 20px;
}

.appointment-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.appointment-box p {
  margin: 0;
  color: #333;
  font-size: 16px;
}
</style>
