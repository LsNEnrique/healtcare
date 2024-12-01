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
exports.getAllPatientCitas = exports.getAllDoctorCitas = exports.crearCita = void 0;
const Cita_1 = require("../models/Cita");
const crearCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorId, pacienteId, fecha } = req.body;
        // Verificar si la cita está disponible
        const isDisponible = yield Cita_1.Citas.isCitaDisponible(pacienteId, doctorId, fecha);
        if (!isDisponible) {
            return res.status(201).json({
                message: 'Ya existe una cita para esa hora.',
            });
        }
        // Crear la nueva cita
        const newCita = yield Cita_1.Citas.createCita(pacienteId, doctorId, fecha);
        res.status(201).json({
            message: 'Cita agendada exitosamente',
            cita: newCita,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
exports.crearCita = crearCita;
const getAllDoctorCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.body;
    try {
        const citas = yield Cita_1.Citas.getDoctorCitas(doctorId);
        res.json({
            citas,
            message: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
exports.getAllDoctorCitas = getAllDoctorCitas;
const getAllPatientCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.doctorId;
    const pacienteId = req.params.pacienteId;
    try {
        const citas = yield Cita_1.Citas.getCitasByPaciente(doctorId, pacienteId);
        res.json({
            citas,
            message: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
exports.getAllPatientCitas = getAllPatientCitas;
