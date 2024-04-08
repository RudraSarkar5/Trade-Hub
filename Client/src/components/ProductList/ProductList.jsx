import Card from "../Card/Card";
const ProductList = ({ allProduct }) => {
  
  return (
    <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
      {allProduct &&
        allProduct.map((productItem, idx) => (
          <Card key={idx} user={true} value={{ ...productItem }}></Card>
        ))}
    </div>
  );
};

export default ProductList;