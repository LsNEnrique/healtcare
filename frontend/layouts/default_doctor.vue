<template>
  <v-app color="white">
    <v-navigation-drawer
      app
      elevation="1"
      color="white"
      :mini-variant="miniVariant"
      :right="right"
    >
      <!-- Sidebar -->
      <v-list>
        <v-list-item class="logo-container">
          <v-icon color="#3B9AB8" class="mr-2">
            mdi-medication
          </v-icon>
          <v-list-item-title class="logo-text">
            Healthi
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          link
          class="sidebar-item"
          :class="{ 'selected-item': $route.path === item.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="app-background">
      <!-- Encabezado -->
      <HeaderBar
        v-if="showHeader"
        :title="headerTitle"
        :patient-name="patientName"
        :patient-photo="patientPhoto"
        :languages="languages"
        @change-language="changeLanguage"
      />

      <!-- Botones de navegación de My-Consults -->
      <NavigationButtons
        v-if="showNavigationButtonsConsults"
        :buttons="navigationButtonsConsults"
        :selected-button="selectedButton"
        @select-button="selectButton"
      />

      <!-- Nuevos botones -->
      <div v-if="showNavigationButtonsConsults" class="button-container">
        <!-- Botón de nueva cita -->
        <v-btn
          color="blue"
          @click="showModal=true"
        >
          + New Appointment
        </v-btn>
      </div>

      <!-- Botones de navegación de Patient-Records -->
      <NavigationButtons
        v-if="showNavigationButtonsPatient"
        :buttons="navigationButtonsPatient"
        :selected-button="selectedButton"
        @select-button="selectButton"
      />

      <!-- Contenido principal -->
      <v-main>
        <nuxt />
      </v-main>

      <!-- Modal Appointment -->
      <v-dialog v-model="showModal" max-width="1200px">
        <v-card style="height: 600px;">
          <v-card-text>
            <v-container>
              <v-row>
                <!-- Left part of the modal -->
                <v-col cols="6">
                  <v-btn icon class="close-btn" @click="closeModal">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <div class="doctor-info">
                    <v-icon>mdi-doctor</v-icon> {{ doctor_name }}
                  </div>
                  <div class="duration-info">
                    <v-icon>mdi-clock-outline</v-icon> {{ duration_time_minutes }}
                  </div>
                  <div class="video-info">
                    <v-icon>mdi-video-outline</v-icon> Video call details provided upon successful confirmation
                  </div>
                  <div class="fee-info">
                    <v-icon>mdi-cash</v-icon> Fee: {{ fee_amount }}
                  </div>
                </v-col>
                <!-- Right part of the modal for calendar -->
                <v-col cols="6">
                  <!-- first part-->
                  <div v-if="modalStep === 1">
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
                    <div class="date-info">
                      {{ displayDate }}
                    </div>
                    <!-- 5 cols 2 rows of buttons-->
                    <v-row>
                      <v-col v-for="n in 10" :key="n" cols="2">
                        <v-btn :color="selectedTime === `${n}` ? 'blue' : 'grey'">
                          12:00
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-btn class="mt-4" color="#1976D2" dark @click="nextStep">
                      Next
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-form>
                      <v-text-field label="Patient's Email" outlined />
                      <v-row>
                        <v-col cols="4">
                          <v-select
                            :items="extensions"
                            label="Extension"
                            item-text="text"
                            item-value="value"
                            outlined
                            class="extension-select"
                          />
                        </v-col>
                        <v-col cols="8">
                          <v-text-field label="Phone number" outlined maxlength="10" />
                        </v-col>
                      </v-row>
                      <v-select v-model="selectedProblem" :items="problems" outlined label="Problem" />
                      <h3>Payment Details</h3>
                      <v-radio-group v-model="paymentMethod">
                        <v-radio label="PayPal" value="paypal" />
                        <v-radio label="Paytm" value="paytm" />
                        <v-radio label="Credit Card" value="credit-card" />
                      </v-radio-group> <v-btn color="#1976D2" dark @click="confirmAppointment">
                        Confirm
                      </v-btn>
                    </v-form>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import NavigationButtons from '@/components/NavigationButtons.vue'

export default {
  components: { HeaderBar, NavigationButtons },
  data () {
    return {
      patientName: 'John Doe',
      patientPhoto: 'https://example.com/path/to/photo.jpg',
      languages: ['English', 'Spanish', 'French'],
      selectedButton: null,
      miniVariant: false,
      right: false,
      menuVisible: false,
      selectedMonth: 'May\'24',
      months: [
        'Jan\'24', 'Feb\'24', 'Mar\'24', 'Apr\'24', 'May\'24', 'Jun\'24',
        'Jul\'24', 'Aug\'24', 'Sep\'24', 'Oct\'24', 'Nov\'24', 'Dec\'24'
      ],
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard-doctor'
        },
        {
          icon: 'mdi-file-document-multiple-outline',
          title: 'Patient Records',
          to: '/patient-records/yesterday'
        },
        {
          icon: 'mdi-calendar',
          title: 'My Availabity',
          to: '/my-availabity'
        },
        {
          icon: 'mdi-account',
          title: 'My Consults',
          to: '/my-consults/upcoming'
        },
        {
          icon: 'mdi-video-outline',
          title: 'Online Consult',
          to: '/online-consult'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/'
        }
      ],
      extensions: [
        { text: '🇺🇸 +1', value: '+1' },
        { text: '🇲🇽 +52', value: '+52' }
      ],
      showModal: false,
      modalStep: 1,
      doctor_name: 'Dr. John Doe',
      duration_time_minutes: '30 mins',
      fee_amount: '$50',
      focus: new Date().toISOString().slice(0, 10),
      displayDate: '',
      selectedTime: null,
      patientEmail: '',
      contactNumber: '',
      selectedProblem: '',
      problems: ['Fever', 'Cough', 'Headache', 'Stomachache', 'Other'],
      paymentMethod: ''
    }
  },
  computed: {
    displayMonth () {
      const date = new Date(this.focus)
      const options = { month: 'long', year: 'numeric' }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.displayDate = date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
      // this.displayDate = date.toLocaleDateString(undefined, options)
      return date.toLocaleDateString(undefined, options)
    },
    showHeader () {
      return [
        '/patient-records',
        '/my-availabity',
        '/my-consults',
        '/online-consult'].some(path =>
        this.$route.path.startsWith(path)
      )
    },
    headerTitle () {
      if (this.$route.path.startsWith('/patient-records')) {
        return 'Patient Records'
      }
      if (this.$route.path.startsWith('/my-availabity')) {
        return 'My Availabity'
      }
      if (this.$route.path.startsWith('/my-consults')) {
        return 'Booking'
      }
      if (this.$route.path.startsWith('/online-consult')) {
        return 'Online Consult'
      }
      return ''
    },
    showNavigationButtonsConsults () {
      return this.$route.path.startsWith('/my-consults')
    },
    showNavigationButtonsPatient () {
      return this.$route.path.startsWith('/patient-records')
    },
    navigationButtonsConsults () {
      return [
        {
          name: 'upcoming',
          label: 'Upcoming',
          to: '/my-consults/upcoming'
        },
        {
          name: 'past',
          label: 'Past',
          to: '/my-consults/past'
        },
        {
          name: 'cancelled',
          label: 'Cancelled',
          to: '/my-consults/cancelled'
        }
      ]
    },
    navigationButtonsPatient () {
      return [
        {
          name: 'yesterday',
          label: 'Yesterday',
          to: '/patient-records/yesterday'
        },
        {
          name: 'today',
          label: 'Today',
          to: '/patient-records/today'
        },
        {
          name: 'Past',
          label: 'Past',
          to: '/patient-records/past'
        }
      ]
    }
  },
  methods: {
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
    },
    changeLanguage (lang) {
    },
    selectButton (button) {
      this.selectedButton = button
    },
    closeModal () {
      if (this.modalStep !== 1) {
        this.modalStep = 1
      } else {
        this.showModal = false
      }
    },
    nextStep () {
      this.modalStep = 2
    },
    confirmAppointment () {
      // logic to insert appointment
      this.modalStep = 1
      this.showModal = false
    }
  }
}
</script>

<style scoped>
  .logo-container {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .logo-text {
    font-size: 20px;
    font-weight: bold;
  }

  .sidebar-item {
    padding: 10px 16px;
    border-radius: 8px;
    margin: 0.5rem;
    transition: all 0.3s ease;
  }

  .sidebar-item:hover {
    background-color: rgba(59, 154, 184, 0.1);
  }

  .selected-item {
    background-color: rgba(59, 154, 184, 0.2);
    color: #3b9ab8;
  }

  .app-background {
    background-color: #f9fbfd;
    min-height: 100vh;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    margin-left: 80%;
    align-items: center;
  }

  .v-btn.outlined {
    background-color: white;
    border: 1px solid #3b9ab8;
    color: #3b9ab8;
    font-weight: bold;
  }

  .v-btn[color="blue"] {
    background-color: #3b9ab8;
    color: white;
    font-weight: bold;
  }

  .v-dialog__content {
    padding: 2rem;
  }
</style>
