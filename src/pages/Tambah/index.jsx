import React, { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import swal from "sweetalert";

const Tambah = (props) => {
  const [addControl, setAddControl] = useState({
    name: "",
    price: "",
    stock: "",
    status: false,
  });

  const [empty, setEmpty] = useState("");

  const handleChange = (e) => {
    let newAddControl = { ...addControl };
    newAddControl[e.target.name] = e.target.value;

    setAddControl(newAddControl);
  };

  const handleClick = (e) => {
    let copyAdd = { ...addControl };
    copyAdd[e.target.name] = e.target.checked;

    setAddControl(copyAdd);
  };

  const handleSubmit = () => {
    if (addControl.name.length === 0) {
      setEmpty("Name Can't be Empty!");
    } else if (addControl.price.length === 0) {
      setEmpty("Price Can't be Empty!");
    } else if (addControl.stock.length === 0) {
      setEmpty("Stock Can't be Empty!");
    } else {
      swal({
        title: "Success!",
        text: `Product has been Added!`,
        icon: "success",
        button: "OK",
      }).then(() => {
        props.addProduct(addControl);
        setAddControl({
          name: "",
          price: "",
          stock: "",
          status: false,
        });
        setEmpty("");
      });
    }
  };
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        {empty ? <p className="warning">*{empty}</p> : ""}
        <br />
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={addControl.name}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={addControl.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={addControl.stock}
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            onClick={handleClick}
            value={addControl.status}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Tambah;
