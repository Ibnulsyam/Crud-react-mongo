import { Link } from "react-router-dom";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  let navigate = useNavigate();
  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={props.change}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.notFound ? (
            <tr>
              <td colSpan={5} className="not-found text-center">
                Product is not found !
              </td>
            </tr>
          ) : (
            props.product.map((products, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{products.name}</td>
                <td className="text-center">RP.{products.price}</td>
                <td className="text-center">{products.stock}</td>
                <td className="text-center">
                  <button
                    onClick={() => navigate(`/detail/${products._id}`)}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${products._id}`)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => props.onRemove(products)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
