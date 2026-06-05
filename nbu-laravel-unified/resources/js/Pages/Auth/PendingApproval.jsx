import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function PendingApproval() {
    return (
        <GuestLayout>
            <Head title="Clinical Approval Pending" />

            <div className="text-center p-6 space-y-6">
                {/* Visual indicator / shield icon */}
                <div className="flex justify-center">
                    <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 animate-pulse border border-amber-500/20">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Awaiting Activation
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Registration is successful! However, to protect neonatal clinical safety, your account must be activated by the **Nursing In-Charge** before you can log in.
                    </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-left border border-gray-100 dark:border-gray-700 space-y-3">
                    <h3 className="font-semibold text-xs text-gray-400 uppercase tracking-wider">
                        Next Steps for Clinical Verification:
                    </h3>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                        <li>Ensure your Hospital Staff ID is verified against the human resources database.</li>
                        <li>Ask your ward's Nursing In-Charge to activate your account via their NeoDesk portal.</li>
                        <li>If you are a student, consult your clinical supervisor for department access.</li>
                    </ul>
                </div>

                <div className="flex justify-center gap-4">
                    <Link
                        href={route('login')}
                        className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-sm transition"
                    >
                        Back to Login
                    </Link>
                </div>

                <div className="text-xs text-gray-500">
                    Need urgent access? Contact ICT / IT Support or Ward Management.
                </div>
            </div>
        </GuestLayout>
    );
}
