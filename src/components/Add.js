import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function Add(props) {
    const [singleProduct, setsingleProduct] = useState({
        pName: "",
        pPrice: "",
        pDesc: "",
        pImg: "",
      });

      let updateDetails = (e) => {
        setsingleProduct({
          ...singleProduct,
          [e.target.name]: e.target.value,
        });
      };
    

    return (
        <div>
            <Modal show={props.showAddModal} onHide={props.hideAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
    
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.hideAddModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.hideAddModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Add