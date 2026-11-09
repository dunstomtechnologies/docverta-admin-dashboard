import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4 shadow-sm">
        <ShieldX className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Access Denied (403)</h2>
      <p className="mt-2 max-w-md text-xs text-slate-600 leading-relaxed">
        Your administrator role does not possess permissions to view or modify this healthcare module. Please contact the Super Administrator.
      </p>
      <div className="mt-6">
        <Button
          variant="primary"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
