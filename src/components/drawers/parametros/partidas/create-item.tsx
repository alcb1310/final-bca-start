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

export default function CreateItemDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' size='sm'>
                    <PlusIcon size={10} />
                    Crear Partida
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Crear Partida</DrawerTitle>
                    <DrawerDescription>
                        Crea una partida presupuestaria con la información
                        requerida.
                    </DrawerDescription>
                </DrawerHeader>
                <form>
                    <DrawerFooter>
                        <Field orientation='horizontal'>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
