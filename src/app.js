import express from "express";
import morgan from "morgan";
import cors from "cors"

import pkg from '../package.json'
import movieRoutes from "./routes/movie.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import logRoutes from "./routes/log.routes";
import { createInitialData } from "./libs/initialSetup";

const app = express();
createInitialData();

app.use(morgan('dev'));
app.set('pkg', pkg);
app.use(express.json())
app.use(cors({
    origin:'*', 
}))


/* Ruta inicial por default o 404 */
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        version: app.get('pkg').version,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
    })
})


app.use('/api/movies',movieRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/logs',logRoutes);

export default app;