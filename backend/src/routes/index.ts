import * as express from 'express';
import loggerRoute from './logger';
const router = express.Router();

router.use('/log', loggerRoute);

export default router;