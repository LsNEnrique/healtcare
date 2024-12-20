import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore()

export default db;