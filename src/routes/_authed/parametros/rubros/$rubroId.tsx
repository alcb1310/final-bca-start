import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import z from 'zod'
import { PageTitle } from '@/components/pages/Title'
import DataTable from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    getRubro,
    type RubroResponseType,
    rubroResponseSchema,
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
    const data: any[] = []
    const columns: ColumnDef<any>[] = []
    const navigate = useNavigate()
    const { rubroId } = Route.useParams()
    const { data: rubro } = useSuspenseQuery({
        queryKey: ['rubro', rubroId],
        queryFn: () => getRubro({ data: { id: rubroId } }),
    })

    const form = useAppForm({
        defaultValues: rubro,
        validators: {
            onSubmit: rubroResponseSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: RubroResponseType) =>
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

            <div className='mb-3'>
                <Button variant='default'>
                    <PlusIcon size={10} />
                    Agregar material
                </Button>
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    )
}
