import db from '../config/firebase';
import { ICita } from '../interfaces/citaInterface';

interface Cita {
  pacienteId: string;
  doctorId: string;
  fecha: string;
}

export class Citas implements ICita {
  pacienteId: string;
  doctorId: string;
  fecha: string;

  constructor(pacienteId: string, doctorId: string, fecha: string) {
    this.pacienteId = pacienteId;
    this.doctorId = doctorId;
    this.fecha = fecha;
  }

  static async createCita(pacienteId: string, doctorId: string, fecha: string): Promise<Citas> {
    const counterRef = db.collection('counters').doc('citas');

    try {
      const newId = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists) {
          throw new Error('Counter document does not exist!');
        }

        const lastId = counterDoc.data()?.lastId;
        if (typeof lastId !== 'number') {
          throw new Error('Invalid lastId in counter document!');
        }

        const calculatedId = lastId + 1;
        transaction.update(counterRef, { lastId: calculatedId });
        return calculatedId; // Retorna el nuevo ID dentro de la transacción
      });

      const citaRef = db.collection('citas').doc(newId.toString());
      await citaRef.set({
        pacienteId,
        doctorId,
        fecha,
      });

      return new Citas(pacienteId, doctorId, fecha);
    } catch (error) {
      console.error('Error creating cita =>', error);
      throw new Error('Error creating cita');
    }
  }

  static async isCitaDisponible(pacienteId: string, doctorId: string, fecha: string): Promise<boolean> {
    try {
      // Verificar citas del doctor
      const citasDoctorEncontradas = await db
        .collection('citas')
        .where('doctorId', '==', doctorId)
        .where('fecha', '==', fecha)
        .get();

      // Verificar citas del paciente
      const citasPacienteEncontradas = await db
        .collection('citas')
        .where('pacienteId', '==', pacienteId)
        .where('fecha', '==', fecha)
        .get();

      const isDoctorAvailable = citasDoctorEncontradas.empty;
      const isPacienteAvailable = citasPacienteEncontradas.empty;

      return isDoctorAvailable && isPacienteAvailable;
    } catch (error) {
      console.error('Error checking cita availability =>', error);
      throw error;
    }
  }

  static async getDoctorCitas(doctorId: string): Promise<Cita[]> {
    try {
      const citasSnapshot = await db.collection('citas').where('doctorId', '==', doctorId).get();
      const citas: Cita[] = [];

      citasSnapshot.forEach((doc) => {
        citas.push({ id: doc.id, ...doc.data() } as unknown as Cita);
      });

      return citas;
    } catch (error) {
      console.error('Error fetching doctor citas =>', error);
      throw error;
    }
  }

  static async getCitasByPaciente(doctorId: string, pacienteId: string): Promise<Cita[]> {
    try {
      const citasSnapshot = await db
        .collection('citas')
        .where('doctorId', '==', doctorId)
        .where('pacienteId', '==', pacienteId)
        .get();

      const citas: Cita[] = [];
      citasSnapshot.forEach((doc) => {
        citas.push({ id: doc.id, ...doc.data() } as unknown as Cita);
      });

      return citas;
    } catch (error) {
      console.error('Error fetching citas by paciente =>', error);
      throw error;
    }
  }
}

export default Citas;

