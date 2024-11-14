<template>
  <div class="container">
    <div class="doctor-card">
      <div class="profile">
        <img src="/path/to/image.jpg" alt="Profile Picture" class="profile-image">
        <div class="details">
          <p class="name">
            Dr. John Doe <span class="gender">(M)</span>
          </p>
          <p class="specialty">
            Cardiologist
          </p>
          <p class="location">
            New York, USA
          </p>
        </div>
      </div>
      <button class="edit-button">
        <i class="mdi mdi-pencil" /> Edit
      </button>
    </div>

    <div class="info-card">
      <div class="header">
        <h2>Personal Information</h2>
        <button class="edit-button">
          <i class="mdi mdi-pencil" /> Edit
        </button>
      </div>
      <div class="body">
        <div class="info-item">
          <strong>Name</strong>
          <p>Dr. John Doe</p>
        </div>
        <div class="info-item">
          <strong>Date of Birth</strong>
          <p>January 1, 1980</p>
        </div>
        <div class="info-item">
          <strong>Age</strong>
          <p>44</p>
        </div>
        <div class="info-item">
          <strong>Phone Number</strong>
          <p>+1 (555) 123-4567</p>
        </div>
        <div class="info-item">
          <strong>Email Address</strong>
          <p>john.doe@example.com</p>
        </div>
        <div class="info-item">
          <strong>Speciality</strong>
          <p>Cardiology</p>
        </div>
      </div>
    </div>

    <div class="info-card">
      <div class="header">
        <h2>Pre-existing Diseases</h2>
      </div>
      <div class="body">
        <!-- Speech Diseases -->
        <div class="diseases-section">
          <strong>Speech</strong>
          <div class="diseases-list">
            <div class="disease-item">
              Stroke <span class="remove-item" @click="removeDisease('speech', 'stroke')">❌</span>
            </div>
            <div class="disease-item">
              Dysarthria <span class="remove-item" @click="removeDisease('speech', 'dysarthria')">❌</span>
            </div>
            <div class="disease-item">
              Aphasia <span class="remove-item" @click="removeDisease('speech', 'aphasia')">❌</span>
            </div>
          </div>
        </div>

        <!-- Physical Diseases -->
        <div class="diseases-section">
          <strong>Physical</strong>
          <div class="diseases-list">
            <div class="disease-item">
              Hypertension <span class="remove-item" @click="removeDisease('physical', 'hypertension')">❌</span>
            </div>
            <div class="disease-item">
              Diabetes <span class="remove-item" @click="removeDisease('physical', 'diabetes')">❌</span>
            </div>
            <div class="disease-item">
              Arthritis <span class="remove-item" @click="removeDisease('physical', 'arthritis')">❌</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- General Section -->
    <div class="info-card">
      <div class="header">
        <h2>General</h2>
      </div>
      <div class="body">
        <!-- Change Password Section -->
        <div class="general-section">
          <div class="change-password">
            <strong>Change Password</strong>
            <button class="change-btn">
              Change
            </button>
          </div>

          <!-- Notifications Section -->
          <div class="notifications">
            <strong>Notifications</strong>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'DefaultLayout',
  methods: {
    removeDisease (type, disease) {
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.doctor-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 104.5%;
  margin-left: 1%;
  background-color: white;
  box-sizing: border-box;
}

.profile {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.details p {
  margin: 0;
  line-height: 1.4;
}

.details .gender, .details .specialty, .details .location {
  color: lightgray;
}

.edit-button {
  border: 1px solid black;
  background-color: transparent;
  color: black;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.icon-edit {
  margin-right: 5px;
}

.info-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  width: 104.5%;
  margin-top: 1%;
  margin-left: 1%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.body .info-item {
  margin-bottom: 5px;
}

.body .info-item strong {
  display: block;
  color: #aaa;
}

.body p {
  margin: 0;
}

.diseases-section {
  margin-bottom: 20px;
}

.diseases-section strong {
  display: block;
  margin-bottom: 10px;
}

.diseases-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.disease-item {
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.remove-item {
  cursor: pointer;
  color: red;
  font-size: 1.2em;
  margin-left: 10px;
}
.general-section {
  display: flex;
  justify-content: space-between;
}

.change-password {
  display: flex;
  align-items: center;
  margin-right: 5%;
}

.change-btn {
  border: 1px solid #2196F3;
  background-color: transparent;
  color: #2196F3;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.notifications {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 50px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 50px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(14px);
}
</style>
