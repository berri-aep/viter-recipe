import Footnote from '../Footnote';
import Headings from '../Headings';
import BannerSlider from './BannerSlider';
import LatestRecipe from './LatestRecipe';
import TopRating from './TopRating';

const Homepage = () => {
  return (
    <>
    <Headings/>
    <BannerSlider/>
    <LatestRecipe/>
    <TopRating/>
    <Footnote/>
    </>
  );
}

export default Homepage