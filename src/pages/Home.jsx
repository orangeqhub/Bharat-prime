import { useContent } from '../context/ContentContext';
import Seo from '../components/layout/Seo';
import Hero from '../sections/Hero';
import Divisions from '../sections/Divisions';
import Scrap from '../sections/Scrap';
import WhyRecycling from '../sections/WhyRecycling';
import SteelTrading from '../sections/SteelTrading';
import Fabrication from '../sections/Fabrication';
import MiningVsRecycling from '../sections/MiningVsRecycling';
import BuyScrapCompanies from '../sections/BuyScrapCompanies';
import BusinessCycle from '../sections/BusinessCycle';
import GrowthPlan from '../sections/GrowthPlan';

export default function Home() {
  const { content } = useContent();

  return (
    <>
      <Seo
        title={`${content.site.companyName} | Scrap Trading, Steel Trading & Metal Fabrication — ${content.site.location}`}
        description="We buy scrap, we sell steel, we fabricate metal. Scrap trading, iron & steel trading and custom metal fabrication in Guntur, Andhra Pradesh."
      />
      <Hero />
      <Divisions />
      <Scrap />
      <WhyRecycling />
      <SteelTrading />
      <Fabrication />
      <MiningVsRecycling />
      <BuyScrapCompanies />
      <BusinessCycle />
      <GrowthPlan />
    </>
  );
}