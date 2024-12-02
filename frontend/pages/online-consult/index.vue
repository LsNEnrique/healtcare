<template>
  <v-container class="pa-6 rounded elevation-2 mt-2">
    <!-- Título -->
    <h2 class="text-h5 font-weight-bold mb-3">
      Consultation Info
    </h2>
    <!-- Descripción -->
    <p class="text-body-2 text-grey--text mb-5">
      A brief description about the consultation service.
    </p>

    <!-- Contenedor de columnas -->
    <v-row>
      <!-- Columna Izquierda -->
      <v-col cols="6">
        <h3 class="text-subtitle-1 font-weight-semibold mb-2">
          Availability
        </h3>
        <v-radio-group v-model="availability" row>
          <v-radio label="Disable" value="disable" />
          <v-radio label="Enable" value="enable" />
        </v-radio-group>
      </v-col>
      <v-col cols="6">
        <h3 class="text-subtitle-1 font-weight-semibold mb-2">
          Type of Availability
        </h3>
        <v-radio-group v-model="typeOfAvailability" row>
          <v-radio label="WhatsApp Chat" value="whatsapp" />
          <v-radio label="Video Call" value="video" />
          <v-radio label="Phone Call" value="phone" />
        </v-radio-group>
      </v-col>

      <!-- Columna Derecha -->
      <v-col cols="6">
        <h3 class="text-subtitle-1 font-weight-semibold mb-2">
          Duration
        </h3>
        <v-select
          v-model="duration"
          :items="durations"
          label="Select Duration"
          outlined
        />
      </v-col>
      <v-col cols="6">
        <h3 class="text-subtitle-1 font-weight-semibold mb-2">
          Fees
        </h3>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="currency"
              :items="currencies"
              label="Currency"
              outlined
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="fees"
              label="Amount"
              type="number"
              outlined
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Botones -->
    <v-row class="mt-6">
      <v-col class="d-flex justify-end" cols="12">
        <v-btn
          color="grey"
          class="mr-4"
          outlined
          @click="resetConfig"
        >
          Reset
        </v-btn>
        <v-btn
          color="blue"
          class="white--text"
          @click="saveConfig"
        >
          Save
        </v-btn>
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
      availability: 'enable',
      typeOfAvailability: 'whatsapp',
      duration: '30 minutes',
      durations: ['15 minutes', '30 minutes', '45 minutes', '1 hour'],
      fees: '',
      currency: 'USD',
      currencies: ['USD', 'EUR', 'MXN', 'GBP']
    }
  },
  methods: {
    // Restablecer valores a los predeterminados
    resetConfig () {
      this.availability = 'enable'
      this.typeOfAvailability = 'whatsapp'
      this.duration = '30 minutes'
      this.fees = ''
      this.currency = 'USD'
    },
    // Enviar la configuración de disponibilidad al backend
    async saveConfig () {
      try {
        const configData = {
          availability: this.availability,
          typeOfAvailability: this.typeOfAvailability,
          duration: this.duration,
          fees: this.fees,
          currency: this.currency
        }

        const response = await axios.post('/api/disponibilidad', configData)

        // Manejamos la respuesta del servidor
        if (response.status === 200) {
          alert('Configuration saved successfully!')
          this.resetConfig() // Restablecemos los valores después de guardar
        } else {
          alert('Error saving configuration.')
        }
      } catch (error) {
        alert('An error occurred while saving the configuration.' + error.message)
      }
    }
  }
}
</script>
<style scoped>
</style>
