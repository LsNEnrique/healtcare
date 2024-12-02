<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="header">
          Yesterday's Appointments
        </h2>
      </v-col>
      <v-col v-for="(item, index) in appointments" :key="index" cols="12">
        <v-card class="pa-0 mb-4" outlined>
          <v-row align="center">
            <!-- Fecha -->
            <v-col cols="2" class="date-column text-center">
              <div class="day">
                {{ item.day }}
              </div>
              <div class="date">
                {{ item.date }}
              </div>
            </v-col>

            <!-- Detalles -->
            <v-col cols="7" class="details-column">
              <p class="mb-1 time">
                <v-icon small left class="clock-icon">
                  mdi-clock
                </v-icon>
                {{ item.time }}
              </p>
              <p class="mb-1 issue">
                Issue: {{ item.issue }}
              </p>
              <p v-if="item.documents">
                <a :href="item.documents" class="documents-link">View Documents</a>
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
              {{ item.person }}
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
    return {
      appointments: [
        {
          day: 'Thu',
          date: '15',
          time: '09:00am - 09:30am',
          issue: 'Fever',
          documents: '#',
          person: 'Stephine Claire'
        },
        {
          day: 'Fri',
          date: '16',
          time: '09:00am - 09:30am',
          issue: 'Fever',
          documents: '#',
          person: 'Stephine Claire'
        },
        {
          day: 'Mon',
          date: '19',
          time: '09:00am - 09:30am',
          issue: 'Fever',
          documents: null,
          person: 'Stephine Claire'
        }
      ]
    }
  }
}
</script>

<style scoped>
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

</style>
