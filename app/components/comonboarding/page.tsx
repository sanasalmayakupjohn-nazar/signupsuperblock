"use client";

import { useRouter } from "next/navigation";

type OnboardingNavigationProps = {
  currentStep: number;
  nextPath: string;
  backPath?: string;
  onContinue?: () => void;
};

export default function OnboardingNavigation({
  currentStep,
  nextPath,
  backPath,
  onContinue,
}: OnboardingNavigationProps) {
  const router = useRouter();

  /* ============================================================
     CONTINUE
  ============================================================ */

  const handleContinue = () => {
    // Save page data if the current page provides a function
    if (onContinue) {
      onContinue();
    }

    // Navigate to next onboarding page
    router.push(nextPath);
  };

  /* ============================================================
     BACK
  ============================================================ */

  const handleBack = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <div className="relative flex items-center justify-between border-t border-[#E5E2DD] px-[42px] py-5">

      {/* ========================================================
          BACK BUTTON
      ======================================================== */}

      <button
        type="button"
        onClick={handleBack}
        className="rounded-[8px] border border-[#E1DED9] bg-white px-4 py-2.5 text-[14px] font-medium text-[#333333] transition hover:bg-[#F8F7F5]"
      >
        ← Back
      </button>

      {/* ========================================================
          STEP NUMBER
      ======================================================== */}

      <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#99958F]">
        Step {currentStep} of 5
      </span>

      {/* ========================================================
          CONTINUE BUTTON
      ======================================================== */}

      <button
        type="button"
        onClick={handleContinue}
        className="rounded-[8px] bg-[#075B48] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#064D3E]"
      >
        Continue →
      </button>

    </div>
  );
}