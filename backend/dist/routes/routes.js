"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const patientController_1 = require("../controller/patientController");
const citaController_1 = require("../controller/citaController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = express_1.default.Router();
// Rutas para usuarios
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/get-all-users', authMiddleware_1.default, userController_1.getAllUsers);
router.delete('/users/:email', authMiddleware_1.default, userController_1.deleteUser);
router.put('/users/:email', authMiddleware_1.default, userController_1.updateUser);
// Rutas para pacientes
router.post('/registerpatient', patientController_1.registerPatient);
router.get('/getallpatients', patientController_1.getAllPatients);
router.delete('/patients/:nombre', patientController_1.deletePatient);
router.put('/patients/:nombre', patientController_1.updatePatient);
// Rutas para citas
router.post('/agendar', citaController_1.crearCita);
router.post('/myCitas', citaController_1.getAllDoctorCitas);
// Exportar el enrutador
exports.default = router;
