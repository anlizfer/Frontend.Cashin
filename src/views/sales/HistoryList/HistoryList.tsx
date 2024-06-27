import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import HistoryTable from './components/HistoryTable'
import HistoryTableTools from './components/HistoryTableTools'

injectReducer('salesHistoryList', reducer)

const HistoryList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Histórico Movimientos</h3>
                <HistoryTableTools />
            </div>
            <HistoryTable />
        </AdaptableCard>
    )
}

export default HistoryList
