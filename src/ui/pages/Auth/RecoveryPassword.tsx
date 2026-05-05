import { useState } from "react";
import { useNavigate } from "react-router";
import RequestPassword from "./forms/RequestPassword";
import OtpValidator from "./forms/OtpValidator";
import NewPassword from "./forms/NewPassword";

function RecoveryPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const redirectLogin = () => navigate("/auth");

  return (
    <div>
      {step === 1 && <RequestPassword onSuccess={nextStep} />}
      {step === 2 && <OtpValidator onSuccess={nextStep} />}
      {step === 3 && <NewPassword onSuccess={redirectLogin} />}
    </div>
  );
}

export default RecoveryPassword
