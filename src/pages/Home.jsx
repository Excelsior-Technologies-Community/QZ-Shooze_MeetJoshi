import SiteHeader from '../components/SiteHeader'
import HeroSlider from '../components/HeroSlider'
import CollectionGrid from '../components/CollectionGrid'
import ProductTabsSection from '../components/ProductTabsSection'
import ComfortBanner from '../components/ComfortBanner'
import GradientTicker from '../components/GradientTicker'
import FeaturedCollections from '../components/FeaturedCollections'
import BannerGrid from '../components/BannerGrid'
import ProductListSmall from '../components/ProductListSmall'
import AdvancedContent from '../components/AdvancedContent'
import StoreBanner from '../components/StoreBanner'
import BrandSection from '../components/BrandSection'
import BlogSection from '../components/BlogSection'
import FooterSection from '../components/FooterSection'

function Home() {
  return (
    <div className="storefront-shell">
      <SiteHeader />

      <main>
        <HeroSlider />

        <CollectionGrid />

        <ProductTabsSection />

        <ComfortBanner />

        <GradientTicker />

        <FeaturedCollections />

        <BannerGrid />

        <ProductListSmall />

        <AdvancedContent />

        <StoreBanner />

        <BrandSection />

        <BlogSection />

        <FooterSection />
      </main>
    </div>
  )
}

export default Home
