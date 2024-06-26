import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './app.routes';
import { connectDB } from './db/connectDB';
import errorHandler from './common/middlewares/errorHandler';
import { STATUS_CODES } from './common/consts/statusCodes.consts';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

app.use('/isAlive', (req, res) => {
    return res.status(STATUS_CODES.OK).send('server is alive and well');
});
app.use('/api', routes);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
