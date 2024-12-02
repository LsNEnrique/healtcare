import express from 'express';
import cors from 'cors';
import routes from './routes/routes'; // Ruta al archivo de rutas
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Middlewares
app.use(cors()); // Permitir CORS
app.use(express.json()); // Parseo de JSON
app.use(helmet());
app.use(morgan('dev'));

// Rutas
app.use('/api', routes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
