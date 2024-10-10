import { Link } from "react-router-dom";

interface CartListProps {
  cartItems: {
    id: number;
    image: string;
    title: string;
    price: number;
  }[];
  itemCounts: { [key: number]: number };
  onItemCountChange: (id: number, count: number) => void;
}

const CartList = ({ cartItems, itemCounts, onItemCountChange }: CartListProps) => {
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id} className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
          <Link to={`/product/${item.id}`}>
            <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img src={item.image} alt={item.title} className="object-contain w-full h-48" />
            </figure>
          </Link>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              <Link to={`/product/${item.id}`} className="link link-hover">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 mb-4 text-3xl">${item.price}</p>
            <div className="card-actions">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => onItemCountChange(item.id, itemCounts[item.id] - 1)}>
                  -
                </button>
                <button className="btn btn-ghost no-animation">{itemCounts[item.id]}</button>
                <button className="btn btn-primary" onClick={() => onItemCountChange(item.id, itemCounts[item.id] + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
