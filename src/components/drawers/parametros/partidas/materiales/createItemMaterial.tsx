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

export function CreateItemMaterial() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button className='mb-3'>
                    <PlusIcon size={10} />
                    Agregar Material
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form>
                    <DrawerHeader>
                        <DrawerTitle>Agregar Material</DrawerTitle>
                        <DrawerDescription>
                            Agrega un material al rubro de acuerdo a la
                            información proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
                            <DrawerClose asChild>
                                <Button variant={'outline'}>Cancelar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
