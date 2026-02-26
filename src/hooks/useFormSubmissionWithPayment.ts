'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';
import { setAccountCreationPending } from '../utils/consultationFlow';
import { recordConsultationPayment, updateFormSubmissionsAfterPayment, getConsultationFee } from '../lib/supabase';

interface UseFormSubmissionWithPaymentReturn {
  showPaymentModal: boolean;
  showNudgeModal: boolean;
  currentEmail: string;
  paymentId: string;
  handleFormSubmit: (email: string, needsPayment: boolean) => void;
  handlePaymentSuccess: (stripePaymentId: string) => Promise<void>;
  handleSkipAccount: () => void;
  closePaymentModal: () => void;
  closeNudgeModal: () => void;
}

/**
 * Hook that manages form submission with payment flow
 */
export function useFormSubmissionWithPayment(): UseFormSubmissionWithPaymentReturn {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = (email: string, needsPayment: boolean) => {
    setCurrentEmail(email);
    
    if (needsPayment) {
      // Show payment modal
      setShowPaymentModal(true);
    } else {
      // Form submitted successfully, no payment needed
      toast({
        title: "Form Submitted Successfully",
        description: "Thank you! Your form has been submitted. We will contact you within 24 hours.",
        duration: 5000,
      });
    }
  };

  const handlePaymentSuccess = async (stripePaymentId: string) => {
    try {
      // Get current consultation fee from database
      const consultationFee = await getConsultationFee();
      
      // Record payment in database
      const payment = await recordConsultationPayment(
        currentEmail,
        stripePaymentId,
        consultationFee,
        null // user_id - null for anonymous
      ) as { id: string };

      // Update all pending forms for this email
      await updateFormSubmissionsAfterPayment(currentEmail);

      // Close payment modal
      setShowPaymentModal(false);

      // Store payment info
      setPaymentId(payment.id);

      // Show account creation nudge
      setShowNudgeModal(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Payment was successful but there was an error. Please contact us.",
        variant: "destructive",
      });
    }
  };

  const handleSkipAccount = () => {
    // Mark that user needs to create account
    setAccountCreationPending(currentEmail, paymentId);
    
    // Close the modal first
    setShowNudgeModal(false);
    
    // Navigate to home page after a short delay
    setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 300); // Small delay to let modal close animation complete
  };

  const closePaymentModal = () => setShowPaymentModal(false);
  const closeNudgeModal = () => setShowNudgeModal(false);

  return {
    showPaymentModal,
    showNudgeModal,
    currentEmail,
    paymentId,
    handleFormSubmit,
    handlePaymentSuccess,
    handleSkipAccount,
    closePaymentModal,
    closeNudgeModal,
  };
}
