import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

export function CreateBudgetDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Presupuesto
                </Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
        </Drawer>
    )
}
