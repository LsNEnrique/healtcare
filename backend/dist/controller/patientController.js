"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = exports.deletePatient = exports.getAllPatients = exports.registerPatient = void 0;
const patientModel_1 = require("../models/patientModel");
const registerPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, edad, sexo, telefono, email, direccion } = req.body;
        // Verificar si el paciente ya existe
        const existingPatient = yield patientModel_1.Patient.findByName(email);
        if (existingPatient) {
            return res.status(400).json({
                message: 'Patient already exists'
            });
        }
        // Crear un nuevo paciente
        const newPatient = yield patientModel_1.Patient.createPatient(nombre, edad, sexo, telefono, email, direccion);
        res.status(201).json({
            message: 'Patient registered successfully',
            patient: newPatient
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.registerPatient = registerPatient;
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patientModel_1.Patient.getAllPatients();
        res.json({
            patients,
            message: 'success'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.getAllPatients = getAllPatients;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientNombre = req.params.nombre;
    try {
        yield patientModel_1.Patient.deletePatient(patientNombre);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.deletePatient = deletePatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientNombre = req.params.nombre;
    const patientData = req.body;
    try {
        const updatedPatient = yield patientModel_1.Patient.updatePatient(patientNombre, patientData);
        res.json({
            updatedPatient,
            message: 'success'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.updatePatient = updatePatient;
