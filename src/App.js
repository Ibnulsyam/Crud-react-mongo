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
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const getDataToApi = async () => {
    if (search) {
      const result = await axios.get(
        `https://express-mongoose-api.herokuapp.com/api/product?name=${search}`
      );

      if (result.data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setProducts(result.data);
    } else {
      const result = await axios.get(
        "https://express-mongoose-api.herokuapp.com/api/product"
      );
      setProducts(result.data);
      setNotFound(false);
    }
  };

  const postDataToApi = (addProduct) => {
    axios
      .post(
        "https://express-mongoose-api.herokuapp.com/api/product",
        addProduct
      )
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
            .delete(
              `https://express-mongoose-api.herokuapp.com/api/product/${id._id}`
            )
            .then((res) => {
              getDataToApi();
            });
        });
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    getDataToApi();
  }, [productList, search]);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              product={products}
              onRemove={handleRemove}
              change={handleSearch}
              notFound={notFound}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit getapi={getDataToApi} />} />
        <Route path="/tambah" element={<Tambah addProduct={postDataToApi} />} />
      </Routes>
    </div>
  );
};

export default App;
