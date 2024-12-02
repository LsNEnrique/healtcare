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
class IPatient {
    /*
      Crear un nuevo paciente
      @param {string} nombre -> Nombre del paciente
      @returns {Promise<Patient>} -> Devuelve el paciente creado
      @throws {Error} -> Si hay un error al crear el paciente
    */
    static createPatient(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para crear el paciente
            throw new Error('Not implemented');
        });
    }
    /*
      Buscar un paciente por nombre
      @param {string} nombre -> Nombre del paciente
      @returns {Promise<Patient | null>} -> Devuelve el paciente encontrado o null si no se encuentra
      @throws {Error} -> Si hay un error al buscar el paciente
    */
    static findByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para buscar el paciente
            throw new Error('Not implemented');
        });
    }
}
exports.default = IPatient;
