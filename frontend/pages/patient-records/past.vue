<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="before-yesterday-header">
          Appointments Before Yesterday
        </h2>
      </v-col>
      <v-col v-for="(appointment, index) in beforeYesterdayAppointments" :key="index" cols="12">
        <v-card class="pa-0 mb-4 before-yesterday" outlined>
          <v-row align="center">
            <!-- Fecha -->
            <v-col cols="2" class="date-column text-center">
              <div class="day">
                {{ appointment.day }}
              </div>
              <div class="date">
                {{ appointment.date }}
              </div>
            </v-col>

            <!-- Detalles -->
            <v-col cols="7" class="details-column">
              <p class="mb-1 time">
                <v-icon small left class="clock-icon">
                  mdi-clock
                </v-icon>
                {{ appointment.time }}
              </p>
              <p class="mb-1 issue">
                Issue: {{ appointment.issue }}
              </p>
              <p v-if="appointment.documents">
                <a :href="appointment.documents" class="documents-link">View Documents</a>
              </p>
              <p v-else>
                -
              </p>
            </v-col>

            <!-- Persona -->
            <v-col cols="2" class="person-column text-center">
              <v-icon small class="person-icon">
                mdi-account
              </v-icon>
              {{ appointment.person }}
            </v-col>

            <!-- Botón -->
            <v-col cols="1" class="actions-column text-right">
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default_doctor',
  data () {
    return {
      allAppointments: [],
      beforeYesterdayAppointments: []
    }
  },
  async mounted () {
    await this.fetchAppointments()
  },
  methods: {
    async fetchAppointments () {
      try {
        const doctorId = 'doctor123' // Reemplazar con el ID real del doctor
        const response = await axios.post('/api/myCitas', { doctorId })
        this.appointments = response.data.map(cita => ({
          day: this.formatDay(cita.fecha),
          date: this.formatDate(cita.fecha),
          time: this.formatTime(cita.fecha),
          issue: cita.issue || 'General Check-up',
          documents: cita.documents || null,
          person: cita.pacienteId || 'Paciente desconocido'
        }))

        // Filtramos las citas para obtener solo las de antes de ayer
        this.filterAppointmentsWithinLast5Days()
      } catch (error) {
        alert('Error al obtener las citas: ' + error.message)
      }
    },
    filterAppointmentsWithinLast5Days () {
      const today = new Date()
      today.setDate(today.getDate() - 2) // Fecha de ayer
      const beforeYesterdayDate = today.toISOString().split('T')[0] // Formato YYYY-MM-DD (antes de ayer)

      // Calculamos los últimos 5 días antes de ayer
      const fiveDaysAgo = new Date(today)
      fiveDaysAgo.setDate(today.getDate() - 5) // Fecha 5 días antes de ayer
      const fiveDaysAgoDate = fiveDaysAgo.toISOString().split('T')[0] // Formato YYYY-MM-DD

      // Filtramos las citas para obtener solo las que están entre estos 5 días
      const filteredAppointments = this.allAppointments.filter((appointment) => {
        return appointment.date >= fiveDaysAgoDate && appointment.date <= beforeYesterdayDate
      })

      // Asignamos las citas filtradas a la propiedad
      this.beforeYesterdayAppointments = filteredAppointments

  computed: {
    beforeYesterdayAppointments () {
      return this.appointments.filter(
        appointment => appointment.date <= this.beforeYesterdayDate
      )
    }

  }
}
</script>

<style scoped>
.date-column {
  background-color: #f9f9f9;
  border-right: 1px solid #e0e0e0;
}

.day {
  font-weight: bold;
  font-size: 1rem;
}

.date {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
}

.details-column {
  padding-left: 16px;
}

.time {
  font-size: 0.9rem;
  color: #4a4a4a;
}

.header {
    font-size: 1.4rem;
    color: #444;
    margin-bottom: 20px;
}

.issue {
  font-size: 0.9rem;
  font-weight: bold;
}

.documents-link {
  font-size: 0.9rem;
  color: #1a73e8;
  text-decoration: none;
}

.documents-link:hover {
  text-decoration: underline;
}

.person-column {
  font-size: 0.9rem;
  color: #4a4a4a;
}

.actions-column {
  padding-right: 16px;
}

.v-card {
  border-radius: 8px;
}

</style>
