import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { PageTitle } from '@/components/pages/Title'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    createRubro,
    createRubroSchema,
    type RubroCreateType,
} from '@/queries/parametros/rubros'

export const Route = createFileRoute('/_authed/parametros/rubros/crear')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const form = useAppForm({
        defaultValues: {
            code: '',
            name: '',
            unit: '',
        } satisfies RubroCreateType as RubroCreateType,
        validators: {
            onSubmit: createRubroSchema,
        },
        onSubmit: ({ value }) => {
            mutate.mutate(value)
        },
    })

    const mutate = useMutation({
        mutationFn: (data: RubroCreateType) => createRubro({ data: { data } }),
        onSuccess: (value) => {
            toast.success('Rubro creado con exito')
            navigate({
                to: '/parametros/rubros/$rubroId',
                params: { rubroId: value.id },
            })
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

            toast.error('Error al crear la categoría', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    return (
        <div>
            <PageTitle title='Crear Rubro' />

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
        </div>
    )
}
