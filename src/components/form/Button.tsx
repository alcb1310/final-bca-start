import type { ComponentProps } from 'react'
import { useFormContext } from '@/hooks/formHook'
import { Button } from '../ui/button'

interface FormButtonProps extends ComponentProps<typeof Button> {
    label: string
}

export function FormButton({ label, ...props }: FormButtonProps) {
    const form = useFormContext()

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            <Button variant='default' {...props}>
                {label}
            </Button>
        </form.Subscribe>
    )
}
