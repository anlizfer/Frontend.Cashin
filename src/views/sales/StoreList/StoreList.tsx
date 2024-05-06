import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import StoreTable from './components/StoreTable'
import StoreTableTools from './components/StoreTableTools'

injectReducer('salesStoreList', reducer)

const StoreList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Bodegas</h3>
                <StoreTableTools />
            </div>
            <StoreTable />
        </AdaptableCard>
    )
}

export default StoreList
