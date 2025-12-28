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

export function CreateMaterial() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Material
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Crear Material</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo material con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
