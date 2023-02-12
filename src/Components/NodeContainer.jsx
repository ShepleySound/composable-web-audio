export default function NodeContainer({ children, title = 'Untitled' }) {
  return (
    <section className='border-slate-600 border-2 rounded-md relative'>
      <div className='w-full border-b-slate-600 border-b px-2 py-1'>
        <h2>{title}</h2>
      </div>
      <div className='p-2 flex flex-row justify-between items-center '>
        {children}
      </div>
    </section>
  );
}
