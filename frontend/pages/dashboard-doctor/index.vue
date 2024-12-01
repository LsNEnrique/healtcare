<template>
  <v-app>
    <!-- Top container -->
    <v-container fluid>
      <v-row>
        <!-- Top right container 70%-->
        <v-col cols="12" md="7">
          <!-- Top inner right container-->
          <v-row>
            <v-container class="main-container">
              <v-container class="inner-container">
                <TodayAppointments />
              </v-container>
            </v-container>
          </v-row>
          <!-- Bottom inner right container-->
          <v-row>
            <v-container class="outside-prompt-container py-5">
              <h1 />
            </v-container>
          </v-row>
        </v-col>
        <!-- Top left container 30% with Calendar-->
        <v-col cols="12" md="5">
          <v-container class="calendar-container">
            <h1 class="title-text" style="color: black;">
              Upcoming Appointments
            </h1>
            <!-- Calendar -->
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
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <!-- Bottom container -->
    <v-container class="main-container-2">
      <h1 />
    </v-container>
  </v-app>
</template>

<script>
import TodayAppointments from './../patient-records/today.vue'

export default {
  components: {
    TodayAppointments
  },
  layout: 'default_doctor',
  data () {
    return {
      images: [],
      locationEnabled: false,
      focus: new Date().toISOString().slice(0, 10)
    }
  },
  head () {
    return {
      title: 'Dashboard-before-login',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  computed: {
    displayMonth () {
      const date = new Date(this.focus)
      const options = { month: 'long', year: 'numeric' }
      return date.toLocaleDateString(undefined, options)
    }
  },
  watch: {
    locationEnabled (val) {
      if (val) {
        // Logic to show 3 small containers instead of the location prompt
      }
    }
  },
  methods: {
    enableLocation () {
      this.locationEnabled = true
    },
    viewDay ({ date }) {
      this.focus = date
    },
    prevMonth () {
      const date = new Date(this.focus)
      date.setMonth(date.getMonth() - 1)
      this.focus = date.toISOString().slice(0, 10)
    },
    nextMonth () {
      const date = new Date(this.focus)
      date.setMonth(date.getMonth() + 1)
      this.focus = date.toISOString().slice(0, 10)
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}

.inner-container {
  position: relative;
  width: 100%;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

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

.calendar-container {
  margin-top: 20px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
  padding: 20px;
}

.main-container-2 {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.title-text {
  color: white;
  font-size: 30px;
  margin: 0;
}

.outside-prompt-container {
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 16px;
}
</style>
