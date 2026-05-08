import { ProductPage } from "../components/product-preview";
export function ProductViewPage({setProductId,selectedProduct,setCounter}){
    return <ProductPage setProductId={setProductId} product={selectedProduct} setCounter={setCounter} />
}