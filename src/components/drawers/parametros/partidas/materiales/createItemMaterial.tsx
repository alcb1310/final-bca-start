import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

export function CreateItemMaterial() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button className='mb-3'>
                    <PlusIcon size={10} />
                    Agregar Material
                </Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
        </Drawer>
    )
}
