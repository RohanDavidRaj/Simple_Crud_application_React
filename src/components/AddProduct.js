import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function AddProduct(props) {
  const [singleProduct, setsingleProduct] = useState({
    pName: "",
    pPrice: "",
    pDesc: "",
    pImg: "",
  });

//   console.log("singleProduct", singleProduct);

  let updateDetails = (e) => {
    setsingleProduct({
      ...singleProduct,
      [e.target.name]: e.target.value,
    });
  };

  let saveData = async () => {
    try {
      let response = await axios.post(
        "https://p-9x7e.onrender.com/products/add-product",
        singleProduct
      );

      console.log("add response", response);
      // console.log("response", response.data);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        props.getAllProducts();
        props.hideAddModal();
        setsingleProduct({
          pName: "",
          pPrice: "",
          pDesc: "",
          pImg: "",
        });
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div>
      <Modal show={props.showAddModal} onHide={props.hideAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                name="pName"
                type="text"
                placeholder="enter product name"
                value={singleProduct.pName}
                onChange={(e) => {
                  updateDetails(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                name="pPrice"
                type="number"
                placeholder="enter product price"
                value={singleProduct.pPrice}
                onChange={(e) => {
                  updateDetails(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                name="pDesc"
                type="text"
                placeholder="enter product description"
                value={singleProduct.pDesc}
                onChange={(e) => {
                  updateDetails(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product image</Form.Label>
              <Form.Control
                name="pImg"
                type="text"
                placeholder="enter product image URL"
                value={singleProduct.pImg}
                onChange={(e) => {
                  updateDetails(e);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideAddModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveData();
            }}
          >
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProduct;
