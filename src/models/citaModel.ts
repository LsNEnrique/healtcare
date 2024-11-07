import admin from '../config/firebase';
import  { ICita }  from '../interfaces/citaInterface';
import { firestore } from 'firebase-admin';

interface Cita {
  pacienteId: string;
  doctorId: string;
  fecha: string;
}

class Citas extends ICita {
  pacienteId: string;
  doctorId: string;
  fecha: string;

  constructor(pacienteId: string, doctorId: string, fecha: string) {
    super();
    this.pacienteId = pacienteId;
    this.doctorId = doctorId;
    this.fecha = fecha;
  }

  static async createCita(pacienteId: string, doctorId: string, fecha: string): Promise<Citas> {
    const counterRef = firestore.collection('counters').doc('citas');
    let newId: number;

    try {
      await firestore.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists) {
          throw new Error('Counter document does not exist!');
        }

        const lastId = counterDoc.data()?.lastId;
        if (typeof lastId !== 'number') {
          throw new Error('Invalid lastId in counter document!');
        }
        newId = lastId + 1;
        transaction.update(counterRef, { lastId: newId });
      });

      const citaRef = firestore.collection('citas').doc(newId.toString());
      await citaRef.set({
        pacienteId,
        doctorId,
        fecha,
      });

      return new Citas(pacienteId, doctorId, fecha);
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating cita');
    }
  }

  static async isCitaDisponible(pacienteId: string, doctorId: string, fecha: string): Promise<boolean> {
    try {
      // Verificar citas del doctor
      const citasDoctorEncontradas = await firestore
        .collection('citas')
        .where('doctorId', '==', doctorId)
        .where('fecha', '==', fecha)
        .get();

      // Verificar citas del paciente
      const citasPacienteEncontradas = await firestore
        .collection('citas')
        .where('pacienteId', '==', pacienteId)
        .where('fecha', '==', fecha)
        .get();

      const isDoctorAvailable = citasDoctorEncontradas.empty;
      const isPacienteAvailable = citasPacienteEncontradas.empty;

      return isDoctorAvailable && isPacienteAvailable;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getDoctorCitas(doctorId: string): Promise<any[]> {
    try {
      const citasSnapshot = await firestore
        .collection('citas')
        .where('doctorId', '==', doctorId)
        .get();

      const citas: any[] = [];
      citasSnapshot.forEach((doc) => {
        citas.push({ id: doc.id, ...doc.data() });
      });

      return citas;
    } catch (error) {
      throw error;
    }
  }

  static async getCitasByPaciente(doctorId: string, pacienteId: string): Promise<any[]> {
    try {
      const citasSnapshot = await firestore
        .collection('citas')
        .where('doctorId', '==', doctorId)
        .where('pacienteId', '==', pacienteId)
        .get();

      const citas: any[] = [];
      citasSnapshot.forEach((doc) => {
        citas.push({ id: doc.id, ...doc.data() });
      });

      return citas;
    } catch (error) {
      throw error;
    }
  }
}

export default Citas;