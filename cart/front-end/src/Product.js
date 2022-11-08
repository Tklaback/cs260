import axios from 'axios';

export default function Product(props){
    const addToCart = async(id) => {
        try{
            await axios.post(`/api/cart/${id}`);
            props.setUpdate(!props.update);
        }catch(error){
            props.setError(error);
        }
    }

    return (
        <div style={{width: "25%", display: 'flex', justifyContent: 'space-between'}}>
            <p>{props.object.name} -- {props.object.price}</p>
            <button onClick={(e) => {addToCart(props.object.id)}}>Add to cart</button>
        </div>
    )
}