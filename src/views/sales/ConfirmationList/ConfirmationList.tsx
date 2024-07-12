import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmationTable from './components/ConfirmationTable'
import ConfirmationTableTools from './components/ConfirmationTableTools'

injectReducer('salesConfirmationList', reducer)

const ConfirmationList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Confirmaciones</h3>
                <ConfirmationTableTools />
            </div>
            <ConfirmationTable />
        </AdaptableCard>
    )
}

export default ConfirmationList
