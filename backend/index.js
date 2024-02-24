const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_warung_app",
});

// Create
app.post("/barang", (req, res) => {
  const { nama, isi, harga_total, harga_satuan, harga_jual } = req.body;

  const query = `INSERT INTO barang (nama,
    isi,
    harga_total,
    harga_satuan,
    harga_jual) VALUES (?,?,?,?,?)`;
  pool.query(
    query,
    [nama, isi, harga_total, harga_satuan, harga_jual],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(201).send("data barang telah ditambahkan");
    }
  );
});

// Read
app.get("/barang", (req, res) => {
  const query = `SELECT * FROM barang`;
  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(result);
  });
});

// Update
app.put("/barang/:id", (req, res) => {
  const { nama, isi, harga_total, harga_satuan, harga_jual } = req.body;
  const id = req.params.id;

  const query = `UPDATE barang 
      SET nama=?, 
      isi=?, 
      harga_total=?, 
      harga_satuan=?, 
      harga_jual=?
      WHERE id = ?`;
  pool.query(
    query,
    [nama, isi, harga_total, harga_satuan, harga_jual, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Data barang tidak ditemukan");
        return;
      }

      res.status(200).send("Data barang berhasil diubah");
    }
  );
});

// Delete
app.delete("/barang/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM barang WHERE id = ?`;
  pool.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(result);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
