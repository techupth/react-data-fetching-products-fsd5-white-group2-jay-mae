import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const BASE_URL = "http://localhost:4001";

  const [productList, setProductList] = useState([]);
  const [status, setStatus] = useState(0);

  const getProductList = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/products`);
      setStatus(2);
      setProductList(result.data.data);
    } catch (error) {
      setStatus(1);
    }
  };

  const deleteProductList = async (id) => {
    setStatus(0);
    await axios.delete(`${BASE_URL}/products/${id}`);
    const newProductData = productList.filter((item) => {
      return item.id !== id;
    });
    setProductList(newProductData);
    setStatus(2);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {status == 0 && <h1>Loading...</h1>}
        {status == 1 && <h1>Fetching Error...</h1>}
        {status == 2 && (
          <>
            {productList.map((item) => {
              return (
                <div key={item.id} className="product">
                  <div className="product-preview">
                    <img
                      src={item.image}
                      alt="some product"
                      width="350"
                      height="350"
                    />
                  </div>
                  <div className="product-detail">
                    <h1>Product name: {item.name}</h1>
                    <h2>Product price: {item.price} Baht</h2>
                    <p>Product description: {item.description}</p>
                  </div>

                  <button
                    className="delete-button"
                    onClick={async () => await deleteProductList(item.id)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
