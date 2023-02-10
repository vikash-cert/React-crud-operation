import { useState } from "react";
import { Container, Button, Modal, Form, Table } from "react-bootstrap";

const ButtonStyle = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  height: "50px",
  width: "50px",
};

function ModalCom() {
  const [modalButton, setModalButton] = useState(false);
  const [formData, setFormData] = useState([]);
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });
  const [submit, setSubmit] = useState(true);

  const closeModalButton = () => {
    setModalButton(false);
  };

  const showInput = (e) => {
    let input = e.target;
    let value = input.value;
    let name = input.name;
    setInputData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  let allData = {};

  const getFormData = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    for (let data of formData.entries()) {
      let props = data[0];
      let value = data[1];

      if (typeof value === "object") {
        value = URL.createObjectURL(value);
      }
      allData[props] = value;
    }
  };

  const insertUser = (e) => {
    // console.log(e);
    getFormData(e);
    return (
      setFormData((oldData) => {
        return [...oldData, allData];
      }),
      setModalButton(false),
      setInputData({
        fullname: "",
        email: "",
        phone: "",
      })
    );
  };

  const updateUser = (e) => {
    // console.log("updating..");
    let index = sessionStorage.getItem("rowItem");
    getFormData(e);
    let tmp = [...formData];
    tmp[index] = allData;
    console.log(tmp);
    setModalButton(false);
    setFormData(tmp);
    setInputData({
      fullname: "",
      email: "",
      phone: "",
    });
  };
  const editUser = (data, index) => {
    sessionStorage.setItem("rowItem", index);
    setModalButton(true);
    setInputData(data);
    setSubmit(false);
  };

  const deleteUser = (index) => {
    let temp = [...formData];

    temp.splice(index, 1);
    setFormData(temp);
  };
  const plusButton = () => {
    setModalButton(true);
    setSubmit(true);
    setInputData({
      fullname: "",
      email: "",
      phone: "",
    });
  };
  return (
    <>
      <h1 className="display-5 text-center my-4">Users List</h1>
      <Modal show={modalButton} onHide={closeModalButton}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={submit ? insertUser : updateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={inputData.fullname}
                onChange={showInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={inputData.email}
                onChange={showInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={inputData.phone}
                onChange={showInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>File</Form.Label>
              <Form.Control type="file" name="picture" accept="image/*" />
            </Form.Group>
            {submit ? (
              <Button
                className="mt-3"
                type="submit"
                variant="primary"
                name="submit"
              >
                Submit
              </Button>
            ) : (
              <Button
                className="mt-3"
                type="submit"
                variant="primary"
                name="submit"
              >
                Update
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Container>
        <Table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">SNo.</th>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((key, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={key.picture}
                      width="50"
                      alt="avatar"
                      style={{
                        width: "50px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{key.fullname}</td>
                  <td>{key.email}</td>
                  <td>{key.phone}</td>
                  <td>
                    <Button
                      className="mx-4"
                      variant="primary"
                      onClick={() => editUser(key, index)}
                    >
                      <i className="fa fa-edit">Edit</i>
                    </Button>
                    <Button variant="danger" onClick={() => deleteUser(index)}>
                      <i className="fa delete">Delete</i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Button
        className="rounded-circle"
        style={ButtonStyle}
        onClick={plusButton}
      >
        <i className="fa fa-plus"></i>
      </Button>
    </>
  );
}

export default ModalCom;
