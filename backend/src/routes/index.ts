import { Router } from 'express';

import pacienteRouter from './paciente.routes';
import medicoRouter from './medico.routes';
import consultasRouter from './consultas.routes';
import pacienteFrontRouter from './pacienteFRONT.routes'

const routes = Router();

routes.use('/paciente', pacienteRouter);
routes.use('/medico', medicoRouter);
routes.use('/consultas', consultasRouter);
routes.use('/paciente-front', pacienteFrontRouter);


export default routes;
