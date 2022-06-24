import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Tambah from "./pages/Tambah";
import axios from "axios";
import swal from "sweetalert";

const App = () => {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState({});

  const getDataToApi = async () => {
    const result = await axios.get("http://localhost:5000/api/v2/product");
    setProducts(result.data);
  };

  const postDataToApi = (addProduct) => {
    axios
      .post("http://localhost:5000/api/v2/product", addProduct)
      .then((result) => setProductList(addProduct));
  };

  const handleRemove = (id) => {
    swal({
      title: "Are you sure remove?",
      text: `${id.name} `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Success!",
          text: `${id.name} has been Removed!`,
          icon: "success",
          button: "OK",
        }).then(() => {
          axios
            .delete(`http://localhost:5000/api/v2/product/${id._id}`)
            .then((res) => {
              getDataToApi();
            });
        });
      }
    });
  };
  useEffect(() => {
    getDataToApi();
  }, [productList]);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home product={products} onRemove={handleRemove} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/tambah" element={<Tambah addProduct={postDataToApi} />} />
      </Routes>
    </div>
  );
};

export default App;
