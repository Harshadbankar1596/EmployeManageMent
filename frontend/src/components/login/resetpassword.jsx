// import React, { useState } from "react";
// import { useResetpasswordMutation, useSendotpMutation, useVerifyotpMutation } from "../../redux/apislice";
// import { UploadJobFail, Successmodal } from "../modals/modal"
// const Resetpassword = () => {
//   const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");

//   const [sendotp , {isLoading : loadingotp}] = useSendotpMutation();
//   const [verifyotp , {isLoading : loadingveryfy}] = useVerifyotpMutation();
//   const [resetpassword , {isLoading : loadingpassword}] = useResetpasswordMutation();


//   const [modalOpen, setModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   async function handlesendotp() {
//     try {
//       const res = await sendotp(email).unwrap();
//       if (res.success) {
//         setSuccessMessage("OTP sent to your email!");
//         setModalOpen(true);
//         setTimeout(() => { setModalOpen(false); }, 2000);
//         setStep(2);
//       } else {
//         setErrorMessage(res.message);
//         setModalOpen(true);
//         setTimeout(() => { setModalOpen(false); }, 2000);
//       }
//     } catch (err) {
//       setErrorMessage("Error sending OTP");
//       setModalOpen(true);
//       setTimeout(() => { setModalOpen(false); }, 2000);
//     }
//   }

//   async function handleverifyotp() {
//     try {
//       const res = await verifyotp({ email, otp }).unwrap();
//       if (res.success) {
//         setSuccessMessage(res.message);
//         setModalOpen(true);
//         setTimeout(() => { setModalOpen(false); }, 2000);
//         setStep(3);
//       } else {
//         setErrorMessage(res.message);
//         setModalOpen(true);
//         setTimeout(() => { setModalOpen(false); }, 2000);
//       }
//     } catch (err) {
//       setErrorMessage("Error verifying OTP");
//       setModalOpen(true);
//       setTimeout(() => { setModalOpen(false); }, 2000);
//     }
//   }

//   async function handleresetpassword() {
//     try {
//       const res = await resetpassword({ email, password }).unwrap();
//       console.log(res);
//       setSuccessMessage(res.message);
//       setModalOpen(true);
//       setTimeout(() => { setModalOpen(false); }, 2000);
//       if (res.message === "Password Reset Done") {
//         setStep(1);
//         setEmail("");
//         setOtp("");
//         setPassword("");
//       }
//     } catch (err) {
//       console.log(err);
//       setErrorMessage(err?.data?.message ||"Error resetting password");
//       setModalOpen(true);
//       setTimeout(() => { setModalOpen(false); }, 2000);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white">
//       {modalOpen && successMessage && <Successmodal successMessage={successMessage} onClose={() => setModalOpen(false)} />}
//       {modalOpen && errorMessage && <UploadJobFail errorMessage={errorMessage} onClose={() => setModalOpen(false)} />}
//       <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

//       {step === 1 && (
//         <div>
//           <input
//             type="email"
//             className="w-full border p-2 mb-4"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handlesendotp} className={`w-full bg-blue-500 text-white py-2 rounded ${loadingotp ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loadingotp}>
//             {loadingotp ? "Sending..." : "Send OTP"}
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div>
//           <input
//             type="text"
//             className="w-full border p-2 mb-4"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button onClick={handleverifyotp} className={`w-full bg-green-500 text-white py-2 rounded ${loadingveryfy ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loadingveryfy}>
//             {loadingveryfy ? "Verifying..." : "Verify OTP"}
//           </button>
//         </div>
//       )}

//       {step === 3 && (
//         <div>
//           <input
//             type="password"
//             className="w-full border p-2 mb-4"
//             placeholder="Enter New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleresetpassword} className={`w-full bg-purple-500 text-white py-2 rounded ${loadingpassword ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loadingpassword}>
//             {loadingpassword ? "Resetting..." : "Reset Password"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Resetpassword;



import React, { useState } from "react";
import { Mail, Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useResetpasswordMutation, useSendotpMutation, useVerifyotpMutation } from "../../redux/apislice";
import { UploadJobFail, Successmodal } from "../modals/modal";

const Resetpassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // RTK Query
  const [sendotp, { isLoading: loadingotp }] = useSendotpMutation();
  const [verifyotp, { isLoading: loadingveryfy }] = useVerifyotpMutation();
  const [resetpassword, { isLoading: loadingpassword }] = useResetpasswordMutation();

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // --- Handlers ---
  async function handlesendotp() {
    try {
      const res = await sendotp(email).unwrap();
      if (res.success) {
        setSuccessMessage("OTP sent to your email!");
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
        setStep(2);
      } else {
        setErrorMessage(res.message);
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
      }
    } catch {
      setErrorMessage("Error sending OTP");
      setModalOpen(true);
      setTimeout(() => { setModalOpen(false); }, 2000);
    }
  }

  async function handleverifyotp() {
    try {
      const res = await verifyotp({ email, otp }).unwrap();
      if (res.success) {
        setSuccessMessage(res.message);
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
        setStep(3);
      } else {
        setErrorMessage(res.message);
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
      }
    } catch {
      setErrorMessage("Error verifying OTP");
      setModalOpen(true);
      setTimeout(() => { setModalOpen(false); }, 2000);
    }
  }

  async function handleresetpassword() {
    try {
      const res = await resetpassword({ email, password }).unwrap();
      if (res.message === "Password Reset Done") {
        setSuccessMessage("Password reset successfully! You can login now.");
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
        setStep(1);
        setEmail("");
        setOtp("");
        setPassword("");
      } else {
        setErrorMessage(res.message);
        setModalOpen(true);
        setTimeout(() => { setModalOpen(false); }, 2000);
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "Error resetting password");
      setModalOpen(true);
      setTimeout(() => { setModalOpen(false); }, 2000);
    }
  }

  // Step Icons
  const getStepIcon = (stepNum) => {
    if (stepNum === 1) return Mail;
    if (stepNum === 2) return Shield;
    return Lock;
  };
  const StepIcon = getStepIcon(step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Modals */}
      {modalOpen && successMessage && (
        <Successmodal successMessage={successMessage} onClose={() => { setModalOpen(false); setSuccessMessage(""); }} />
      )}
      {modalOpen && errorMessage && (
        <UploadJobFail errorMessage={errorMessage} onClose={() => { setModalOpen(false); setErrorMessage(""); }} />
      )}

      <div className="max-w-md w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    stepNum < step
                      ? "bg-green-500 text-white"
                      : stepNum === step
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum < step ? "✓" : stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      stepNum < step ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Email</span>
            <span>Verify</span>
            <span>Reset</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <StepIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600">
              {step === 1 && "Enter your email to receive a verification code"}
              {step === 2 && "Check your email and enter the OTP code"}
              {step === 3 && "Create your new secure password"}
            </p>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={handlesendotp}
                disabled={loadingotp}
                className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  loadingotp ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loadingotp ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="relative">
                <Shield className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-center tracking-widest focus:ring-2 focus:ring-green-500 bg-white/50"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button
                onClick={handleverifyotp}
                disabled={loadingveryfy}
                className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  loadingveryfy ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loadingveryfy ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 bg-white/50"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              <button
                onClick={handleresetpassword}
                disabled={loadingpassword}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  loadingpassword ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loadingpassword ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}

          {/* Back button */}
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="w-full mt-4 text-gray-600 hover:text-gray-800 text-sm">
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
