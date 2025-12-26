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
import { useAppForm } from '@/hooks/formHook'
import {
    type CreateCategoryType,
    createCategorySchema,
} from '@/queries/parametros/categories'

export default function CreateCategoryDrawer() {
    const form = useAppForm({
        defaultValues: {
            name: '',
        } satisfies CreateCategoryType as CreateCategoryType,
        validators: {
            onSubmit: createCategorySchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Categoría
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DrawerHeader>
                        <DrawerTitle>Crear Categoría</DrawerTitle>
                        <DrawerDescription>
                            Crea una nueva categoría con la información
                            requerida
                        </DrawerDescription>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
