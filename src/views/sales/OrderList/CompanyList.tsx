import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import CompanyTable from './components/CompanyTable'
import CompanyTableTools from './components/CompanyTableTools'

injectReducer('salesCompanyList', reducer)

const CompanyList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Compañías</h3>
                <CompanyTableTools />
            </div>
            <CompanyTable />
        </AdaptableCard>
    )
}

export default CompanyList
