import express from "express";
import _ from "lodash";
import Contenedor from "./contenedor";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const router = express.Router();
const container = new Contenedor();

router.get("/", async (req, res) => {
  const products = await container.getAll();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await container.getById(req.params.id);
  if (product) res.send(product);
  else res.status(404).json({ error: "producto no encontrado" });
});

router.post("/", async (req, res) => {
  if (req.body.title) {
    const createdProduct = await container.save(req.body);

    res.status(201).send(createdProduct);
  } else res.status(400).send({ error: "debe indicar el nombre del producto" });
});

router.put("/:id", async (req, res) => {
  const product = await container.getById(req.params.id);

  if (!product) res.status(404).json({ error: "producto no encontrado" });

  product.title = req.body.title;
  product.price = req.body.price;

  await container.update(product);

  res.send("producto actualizado");
});

router.delete("/:id", async (req, res) => {
  const product = await container.getById(req.params.id);

  if (!product) res.status(404).json({ error: "producto no encontrado" });

  container.deleteById(product.id);

  res.send("producto eliminado");
});

app.use("/api/productos", router);

app.listen(8080);
