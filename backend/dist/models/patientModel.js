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
const patientInterface_1 = require("../interfaces/patientInterface");
const firebase_admin_1 = require("firebase-admin");
class Patient extends patientInterface_1.IPatient {
    constructor(nombre, edad, sexo, telefono, email, direccion) {
        super();
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }
    static createPatient(nombre, edad, sexo, telefono, email, direccion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRef = firebase_admin_1.firestore.collection('patients').doc(nombre);
                yield patientRef.set({
                    nombre,
                    edad,
                    sexo,
                    telefono,
                    email,
                    direccion
                });
                return new Patient(nombre, edad, sexo, telefono, email, direccion);
            }
            catch (error) {
                console.log('Error => ', error);
                throw new Error('Error creating patient');
            }
        });
    }
    static findByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRef = firebase_admin_1.firestore.collection('patients').doc(nombre);
                const patientDoc = yield patientRef.get();
                if (patientDoc.exists) {
                    const patientData = patientDoc.data();
                    if (patientData) {
                        return new Patient(patientData.nombre, patientData.edad, patientData.sexo, patientData.telefono, patientData.email, patientData.direccion);
                    }
                }
                return null;
            }
            catch (error) {
                console.log('Error => ', error);
                throw new Error('Error finding patient');
            }
        });
    }
    static getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientsSnapshot = yield firebase_admin_1.firestore.collection('patients').get();
                const foundPatients = [];
                for (const doc of patientsSnapshot.docs) {
                    const patientData = Object.assign({ id: doc.id }, doc.data());
                    // Obtener las consultas del paciente
                    const consultasSnapshot = yield firebase_admin_1.firestore.collection('patients').doc(doc.id).collection('consultas').get();
                    const foundConsultas = [];
                    consultasSnapshot.forEach((consultasDoc) => {
                        foundConsultas.push(Object.assign({ id: consultasDoc.id }, consultasDoc.data()));
                    });
                    patientData.consultas = foundConsultas;
                    foundPatients.push(patientData);
                }
                return foundPatients;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deletePatient(patientNombre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_admin_1.firestore.collection('patients').doc(patientNombre).delete();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updatePatient(patientNombre, patientData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_admin_1.firestore.collection('patients').doc(patientNombre).update(patientData);
                const patientUpdated = yield firebase_admin_1.firestore.collection('patients').doc(patientNombre).get();
                return {
                    patientUpdated: patientUpdated.data()
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Patient;
