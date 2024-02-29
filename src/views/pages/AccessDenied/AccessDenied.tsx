import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'

const AccessDenied = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <DoubleSidedImage
                    src="/img/others/img-2.png"
                    darkModeSrc="/img/others/img-2-dark.png"
                    alt="Acceso Denegado"
                />
                <div className="mt-6 text-center">
                    <h3 className="mb-2">Acceso Denegado</h3>
                    <p className="text-base">
                        YNo tienes permiso para visitar esta página.
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default AccessDenied
