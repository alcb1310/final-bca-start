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
import { useAppForm } from '@/hooks/formHook'
import {
    type CategoryType,
    categorySchema,
} from '@/queries/parametros/categories'

interface EditCategoryProps {
    category: CategoryType
}

export default function EditCategory({
    category,
}: Readonly<EditCategoryProps>) {
    const form = useAppForm({
        defaultValues: category,
        validators: {
            onSubmit: categorySchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm'>
                    <PencilIcon size={10} className='text-warning' />
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
                        <DrawerTitle>Editar categoría</DrawerTitle>
                        <DrawerDescription>
                            Edita la categoría con la información proporcionada
                        </DrawerDescription>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
