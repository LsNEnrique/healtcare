<template>
  <v-app>
    <div class="register-container">
      <!-- Left Side -->
      <div class="left-side">
        <v-container>
          <v-icon color="white" class="logo-text">
            mdi-medication
          </v-icon>
          <span class="logo-text">Healthi</span>
          <v-col class="image-container">
            <v-img :src="require('@/assets/login-01.png')" alt="Register Image" contain />
          </v-col>
        </v-container>
      </div>

      <!-- Right Side -->
      <div class="right-side d-flex flex-column">
        <v-btn icon class="close-btn" @click="$router.push('/')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-container class="d-flex justify-center align-center flex-grow-1">
          <v-container class="register-box">
            <h1 class="hey-there-text">
              Hey there
            </h1>
            <p class="login-text">
              Already know Healthi?
              <v-btn text class="login-link" @click="$router.push('/login')">
                Log in
              </v-btn>
            </p>

            <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
              <!--<v-text-field v-model="nombre" label="Nombre" outlined :rules="[rules.required]" />
              <v-text-field v-model="edad" label="Edad" outlined :rules="[rules.required]" />
              <v-text-field v-model="sexo" label="Sexo" outlined :rules="[rules.required]" />-->
              <v-text-field v-model="email" label="Email address" outlined :rules="[rules.required, rules.email]" />
              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="extension"
                    :items="extensions"
                    label="Extension"
                    item-text="text"
                    item-value="value"
                    outlined
                    class="extension-select"
                  />
                </v-col>
                <v-col cols="8">
                  <v-text-field v-model="telefono" label="Phone number" outlined :rules="[rules.required]" maxlength="10" />
                </v-col>
              </v-row>
              <v-text-field v-model="password" label="Your password" type="password" outlined :rules="[rules.required]" />
              <v-menu
                ref="datePickerMenu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="birthDate"
                    label="Birth Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="birthDate" no-title @input="datePickerMenu = false" />
              </v-menu>
              <v-btn class="register-button" block color="#3B9AB8" type="submit">
                Sign Up
              </v-btn>
            </v-form>

            <v-checkbox label="Remember me" class="remember-checkbox" />

            <p class="signup-with-text">
              or sign up with
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
import axios from 'axios'

export default {
  layout: 'no-sideBar',
  data () {
    return {
      extensions: [
        { text: '🇺🇸 +1', value: '+1' },
        { text: '🇲🇽 +52', value: '+52' }
      ],
      nombre: '',
      edad: '',
      sexo: '',
      email: '',
      password: '',
      telefono: '',
      extension: '',
      birthDate: '',
      datePickerMenu: false,
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'
      }
    }
  },
  methods: {
    async handleRegister () {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:3000/registerpatient', {
            nombre: this.nombre,
            edad: this.edad,
            sexo: this.sexo,
            telefono: `${this.extension}${this.telefono}`,
            email: this.email,
            direccion: this.birthDate
          })

          if (response.status === 201) {
            this.$router.push('/dashboard-after')
          }
        } catch (error) {
          console.error('Error registering patient:', error)
        }
      }
    }
  }
}

</script>

<style scoped>
.register-container {
  display: flex;
  height: 150vh;
}

.left-side {
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
  height: auto;
}

.right-side {
  background-color: white;
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close-btn {
  align-self: flex-end;
  margin: 16px;
  background-color: white !important;
  color: #000 !important;
}

.register-box {
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

.hey-there-text {
  font-size: 48px;
  color: black;
  margin-bottom: 16px;
}

.login-text {
  font-size: 20px;
  color: gray;
}

.login-link {
  color: #3B9AB8;
}

.register-button {
  background-color: #3B9AB8;
  color: white;
  margin-top: 16px;
}

.remember-checkbox {
  color: gray;
}

.signup-with-text {
  margin-top: 16px;
  color: gray;
  font-size: 14px;
}

.social-buttons {
  margin-top: 8px;
}
</style>
