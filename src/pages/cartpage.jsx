import { CartPage } from "../components/cartspage";
export function CartPageView({setCounter, counter, productid}){
    return <CartPage setCounter={setCounter} counter={counter} productid={productid} />
}