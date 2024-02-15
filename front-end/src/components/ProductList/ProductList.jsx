import Card from "../Card/Card";
const ProductList =()=>{
    return (
      <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
        <Card user={true}/>
      </div>
    );
}

export default ProductList;