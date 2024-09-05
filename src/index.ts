
import cors from 'cors';
import express, {Application, NextFunction, Request, Response} from "express";

const app: Application = express();
const port: number = 2024;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send({
        hello: "PT Dapoer Poesat Noesantara Group"
    });
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({
        error: true,
        message: error.message || "Something Went Wrong!",
        data: {}
    });
});

app.listen(port, () => {
    console.log("Application Running on Port =", "localhost:2024", port);
});
