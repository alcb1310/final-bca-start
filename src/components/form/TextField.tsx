import type { ComponentProps } from 'react'
import { useFieldContext } from '@/hooks/formHook'
import { Field, FieldDescription, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

interface TextFieldProps extends ComponentProps<'input'> {
    name: string
    label: string
    description?: string
}

export function TextField({
    name,
    label,
    description,
    ...props
}: TextFieldProps) {
    const field = useFieldContext<string>()

    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Input
                name={name}
                autoComplete='off'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    )
}
