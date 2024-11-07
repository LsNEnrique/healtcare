import { Request, Response } from 'express';
import { Patient } from '../models/patientModel';

interface PatientData {
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  direccion: string;
}

const registerPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, edad, sexo, telefono, email, direccion }: PatientData = req.body;

    // Verificar si el paciente ya existe
    const existingPatient = await Patient.findByName(email);
    if (existingPatient) {
      return res.status(400).json({
        message: 'Patient already exists'
      });
    }

    // Crear un nuevo paciente
    const newPatient = await Patient.createPatient(nombre, edad, sexo, telefono, email, direccion);

    res.status(201).json({
      message: 'Patient registered successfully',
      patient: newPatient
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.getAllPatients();
    res.json({
      patients,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const deletePatient = async (req: Request, res: Response): Promise<void> => {
  const patientNombre: string = req.params.nombre;
  try {
    await Patient.deletePatient(patientNombre);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const updatePatient = async (req: Request, res: Response): Promise<void> => {
  const patientNombre: string = req.params.nombre;
  const patientData: PatientData = req.body;
  try {
    const updatedPatient = await Patient.updatePatient(patientNombre, patientData);
    res.json({
      updatedPatient,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export {
  registerPatient,
  getAllPatients,
  deletePatient,
  updatePatient
};