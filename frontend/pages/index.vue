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
            <!-- Same structure as above -->
          </v-container>
        </v-col>
        <!-- Repeat Doctor Card structure for other columns -->
        <v-col cols="4">
          <v-container class="doctor-card">
            <!-- Same structure as above -->
          </v-container>
        </v-col>
        <v-col cols="4">
          <v-container class="doctor-card">
            <!-- Same structure as above -->
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

/* New Content Styles */
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
  padding: 20px 20px 30px;
  gap: 10px;
  width: 374.67px;
  height: 259px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 16px;
  margin: 30px
}

.frame {
  display: flex;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}

.ellipse-191 {
  width: 65px;
  height: 65px;
}

.doctor-name {
  width: 121px;
  height: 27px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #000000;
}

.doctor-info {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #7A7D84;
}

.appointment-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 334.67px;
  height: 40px;
  background: #3B9AB8;
  border-radius: 8px;
  color: #FFFFFF;
}

.v-container {
  background-color: white;
}

.v-application {
  background-color: white !important;
}

.text-black {
  color: black;
}

.justify-text {
  text-align: justify;
}

.footer {
  margin: 16px 0;
  padding: 10px;
}

.social-icons {
  display: flex;
  justify-content: center;
}
</style>
