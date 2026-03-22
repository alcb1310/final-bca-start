import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
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
import { Field, FieldGroup } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { getPartidasByAccumulate } from '@/queries/parametros/partidas'
import {
    createDetalles,
    type DetalleCreateType,
    detalleCreateSchema,
} from '@/queries/transacciones/detalle'
import { useEffect, useState } from 'react'

type CreateInvoiceDetailDrawerProps = {
    invoiceId: string
}

export function CreateInvoiceDetailDrawer({
    invoiceId,
}: CreateInvoiceDetailDrawerProps) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const form = useAppForm({
        defaultValues: {
            invoice_id: invoiceId,
            budget_item_id: '',
            quantity: 0,
            cost: 0,
        } satisfies DetalleCreateType as DetalleCreateType,
        validators: {
            // @ts-expect-error
            onSubmit: detalleCreateSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: DetalleCreateType) =>
            createDetalles({ data: { data } }),
        onSuccess: () => {
            toast.success('Detalle creado con exito')
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['detalle', invoiceId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['factura', invoiceId],
                }),
            ])
        },
        onError: (error) => {
            const e = JSON.parse(error.message)
            switch (e.code) {
                case 400:
                    toast.error(e.data.message, {
                        richColors: true,
                        position: 'top-center',
                    })
                    return
                case 404:
                    toast.error(e.data.message, {
                        richColors: true,
                        position: 'top-center',
                    })
                    return
            }

            toast.error('Error al crear el detalle', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    const { data: partidas } = useQuery({
        queryKey: ['partidas'],
        queryFn: () => getPartidasByAccumulate({ data: { accum: false } }),
    })
    const budgetItems =
        partidas?.map((budgetItem: any) => {
            return {
                label: budgetItem.name,
                value: budgetItem.id,
            }
        }) || []
    budgetItems.unshift({ label: 'Seleccione una partida', value: '' })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant={'default'} className='my-4'>
                    <PlusIcon size={10} />
                    Agregar Detalle
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
                        <DrawerTitle>Crear Detalle</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo detalle para la factura
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <FieldGroup>
                            <form.AppField name='budget_item_id'>
                                {(field) => (
                                    <field.SelectField
                                        label='Partida'
                                        name='budget_item_id'
                                        options={budgetItems}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='quantity'>
                                {(field) => (
                                    <field.TextField
                                        label='Cantidad'
                                        name='quantity'
                                        className='text-right'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='cost'>
                                {(field) => (
                                    <field.TextField
                                        label='Costo'
                                        name='cost'
                                        className='text-right'
                                    />
                                )}
                            </form.AppField>
                        </FieldGroup>
                        <Field orientation={'horizontal'}>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cerrar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
