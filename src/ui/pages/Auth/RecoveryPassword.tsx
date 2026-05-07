import { useState } from "react";
import { useNavigate } from "react-router";
import { User, ShieldCheck, Lock } from "lucide-react";
import RequestPassword from "./forms/RequestPassword";
import OtpValidator from "./forms/OtpValidator";
import NewPassword from "./forms/NewPassword";
import Stepper from "../../components/decorative/Stepper";

function RecoveryPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const backStep = () => setStep(step - 1);
  const redirectLogin = () => navigate("/auth");

  const steps = [
    { id: 1, label: "IDENTIFICACIÓN", icon: User },
    { id: 2, label: "VERIFICACIÓN", icon: ShieldCheck },
    { id: 3, label: "NUEVA CONTRASEÑA", icon: Lock },
  ];

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <Stepper steps={steps} currentStep={step}/>

      <div className="bg-surface-container-low pt-8 px-8 pb-6 rounded-xl drop-shadow-2xl border border-white/5">
        {step === 1 && <RequestPassword onSuccess={nextStep} onBack={redirectLogin} />}
        {step === 2 && <OtpValidator onSuccess={nextStep} onBack={backStep} />}
        {step === 3 && <NewPassword onSuccess={redirectLogin} />}
      </div>
    </div>
  );
}

export default RecoveryPassword;