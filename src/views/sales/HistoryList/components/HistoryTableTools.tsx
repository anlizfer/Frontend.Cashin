import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import HistoryTableSearch from './HistoryTableSearch'
import HistoryFilter from './HistoryFilter'
import { Link } from 'react-router-dom'

const HistoryTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">            
            <HistoryFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/History-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Exportar
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/History"
            >                
            </Link>
        </div>
    )
}

export default HistoryTableTools
