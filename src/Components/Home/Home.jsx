import { Helmet } from "react-helmet-async";
import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import FeaturedSectionFeatures from "./FeaturedSection/FeaturedSectionFeatures";
import s from "./Home.module.scss";
import MainSlider from "./Introduction/MainSlider";
import SectionsMenu from "./Introduction/SectionsMenu";
import OurProductsSection from "./OurProductsSection/OurProductsSection";
import ProductPoster from "./ProductPoster/ProductPoster";
import ThisMonthSection from "./ThisMonthSection/ThisMonthSection";
import TodaySection from "./TodaySection/TodaySection";

const Home = () => {
  useScrollOnMount(0);

  return (
    <>
      <Helmet>
        <title>E-Commercew</title>
        <meta
          name="description"
          content="Your ultimate destination for effortless online shopping. Discover curated collections, easily add items to your cart and wishlist,and enjoy detailed product descriptions with captivating previews. Experience convenience like never before with our intuitive interface. Shop smarter with us today."
        />
      </Helmet>

      <div className={s.home}>
        <div className={s.container}>
          <div className={s.introductionContainer}>
            <SectionsMenu />

            <div className={s.line}></div>

            <MainSlider />
          </div>

          <TodaySection />
          <CategoriesSection />
          <ThisMonthSection />
          <ProductPoster />
          <OurProductsSection />
          <FeaturedSection />
          <FeaturedSectionFeatures />
        </div>
      </div>
    </>
  );
};

export default Home;
