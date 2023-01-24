import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DeleteModal from "./DeleteModal";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");

  const getData = () => {
    axios
      .get("http://3.108.81.97:4000/fetchusers")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const showDeleteModal = (email, item) => {
    handleShow();
  };

  const setToLocalStorage = (item) => {
    localStorage.setItem("firstname", item.firstname);
    localStorage.setItem("lastname", item.lastname);
    localStorage.setItem("age", item.age);
    localStorage.setItem("contact", item.phoneNumber);
    localStorage.setItem("email", item.email);
    localStorage.setItem("password", item.password);
  };

  const showData = () => {
    if (userData !== null) {
      return userData.map((item, index) => {
        let email = item.email;
        return (
          <tr key={index}>
            <td>{index}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber}</td>
            <td>
              <Link to="/update">
                <Button
                  className="update-btn"
                  variant="outline-warning"
                  onClick={() => {
                    setFirstName(item.firstname);
                    setLastName(item.lastname);
                    setAge(item.age);
                    setContact(item.phoneNumber);
                    setEmail(item.email);
                    setToLocalStorage(item);
                  }}
                  onHover={{ backgroundColor: "white" }}
                >
                  Edit
                </Button>
              </Link>
            </td>
            <td>
              <Button
                variant="outline-warning"
                onClick={() => {
                  showDeleteModal(email, item);
                  setFirstName(item.firstname);
                  setLastName(item.lastname);
                  setAge(item.age);
                  setContact(item.phoneNumber);
                  setEmail(item.email);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    } else {
      <tr>
        <td>No Data</td>
      </tr>;
    }
  };

  const deleteRow = (email_arr) => {
    axios
      .post(
        "http://3.108.81.97:4000/remove",
        {
          email: email_arr,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getData();
        handleClose();
      })
      .catch((err) => {
        alert("404 error found for remove url");
      });
  };

  return (
    <div className="dashboard">
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "77%" }}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
                  size="lg"
                  value={firstName}
                  disabled
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
                  size="lg"
                  value={lastName}
                  disabled
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "1rem" }}>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
                  size="lg"
                  value={email}
                  disabled
                />
              </Col>
              <Col>
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  placeholder="Contact No."
                  style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
                  size="lg"
                  type="number"
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "1rem" }}>
              <Col>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  placeholder="Age"
                  style={{
                    border: "1px solid #ff8c00",
                    width: "5rem",
                    borderRadius: "4px",
                  }}
                  size="lg"
                  value={age}
                  disabled
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteRow(email);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/add">
              <Button style={{ backgroundColor: "#ff8c00" }}>Add User</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table className="table">
        <thead className="thead">
          <tr>
            <th>Sr No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="tbody">{showData()}</tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
