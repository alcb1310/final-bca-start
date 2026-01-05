import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import z from 'zod'
import { CreateItemMaterial } from '@/components/drawers/parametros/partidas/materiales/createItemMaterial'
import { UpdateItemMaterial } from '@/components/drawers/parametros/partidas/materiales/updateItemMaterial'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    getRubro,
    type RubroMaterialType,
    type SingleRubroResponseType,
    singleRubroResponseSchema,
    updateRubro,
} from '@/queries/parametros/rubros'

export const Route = createFileRoute('/_authed/parametros/rubros/$rubroId')({
    component: RouteComponent,
    params: {
        parse: (rawParams) => {
            try {
                const id = z.uuid().parse(rawParams.rubroId)
                return { rubroId: id }
            } catch (error) {
                throw new Error(`Invalid rubroId: ${error}`)
            }
        },
    },
    loader: async ({ context: { queryClient }, params: { rubroId } }) => {
        queryClient.prefetchQuery({
            queryKey: ['rubro', rubroId],
            queryFn: () => getRubro({ data: { id: rubroId } }),
        })
    },
})

function RouteComponent() {
    const navigate = useNavigate()
    const { rubroId } = Route.useParams()
    const { data: rubro } = useSuspenseQuery({
        queryKey: ['rubro', rubroId],
        queryFn: () => getRubro({ data: { id: rubroId } }),
    })

    const form = useAppForm({
        defaultValues: rubro.item,
        validators: {
            onSubmit: singleRubroResponseSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const columns: ColumnDef<RubroMaterialType>[] = [
        {
            header: 'Código',
            accessorKey: 'material_code',
        },
        {
            header: 'Nombre',
            accessorKey: 'material_name',
        },
        {
            header: 'Unidad',
            accessorKey: 'material_unit',
        },
        {
            header: 'Cantidad',
            accessorKey: 'quantity',
            cell: ({ row }) => {
                return (
                    <span className='block text-right'>
                        {row.original.quantity.toLocaleString('es-EC', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            },
        },
        {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2 items-center'>
                        <UpdateItemMaterial itemMaterial={row.original} />
                        <TrashIcon size={10} className='text-destructive' />
                    </div>
                )
            },
        },
    ]

    const mutate = useMutation({
        mutationFn: (data: SingleRubroResponseType) =>
            updateRubro({ data: { data } }),
        onSuccess: () => {
            toast.success('Rubro actualizado con exito')
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

            toast.error('Error al actualizar la rubro', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    return (
        <div>
            <PageTitle title='Editar rubro' />
            <div className='w-1/2 mx-auto'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='code'>
                                {(field) => (
                                    <field.TextField
                                        label='Código'
                                        placeholder='Ingrese el código del material'
                                        name='code'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del material'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='unit'>
                                {(field) => (
                                    <field.TextField
                                        label='Unidad'
                                        placeholder='Ingrese la unidad del material'
                                        name='unit'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
                    <Field
                        orientation='horizontal'
                        className='flex justify-around'
                    >
                        <form.AppForm>
                            <form.FormButton label='Guardar' />
                        </form.AppForm>
                        <Button
                            variant='outline'
                            type='button'
                            onClick={() => {
                                navigate({ to: '/parametros/rubros' })
                            }}
                        >
                            Cancel
                        </Button>
                    </Field>
                </form>
            </div>

            <CreateItemMaterial id={rubroId} />
            <DataTable columns={columns} data={rubro.itemMaterials} />
        </div>
    )
}
