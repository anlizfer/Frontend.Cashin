import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import BankAccountTable from './components/BankAccountTable'
import BankAccountTableTools from './components/BankAccountTableTools'

injectReducer('salesBankAccountList', reducer)

const BankAccountList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Cuentas Bancarias</h3>
                <BankAccountTableTools />
            </div>
            <BankAccountTable />
        </AdaptableCard>
    )
}

export default BankAccountList
