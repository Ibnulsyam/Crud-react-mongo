import { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const params = useParams();
  const [detailProduct, setDetailProduct] = useState([]);
  let id = params.id;

  const getDataByid = () => {
    axios.get(`http://localhost:5000/api/v2/product/${id}`).then((rest) => {
      setDetailProduct(rest.data);
    });
  };

  useEffect(() => {
    getDataByid();
  }, [params]);
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {detailProduct._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {detailProduct.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp.{detailProduct.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {detailProduct.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {detailProduct.status ? "Active" : "Nonaktif"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
