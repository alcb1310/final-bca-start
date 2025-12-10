import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import z from 'zod'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import { authClient } from '@/utils/auth-client'

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
            await authClient.signIn.email(
                {
                    email: value.email,
                    password: value.password,
                },
                {
                    onSuccess: () => {
                        toast.success('Bienvenido')
                    },
                    onError: ({ error }) => {
                        toast.error('Credenciales incorrectas', {
                            richColors: true,
                            position: 'top-center',
                        })
                        console.error(error)
                    },
                },
            )
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
