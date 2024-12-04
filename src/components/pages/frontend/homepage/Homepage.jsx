import useQueryData from '@/components/custom-hook/useQueryData';
import Footnote from '../Footnote';
import Headings from '../Headings';
import BannerSlider from './BannerSlider';
import LatestRecipe from './LatestRecipe';
import TopRating from './TopRating';

const Homepage = () => {
   const {
     isLoading,
     isFetching,
     error,
     data: result,
   } = useQueryData(
     `/v2/recipe`, // endpoint
     "get", // method
     "recipe"
   );
  return (
    <>
      <Headings />
      <BannerSlider result={result} />
      <LatestRecipe result={result} />
      <TopRating />
      <Footnote />
    </>
  );
}

export default Homepage