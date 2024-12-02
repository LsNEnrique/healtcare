<template>
  <v-app>
    <!-- Top container -->
    <v-container fluid>
      <v-row>
        <!-- Top right container 70%-->
        <v-col cols="12" md="7">
          <!-- Top inner rigth container-->
          <v-row>
            <v-container class="main-container">
              <v-container class="inner-container">
                <v-row no-gutters>
                  <v-col>
                    <h1 class="title-text">
                      No need to visit local hospitals<br>Get your consultation online
                    </h1>
                    <p class="subtitle-text">
                      Audio/text/video/in-person
                    </p>
                  </v-col>
                  <v-col class="image-container">
                    <v-img :src="require('@/assets/Dashboard-before-login-01.png')" alt="Dashboard Image" contain />
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-row>
          <!-- Bottom inner rigth container-->
          <v-row>
            <!-- Location prompt container -->
            <v-container class="outside-prompt-container py-5">
              <h1 class="title-text" style="color: black;">
                Nearby doctors
              </h1>
              <v-container class="location-prompt-container text-center py-5">
                <v-icon large color="#3B9AB8">
                  mdi-crosshairs-gps
                </v-icon>
                <p class="subtitle-text" style="color: black;">
                  Please enable your location, so we can find nearby doctors
                </p>
                <v-btn color="#3B9AB8" dark @click="enableLocation">
                  Enable Now
                </v-btn>
              </v-container>
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
      <v-row no-gutters class="w-100 d-flex align-center justify-space-between">
        <h1 class="title-text-2">
          Recommended Doctors
        </h1> <v-btn text color="#3B9AB8" @click="$router.push('/doctors')">
          View all >
        </v-btn>
      </v-row>

      <v-row no-gutters>
        <!-- Structure holding doctor information -->
        <v-col cols="4">
          <v-container class="doctor-card">
            <div class="doctor-info">
              <v-avatar class="doctor-avatar">
                <img :src="require('@/assets/doctor1.jpg')" alt="Patient photo">
              </v-avatar>
              <div class="doctor-details">
                <p class="doctor-name">
                  Amanda Clara
                </p>
                <p class="doctor-experience">
                  Specialist | 12 years of experience
                </p>
                <p class="doctor-specialty">
                  Pediatric
                </p>
              </div>
            </div>
            <div class="doctor-schedule">
              <v-icon class="schedule-icon">
                mdi-clock-outline
              </v-icon>
              <p>Tue, Thu</p>
              <p>10:00AM - 01:00PM</p>
              <div class="doctor-fee">
                <v-icon class="fee-icon">
                  mdi-currency-usd
                </v-icon>
                <p>$25 Starting</p>
              </div>
            </div>
            <v-btn class="book-appointment-btn">
              Book an Appointment
            </v-btn>
          </v-container>
        </v-col>
        <!-- Repeat Doctor Card structure for other columns -->
        <v-col cols="4">
          <v-container class="doctor-card">
            <div class="doctor-info">
              <v-avatar class="doctor-avatar">
                <img :src="require('@/assets/doctor2.jpg')" alt="Patient photo">
              </v-avatar>
              <div class="doctor-details">
                <p class="doctor-name">
                  Jason Shatsky
                </p>
                <p class="doctor-experience">
                  Specialist | 10 years of experience
                </p>
                <p class="doctor-specialty">
                  Surgical
                </p>
              </div>
            </div>
            <div class="doctor-schedule">
              <v-icon class="schedule-icon">
                mdi-clock-outline
              </v-icon>
              <p>Tue, Thu</p>
              <p>10:00AM - 01:00PM</p>
              <div class="doctor-fee">
                <v-icon class="fee-icon">
                  mdi-currency-usd
                </v-icon>
                <p>$35 Starting</p>
              </div>
            </div>
            <v-btn class="book-appointment-btn">
              Book an Appointment
            </v-btn>
          </v-container>
        </v-col>
        <v-col cols="4">
          <v-container class="doctor-card">
            <div class="doctor-info">
              <v-avatar class="doctor-avatar">
                <img :src="require('@/assets/doctor3.jpg')" alt="Patient photo">
              </v-avatar>
              <div class="doctor-details">
                <p class="doctor-name">
                  Jessie Dux
                </p>
                <p class="doctor-experience">
                  Specialist | 7 years of experience
                </p>
                <p class="doctor-specialty">
                  Gastroentrology
                </p>
              </div>
            </div>
            <div class="doctor-schedule">
              <v-icon class="schedule-icon">
                mdi-clock-outline
              </v-icon>
              <p>Tue, Thu</p>
              <p>10:00AM - 01:00PM</p>
              <div class="doctor-fee">
                <v-icon class="fee-icon">
                  mdi-currency-usd
                </v-icon>
                <p>$15 Starting</p>
              </div>
            </div>
            <v-btn class="book-appointment-btn">
              Book an Appointment
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'default',
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
.title {
  color: #3B9AB8;
  margin-left: 10px;
  font-weight: bold;
}

.gopro-btn {
  background-color: white !important;
  color: gray !important;
}

.login-btn {
  background-color: white !important;
  color: #3B9AB8 !important;
}

.register-btn {
  background-color: #3B9AB8 !important;
  color: white !important;
  transition: background-color 0.3s, color 0.3s;
  padding-left: 15px;
  padding-right: 15px;
}

/* New Content Styles */
.main-container {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}

.inner-container {
  position: relative;
  width: 100%;
  height: 262px;
  background: linear-gradient(91.63deg, #B0B9BC -4.01%, #568392 90.53%);
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.image-container {
  position: absolute;
  width: 341px;
  height: 263px;
  gap: 0px;
  top: -1px;
  left: 430px;
  opacity: 1;
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

.title-text-2 {
  color: black;
  font-size: 24px;
  margin: 0;
}

.subtitle-text {
  color: white;
  font-size: 20px;
}

/* Styles for Doctor Card */
.doctor-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px -10px;
  gap: 10px;
  width: 374.67px;
  height: 259px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
  margin: 30px;
}

.doctor-info {
  display: flex;
  width: 100%;
  height: 30%;
}

.doctor-avatar {
  flex: 1;
}

.doctor-details {
  flex: 2;
  padding-left: 10px;
}

.doctor-name {
  font-weight: bold;
  font-size: 18px;
  margin: 0;
}

.doctor-experience {
  font-size: 14px;
  margin: 0;
}

.doctor-specialty {
  background-color: #EBFFFA;
  color: #3B9AB8;
  margin: 0;
}

.doctor-schedule {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 12px;
}

.schedule-icon,
.fee-icon {
  margin-right: 5px;
}

.doctor-fee {
  display: flex;
  align-items: center;
  color: #3B9AB8;
  font-size: 12px;
}

.book-appointment-btn {
  background-color: #3B9AB8 !important;
  color: white !important;
  width: 100%;
  margin-top: 10px;
}

.outside-prompt-container {
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 16px;
}

.location-prompt-container {
  background-color: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
}

</style>
