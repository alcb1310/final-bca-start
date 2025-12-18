import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

export default function CreateSupplier() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Proveedor
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Crear Proveedor</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo proveedor con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
