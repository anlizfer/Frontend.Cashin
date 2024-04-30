import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrderTable from './components/OrderTable'
import OrderTableTools from './components/OrderTableTools'

injectReducer('salesOrderList', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Órdenes</h3>
                <OrderTableTools />
            </div>
            <OrderTable />
        </AdaptableCard>
    )
}

export default OrderList
