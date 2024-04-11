import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import PeopleTableSearch from './PeopleTableSearch'
import PeopleFilter from './PeopleFilter'
import { Link } from 'react-router-dom'

const PeopleTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <PeopleTableSearch />
            <PeopleFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/People-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/People"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Cliente
                </Button>
            </Link>
        </div>
    )
}

export default PeopleTableTools
