<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="before-yesterday-header">
          Appointments Before Yesterday
        </h2>
      </v-col>

      <!-- Tarjetas de Citas Antes de Ayer -->
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
export default {
  layout: 'default_doctor',
  data () {
    const today = new Date()
    today.setDate(today.getDate() - 2)
    const beforeYesterdayDate = today.toISOString().split('T')[0] // Fecha antes de ayer (YYYY-MM-DD)

    return {
      beforeYesterdayDate,
      appointments: [
        { day: 'Mon', date: '2024-11-25', time: '09:00am - 09:30am', issue: 'Fever', documents: '#', person: 'Stephine Claire', status: 'confirmed' },
        { day: 'Sat', date: '2024-11-23', time: '10:00am - 10:30am', issue: 'Headache', documents: '#', person: 'John Doe', status: 'confirmed' },
        { day: 'Sun', date: '2024-11-24', time: '11:00am - 11:30am', issue: 'Cold', documents: '#', person: 'Jane Smith', status: 'confirmed' },
        { day: 'Fri', date: '2024-11-22', time: '09:00am - 09:30am', issue: 'Cough', documents: null, person: 'Alice Johnson', status: 'confirmed' }
      ]
    }
  },
  computed: {
    beforeYesterdayAppointments () {
      return this.appointments.filter(
        appointment => appointment.date === this.beforeYesterdayDate
      )
    }
  }
}
</script>

<style scoped>
  .before-yesterday {
    background-color: #fffbf0;
    border-left: 4px solid #ff9800;
  }

  .before-yesterday-header {
    font-size: 1.4rem;
    color: #444;
    margin-bottom: 20px;
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
