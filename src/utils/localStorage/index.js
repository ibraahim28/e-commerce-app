export const getProductsFromCart = () => {
    const data = localStorage.getItem("cart__data");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  
  export const addProductToCart = (products) =>
    localStorage.setItem("cart__data", JSON.stringify(products));
  
  