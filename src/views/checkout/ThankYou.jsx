import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ThankYou = () => {
  const [sessionId, setSessionId] = useState(null);
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const id = query.get('session_id');
    setSessionId(id);
  }, [query]);

  return (
    <div className="thank-you-page text-center py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Thank you for your order!</h1>
      <p className="text-lg mb-2">We have received your payment successfully.</p>
      {/* {sessionId && (
        <p className="text-sm text-gray-500">
          Session ID: <code>{sessionId}</code>
        </p>
      )} */}
    </div>
  );
};

export default ThankYou;
