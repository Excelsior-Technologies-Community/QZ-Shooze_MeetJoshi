import SiteHeader from '../components/SiteHeader'
import ShopPageBanner from '../components/ShopPageBanner'
import ShopCollectionGrid from '../components/ShopCollectionGrid'
import FooterSection from '../components/FooterSection'

function Shops() {
  return (
    <div className="storefront-shell">
        <SiteHeader />
        <ShopPageBanner />
        <ShopCollectionGrid />
        <FooterSection />
    </div>
  )
}
export default Shops