import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

interface UserBody {
  email: string;
  password: string;
  nombre?: string;
  apaterno?: string;
  amaterno?: string;
  direccion?: string;
  telefono?: string;
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    // Buscar al usuario por email
    const userDoc = await User.findByEmail(email);

    // Si no se encuentra el usuario
    if (!userDoc) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Verificar si la contraseña es válida
    const isValidPass = await userDoc.verifyPassword(password);

    if (!isValidPass) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generar el JWT token
    const token = jwt.sign({ email: userDoc.email }, process.env.SECRET as string, { expiresIn: '1h' });

    res.status(200).json({
      message: 'success',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, nombre, apaterno, amaterno, direccion, telefono }: UserBody = req.body;
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(404).json({
        message: 'User already exists :C'
      });
    }

    const newUser = await User.createUser(email, password, nombre, apaterno, amaterno, direccion, telefono);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error😭'
    });
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.getAllUsers();
    res.json({
      users,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userEmail: string = req.params.email;
  try {
    await User.deleteUser(userEmail);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error😭'
    });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userEmail: string = req.params.email;
  const userData: UserBody = req.body;
  try {
    const userUpdated = await User.updateUser(userEmail, userData);
    res.json({
      userUpdated,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error😭'
    });
  }
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
};