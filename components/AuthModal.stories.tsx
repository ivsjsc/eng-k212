import React from 'react';
import AuthModal from './AuthModal';

// Simple component demo/test file - can be used for manual testing
const AuthModalDemo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">AuthModal Demo</h2>
      <button 
        onClick={() => setOpen(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Open Auth Modal
      </button>
      
      <AuthModal 
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (data) => {
          console.log('Demo submit:', data);
          alert(`Demo login: ${data.email}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AuthModalDemo;