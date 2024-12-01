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
class ICita {
    /*
      Verificar si una cita está disponible
      @param {string} doctorId -> ID del doctor
      @param {string} pacienteId -> ID del paciente
      @param {string} fecha -> fecha de la cita
      @returns {Promise<boolean>} -> Devuelve un booleano indicando si la cita está disponible
      @throws {Error} -> Si hay un error al verificar la disponibilidad
    */
    static isCitaDisponible(doctorId, pacienteId, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para verificar si la cita está disponible
            throw new Error('Not implemented');
        });
    }
    /*
      Crear una nueva cita
      @param {Cita} cita -> Objeto con los datos de la cita
      @returns {Promise<Cita>} -> Devuelve la cita creada
      @throws {Error} -> Si hay un error al crear la cita
    */
    static createCita(cita) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para crear una cita
            throw new Error('Not implemented');
        });
    }
    /*
      Obtener todas las citas
      @returns {Promise<Cita[]>} -> Devuelve un array de citas
      @throws {Error} -> Si hay un error al obtener las citas
    */
    static getCitas() {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para obtener todas las citas
            throw new Error('Not implemented');
        });
    }
    /*
      Obtener las citas por paciente
      @param {string} pacienteId -> ID del paciente
      @returns {Promise<Cita[]>} -> Devuelve un array de citas para el paciente especificado
      @throws {Error} -> Si hay un error al obtener las citas del paciente
    */
    static getCitasByPaciente(pacienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para obtener las citas por paciente
            throw new Error('Not implemented');
        });
    }
}
exports.default = ICita;
