import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

type CreateInvoiceDetailDrawerProps = {
    projectId: string
}

export function CreateInvoiceDetailDrawer({
    projectId,
}: CreateInvoiceDetailDrawerProps) {
    console.log(projectId)

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant={'default'} className='my-4'>
                    <PlusIcon size={10} />
                    Agregar Detalle
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Crear Detalle</DrawerTitle>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
