import { PlusIcon } from 'lucide-react'
import { z } from 'zod'
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
import { useAppForm } from '@/hooks/formHook'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'

const userSchema = z.object({
    email: z
        .string({ message: 'El email es requerido' })
        .min(1, { message: 'El nombre es requerido' }),
    password: z
        .string({ message: 'La contraseña es requerida' })
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    name: z
        .string({ message: 'El nombre es requerido' })
        .min(1, { message: 'El nombre es requerido' }),
    role: z.string({ message: 'El rol es requerido' }),
})

type UserSchema = z.infer<typeof userSchema>

export function CreateUserDrawer() {
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            role: 'admin',
        } satisfies UserSchema as UserSchema,
        validators: {
            onSubmit: userSchema,
        },
        onSubmit: async ({ value }) => {
            console.table(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear usuario
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Crear usuario</DrawerTitle>
                    <DrawerDescription>
                        Formulario en el que se registra la información del
                        nuevo usuario.
                    </DrawerDescription>
                </DrawerHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        type='text'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
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
                    <DrawerFooter>
                        <Field orientation='horizontal'>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose>
                                <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
