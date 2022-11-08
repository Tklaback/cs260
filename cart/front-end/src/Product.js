import axios from 'axios';
import './styles.css';

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
        <div className='product'>
            <p>{props.object.name} -- {props.object.price}</p>
            <button onClick={(e) => {addToCart(props.object.id)}}>Add to cart</button>
        </div>
    )
}