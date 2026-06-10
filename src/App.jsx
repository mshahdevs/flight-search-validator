import { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightMatrix from './components/FlightMatrix';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSearch = async (form) => {
    try {
      setLoading(true);
      setApiError('');

      const response = await fetch('http://localhost:3001/flights');

      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();

      const filteredFlights = data.filter(
        (flight) =>
          flight.from.toLowerCase().trim() === form.from.toLowerCase().trim() &&
          flight.to.toLowerCase().trim() === form.to.toLowerCase().trim() &&
          flight.date === form.date,
      );

      setResults(filteredFlights);
    } catch (error) {
      setApiError('Backend API is currently unavailable.');
      setResults([]);
    } finally {
      setLoading(false);
    }
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
            <div className='mx-auto mt-5 max-w-3xl rounded-xl border border-red-500/40 bg-red-500/20 p-4 text-red-200'>
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
