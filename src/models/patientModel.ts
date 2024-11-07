import admin from '../config/firebase';
import { IPatient } from '../interfaces/patientInterface';
import { firestore } from 'firebase-admin';

// Definición de la interfaz para los datos del paciente
interface PatientData {
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
}

class Patient extends IPatient {
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
    super();
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.telefono = telefono;
    this.email = email;
    this.direccion = direccion;
  }

  static async createPatient(
    nombre: string,
    edad: number,
    sexo: string,
    telefono: string,
    email: string,
    direccion: string
  ): Promise<Patient> {
    try {
      const patientRef = firestore.collection('patients').doc(nombre);
      await patientRef.set({
        nombre,
        edad,
        sexo,
        telefono,
        email,
        direccion
      });

      return new Patient(nombre, edad, sexo, telefono, email, direccion);
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating patient');
    }
  }

  static async findByName(nombre: string): Promise<Patient | null> {
    try {
      const patientRef = firestore.collection('patients').doc(nombre);
      const patientDoc = await patientRef.get();

      if (patientDoc.exists) {
        const patientData = patientDoc.data();
        if (patientData) {
          return new Patient(patientData.nombre, patientData.edad, patientData.sexo, patientData.telefono, patientData.email, patientData.direccion);
        }
      }
      return null;
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error finding patient');
    }
  }

  static async getAllPatients(): Promise<any[]> {
    try {
      const patientsSnapshot = await firestore.collection('patients').get();
      const foundPatients: any[] = [];

      for (const doc of patientsSnapshot.docs) {
        const patientData = {
          id: doc.id,
          ...doc.data()
        };

        // Obtener las consultas del paciente
        const consultasSnapshot = await firestore.collection('patients').doc(doc.id).collection('consultas').get();
        const foundConsultas: any[] = [];

        consultasSnapshot.forEach((consultasDoc) => {
          foundConsultas.push({
            id: consultasDoc.id,
            ...consultasDoc.data()
          });
        });

        patientData.consultas = foundConsultas;
        foundPatients.push(patientData);
      }
      return foundPatients;
    } catch (error) {
      throw error;
    }
  }

  static async deletePatient(patientNombre: string): Promise<void> {
    try {
      await firestore.collection('patients').doc(patientNombre).delete();
    } catch (error) {
      throw error;
    }
  }

  static async updatePatient(patientNombre: string, patientData: Partial<PatientData>): Promise<any> {
    try {
      await firestore.collection('patients').doc(patientNombre).update(patientData);

      const patientUpdated = await firestore.collection('patients').doc(patientNombre).get();
      return {
        patientUpdated: patientUpdated.data()
      };
    } catch (error) {
      throw error;
    }
  }
}

export default Patient;