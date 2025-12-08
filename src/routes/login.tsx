import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'

const formSchema = z.object({
    email: z.string({ message: 'Ingrese un correo' }),
    password: z.string({ message: 'Ingrese una contraseña' }).min(8),
})

type FormSchema = z.infer<typeof formSchema>

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
        } satisfies FormSchema as FormSchema,
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)

            const res = await fetch('/api/auth/sign-in/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: value.email,
                    password: value.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                console.error(data, res.status)
                return
            }

            console.log(data)
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
