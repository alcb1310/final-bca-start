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
import type { SupplierEditType } from '@/queries/parametros/proveedores'

interface EditSupplierProps {
    supplier: SupplierEditType
}

export default function EditSupplier({
    supplier,
}: Readonly<EditSupplierProps>) {
    console.log(supplier)

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button>
                    <PencilIcon size={10} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Editar Proveedor</DrawerTitle>
                    <DrawerDescription>
                        Edita el proveedor con la información ingresada
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}
