import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import OrderFilter from './OrderFilter'
import { Link } from 'react-router-dom'

const OrderTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <OrderTableSearch />
            <OrderFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Order-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/order"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Orden
                </Button>
            </Link>
        </div>
    )
}

export default OrderTableTools
