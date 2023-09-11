import express from 'express'
import routes from '../routes'
import { enviroment } from '../config/varEntorno'
import swagger from '../../swagger';

const app = express();
//Middlewares

app.use(express.json());
app.get('/', (req, res)=>{ res.send('Servicio Arriba')});
app.use(`${enviroment.INITIAL_PATH_API}`, routes);
swagger('/swagger', app);

export default app; 