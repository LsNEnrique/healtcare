import db from '../config/firebase';
import { IPatient } from '../interfaces/patientInterface';

export interface PatientData {
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
}

export class Patient implements IPatient {
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;

  constructor(
    nombre: string,
    edad: number,
    sexo: string,
    telefono: string,
    email: string,
    direccion: string
  ) {
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.telefono = telefono;
    this.email = email;
    this.direccion = direccion;
  }

  /**
   * Crear un nuevo paciente en la base de datos.
   * @param nombre Nombre del paciente.
   * @param edad Edad del paciente.
   * @param sexo Sexo del paciente.
   * @param telefono Teléfono del paciente.
   * @param email Email del paciente.
   * @param direccion Dirección del paciente.
   * @returns Instancia del paciente creado.
   */
  static async createPatient(
    nombre: string,
    edad: number,
    sexo: string,
    telefono: string,
    email: string,
    direccion: string
  ): Promise<Patient> {
    try {
      const patientRef = db.collection('patients').doc(nombre);
      await patientRef.set({
        nombre,
        edad,
        sexo,
        telefono,
        email,
        direccion,
      });

      return new Patient(nombre, edad, sexo, telefono, email, direccion);
    } catch (error) {
      console.error('Error creating patient:', error);
      throw new Error('Error creating patient');
    }
  }

  /**
   * Buscar un paciente por nombre en la base de datos.
   * @param nombre Nombre del paciente.
   * @returns Instancia del paciente encontrado o `null` si no existe.
   */
  static async findByName(nombre: string): Promise<Patient | null> {
    try {
      const patientRef = db.collection('patients').doc(nombre);
      const patientDoc = await patientRef.get();

      if (patientDoc.exists) {
        const patientData = patientDoc.data() as PatientData;
        return new Patient(
          patientData.nombre,
          patientData.edad,
          patientData.sexo,
          patientData.telefono,
          patientData.email,
          patientData.direccion
        );
      }
      return null;
    } catch (error) {
      console.error('Error finding patient:', error);
      throw new Error('Error finding patient');
    }
  }

  /**
   * Obtener todos los pacientes de la base de datos, incluyendo sus consultas.
   * @returns Lista de pacientes con sus respectivas consultas.
   */
  static async getAllPatients(): Promise<PatientData[]> {
    try {
      const patientsSnapshot = await db.collection('patients').get();
      const foundPatients: PatientData[] = [];

      for (const doc of patientsSnapshot.docs) {
        const patientData = doc.data() as PatientData;
        const consultasSnapshot = await db
          .collection('patients')
          .doc(doc.id)
          .collection('consultas')
          .get();

        const consultas = consultasSnapshot.docs.map((consultaDoc) => ({
          id: consultaDoc.id,
          ...consultaDoc.data(),
        }));

        foundPatients.push({
          ...patientData,
          ...consultas,
        });
      }
      return foundPatients;
    } catch (error) {
      console.error('Error getting all patients:', error);
      throw new Error('Error getting all patients');
    }
  }

  /**
   * Eliminar un paciente de la base de datos.
   * @param nombre Nombre del paciente.
   */
  static async deletePatient(nombre: string): Promise<void> {
    try {
      await db.collection('patients').doc(nombre).delete();
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error('Error deleting patient');
    }
  }

  /**
   * Actualizar los datos de un paciente en la base de datos.
   * @param nombre Nombre del paciente.
   * @param patientData Datos a actualizar.
   * @returns Datos actualizados del paciente.
   */
  static async updatePatient(
    nombre: string,
    patientData: Partial<PatientData>
  ): Promise<PatientData | null> {
    try {
      const patientRef = db.collection('patients').doc(nombre);
      await patientRef.update(patientData);

      const updatedDoc = await patientRef.get();
      return updatedDoc.exists ? (updatedDoc.data() as PatientData) : null;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error('Error updating patient');
    }
  }
}

export default Patient;
