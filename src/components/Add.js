import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./Add.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [validFName, setValidFName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [validLName, setValidLName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [contact, setContact] = useState("");
  const [validContact, setValidContact] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [age, setAge] = useState("");
  const [validAge, setValidAge] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const addUser = () => {
    axios
      .post(" http://3.108.81.97:4000/adduser", {
        firstname: firstName,
        lastname: lastName,
        age: age,
        email: email,
        phoneNumber: contact,
        password: pwd,
      })
      .then((res) => {
        if (res.data.message === "email already taken") {
          setEmailError(true);
        } else if (res.data.phone_err_message === "Phone number is not valid") {
          setContactError(true);
        } else {
          history("/", { state: { id: 1, flag: true } });
        }
      });
  };
  const showErr = () => {
    if (firstName.length == 0) {
      setValidFName(true);
    } else {
      setValidFName(false);
    }

    if (lastName.length == 0) {
      setValidLName(true);
    } else {
      setValidLName(false);
    }

    if (email.length == 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }

    if (pwd.length == 0) {
      setValidPwd(true);
    } else {
      setValidPwd(false);
    }

    if (age.length == 0) {
      setValidAge(true);
    } else {
      setValidAge(false);
    }
  };

  const upDate = (e) => {
    e.preventDefault();
    showErr();
    if (!validFName && !validLName && !validEmail && !validPwd && !validAge) {
      addUser();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "5rem",
        fontSize: "1.1rem",
      }}
    >
      <Form style={{ width: "77%" }}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First name"
              style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
              size="lg"
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validFName ? "Enter Valid First Name" : ""}
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last name"
              style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
              size="lg"
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validLName ? "Enter Valid Last Name" : ""}
            </Form.Text>
          </Col>
        </Row>

        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
              size="lg"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validEmail ? "Enter Valid Email" : ""}
              {emailError ? "email already taken" : ""}
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
              size="lg"
              onChange={(e) => {
                e.preventDefault();
                setPwd(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validPwd ? "Enter Valid Password" : ""}
            </Form.Text>
          </Col>
        </Row>

        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              placeholder="Contact No."
              style={{ border: "1px solid #ff8c00", borderRadius: "4px" }}
              size="lg"
              type="number"
              onChange={(e) => {
                e.preventDefault();
                setContact(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validContact ? "Enter Valid Number" : ""}
              {contactError ? "Phone number is not valid" : ""}
            </Form.Text>
          </Col>
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
              onChange={(e) => {
                e.preventDefault();
                setAge(e.target.value);
              }}
            />
            <Form.Text style={{ color: "red" }}>
              {validAge ? "Enter Valid Age" : ""}
            </Form.Text>
          </Col>
        </Row>
      </Form>
      <Button
        onClick={(e) => {
          upDate(e);
        }}
        style={{
          backgroundColor: "#ff8c00",
          marginTop: "1rem",
          border: "none",
        }}
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};

export default Add;
