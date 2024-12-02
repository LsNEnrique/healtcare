import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: any; // Aquí podemos definir mejor el tipo del usuario según cómo sea la estructura de 'user' después de la verificación del JWT
}

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const access = token.split(' ');
  console.log('@@ token => ', token, access[1]);

  if (!access[1]) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  jwt.verify(access[1], process.env.SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    // Asignamos el usuario decodificado a la solicitud
    req.user = user;
    next();
  });
};

export default authenticateToken;