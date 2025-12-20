import { PencilIcon } from 'lucide-react'
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
import { useAppForm } from '@/hooks/formHook'
import { Button } from '@/components/ui/button'
import {
    supplierEditSchema,
    type SupplierEditType,
} from '@/queries/parametros/proveedores'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'

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
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del proveedor'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='supplier_id'>
                                {(field) => (
                                    <field.TextField
                                        label='RUC'
                                        placeholder='Ingrese el RUC del proveedor'
                                        name='supplier_id'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='contact_name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre del Contacto'
                                        placeholder='Nombre del contacto'
                                        name='contact_name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='contact_email'>
                                {(field) => (
                                    <field.TextField
                                        label='Email del Contacto'
                                        placeholder='Email del contacto'
                                        name='contact_email'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='contact_phone'>
                                {(field) => (
                                    <field.TextField
                                        label='Teléfono del Contacto'
                                        placeholder='Teléfono del contacto'
                                        name='contact_phone'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
                    <DrawerFooter>
                        <Field orientation='horizontal'>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
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
