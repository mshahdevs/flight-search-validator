import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
  });

  // console.log('form', form);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = form.from.trim();
    const to = form.to.trim();
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!form.from || !form.to || !form.date) {
      setError('All fields are required.');
      return;
    }
    if (!cityRegex.test(from)) {
      setError('From city must contain only alphabets.');
      return;
    }
    if (!cityRegex.test(to)) {
      setError('To city must contain only alphabets.');
      return;
    }
    if (form.from.toLowerCase() === form.to.toLowerCase()) {
      setError('From and To cities cannot be same.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (form.date < today) {
      setError('Past date is not allowed.');
      return;
    }

    onSearch({
      form,
      to,
      date: form.date,
    });
  };

  return (
    <div className='rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg'>
      <div className='mb-6'>
        <h2 className='text-2xl  font-bold text-white'>Flight Search</h2>

        <p className='mt-1  text-slate-300'>
          Search routes and validate flight availability
        </p>
      </div>

      {error && (
        <div className='mb-4 rounded-xl border border-red-500/30 bg-red-500/20 p-3 text-red-200'>
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 gap-4 md:grid-cols-4'
      >
        <div>
          <label className='mb-2 block text-sm font-medium text-slate-200'>
            From
          </label>

          <input
            type='text'
            name='from'
            placeholder='Lahore'
            value={form.from}
            onChange={handleChange}
            className='w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-blue-500'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-slate-200'>
            To
          </label>

          <input
            type='text'
            name='to'
            placeholder='Dubai'
            value={form.to}
            onChange={handleChange}
            className='w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-blue-500'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-slate-200'>
            Departure Date
          </label>

          <input
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            className='w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-blue-500'
          />
        </div>

        <div className='flex items-end'>
          <button
            type='submit'
            className='w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700'
          >
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
