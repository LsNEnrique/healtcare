<template>
  <v-app>
    <div class="login-container">
      <!-- Left Side -->
      <!-- Image -->
      <div class="left-side">
        <v-container>
          <v-icon color="white" class="logo-text">
            mdi-medication
          </v-icon>
          <span class="logo-text">Healthi</span>
          <v-col class="image-container">
            <v-img :src="require('@/assets/login-01.png')" alt="Login Image" contain />
          </v-col>
        </v-container>
      </div>

      <!-- Right Side -->
      <div class="right-side d-flex flex-column">
        <v-btn icon class="close-btn" @click="$router.push('/')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-container class="d-flex justify-center align-center flex-grow-1">
          <v-container class="login-box">
            <h1 class="welcome-text">
              Welcome back
            </h1>
            <p class="signup-text">
              New to Healthi?
              <v-btn text class="signup-link" @click="$router.push('/register')">
                Sign up
              </v-btn>
            </p>

            <v-form>
              <v-text-field label="Email address" outlined />
              <v-text-field label="Your password" type="password" outlined />
              <v-btn class="login-button" block color="#3B9AB8" @click="$router.push('/dashboard-after')">
                Log In
              </v-btn>
            </v-form>

            <div class="additional-links d-flex justify-space-between mt-2">
              <v-checkbox label="Remind me" class="remind-checkbox" />
              <!--<v-btn text class="forgot-password" @click="$router.push('/forgot-password')">
                Forgot password?
              </v-btn>
              -->
              <v-btn text class="forgot-password">
                Forgot password?
              </v-btn>
            </div>

            <p class="login-with-text">
              or log in with
            </p>

            <v-row class="social-buttons">
              <v-btn icon>
                <v-icon color="#DB4437">
                  mdi-google
                </v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="#4267B2">
                  mdi-facebook
                </v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="#000000">
                  mdi-apple
                </v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'no-sideBar'
}
</script>

  <style scoped>
  .login-container {
    display: flex;
    height: 100vh;
  }

  .left-side {
    /*background-color: #869CA3;*/
    background: linear-gradient(91.63deg, #4c6169 -4.01%, #568392 90.53%);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-container {
    position: relative;
    width: 730px;
    height: auto;
    top: 33px;
    left: -35px;
  }

  .right-side {
    background-color: white;
    width: 50%;
    position: relative;
  }

  .close-btn {
    align-self: flex-end;
    margin: 16px;
    background-color: white !important;
    color: #000 !important;
  }

  .login-box {
    width: 400px;
    text-align: center;
  }

  .logo-text {
    text-align: center;
    font-size: 48px;
    color: white;
    margin-bottom: 16px;
    font-weight: bold;
  }

  .welcome-text {
    font-size: 48px;
    color: black;
    margin-bottom: 16px;
  }

  .signup-text {
    font-size: 20px;
    color: gray;
  }

  .signup-link {
    color: #3B9AB8;
  }

  .login-button {
    background-color: #3B9AB8;
    color: white;
    margin-top: 16px;
  }

  .additional-links {
    font-size: 14px;
  }

  .remind-checkbox {
    color: gray;
  }

  .forgot-password {
    color: #3B9AB8;
  }

  .login-with-text {
    margin-top: 16px;
    color: gray;
    font-size: 14px;
  }

  .social-buttons {
    margin-top: 8px;
  }
  </style>
