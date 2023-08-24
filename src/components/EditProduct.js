import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function EditProduct(props) {
  const [singleProduct, setsingleProduct] = useState({
    pName: "",
    pPrice: "",
    pDesc: "",
    pImg: "",
  });

  // console.log("singleProduct", singleProduct);

  useEffect(() => {
    setsingleProduct({ ...props.selectedProduct });
  }, [props.selectedProduct]);

  let updateDetails = (e) => {
    setsingleProduct({
      ...singleProduct,
      [e.target.name]: e.target.value,
    });
  };

  let saveData = async () => {
    try {
      let response = await axios.put(
        `https://p-9x7e.onrender.com/products/edit-product/${props.selectedProduct._id}`,
        singleProduct
      );

    //   console.log("edit response", response); 
      if (response.data.error) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        props.getAllProducts();
        props.hideEditModal();
       
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div>
      <Modal show={props.showEditModal} onHide={props.hideEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
          <Button variant="secondary" onClick={props.hideEditModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveData();
            }}
          >
            Edit product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProduct;
