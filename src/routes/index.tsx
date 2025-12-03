import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <div>
            <h1 className='text-3xl text-slate-950'>Home</h1>{' '}
            <Button
                onClick={() => {
                    alert('clicked')
                }}
            >
                Click me
            </Button>
        </div>
    )
}
