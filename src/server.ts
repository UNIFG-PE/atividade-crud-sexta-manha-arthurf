import express from "express";
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";

const app = express();
const db = new Sequelize({ dialect: "sqlite", storage: ":memory:" });

@Table
class Product extends Model {
    @AllowNull(false) @PrimaryKey @AutoIncrement @Column(DataType.INTEGER)
    declare id: number;
    @AllowNull(false) @Column(DataType.TEXT)
    declare name: string;
    @AllowNull(false) @Column(DataType.FLOAT)
    declare price: number;
}

app.use(express.json());
db.addModels([Product]);
db.sync();

app.post("/api/products", async (req, res) => {
    const { name, price }: { name: string, price: number } = req.body;
    if(!name || !price) {
        return res.sendStatus(400);
    }
    res.json(await Product.build({ name: name, price: price }).save());
});

app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if(!id) {
        return res.sendStatus(400);
    }
    const product = await Product.findByPk(id);
    if(!product) {
        return res.sendStatus(404);
    }
    res.json(await Product.findByPk(id));
});

app.put("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price }: { name: string|undefined, price: number|undefined } = req.body;
    if(!id) {
        return res.sendStatus(400);
    }
    const product = await Product.findByPk(id);
    if(!product) {
        return res.sendStatus(404);
    }
    if(name && typeof(name) === "string") {
        product.name = name;
    }
    if(price && typeof(price) === "number") {
        product.price = price;
    }
    res.json(await product.save());
});

app.delete("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if(!id) {
        return res.sendStatus(400);
    }
    const product = await Product.findByPk(id);
    if(!product) {
        return res.sendStatus(404);
    }
    await product.destroy();
    res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});