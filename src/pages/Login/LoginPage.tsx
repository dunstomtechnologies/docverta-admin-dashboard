import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Activity, ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid administrator email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['super_admin', 'admin', 'auditor']),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@docverta.com',
      password: 'password123',
      role: 'super_admin',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data.email, data.role as 'super_admin' | 'admin');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-[#0B132B] p-8 border border-white/10 shadow-2xl text-white">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Docverta Admin</h2>
          <p className="mt-1 text-xs text-slate-400">
            Secure Healthcare Administration & Clinical Operations
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 flex items-start gap-2.5 text-xs text-blue-300">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-blue-400" />
          <span>
            Authorized Docverta medical personnel only. All access attempts are audited and logged.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="admin@docverta.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-rose-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                {...register('password')}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-[11px] text-rose-400">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Select Role Level
            </label>
            <select
              {...register('role')}
              className="w-full rounded-xl border border-white/10 bg-[#111A3A] py-2.5 px-3 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              <option value="super_admin">Super Administrator (Full Privileges)</option>
              <option value="admin">Clinical Operations Admin</option>
              <option value="auditor">Compliance Auditor (Read-only)</option>
            </select>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign In to Admin Portal
            </Button>
          </div>
        </form>

        <div className="text-center text-[11px] text-slate-500">
          Protected by Docverta Clinical Access Control Protocol
        </div>
      </div>
    </div>
  );
};
