import { PencilIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    type ProjectResponseType,
    projectResponseSchema,
} from '@/queries/parametros/projects'

interface EditProjectDraserProps {
    project: ProjectResponseType
}

export default function EditProjectDraser({
    project,
}: Readonly<EditProjectDraserProps>) {
    const [open, setOpen] = useState<boolean>(false)
    const form = useAppForm({
        defaultValues: {
            id: project.id,
            name: project.name,
            is_active: project.is_active,
            gross_area: project.gross_area,
            net_area: project.net_area,
        } satisfies ProjectResponseType as ProjectResponseType,
        validators: {
            onSubmit: projectResponseSchema,
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
                <Button variant='ghost' size='icon-sm'>
                    <PencilIcon className='text-warning' size={16} />
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
                        <DrawerTitle>Editar Proyecto</DrawerTitle>
                        <DrawerDescription>
                            Edita el proyecto con la informacion necesaria
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

                            <form.AppField name='is_active'>
                                {(field) => (
                                    <field.SwitchField
                                        label='Activo'
                                        name='is_active'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>

                    <DrawerFooter>
                        <Field orientation='horizontal'>
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
