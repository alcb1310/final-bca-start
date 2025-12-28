import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import type { MaterialResponseType } from '@/queries/parametros/materiales'

interface EditMaterialProps {
    material: MaterialResponseType
}

export function EditMaterial({ material }: Readonly<EditMaterialProps>) {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button size={'icon-sm'} variant={'ghost'}>
                    <PencilIcon className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Editar Material</DrawerTitle>
                    <DrawerDescription>
                        Edita el material con la información proporcionada
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}
