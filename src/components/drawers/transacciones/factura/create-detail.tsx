import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

export function CreateInvoiceDetailDrawer() {
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
