export default function NodeContainer({ children }) {
  return (
    <section className='border-slate-600 border-2 p-2 rounded-md flex flex-row justify-between items-center '>
      {children}
    </section>
  );
}
