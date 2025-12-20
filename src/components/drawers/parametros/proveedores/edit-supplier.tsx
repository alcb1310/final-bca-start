import { PencilIcon } from 'lucide-react'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { useAppForm } from '@/hooks/formHook'
import { Button } from '@/components/ui/button'
import {
    supplierEditSchema,
    type SupplierEditType,
} from '@/queries/parametros/proveedores'

interface EditSupplierProps {
    supplier: SupplierEditType
}

export default function EditSupplier({
    supplier,
}: Readonly<EditSupplierProps>) {
    const form = useAppForm({
        defaultValues: supplier,
        validators: {
            onSubmit: supplierEditSchema,
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
                        <DrawerTitle>Editar Proveedor</DrawerTitle>
                        <DrawerDescription>
                            Edita el proveedor con la información ingresada
                        </DrawerDescription>
                    </DrawerHeader>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
