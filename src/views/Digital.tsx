import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";
import ProductList from "../components/products/ProductList";
import { digitalList } from "../store/products";
import { useRecoilValue } from "recoil";

const Fashion = (): JSX.Element => {
  const getDigitalList = useRecoilValue(digitalList);

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.DIGITAL} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        {/* componetns products 폴더에 공통으로 사용할 ItemList 컴포넌트를 만들어서 노출 시켜 보세요. */}
        <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">디지털</h2>
        <ProductList data={getDigitalList} />
      </article>
    </section>
  );
};

export default Fashion;
