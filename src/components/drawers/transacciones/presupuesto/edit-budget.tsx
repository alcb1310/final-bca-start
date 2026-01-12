import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'

export function EditBudgetDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size={'icon-sm'}>
                    <PencilIcon size={10} className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Editar Presupuesto</DrawerTitle>
                        <DrawerDescription>
                            Edita un presupuesto con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cerrar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
