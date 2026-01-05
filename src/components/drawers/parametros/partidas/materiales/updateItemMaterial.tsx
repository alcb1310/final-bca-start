import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

type UpdateItemMaterialProps = {
    itemMaterial: {
        item_id: string
        material_id: string
        material_name: string
        quantitty: number
    }
}

export function UpdateItemMaterial({ itemMaterial }: UpdateItemMaterialProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size={'icon-sm'}>
                    <PencilIcon className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
        </Drawer>
    )
}
