import express from 'express';
import { clientController } from '../controllers/clients';

const router = express.Router();

router.post('/clients', clientController.createClient);
router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);


export default router;