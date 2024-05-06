import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import StoreTableSearch from './StoreTableSearch'
import StoreFilter from './StoreFilter'
import { Link, useParams } from 'react-router-dom'


const StoreTableTools = () => {
    let { branchId } = useParams();
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <StoreTableSearch />
            <StoreFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Store-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to={"/app/store/"+branchId}
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Bodega
                </Button>
            </Link>
        </div>
    )
}

export default StoreTableTools
