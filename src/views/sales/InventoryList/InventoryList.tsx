import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import InventoryTable from './components/InventoryTable'
import InventoryTableTools from './components/InventoryTableTools'

injectReducer('salesInventoryList', reducer)

const InventoryList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Inventario</h3>
                <InventoryTableTools />
            </div>
            <InventoryTable />
        </AdaptableCard>
    )
}

export default InventoryList
