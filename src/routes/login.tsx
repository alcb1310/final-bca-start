import { createFileRoute } from '@tanstack/react-router'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const form = useAppForm({
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <div className='w-1/2 mx-auto my-[10%] border border-gray-300 rounded-3xl p-5'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend variant='legend'>Login</FieldLegend>
                        <FieldDescription>
                            Ingrese sus credenciales
                        </FieldDescription>
                    </FieldSet>
                </FieldGroup>
                <FieldGroup className='my-5'>
                    <FieldSet>
                        <form.AppField name='email'>
                            {(field) => (
                                <field.TextField
                                    label='Email'
                                    type='email'
                                    name='email'
                                />
                            )}
                        </form.AppField>

                        <form.AppField name='password'>
                            {(field) => (
                                <field.TextField
                                    label='Password'
                                    type='password'
                                    name='password'
                                />
                            )}
                        </form.AppField>
                    </FieldSet>
                </FieldGroup>
                <Field orientation={'horizontal'}>
                    <form.AppForm>
                        <form.FormButton
                            size='lg'
                            type='submit'
                            label='Ingresar'
                            className='w-full'
                        />
                    </form.AppForm>
                </Field>
            </form>
        </div>
    )
}
