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
import type { CategoryType } from '@/queries/parametros/categories'

interface EditCategoryProps {
    category: CategoryType
}

export default function EditCategory({
    category,
}: Readonly<EditCategoryProps>) {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm'>
                    <PencilIcon size={10} className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Editar categoría</DrawerTitle>
                    <DrawerDescription>
                        Edita la categoría con la información proporcionada
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}
