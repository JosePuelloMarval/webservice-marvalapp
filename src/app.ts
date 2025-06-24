import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/routes";


const app = express();

app.use(cors({
    origin: `http://localhost:${process.env.PORT?? 3000}`,
    credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
    res.send(`Hola, Express con TypeScript! ${app.get("port")}`);
});

app.use('/api',userRoutes);

export default app;