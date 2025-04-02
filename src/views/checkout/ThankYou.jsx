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
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank You for Your Order!</h1>
      <p className="mb-2">Your payment was successful.</p>
      {sessionId && (
        <p className="text-sm text-gray-500">
          Session ID: <code>{sessionId}</code>
        </p>
      )}
    </div>
  );
};

export default ThankYou;
