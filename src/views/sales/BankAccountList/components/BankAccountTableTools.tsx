import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import BankAccountTableSearch from './BankAccountTableSearch'
import BankAccountFilter from './BankAccountFilter'
import { Link } from 'react-router-dom'

const BankAccountTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <BankAccountTableSearch />
            <BankAccountFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/BankAccount-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/bank-account"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Cuenta Bancaria
                </Button>
            </Link>
        </div>
    )
}

export default BankAccountTableTools
