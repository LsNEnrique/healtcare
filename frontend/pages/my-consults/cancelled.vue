<template>
  <v-container>
    <v-row>
      <v-col v-for="(group, index) in canceledAppointmentsGrouped" :key="index" cols="12">
        <!-- Encabezado del Mes -->
        <v-row v-if="group.month" class="mb-2">
          <v-col cols="12" class="month-header">
            <strong>{{ group.month }}</strong>
          </v-col>
        </v-row>

        <!-- Tarjetas de Citas Canceladas -->
        <v-card v-for="(item, i) in group.appointments" :key="i" class="pa-0 mb-4 canceled" outlined>
          <v-row align="center">
            <!-- Fecha -->
            <v-col cols="2" class="date-column text-center">
              <div class="day">
                {{ item.day }}
              </div>
              <div class="date">
                {{ item.date }}
              </div>
            </v-col>

            <!-- Detalles -->
            <v-col cols="7" class="details-column">
              <p class="mb-1 time">
                <v-icon small left class="clock-icon">
                  mdi-clock
                </v-icon>
                {{ item.time }}
              </p>
              <p class="mb-1 issue">
                Issue: {{ item.issue }}
              </p>
              <p v-if="item.documents">
                <a :href="item.documents" class="documents-link">View Documents</a>
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
              {{ item.person }}
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
      appointments: []
    }
  },
  computed: {
    canceledAppointments () {
      return this.appointments.filter(appointment => appointment.status === 'canceled')
    },
    canceledAppointmentsGrouped () {
      const groups = []
      let currentMonth = null

      this.canceledAppointments.forEach((appointment) => {
        if (appointment.month !== currentMonth) {
          currentMonth = appointment.month
          groups.push({ month: currentMonth, appointments: [] })
        }
        groups[groups.length - 1].appointments.push(appointment)
      })

      return groups
    }
  },
  mounted () {
    this.fetchCanceledAppointments()
  },
  methods: {
    async fetchCanceledAppointments () {
      try {
        const doctorId = 'doctor123' // Reemplazar con el ID real del doctor
        const response = await axios.post('/api/myCitas', { doctorId })
        this.appointments = response.data
          .filter(cita => cita.status === 'canceled')
          .map(cita => ({
            month: this.formatMonth(cita.fecha),
            day: this.formatDay(cita.fecha),
            date: this.formatDate(cita.fecha),
            time: this.formatTime(cita.fecha),
            issue: cita.issue || 'General Check-up',
            documents: cita.documents || null,
            person: cita.pacienteId || 'Paciente desconocido',
            status: cita.status
          }))
      } catch (error) {
        alert('Error al obtener las citas: ' + error.message)
      }
    },
    formatMonth (fecha) {
      const date = new Date(fecha)
      return date.toLocaleString('default', { month: 'long', year: 'numeric' })
    },
    formatDay (fecha) {
      const date = new Date(fecha)
      return date.toLocaleString('default', { weekday: 'short' })
    },
    formatDate (fecha) {
      const date = new Date(fecha)
      return date.getDate()
    },
    formatTime (fecha) {
      const date = new Date(fecha)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>

<style scoped>
  .canceled {
    background-color: #ffefef;
    border-left: 4px solid #ff5252;
  }

  .month-header {
    font-size: 1.2rem;
    color: #666;
  }

  .date-column .day {
    font-size: 1.1rem;
    font-weight: bold;
    color: #444;
  }

  .date-column .date {
    font-size: 1.4rem;
    color: #333;
  }

  .details-column .time {
    font-size: 0.9rem;
    color: #555;
  }

  .details-column .issue {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }

  .documents-link {
    color: #1e88e5;
    text-decoration: underline;
  }

  .person-icon {
    color: #666;
  }

</style>
