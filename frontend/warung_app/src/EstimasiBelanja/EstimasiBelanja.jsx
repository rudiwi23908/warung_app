import { useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";

export default function EstimasiBelanja({ estimasiBelanja }) {
  const [inputValues, setInputValues] = useState(estimasiBelanja.map(() => 1)); // Inisialisasi dengan nilai 1 untuk setiap item

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value === "" ? "" : parseInt(value, 10) || 1;
    setInputValues(newInputValues);
  };

  return (
    <>
      <h2 className="text-center">Estimasi Harga</h2>
      {estimasiBelanja.length > 0 ? (
        <>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Harga</th>
                <th>Jumlah</th>
              </tr>
            </thead>

            <tbody>
              {estimasiBelanja.map((barang, index) => (
                <tr key={index}>
                  <td>{`${barang.nama}`}</td>
                  <td>{`${barang.isi}`}</td>
                  <td>{barang.harga_total}</td>
                  <td>
                    <InputGroup style={{ width: "60px" }}>
                      <Form.Control
                        type="number"
                        value={inputValues[index] || ""}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        style={{
                          background: "#333", // Ganti warna background
                          color: "white", // Ganti warna tulisan
                          height: "2rem",
                        }}
                      />
                    </InputGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>
            <b>
              Total:{" "}
              {estimasiBelanja.reduce(
                (total, barang, index) =>
                  total + barang.harga_total * (inputValues[index] || 1),
                0
              )}
            </b>
          </h3>
        </>
      ) : (
        <p className="text-center pt-4">
          Silahkan pilih barang yang akan diestimasi
        </p>
      )}
    </>
  );
}
