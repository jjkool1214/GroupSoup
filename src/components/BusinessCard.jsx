function BusinessCard({name, description, address}) {

    return (
        <div className="businessCard">
            {name}  <br/>
            {description}  <br/>
            {address}  <br/>
        </div>
    )
}

export default BusinessCard;