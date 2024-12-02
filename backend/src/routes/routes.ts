import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getAllUsers, deleteUser, updateUser } from '../controller/userController';
import { registerPatient, getAllPatients, deletePatient, updatePatient } from '../controller/patientController';
import { crearCita, getAllDoctorCitas, getAllPatientCitas } from '../controller/citaController';
import authenticateToken from '../auth/authMiddleware';

const router = express.Router();

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/users/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// Rutas para pacientes
router.post('/registerpatient', registerPatient);
router.get('/getallpatients', getAllPatients);
router.delete('/patients/:nombre', deletePatient);
router.put('/patients/:nombre', updatePatient);

// Rutas para citas
router.post('/agendar', crearCita);
router.post('/myCitas', getAllDoctorCitas);

// Exportar el enrutador
export default router;