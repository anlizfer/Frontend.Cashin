import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { useEffect, useState } from 'react'

type SalesReportProps = {
    data?: {
        series?: {
            name: string
            data: number[]
        }[]
        categories?: string[]
    }
    className?: string
}

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const SalesReport = ({ className, data = {} }: SalesReportProps) => {
    /*
    
    // Obtener el mes y el año actual
    const mesActual = meses[fechaActual.getMonth()];
    const añoActual = fechaActual.getFullYear();
    */
    const [mesActual, setMesActual] = useState("");

    useEffect(() => {      
        const fechaActual = new Date();
        setMesActual(meses[fechaActual.getMonth()]);
    }, [])
     


    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>Reporte de Ventas - {mesActual}</h4>
                {/*<Button size="sm">Exportar Reporte</Button>*/}
            </div>
            <Chart
                series={data.series}
                xAxis={data.categories}
                height="380px"
                customOptions={{ legend: { show: false } }}
            />
        </Card>
    )
}

export default SalesReport
