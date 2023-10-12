import express, { request, response } from "express";
import {MongoClient} from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
import {productsRouter} from "./routes/product.js"


const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT;
const MONOGO_COLLECTION = process.env.MONOGO_COLLECTION;
app.use(express.json());

//Mongo Connection
async function CreateConnection() {
    const client = new MongoClient(MONOGO_COLLECTION);
    await client.connect();
    console.log("Mongo Connected Successfully")
    return client;
}

export const client = await CreateConnection();

app.get("/", (req, res) => {
    res.send("Happy Hacking")
})

app.use("/product", productsRouter)

app.listen(PORT, () => console.log(" Server Connected",PORT) )




