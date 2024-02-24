import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { formatRibuan } from "../helper/formatRibuan";

export default function Edit({ editItem, onFinishEditing }) {
  const [formData, setFormData] = useState({
    nama: editItem.nama,
    isi: editItem.isi,
    harga_total: editItem.harga_total,
    harga_satuan: editItem.harga_satuan,
    harga_jual: editItem.harga_jual,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/barang/${editItem.id}`, formData)
      .then((response) => {
        console.log(`data update`, response.data);
        onFinishEditing();
      })
      .catch((error) => {
        console.error(`error saat mengirim permintaan PUT:,error`);
      });
    // console.log(formData);
  };
  return (
    <Form onSubmit={handlSubmit}>
      <Form.Group>
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama barang"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Isi</Form.Label>
        <Form.Control
          name="isi"
          type="text"
          placeholder="Masukkan isi barang"
          value={formData.isi}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Harga Total</Form.Label>
        <Form.Control
          name="harga_total"
          type="number"
          placeholder="Masukkan harga total"
          value={formatRibuan(formData.harga_total)}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga Satuan</Form.Label>
        <Form.Control
          name="harga_satuan"
          type="number"
          placeholder="Masukkan harga satuan"
          value={formatRibuan(formData.harga_satuan)}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga Jual</Form.Label>
        <Form.Control
          name="harga_jual"
          type="number"
          placeholder="Masukkan harga jual"
          value={formatRibuan(formData.harga_jual)}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Simpan
      </Button>
    </Form>
  );
}
