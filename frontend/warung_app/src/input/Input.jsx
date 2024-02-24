import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { formatRibuan } from "../helper/formatRibuan";

export default function Input({ onSubmit, onSimpan }) {
  const [formData, setFormData] = useState({
    namaBarang: "",
    isiBarang: "",
    hargaTotal: "",
    hargaSatuan: "",
    hargaJual: "",
  });

  const handleInputSatuan = (e) => {
    // Menghapus semua karakter selain angka
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");

    // Menambahkan tanda titik setiap ribuan
    const formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setFormData(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      nama: formData.namaBarang,
      isi: formData.isiBarang,
      harga_total: formData.hargaTotal,
      harga_satuan: formData.hargaSatuan,
      harga_jual: formData.hargaJual,
    };

    // Atur ulang nilai formulir atau lakukan tindakan lainnya
    axios
      .post("http://localhost:3000/barang", dataToSend)
      .then((response) => {
        // Handle respons dari server jika diperlukan
        onSimpan();
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
    setFormData({
      namaBarang: "",
      isiBarang: "",
      hargaTotal: "",
      hargaSatuan: "",
      hargaJual: "",
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control
          type="text"
          name="namaBarang"
          placeholder="Masukkan nama barang"
          value={formData.namaBarang}
          onChange={(e) =>
            setFormData({ ...formData, namaBarang: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Isi</Form.Label>
        <Form.Control
          name="isiBarang"
          type="text"
          placeholder="Masukkan isi barang"
          value={formData.isiBarang}
          onChange={(e) =>
            setFormData({ ...formData, isiBarang: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Harga Total</Form.Label>
        <Form.Control
          name="hargaTotal"
          type="number"
          placeholder="Masukkan harga total"
          value={formData.hargaTotal}
          onChange={(e) =>
            setFormData({ ...formData, hargaTotal: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga Satuan</Form.Label>
        <Form.Control
          name="hargaSatuan"
          type="number"
          placeholder="Masukkan harga satuan"
          value={formData.hargaSatuan}
          onChange={(e) =>
            setFormData({ ...formData, hargaSatuan: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga Jual</Form.Label>
        <Form.Control
          name="hargaJual"
          type="number"
          placeholder="Masukkan harga jual"
          value={formData.hargaJual}
          onChange={(e) =>
            setFormData({ ...formData, hargaJual: e.target.value })
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Simpan
      </Button>
    </Form>
  );
}
