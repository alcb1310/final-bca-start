export function PageTitle({ title }: Readonly<{ title: string }>) {
    return (
        <div className='mb-4'>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <hr />
        </div>
    )
}
