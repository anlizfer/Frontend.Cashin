import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import BranchTableSearch from './BranchTableSearch'
import BranchFilter from './BranchFilter'
import { Link } from 'react-router-dom'

const BranchTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <BranchTableSearch />
            <BranchFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Branch-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/Branch"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Sucursal
                </Button>
            </Link>
        </div>
    )
}

export default BranchTableTools
