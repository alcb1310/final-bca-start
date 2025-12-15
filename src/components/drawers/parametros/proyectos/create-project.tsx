import { useMutation } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import {
    createProject,
    type ProjectCreateType,
    projectCreateSchema,
} from '@/queries/parametros/projects'

export default function CreateProjectDrawer() {
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            name: '',
            is_active: true,
            gross_area: 0,
            net_area: 0,
        } satisfies ProjectCreateType as ProjectCreateType,
        validators: {
            // @ts-expect-error
            onSubmit: projectCreateSchema,
        },
        onSubmit: ({ value }) => {
            mutation.mutate(value)
        },
    })

    const mutation = useMutation({
        mutationFn: (data: ProjectCreateType) =>
            createProject({ data: { data } }),
        onSuccess: () => {
            toast.success('Proyecto creado con exito')
            setOpen(false)
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

            toast.error('Error al crear el proyecto', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form.reset])

    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant='ghost' className='mb-3'>
                    <PlusIcon size={10} />
                    Crear Proyecto
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
                        <DrawerTitle>Crear Proyecto</DrawerTitle>
                        <DrawerDescription>
                            Crea un nuevo proyecto con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>

                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del proyecto'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='gross_area'>
                                {(field) => (
                                    <field.TextField
                                        label='Area Bruta'
                                        placeholder='Ingrese al area bruta'
                                        name='gross_area'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='net_area'>
                                {(field) => (
                                    <field.TextField
                                        label='Area Neta'
                                        placeholder='Ingrese al area bruta'
                                        name='net_area'
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
                            <DrawerClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
