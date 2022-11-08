import axios from "axios";
import "./styles.css";

export default function Cart(props){
    function getIds(){
        return props.products.map((element) => element.id);
    }
    const removeItm = async(id) => {
        try{
            await axios.delete(`/api/cart/${id}`);
            props.setUpdate(!props.update);
        }catch(error){
            props.setError(error);
        }
        
    }
    const modifyQty = async(isPlus, id, qty) => {
        try{
            if (isPlus) {
                await axios.put(`/api/cart/${id}/${qty + 1}`);
            }else{
                await axios.put(`/api/cart/${id}/${qty - 1}`);
            }
            props.setUpdate(!props.update);
        }catch(error){
            props.setError(error);
        }
    }
    return (
        <>
            {(props.arr).map((element) => {
                let pos = getIds().indexOf(element.id);
                let obj = props.products[pos];
                return (
                    <div className="cart-object">
                        <p key={element.id}>{obj.name}, {element.quantity}</p>
                        <button onClick={(e) => modifyQty(false, element.id, element.quantity)}>-</button>
                        <button onClick={(e) => modifyQty(true, element.id, element.quantity)}>+</button>
                        <button onClick={(e) => removeItm(element.id)}>Remove Item</button>
                    </div>
                )
            })}
        </>
    )
}