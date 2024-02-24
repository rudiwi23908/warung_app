import { Container, Row, Col } from "react-bootstrap";

export const MyComponent = () => {
  return (
    <Container>
      <Row>
        <Col xs={8} className="bg-primary">
          {/* Kolom pertama dengan lebar 70% */}
          <div style={{ height: "100px" }}>Kolom 1 (70%)</div>
        </Col>
        <Col xs={4} className="bg-secondary">
          {/* Kolom kedua dengan lebar 30% */}
          <div style={{ height: "100px" }}>Kolom 2 (30%)</div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyComponent;
