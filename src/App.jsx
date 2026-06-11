import { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightMatrix from './components/FlightMatrix';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import { flights as localFlights } from './data/flights';

const API_URL = 'http://localhost:3001/flights';

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSearch = async (form) => {
    setLoading(true);
    setApiError('');

    let data;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API failed');
      data = await response.json();
    } catch {
      setApiError('Could not reach server — showing local data.');
      data = localFlights;
    }

    const filteredFlights = data.filter(
      (flight) =>
        flight.from.toLowerCase().trim() === form.from.toLowerCase().trim() &&
        flight.to.toLowerCase().trim() === form.to.toLowerCase().trim() &&
        flight.date === form.date,
    );

    setResults(filteredFlights);
    setLoading(false);
  };

  return (
    <ErrorBoundary>
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
          {apiError && (
            <div className='mx-auto mt-5 max-w-3xl rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-yellow-200'>
              {apiError}
            </div>
          )}
          {loading ? <Loader /> : <FlightMatrix results={results} />}
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
