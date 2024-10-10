import "./assets/css/tailwind.css";
import { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { cartState } from "./store/cart";
import { IProduct } from "./store/products";

const App = (): JSX.Element => {
  const $hamburger = useRef<HTMLInputElement>(null);
  const overlay = () => {
    $hamburger?.current?.click();
  };

  const setCartList = useSetRecoilState<IProduct[]>(cartState);
  useEffect(() => {
    const cartListString = localStorage.getItem("cart");
    if (cartListString) {
      const cartList = JSON.parse(cartListString);
      setCartList(cartList);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="drawer">
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <section className="drawer-content">
          {/* Nav를 렌더링 하세요 */}
          <Nav />
          <section className="main pt-16">
            <Router />
          </section>
          {/* Footer를 렌더링 하세요 */}
          <Footer />
        </section>
        <Drawer overlay={overlay} />
      </div>
    </BrowserRouter>
  );
};

export default App;
