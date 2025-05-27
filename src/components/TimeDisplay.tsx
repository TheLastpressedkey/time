import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Globe, RefreshCw } from 'lucide-react';

interface TimeData {
  date: string;
  time: string;
  iso: string;
  timestamp: number;
  timezone: string;
  timezoneOffset: number;
}

interface ApiResponse {
  success: boolean;
  data?: TimeData;
  error?: string;
  message?: string;
}

const TimeDisplay: React.FC = () => {
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTime = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/time');
      const data: ApiResponse = await response.json();
      
      if (data.success && data.data) {
        setTimeData(data.data);
      } else {
        setError(data.message || 'Failed to fetch time data');
      }
    } catch (err) {
      setError('Failed to connect to the API server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTime();
    
    // Refresh time every minute
    const intervalId = setInterval(fetchTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Current Time & Date</h2>
        <button 
          onClick={fetchTime}
          className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
          aria-label="Refresh time"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      {loading && !timeData && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {timeData && (
        <div className="space-y-5 transition-all duration-300 ease-in-out">
          <div className="flex items-start space-x-3">
            <Clock className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Time</h3>
              <p className="text-xl font-semibold text-gray-800">{timeData.time}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Calendar className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Date</h3>
              <p className="text-xl font-semibold text-gray-800">{timeData.date}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Globe className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Timezone</h3>
              <p className="text-xl font-semibold text-gray-800">{timeData.timezone}</p>
              <p className="text-sm text-gray-600">
                GMT {timeData.timezoneOffset > 0 ? '-' : '+'}{Math.abs(timeData.timezoneOffset / 60)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">ISO Format</h3>
            <p className="text-sm font-mono bg-gray-50 p-2 rounded overflow-x-auto">
              {timeData.iso}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeDisplay;