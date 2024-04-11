import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PeopleTable from './components/PeopleTable'
import PeopleTableTools from './components/PeopleTableTools'

injectReducer('salesPeopleList', reducer)

const PeopleList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Clientes</h3>
                <PeopleTableTools />
            </div>
            <PeopleTable />
        </AdaptableCard>
    )
}

export default PeopleList
