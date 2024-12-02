<template>
  <v-app>
    <v-app-bar color="white" fixed app elevation="0">
      <v-container>
        <v-row align="center">
          <!-- App Bar Icon -->
          <v-col class="d-flex align-center" cols="auto">
            <v-icon color="#3B9AB8">
              mdi-medication
            </v-icon>
          </v-col>
          <!-- Title -->
          <v-col class="d-flex align-center" cols="auto">
            <span class="title">Healthi</span>
          </v-col>
          <!-- Spacer to push action items to the far right -->
          <v-spacer />
          <!-- Action Items -->
          <v-col class="d-flex justify-end" cols="auto">
            <v-btn class="gopro-btn" text @click="$router.push('/gopro')">
              Go Pro
            </v-btn>
            <v-btn class="login-btn" text @click="$router.push('/login')">
              Login
            </v-btn>
            <v-btn class="register-btn" text @click="$router.push('/register')">
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Top container -->
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

    <!-- Search bar -->
    <v-row justify="center" class="mt-n5">
      <!-- Adjust margin-top to peek out -->
      <v-col cols="12" md="8" lg="6">
        <div
          class="search-container d-flex align-items-center elevation-2"
          style="background-color: #FFFFFF; border-radius: 10px; padding: 10px;"
        >
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Find doctors"
            style="background-color: #f5f5f5; color: black; border-radius: 10px; margin-right: 10px;"
            solo
            flat
            hide-details
          />
          <v-select
            :items="['Location']"
            style="background-color: #f5f5f5; color: black; border-radius: 10px; margin-right: 10px;"
            prepend-inner-icon="mdi-crosshairs-gps"
            solo
            flat
            hide-details
          />
          <v-btn
            style="background-color: #3B9AB8; color: white; border-radius: 10px; white-space: nowrap;"
            class="ml-2"
          >
            Search
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Bottom container -->
    <v-container class="main-container-2">
      <v-row no-gutters class="w-100 d-flex align-center justify-space-between">
        <h1 class="title-text-2">
          Recommended Doctors
        </h1>
        <v-btn text color="#3B9AB8" @click="$router.push('/doctors')">
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
  layout: 'no-sideBar',
  data () {
    return {
      images: []
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

.main-container {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 96px; /* Ensure the container is below the app bar */
}

.inner-container {
  position: relative;
  width: 1156px;
  height: 262px;
  background: linear-gradient(91.63deg, #B0B9BC -4.01%, #568392 90.53%);
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.image-container {
  position: absolute;
  width: 401px;
  height: 309px;
  top: -48px;
  left: 680px;
  gap: 0px;
  opacity: 1;
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
</style>
