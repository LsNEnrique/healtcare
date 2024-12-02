<template>
  <div class="container">
    <!-- Columna del Calendario -->
    <div class="calendar">
      <h2>Calendar</h2>
      <div class="calendar-header">
        <h3>{{ monthName }} {{ currentYear }}</h3>
        <div class="navigation-buttons">
          <button @click="previousMonth">
            ‹
          </button>
          <button @click="nextMonth">
            ›
          </button>
        </div>
      </div>
      <div class="calendar-grid">
        <!-- Encabezado con los días de la semana -->
        <div v-for="day in weekdays" :key="day" class="weekday">
          {{ day }}
        </div>
        <!-- Días del mes -->
        <div
          v-for="day in calendarDays"
          :key="day.date"
          :class="['day', { 'empty-day': !day.day }]"
          @click="seleccionarDia(day)"
        >
          <template v-if="day.day">
            <div class="appointments">
              <span v-for="appointment in day.appointments" :key="appointment.id" class="appointment">
                {{ appointment.pacienteId }}
              </span>
            </div>
            <span class="day-number">{{ day.day }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Columna Upcoming -->
    <div class="upcoming">
      <h2>Upcoming</h2>
      <h3>Today</h3>
      <div v-for="item in todayAppointments" :key="item.id" class="card">
        <h4>{{ item.pacienteId }}</h4>
        <p>{{ item.fecha }}</p>
      </div>
      <h3>Tomorrow</h3>
      <div v-for="item in tomorrowAppointments" :key="item.id" class="card">
        <h4>{{ item.pacienteId }}</h4>
        <p>{{ item.fecha }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default_doctor',
  data () {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      citas: [], // All the doctor's appointments
      todayAppointments: [], // Appointments for today
      tomorrowAppointments: [], // Appointments for tomorrow
      selectedDate: null
    }
  },
  computed: {
    monthName () {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' })
    },
    calendarDays () {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay()
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      const days = []

      // Días vacíos antes del inicio del mes
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ day: null, appointments: [] })
      }

      // Días reales del mes
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          appointments: this.getAppointmentsForDay(i)
        })
      }

      return days
    }
  },
  mounted () {
    this.loadCitas() // Cargar las citas cuando se monte el componente
  },
  methods: {
    getAppointmentsForDay (day) {
      // const date = new Date(this.currentYear, this.currentMonth, day)
      const formattedDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      return this.citas.filter(cita => cita.fecha === formattedDate)
    },
    nextMonth () {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear += 1
      } else {
        this.currentMonth += 1
      }
      this.loadCitas()
    },
    previousMonth () {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear -= 1
      } else {
        this.currentMonth -= 1
      }
      this.loadCitas()
    },
    seleccionarDia (day) {
      if (!day.day) { return }
      this.selectedDate = `${this.currentYear}-${this.currentMonth + 1}-${day.day}`
    },
    async loadCitas () {
      try {
        const response = await axios.post('/api/myCitas', { doctorId: 'doctorId' })
        this.citas = response.data

        // Filtrar las citas para mostrar las del día de hoy y del día siguiente
        this.todayAppointments = this.filterAppointmentsForDay(new Date())
        this.tomorrowAppointments = this.filterAppointmentsForDay(new Date(Date.now() + 86400000)) // Sumar 24 horas
      } catch (error) {
        console.error('Error al cargar las citas:', error)
      }
    },
    filterAppointmentsForDay (date) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      return this.citas.filter(cita => cita.fecha === formattedDate)
    }
  }
}
</script>

<style>
.container {
  display: flex;
  gap: 20px;
}

.calendar {
  flex: 1;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.navigation-buttons {
  display: flex;
  gap: 10px;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 días por semana */
  gap: 10px;
}

.weekday {
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.day {
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.empty-day {
  background-color: #f9f9f9;
}

.appointments {
  display: flex;
  gap: 5px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}

.appointment {
  background-color: #3B9ABB;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  max-width: 80px;
  text-align: center;
  font-size: 0.8em;
}

.day-number {
  font-weight: bold;
}

.upcoming {
  flex: 1;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.card h4 {
  margin: 0;
  font-weight: bold;
}

.card p {
  margin: 5px 0;
}

.card .date {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #888;
}
</style>
