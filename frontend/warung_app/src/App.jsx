import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import { Col, Row, Badge } from "react-bootstrap";
import { getBarang } from "./api/api";
import EstimasiBelanja from "./EstimasiBelanja/EstimasiBelanja";
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./input/Input";
import Edit from "./Edit/Edit";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [dataBarang, setDataBarang] = useState([]);
  const [estimasiBelanja, setEstimasiBelanja] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    getBarang().then((data) => setDataBarang(data));
  }, []);

  const formStyle = {
    backgroundColor: "black",
    color: "white",
  };

  const handleSimpan = () => {
    getBarang().then((data) => setDataBarang(data));
    setIsEditMode(false);
  };

  const handleEditBarang = (id) => {
    const selectedBarang = dataBarang.find((barang) => barang.id === id);
    setIsEditMode(true);
    setEditItem(selectedBarang);
  };

  const handlePilih = (barang) => {
    const isAlreadySelected = estimasiBelanja.some(
      (selectedBarang) => selectedBarang.id === barang.id
    );

    if (!isAlreadySelected) {
      const selectedBarang = {
        id: barang.id,
        nama: barang.nama,
        isi: barang.isi,
        harga_total: barang.harga_total,
      };
      setEstimasiBelanja((prevEstimasi) => [...prevEstimasi, selectedBarang]);
    }
  };

  const handleFinishEditing = () => {
    // Setelah edit selesai, atur state isEditMode menjadi false
    setIsEditMode(false);
    // Dapatkan kembali data barang untuk memperbarui list
    getBarang().then((data) => setDataBarang(data));
  };

  const handleDeleteBarang = (id, namaBarang) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus ${namaBarang}?`
    );

    if (!isConfirmed) return;
    axios
      .delete(`http://localhost:3000/barang/${id}`)
      .then((response) => {
        setDataBarang((prevData) =>
          prevData.filter((barang) => barang.id !== id)
        );
      })
      .catch((error) => {
        console.error(`Error menghapus ${namaBarang}:`, error);
      });
  };

  const formatRibuan = (angka) => {
    return angka.toLocaleString("id-ID"); // Gunakan "id-ID" untuk format Indonesia
  };

  return (
    <Container fluid>
      <h1 className="text-center p-2"> Warung App</h1>

      <Row style={{ marginBottom: 20 }}>
        <Col md={2}>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              setIsEditMode(false);
            }}
          >
            {isFormVisible ? "Estimasi" : "Tambah Data"}
          </Button>
        </Col>

        <Col md={4} className="d-flex align-items-center">
          <InputGroup className="ml-2">
            <FormControl placeholder="Cari barang..." style={formStyle} />
            <Button variant="outline-primary">Cari</Button>
          </InputGroup>
          <style>
            {`
        /* Gaya untuk placeholder */
        .ml-2 input::placeholder {
          color: white;
        }
      `}
          </style>
        </Col>
      </Row>

      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Col xs={8}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Isi</th>
                <th>Harga Total</th>
                <th>Harga Satuan</th>
                <th>Harga Jual</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {dataBarang.map((barang, index) => (
                <tr key={index}>
                  <td>{barang.nama}</td>
                  <td>{barang.isi}</td>
                  <td>{formatRibuan(barang.harga_total)}</td>
                  <td>{formatRibuan(barang.harga_satuan)}</td>
                  <td>{formatRibuan(barang.harga_jual)}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <Badge
                        bg="primary"
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditBarang(barang.id)}
                      >
                        Edit
                      </Badge>
                      <Badge
                        bg="danger"
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteBarang(barang.id, barang.nama)
                        }
                      >
                        Hapus
                      </Badge>
                      <Badge
                        bg="success"
                        className="mx-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePilih(barang)}
                      >
                        Pilih
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col
          xs={3}
          style={{
            backgroundColor: "#323539",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {isFormVisible ? (
            <Input onSimpan={handleSimpan} />
          ) : isEditMode ? (
            <Edit editItem={editItem} onFinishEditing={handleFinishEditing} />
          ) : (
            <EstimasiBelanja estimasiBelanja={estimasiBelanja} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
