import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    createSupplier,
    type SupplierCreateType,
    supplierCreateSchema,
} from '@/queries/parametros/proveedores'

export default function CreateSupplier() {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const form = useAppForm({
        defaultValues: {
            name: '',
            supplier_id: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
        } satisfies SupplierCreateType as SupplierCreateType,
        validators: {
            onSubmit: supplierCreateSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: SupplierCreateType) =>
            createSupplier({ data: { data } }),
        onSuccess: () => {
            toast.success('Proveedor creado con exito')
            queryClient.invalidateQueries({
                queryKey: ['proveedores'],
            })
            setOpen(false)
        },
        onError: (error) => {
            const e = JSON.parse(error.message)
            if (e.code === 409) {
                toast.error(e.data.message, {
                    richColors: true,
                    position: 'top-center',
                })
                return
            }

            toast.error('Error al crear el proveedor', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant='default' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Proveedor
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
                        <DrawerTitle>Crear Proveedor</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo proveedor con la información
                            proporcionada.
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
