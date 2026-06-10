import { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightMatrix from './components/FlightMatrix';
import { flights } from './data/flights';

const App = () => {
  const [results, setResults] = useState([]);
  const handleSearch = (form) => {
    const filteredFlights = flights.filter(
      (flight) =>
        flight.from.toLowerCase() === form.from.toLowerCase() &&
        flight.to.toLowerCase() === form.to.toLowerCase() &&
        flight.date === form.date,
    );
    console.log('filteredflights: ', filteredFlights);
    setResults(filteredFlights);
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='max-w-7xl mx-auto px-4 py-10'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>
            Flight Search Matrix
          </h1>

          <p className='text-slate-300 mt-3'>
            Search and validate flight routes instantly
          </p>
        </div>

        <SearchForm onSearch={handleSearch} />
        <FlightMatrix results={results} />
      </div>
    </div>
  );
};

export default App;
