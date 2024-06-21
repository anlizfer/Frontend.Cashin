import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import InventoryTableSearch from './InventoryTableSearch'
import InventoryFilter from './InventoryFilter'
import { Link } from 'react-router-dom'

const InventoryTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <InventoryTableSearch />
            <InventoryFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Inventory-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/Inventory"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Inventario
                </Button>
            </Link>
        </div>
    )
}

export default InventoryTableTools
