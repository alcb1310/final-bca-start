import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

export function EditBudgetDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size={'icon-sm'}>
                    <PencilIcon size={10} className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
        </Drawer>
    )
}
