import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

export const BuyCreditsForm = () => {
  const {
    data,
    percentComplete,
    activeStep,
    handleBack,
    handleNext,
    isLastStep,
  } = useMultiStep();
  return (
    <>
      {activeStep === 0 && <></>}
      {activeStep === 1 && <PaymentInfoForm />}
      {activeStep === 2 && <RetirementFo />}
    </>
  );
};
