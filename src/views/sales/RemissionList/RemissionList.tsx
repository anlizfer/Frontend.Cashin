import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RemissionTable from './components/RemissionTable'
import RemissionTableTools from './components/RemissionTableTools'

injectReducer('salesRemissionList', reducer)

const RemissionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Remisiones</h3>
                <RemissionTableTools />
            </div>
            <RemissionTable />
        </AdaptableCard>
    )
}

export default RemissionList
