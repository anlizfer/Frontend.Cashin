import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RemissionTableSearch from './RemissionTableSearch'
import RemissionFilter from './RemissionFilter'
import { Link } from 'react-router-dom'

const RemissionTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <RemissionTableSearch />
            <RemissionFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Remission-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/remission"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Remisión
                </Button>
            </Link>
        </div>
    )
}

export default RemissionTableTools
