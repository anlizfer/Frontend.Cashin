import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import CategoryTableSearch from './CategoryTableSearch'
import CategoryFilter from './CategoryFilter'
import { Link } from 'react-router-dom'

const CategoryTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <CategoryTableSearch />
            <CategoryFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/Category-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/Category"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Crear Categoría
                </Button>
            </Link>
        </div>
    )
}

export default CategoryTableTools
