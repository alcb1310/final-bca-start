export function PageTitle({ title }: Readonly<{ title: string }>) {
    return (
        <div className='my-4'>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <hr />
        </div>
    )
}
