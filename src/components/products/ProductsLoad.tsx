// /**
//  * API 통신을 할 때 로딩중인지를 탐색하고 로딩 중이라면 Skeleton UI를 노출 시켜 보세요.
//  */
// const ProductsLoad = ({ limit }: { limit: number }): JSX.Element => {
//   return (
//     <>
//       {0 < limit ? (
//         Array.from(Array(limit)).map((elm, index) => {
//           return (
//             <div key={index} className="card bordered animate-pulse">
//               <div className="h-80 rounded bg-gray-100"></div>
//               <div className="card-body">
//                 <div className="space-y-4">
//                   <div className="h-6 bg-gray-100 rounded"></div>
//                   <div className="h-6 bg-gray-100 rounded w-5/6"></div>
//                   <div className="h-6 bg-gray-100 rounded w-1/4"></div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div>제품이 없습니다.</div>
//       )}
//     </>
//   );
// };

// export default ProductsLoad;
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IProduct, productsList } from "../../store/products";
import { cartState } from "../../store/cart";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../common/Rating";
import Breadcrumb from "../common/Breadcrumb";

const Index = () => {
  //장바구니를 저장할때 useSetRecoilState
  //장바구니 목록을 불러올때는 useRecoilValue
  // const getCartList = useRecoilValue<Product[]>(cartState);
  const setCartList = useSetRecoilState<IProduct[]>(cartState);
  const productsListValue = useRecoilValue(productsList);
  const { id } = useParams();

  const [product, setProudct] = useState<IProduct | null>(null);

  const addCart = () => {
    if (product) {
      setCartList((old) => {
        const newList = [...old, product];
        localStorage.setItem("cart", JSON.stringify(newList));
        return newList;
      });
    }
  };

  useEffect(() => {
    const findProduct = productsListValue.find((product) => product.id == Number(id));
    if (findProduct == null) {
      const navigate = useNavigate();
      navigate("/error");
      return;
    }
    setProudct(findProduct);
  }, []);

  return product ? (
    <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <div>
        <Breadcrumb category={product.category} crumb={product.title} />
        <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
          <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
            <img src={product.image} className="object-contain w-full h-72" />
          </figure>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              {product.title}
              <span className="badge badge-accent ml-2">NEW</span>
            </h2>
            <p>{product.description}</p>
            <Rating rate={product.rating.rate} count={product.rating.count} />
            <p className="mt-2 mb-4 text-3xl">${product.price}</p>
            <div className="card-actions">
              <button onClick={addCart} className="btn btn-primary">
                장바구니에 담기
              </button>
              <Link to="/cart" className="btn btn-outline ml-1">
                장바구니로 이동
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Index;
