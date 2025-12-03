import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <div>
            <h1 className='text-3xl text-blue-500'>Home</h1>
        </div>
    )
}
