import { Link } from '@tanstack/react-router'
import { ChevronDownIcon, UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import z from 'zod'
import { useAppForm } from '@/hooks/formHook'
import { Field, FieldGroup, FieldSet } from '../ui/field'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/utils/auth-client'
import { toast } from 'sonner'

const passSchema = z.object({
    currentpassword: z
        .string({ message: 'La contraseña es requerida' })
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password: z
        .string({ message: 'La contraseña es requerida' })
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})

type PassSchema = z.infer<typeof passSchema>

export default function UserMenu() {
    const form = useAppForm({
        defaultValues: {
            currentpassword: '',
            password: '',
        } satisfies PassSchema as PassSchema,
        validators: {
            onSubmit: passSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate({ value })
        },
    })

    const mutation = useMutation({
        mutationFn: ({ value }: { value: PassSchema }) =>
            authClient.changePassword({
                newPassword: value.password,
                currentPassword: value.currentpassword,
                revokeOtherSessions: true,
            }),
        onSuccess: () => {
            toast.success('Contraseña cambiada exitosamente')
        },
        onError: (error) => {
            toast.error(error.message, {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <div className='flex gap-0 items-center'>
                            <UserIcon />
                            <ChevronDownIcon />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link to='/usuarios/perfil'>Mi Perfil</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to='/usuarios/admin'>Administrar</Link>
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                Cambiar contrseña
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cambiar contraseña</DialogTitle>
                    <DialogDescription>
                        Cambia la contraseña del usuario actual
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='currentpassword'>
                                {(field) => (
                                    <field.TextField
                                        label='Contraseña Actual'
                                        type='password'
                                        name='currentpassword'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='password'>
                                {(field) => (
                                    <field.TextField
                                        label='Contraseña Nueva'
                                        type='password'
                                        name='password'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
                    <DialogFooter>
                        <Field orientation='horizontal'>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DialogClose asChild>
                                <Button type='button' variant='secondary'>
                                    Cerrar
                                </Button>
                            </DialogClose>
                        </Field>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
