import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import CompanyTableSearch from './CompanyTableSearch'
import CompanyFilter from './CompanyFilter'
import { Link } from 'react-router-dom'

const CompanyTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <CompanyTableSearch />
            <CompanyFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Company-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/Company"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Compañía
                </Button>
            </Link>
        </div>
    )
}

export default CompanyTableTools
