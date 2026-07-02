function DealCard({image, name, restaurantLabel, discount}) {
  return (
    <div>
      <img src={image} alt={name} />
      <p>{restaurantLabel}</p>
      <h3>{name}</h3>
      <span>{discount}</span>
    </div>
  );
}

export default DealCard;