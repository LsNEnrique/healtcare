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
        <button class="new-appointment-btn" @click="showModal = true">
          + New Appointment
        </button>
      </div>
    </div>

    <!-- Historial de citas -->
    <div class="appointments">
      <div v-for="(appointment, index) in groupedAppointments" :key="index" class="appointment-group">
        <h3>{{ appointment.dateLabel }}</h3>
        <div v-for="(appointmentItem, innerIndex) in appointment.appointments" :key="innerIndex" class="appointment-box">
          <p>{{ appointmentItem.time }} - {{ appointmentItem.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal Appointment -->
    <v-dialog v-model="showModal" max-width="1200px">
      <v-card style="height: 600px;">
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Left part of the modal -->
              <v-col cols="6">
                <v-btn icon class="close-btn" @click="closeModal">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="doctor-info">
                  <v-icon>mdi-doctor</v-icon> {{ doctor_name }}
                </div>
                <div class="duration-info">
                  <v-icon>mdi-clock-outline</v-icon> {{ duration_time_minutes }}
                </div>
                <div class="video-info">
                  <v-icon>mdi-video-outline</v-icon> Video call details provided upon successful confirmation
                </div>
                <div class="fee-info">
                  <v-icon>mdi-cash</v-icon> Fee: {{ fee_amount }}
                </div>
              </v-col>
              <!-- Right part of the modal for calendar -->
              <v-col cols="6">
                <!-- first part-->
                <div v-if="modalStep === 1">
                  <div class="d-flex justify-space-between align-items-center mb-2">
                    <v-btn @click="prevMonth">
                      &lt;
                    </v-btn>
                    <v-btn disabled>
                      {{ displayMonth }}
                    </v-btn>
                    <v-btn @click="nextMonth">
                      &gt;
                    </v-btn>
                  </div>
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="f5f5f5"
                    show-month
                    @click:more="viewDay"
                  />
                  <div class="date-info">
                    {{ displayDate }}
                  </div>
                  <!-- 5 cols 2 rows of buttons-->
                  <v-row>
                    <v-col v-for="n in 10" :key="n" cols="2">
                      <v-btn :color="selectedTime === `${n}` ? 'blue' : 'grey'">
                        12:00
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn class="mt-4" color="#1976D2" dark @click="nextStep">
                    Next
                  </v-btn>
                </div>
                <div v-else>
                  <v-form>
                    <v-text-field label="Patient's Email" outlined />
                    <v-row>
                      <v-col cols="4">
                        <v-select
                          :items="extensions"
                          label="Extension"
                          item-text="text"
                          item-value="value"
                          outlined
                          class="extension-select"
                        />
                      </v-col>
                      <v-col cols="8">
                        <v-text-field label="Phone number" outlined maxlength="10" />
                      </v-col>
                    </v-row>
                    <v-select v-model="selectedProblem" :items="problems" outlined label="Problem" />
                    <h3>Payment Details</h3>
                    <v-radio-group v-model="paymentMethod">
                      <v-radio label="PayPal" value="paypal" />
                      <v-radio label="Paytm" value="paytm" />
                      <v-radio label="Credit Card" value="credit-card" />
                    </v-radio-group> <v-btn color="#1976D2" dark @click="confirmAppointment">
                      Confirm
                    </v-btn>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
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
      extensions: [
        { text: '🇺🇸 +1', value: '+1' },
        { text: '🇲🇽 +52', value: '+52' }
        // Add more extensions as needed
      ],
      doctors: [], // Lista de doctores disponibles
      doctorId: null, // ID del doctor seleccionado
      doctor_name: '',
      duration_time_minutes: '',
      fee_amount: '',
      appointments: [], // Citas obtenidas
      selectedMonth: null, // Mes seleccionado para el filtro
      selectedYear: 2024, // Año seleccionado para el filtro
      selectedMonthYear: '',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      showModal: false,
      modalStep: 1,
      focus: new Date().toISOString().slice(0, 10),
      selectedTime: null,
      patientEmail: '',
      contactNumber: '',
      selectedProblem: '',
      problems: ['Fever', 'Cough', 'Headache', 'Stomachache', 'Other'],
      paymentMethod: ''
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
        const appointmentDate = new Date(appointment.date)
        if (this.isSameDay(appointmentDate, this.getYesterday())) {
          groups[0].appointments.push(appointment)
        } else if (this.isSameDay(appointmentDate, this.getToday())) {
          groups[1].appointments.push(appointment)
        } else if (this.isSameDay(appointmentDate, this.getTomorrow())) {
          groups[2].appointments.push(appointment)
        }
      })

      return groups
    },

    filteredAppointments () {
      // Filtrar las citas por mes y año seleccionados
      const filteredByMonth = this.appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        const appointmentMonth = appointmentDate.getMonth()
        const appointmentYear = appointmentDate.getFullYear()
        return appointmentMonth === this.selectedMonth && appointmentYear === this.selectedYear
      })

      return filteredByMonth
    },

    displayMonth () {
      const date = new Date(this.focus)
      const options = { month: 'long', year: 'numeric' }
      return date.toLocaleDateString(undefined, options)
    }
  },

  mounted () {
    // Obtener las citas del paciente al cargar la página
    this.fetchAppointments()
  },
  methods: {
    async fetchAppointments () {
      try {
        const response = await axios.get('/api/patientCitas')
        this.appointments = response.data.map(cita => ({
          date: cita.date,
          time: cita.time,
          description: cita.description
        }))
        this.filterAppointmentsByMonth()
      } catch (error) {
        alert('Error al obtener las citas: ' + error.message)
      }
    },

    // Método para obtener la disponibilidad del doctor
    async fetchDoctorAvailability (doctorId) {
      try {
        const response = await axios.get('/api/disponibilidad', { params: { doctor_id: doctorId } })
        const doctorData = response.data
        this.doctor_name = doctorData.name
        this.duration_time_minutes = doctorData.duration
        this.fee_amount = doctorData.fee
      } catch (error) {
        alert('Error al obtener la información del doctor: ' + error.message)
      }
    },

    // Filtra las citas por el mes seleccionado
    filterAppointmentsByMonth () {
      if (this.selectedMonth !== null && this.selectedYear !== null) {
        this.appointments = this.filteredAppointments
      }
    },

    // Método para agendar una nueva cita
    async createNewAppointment () {
      const appointmentData = {
        patientEmail: this.patientEmail,
        contactNumber: this.contactNumber,
        selectedTime: this.selectedTime,
        selectedProblem: this.selectedProblem,
        paymentMethod: this.paymentMethod,
        doctor_id: this.doctorId
      }

      try {
        const response = await axios.post('/api/agendar', appointmentData)
        if (response.status === 200) {
          alert('Cita agendada con éxito')
          this.showModal = false
          this.fetchAppointments() // Refrescar las citas después de agendar una nueva
        }
      } catch (error) {
        alert('Error al agendar la cita: ' + error.message)
      }
    },
    watch: {
      focus (newVal) {
        const date = new Date(newVal)
        this.displayDate = date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
      }
    },
    // Método para cambiar el mes seleccionado
    onMonthYearChange () {
      const [month, year] = this.selectedMonthYear.split(' ')
      this.selectedMonth = this.months.indexOf(month)
      this.selectedYear = parseInt(year)
      this.filterAppointmentsByMonth() // Filtrar las citas según el mes y año seleccionados
    },
    confirmAppointment () {
      this.createNewAppointment()
    },

    closeModal () {
      if (this.modalStep !== 1) {
        this.modalStep = 1
      } else {
        this.showModal = false
      }
    },

    nextStep () {
      this.modalStep = 2
    },

    // Métodos para obtener las fechas de ayer, hoy, y mañana
    getYesterday () {
      const today = new Date()
      today.setDate(today.getDate() - 1)
      return today.toISOString().split('T')[0] // Retorna la fecha de ayer en formato YYYY-MM-DD
    },

    getToday () {
      return new Date().toISOString().split('T')[0] // Retorna la fecha de hoy en formato YYYY-MM-DD
    },

    getTomorrow () {
      const today = new Date()
      today.setDate(today.getDate() + 1)
      return today.toISOString().split('T')[0] // Retorna la fecha de mañana en formato YYYY-MM-DD
    },

    isSameDay (date1, date2) {
      return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0]
    }
  }
}</script>

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

.new-appointment-btn,
.next-modal-btn {
  background-color: #1976D2;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.new-appointment-btn:hover{
  background-color: #1976D2;
  color: white;
  opacity: 0.9;
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

.close-btn {
  align-self: flex-end;
  margin: 16px;
  background-color: white !important;
  color: #000 !important;
}

.doctor-info,
.duration-info,
.video-info,
.fee-info,
.date-info {
  margin: 16px 0;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.doctor-info v-icon,
.duration-info v-icon,
.video-info v-icon,
.fee-info v-icon {
  margin-right: 8px;
}
</style>
