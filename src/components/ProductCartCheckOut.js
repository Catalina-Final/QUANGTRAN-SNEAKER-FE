import React from "react";
import { Table } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ProductCartCheckOut = ({ cart, handleRemove, adjustQuantity }) => {
  const vnd = getSymbolFromCurrency("VND");

  return (
    <div>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th> </th>
          </tr>
        </thead>
        {cart.map((item) => (
          <tbody>
            <tr>
              <td>{item.productID.productName}</td>
              <td>
                {item.productID.price} {vnd}
              </td>
              <td>
                <FontAwesomeIcon
                  onClick={() => {
                    if (item.quantity - 1 > 0) {
                      adjustQuantity(item.productID._id, item.quantity - 1);
                    }
                  }}
                  icon={faMinusSquare}
                />
                <input
                  value={item.quantity}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      adjustQuantity(item.productID._id, +e.target.value);
                    }
                  }}
                />
                <FontAwesomeIcon
                  onClick={() =>
                    adjustQuantity(item.productID._id, item.quantity + 1)
                  }
                  icon={faPlusSquare}
                />
              </td>
              <td>
                {item.productID.price * item.quantity} {vnd}{" "}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemove(item.productID._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ProductCartCheckOut;
