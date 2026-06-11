const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const formatTime = (time) =>
  time
    ? `${+time.split(':')[0] % 12 || 12}:${time.split(':')[1]} ${
        +time.split(':')[0] >= 12 ? 'PM' : 'AM'
      }`
    : '';

const getDuration = (dep, arr) =>
  dep && arr
    ? `${Math.floor((toMinutes(arr) - toMinutes(dep)) / 60)}h ${
        (toMinutes(arr) - toMinutes(dep)) % 60
      }m`
    : '';
const FlightMatrix = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className='mx-auto mt-8 max-w-4xl rounded-[28px] bg-white p-8 text-center shadow-xl'>
        <p className='text-lg font-semibold text-slate-500'>
          No flights found.
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto mt-8 max-w-4xl space-y-6'>
      {results.map((flight) => (
        <div
          key={flight.id}
          className='rounded-[34px] bg-white p-5 text-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-9'
        >
          <div className='flex items-center gap-4'>
            <div className='grid h-14 w-14 place-items-center rounded-full bg-red-600 text-2xl text-white'>
              ✈
            </div>
            <h3 className='text-2xl font-black text-slate-950 sm:text-3xl'>
              {flight.airline}
            </h3>
          </div>

          <div className='mt-9 grid grid-cols-1 gap-8 text-center sm:grid-cols-[1fr_1.4fr_1fr] sm:items-center sm:text-left'>
            <div>
              <div className='text-2xl font-black text-slate-950 sm:text-4xl'>
                {formatTime(flight.departureTime)}
              </div>
              <div className='mt-5 text-xl font-black text-slate-950 sm:text-3xl break-words'>
                {flight.from}
              </div>
            </div>

            <div className='flex items-center justify-center gap-2 text-slate-500'>
              <div className='h-[2px] flex-1 bg-slate-200'></div>
              <span className='whitespace-nowrap text-base font-medium sm:text-lg'>
                {getDuration(flight.departureTime, flight.arrivalTime)}
              </span>
              <span>✈</span>
              <div className='h-[2px] flex-1 bg-slate-200'></div>
            </div>

            <div className='text-center sm:text-right'>
              <div className='text-2xl font-black text-slate-950 sm:text-4xl'>
                {formatTime(flight.arrivalTime)}
              </div>
              <div className='mt-5 text-xl font-black text-slate-950 sm:text-3xl break-words'>
                {flight.to}
              </div>
            </div>
          </div>

          <div className='my-8 border-t-2 border-dashed border-slate-300'></div>

          <div className='flex flex-col gap-4 text-center text-base font-bold text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:text-xl'>
            <div>{flight.seats} Seats</div>
            <div>
              Price per Person /
              <span className='ml-2 text-3xl font-black text-blue-600'>
                ${flight.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightMatrix;
