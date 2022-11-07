import axios from 'axios';

export default function Product(props){
    const addToCart = async() => {
        try{
            const response = axios.post(`/api/cart/${props.object.id}`);
            props.setCart(response.data)
            props.setUpdate(true);
        }catch(error){
            props.setError(error);
        }
    }

    return (
        <div style={{width: "25%", display: 'flex', justifyContent: 'space-between'}}>
            <p>{props.object.name} -- {props.object.price}</p>
            <button onClick={(e) => {addToCart();}}>Add to cart</button>
        </div>
    )
}