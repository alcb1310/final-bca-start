import { PlusIcon } from 'lucide-react'
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

export function CreateBudgetDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Presupuesto
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Crear Presupuesto</DrawerTitle>
                        <DrawerDescription>
                            Crea una nueva entrada en el presupuesto del
                            proyecto seleccionado.
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
