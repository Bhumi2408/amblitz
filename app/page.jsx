import BannerSlider from "../components/BannerSlider";
import Bestsellers from "../components/Bestsellers";
import BulkOrders from "../components/BulkOrders";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import NaamLekhan from "../components/NaamLekhan";
import Navbar, { AnnouncementStrip } from "../components/Navbar";
import { FinalCta, Footer } from "../components/Closing";
import { Numbers } from "../components/NumbersAndChannels";
import PaperQuality from "../components/PaperQuality";
import SpecMarquee from "../components/SpecMarquee";
import Story from "../components/Story";
import Testimonials from "../components/Testimonials";
import WhyOmr from "../components/WhyOmr";
import Range from "../components/Range";
import Collections from "../components/Collections";

export default function Page() {
  return (
    <>
      {/* 01 */} <AnnouncementStrip />
      {/* 02 */} <Navbar />
      <main>
        <BannerSlider />
        {/* 03 */} <Hero />
        {/* 04 */} <SpecMarquee />
        {/* 06 */} <Bestsellers />
        {/* 15 */} <Story />
        {/* 05 */} <Range />
        <Collections />
        {/* 07 */} <WhyOmr />
        {/* 08 <ExamPicker /> */}
        {/* 09 */} <PaperQuality />
        {/* 10 */} <NaamLekhan />
        {/* 11 */} <Numbers />
        {/* 12 <Channels /> */}
        {/* 13 */} <BulkOrders />
        {/* 14 */} <Testimonials />
        {/* 16 */} <Faq />
        {/* 17 */} <FinalCta />
      </main>
      {/* 18 */} <Footer />
    </>
  );
}
