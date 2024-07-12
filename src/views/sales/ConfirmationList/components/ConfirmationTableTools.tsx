import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ConfirmationTableSearch from './ConfirmationTableSearch'
import ConfirmationFilter from './ConfirmationFilter'
import { Link } from 'react-router-dom'

const ConfirmationTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ConfirmationTableSearch />
            <ConfirmationFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Confirmation-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>            
        </div>
    )
}

export default ConfirmationTableTools
