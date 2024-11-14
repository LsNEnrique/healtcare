import { Request, Response } from 'express';
import { Citas } from '../models/Cita';
import { messaging } from 'firebase-admin';

// Definir tipos para los parámetros de la cita (doctorId, pacienteId, fecha)
interface CitaRequestBody {
  doctorId: string;
  pacienteId: string;
  fecha: string;
}

const crearCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, pacienteId, fecha }: CitaRequestBody = req.body;

    // Verificar si la cita está disponible
    const isDisponible = await Citas.isCitaDisponible(pacienteId, doctorId, fecha);
    if (!isDisponible) {
      return res.status(201).json({
        message: 'Ya existe una cita para esa hora.',
      });
    }

    // Crear la nueva cita
    const newCita = await Citas.createCita(pacienteId, doctorId, fecha);

    res.status(201).json({
      message: 'Cita agendada exitosamente',
      cita: newCita,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllDoctorCitas = async (req: Request, res: Response): Promise<void> => {
  const { doctorId }: { doctorId: string } = req.body;
  try {
    const citas = await Citas.getDoctorCitas(doctorId);
    res.json({
      citas,
      message: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllPatientCitas = async (req: Request, res: Response): Promise<void> => {
  const doctorId: string = req.params.doctorId;
  const pacienteId: string = req.params.pacienteId;
  try {
    const citas = await Citas.getCitasByPaciente(doctorId, pacienteId);
    res.json({
      citas,
      message: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export {
  crearCita,
  getAllDoctorCitas,
  getAllPatientCitas,
};