
export default function Cart(props){
    function getIds(){
        return props.products.map((element) => element.id);
    }
    return (
        <>
            {(props.arr).map((element) => {
                let pos = getIds().indexOf(element.id);
                let obj = props.products[pos];
                return <p key={element.id}>{obj.name} {obj.price} {element.quantity}</p>
            })}
        </>
    )
}