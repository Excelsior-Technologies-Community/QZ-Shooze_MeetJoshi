import SiteHeader from '../components/SiteHeader'
import ShopPageBanner from '../components/ShopPageBanner'
import ShopProductsSection from '../components/ShopProductsSection'
import ShopCollectionGrid from '../components/ShopCollectionGrid'
import FooterSection from '../components/FooterSection'

function Shops() {
  return (
    <div className="storefront-shell">
        <SiteHeader />
        <ShopPageBanner />
        <ShopCollectionGrid />
        <ShopProductsSection />
        <FooterSection />
    </div>
  )
}
export default Shops
