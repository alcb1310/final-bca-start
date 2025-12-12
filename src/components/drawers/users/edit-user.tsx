import { PencilIcon } from 'lucide-react'
import z from 'zod'
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

const roleEnum = ['admin', 'user'] as const

const userSchema = z.object({
    email: z
        .string({ message: 'El email es requerido' })
        .min(1, { message: 'El nombre es requerido' }),
    name: z
        .string({ message: 'El nombre es requerido' })
        .min(1, { message: 'El nombre es requerido' }),
    role: z.enum(roleEnum, { message: 'El rol es requerido' }),
})

type UserSchema = z.infer<typeof userSchema>

export default function EditUser({ user }: Readonly<{ user: UserSchema }>) {
    const form = useAppForm({
        defaultValues: {
            email: user.email,
            name: user.name,
            role: user.role,
        } satisfies UserSchema as UserSchema,
        validators: {
            onSubmit: userSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm' className='text-warning'>
                    <PencilIcon />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Editar usuario</DrawerTitle>
                    <DrawerDescription>
                        Edita los detalles del usuario
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
