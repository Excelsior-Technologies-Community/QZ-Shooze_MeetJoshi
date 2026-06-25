import { useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import ShopPageBanner from '../components/ShopPageBanner'
import ShopProductsSection from '../components/ShopProductsSection'
import ShopCollectionGrid from '../components/ShopCollectionGrid'
import FooterSection from '../components/FooterSection'

function Shops() {
  const [initialFilter, setInitialFilter] = useState(null)

  return (
    <div className="storefront-shell">
        <SiteHeader />
        <ShopPageBanner />
        <ShopCollectionGrid onFilterClick={setInitialFilter} />
        <ShopProductsSection initialFilter={initialFilter} />
        <FooterSection />
    </div>
  )
}
export default Shops
