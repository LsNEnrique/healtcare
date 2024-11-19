<template>
  <div class="container">
    <!-- Primera fila: Mes actual -->
    <div class="row">
      <h2>{{ currentMonth }}</h2>
      <div class="rows">
        <div
          v-for="(item, index) in currentMonthCards"
          :key="'current-' + index"
          class="row-item"
        >
          <div class="column date">
            <span class="day">{{ item.day }}</span>
            <span class="weekday">{{ item.weekday }}</span>
          </div>
          <div class="column info">
            <div><span class="label">Time:</span> {{ item.time }}</div>
            <div><span class="label">Name:</span> {{ item.name }}</div>
            <div><span class="label">Issue:</span> {{ item.issue }}</div>
            <a href="#" class="view-documents">View Documents</a>
          </div>
          <div class="column actions">
            <select v-model="item.selectedOption" @change="handleOptionChange(index, 'current')">
              <option disabled value="">
                Edit
              </option>
              <option value="edit">
                Edit
              </option>
              <option value="cancel">
                Cancel
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Segunda fila: Próximo mes -->
    <div class="row">
      <h2>{{ nextMonth }}</h2>
      <div class="rows">
        <div
          v-for="(item, index) in nextMonthCards"
          :key="'next-' + index"
          class="row-item"
        >
          <div class="column date">
            <span class="day">{{ item.day }}</span>
            <span class="weekday">{{ item.weekday }}</span>
          </div>
          <div class="column info">
            <div><span class="label">Time:</span> {{ item.time }}</div>
            <div><span class="label">Name:</span> {{ item.name }}</div>
            <div><span class="label">Issue:</span> {{ item.issue }}</div>
            <a href="#" class="view-documents">View Documents</a>
          </div>
          <div class="column actions">
            <select v-model="item.selectedOption" @change="handleOptionChange(index, 'next')">
              <option disabled value="">
                Edit
              </option>
              <option value="edit">
                Edit
              </option>
              <option value="cancel">
                Cancel
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentMonth: 'November',
      nextMonth: 'December',
      currentMonthCards: [
        {
          day: '18',
          weekday: 'Mon',
          time: '10:00 AM',
          name: 'John Doe',
          issue: 'Payment',
          selectedOption: ''
        },
        {
          day: '19',
          weekday: 'Tue',
          time: '11:30 AM',
          name: 'Jane Smith',
          issue: 'Refund',
          selectedOption: ''
        },
        {
          day: '20',
          weekday: 'Wed',
          time: '2:00 PM',
          name: 'Alice Brown',
          issue: 'Complaint',
          selectedOption: ''
        }
      ],
      nextMonthCards: [
        {
          day: '1',
          weekday: 'Fri',
          time: '9:00 AM',
          name: 'Bob Martin',
          issue: 'Feedback',
          selectedOption: ''
        },
        {
          day: '2',
          weekday: 'Sat',
          time: '3:30 PM',
          name: 'Clara Lee',
          issue: 'Support',
          selectedOption: ''
        },
        {
          day: '3',
          weekday: 'Sun',
          time: '4:15 PM',
          name: 'Eve White',
          issue: 'Inquiry',
          selectedOption: ''
        }
      ]
    }
  },
  methods: {
    handleOptionChange (index, type) {
      if (type === 'current' && this.currentMonthCards[index].selectedOption === 'cancel') {
        this.currentMonthCards.splice(index, 1)
      } else if (type === 'next' && this.nextMonthCards[index].selectedOption === 'cancel') {
        this.nextMonthCards.splice(index, 1)
      }
    }
  }
}
</script>

  <style>
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 16px;
  }

  .row {
    margin-bottom: 32px;
  }

  .rows {
    display: flex;
    flex-direction: column;
    width: 100%; /* Asegura que las filas ocupen todo el ancho disponible */
  }

  .row-item {
    display: flex;
    align-items: center;
    width: 100%; /* Las filas ocupan el 100% del ancho */
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
  }

  .row-item:last-child {
    border-bottom: none;
  }

  .column {
    padding: 0 16px;
  }

  .column-info{
    flex-direction: row;
    background-color: white;
  }

  .date {
    flex: 0 0 100px; /* Ancho fijo para la columna de la fecha */
    text-align: center;
  }

  .date .day {
    font-size: 18px;
    font-weight: bold;
  }

  .date .weekday {
    font-size: 14px;
    color: #666;
  }

  .info {
    flex: 1;
  }

  .info .label {
    font-weight: bold;
  }

  .actions {
    flex: 0 0 120px; /* Ancho fijo para las acciones */
  }

  .view-documents {
    text-decoration: none;
    font-size: 14px;
  }
  </style>
