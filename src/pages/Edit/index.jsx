import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Input from "../../components/Input";

const Edit = (props) => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [empty, setEmpty] = useState("");

  let id = params.id;

  const view = () => {
    axios
      .get(`https://express-mongoose-api.herokuapp.com/api/product/${id}`)
      .then((rest) => {
        setProduct(rest.data);
      });
  };

  const update = () => {
    axios
      .put(
        `https://express-mongoose-api.herokuapp.com/api/product/${id}`,
        product
      )
      .then((res) => {
        swal("Good job!", "Data Berhasil Diupdate", "success");
        setProduct({
          name: "",
          price: "",
          stock: "",
          status: false,
        });
        setEmpty("");
      });
  };

  const handleChange = (e) => {
    let temp = { ...product };
    temp[e.target.name] = e.target.value;
    setProduct(temp);
  };

  const handleClick = (e) => {
    let temp = { ...product };
    temp[e.target.name] = e.target.cheked;
    setProduct(temp);
  };

  const handleSubmit = () => {
    if (product.name.length === 0) {
      setEmpty("Name Can't be Empty!");
    } else if (product.price < 1000) {
      setEmpty("Price Can't be Empty!");
    } else if (product.stock < 1) {
      setEmpty("Stock Can't be Empty!");
    } else {
      update();
    }
  };

  useEffect(() => {
    view();
  }, []);
  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        {empty ? (
          <p
            style={{
              color: "red",
              fontStyle: "italic",
              fontSize: "12px",
              marginTop: "10px",
            }}
            className="warning"
          >
            *{empty}
          </p>
        ) : (
          ""
        )}
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={product.stock}
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            value={product.status}
            onClick={handleClick}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
