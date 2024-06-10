export function createData(name, products) {
    const subtotal = products.reduce((acc, product) => acc + product.quantity, 0);
    return {
      name,
      products,
      subtotal,
    };
  }
  