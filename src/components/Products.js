import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Products() {
  const [products, setproducts] = useState([]);
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});

  let hideAddModal = () => {
    setshowAddModal(false);
  };

  let hideEditModal = () => {
    setshowEditModal(false);
  };

  let getAllProducts = async () => {
    try {
      let response = await axios.get("products/products");
      // console.log("response", response.data);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        setproducts(response.data.data);
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // edit btn
  let getSelectedProduct = (selectProd) => {
    setselectedProduct(selectProd);
    setshowEditModal(true);
  };

  // delete btn
  let deleteProduct = async (ID) => {
    console.log("ID", ID);
    try {
      let response = await axios.delete(`products/delete-product/${ID}`);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        getAllProducts();
        alert(response.data.message);
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Image</th>
            <th>
              <Button
                variant="warning"
                onClick={() => {
                  setshowAddModal(true);
                }}
              >
                ADD ❤️
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((val) => {
              return (
                <tr key={val._id}>
                  <td>{val._id}</td>
                  <td>{val.pName}</td>
                  <td>{val.pPrice}</td>
                  <td>{val.pDesc}</td>
                  <td>
                    <img
                      width={"250px"}
                      height={"200px"}
                      src={val.pImg}
                      alt={val.pName}
                    />
                  </td>
                  <td>
                    <Button
                      className="me-1"
                      onClick={() => {
                        getSelectedProduct(val);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteProduct(val._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <AddProduct
        showAddModal={showAddModal}
        hideAddModal={hideAddModal}
        getAllProducts={getAllProducts}
      />

      <EditProduct
        showEditModal={showEditModal}
        hideEditModal={hideEditModal}
        selectedProduct={selectedProduct}
        getAllProducts={getAllProducts}
      />
    </div>
  );
}

export default Products;