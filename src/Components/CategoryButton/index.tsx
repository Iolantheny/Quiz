interface Catregory{
    img: string;
    name: string;
}

const CategoryButton = (props:Catregory) => {
    return (
        <div className="button">
            <div><img src={props.img} alt='img' /></div>
            <div><hr /></div>
            <div><p>{props.name}</p></div>
        </div>
    )
}

export default CategoryButton;