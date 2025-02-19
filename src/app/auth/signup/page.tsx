'use client';

import { useState } from 'react';
import EmailVerification from './components/EmailVerification';
import SignUpForm from './components/SignUpForm';

type SignUpStep = 'verification' | 'form';

export default function SignUpPage() {
  const [step, setStep] = useState<SignUpStep>('verification');
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const handleVerificationComplete = (email: string) => {
    setVerifiedEmail(email);
    setStep('form');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8">
      {step === 'verification' ? (
        <EmailVerification
          onVerificationComplete={handleVerificationComplete}
        />
      ) : (
        <SignUpForm verifiedEmail={verifiedEmail} />
      )}
    </div>
  );
}
