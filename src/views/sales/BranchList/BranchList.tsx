import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import BranchTable from './components/BranchTable'
import BranchTableTools from './components/BranchTableTools'

injectReducer('salesBranchList', reducer)

const BranchList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Sucursales</h3>
                <BranchTableTools />
            </div>
            <BranchTable />
        </AdaptableCard>
    )
}

export default BranchList
