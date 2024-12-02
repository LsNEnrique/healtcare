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
const citaInterface_1 = require("../interfaces/citaInterface");
const firebase_admin_1 = require("firebase-admin");
class Citas extends citaInterface_1.ICita {
    constructor(pacienteId, doctorId, fecha) {
        super();
        this.pacienteId = pacienteId;
        this.doctorId = doctorId;
        this.fecha = fecha;
    }
    static createCita(pacienteId, doctorId, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterRef = firebase_admin_1.firestore.collection('counters').doc('citas');
            let newId;
            try {
                yield firebase_admin_1.firestore.runTransaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const counterDoc = yield transaction.get(counterRef);
                    if (!counterDoc.exists) {
                        throw new Error('Counter document does not exist!');
                    }
                    const lastId = (_a = counterDoc.data()) === null || _a === void 0 ? void 0 : _a.lastId;
                    if (typeof lastId !== 'number') {
                        throw new Error('Invalid lastId in counter document!');
                    }
                    newId = lastId + 1;
                    transaction.update(counterRef, { lastId: newId });
                }));
                const citaRef = firebase_admin_1.firestore.collection('citas').doc(newId.toString());
                yield citaRef.set({
                    pacienteId,
                    doctorId,
                    fecha,
                });
                return new Citas(pacienteId, doctorId, fecha);
            }
            catch (error) {
                console.log('Error => ', error);
                throw new Error('Error creating cita');
            }
        });
    }
    static isCitaDisponible(pacienteId, doctorId, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar citas del doctor
                const citasDoctorEncontradas = yield firebase_admin_1.firestore
                    .collection('citas')
                    .where('doctorId', '==', doctorId)
                    .where('fecha', '==', fecha)
                    .get();
                // Verificar citas del paciente
                const citasPacienteEncontradas = yield firebase_admin_1.firestore
                    .collection('citas')
                    .where('pacienteId', '==', pacienteId)
                    .where('fecha', '==', fecha)
                    .get();
                const isDoctorAvailable = citasDoctorEncontradas.empty;
                const isPacienteAvailable = citasPacienteEncontradas.empty;
                return isDoctorAvailable && isPacienteAvailable;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static getDoctorCitas(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citasSnapshot = yield firebase_admin_1.firestore
                    .collection('citas')
                    .where('doctorId', '==', doctorId)
                    .get();
                const citas = [];
                citasSnapshot.forEach((doc) => {
                    citas.push(Object.assign({ id: doc.id }, doc.data()));
                });
                return citas;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getCitasByPaciente(doctorId, pacienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citasSnapshot = yield firebase_admin_1.firestore
                    .collection('citas')
                    .where('doctorId', '==', doctorId)
                    .where('pacienteId', '==', pacienteId)
                    .get();
                const citas = [];
                citasSnapshot.forEach((doc) => {
                    citas.push(Object.assign({ id: doc.id }, doc.data()));
                });
                return citas;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Citas;
