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
import { Field, FieldGroup } from '@/components/ui/field'
import {
    detalleCreateSchema,
    type DetalleCreateType,
} from '@/queries/transacciones/detalle'
import { useAppForm } from '@/hooks/formHook'
import { useQuery } from '@tanstack/react-query'
import { getPartidasByAccumulate } from '@/queries/parametros/partidas'

type CreateInvoiceDetailDrawerProps = {
    invoiceId: string
}

export function CreateInvoiceDetailDrawer({
    invoiceId,
}: CreateInvoiceDetailDrawerProps) {
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
            console.log(value)
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

    return (
        <Drawer direction='right'>
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
                                        disabled
                                        className='text-right'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='cost'>
                                {(field) => (
                                    <field.TextField
                                        label='Costo'
                                        name='cost'
                                        disabled
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
