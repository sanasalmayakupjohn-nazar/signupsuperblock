"use client";

import { useRouter } from "next/navigation";

type OnboardingNavigationProps = {
  currentStep: number;
  nextPath: string;
  backPath?: string;
  onContinue?: () => void;
  continueText?: string;
};

export default function OnboardingNavigation({
  currentStep,
  nextPath,
  backPath,
  onContinue,
  continueText = "Continue",
}: OnboardingNavigationProps) {
  const router = useRouter();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    router.push(nextPath);
  };

  const handleBack = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <div className="mt-9 flex items-center justify-between gap-3 border-t border-[#E8E5DF] pt-5">
      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={handleBack}
        disabled={currentStep === 1 && !backPath}
        className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-[#E8E5DF] bg-white px-3 text-[13px] font-medium text-[#111111] transition-colors hover:border-[#D1CDC5] hover:bg-[#F5F4F0] disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="text-[12px]">←</span>
        Back
      </button>

      {/* STEP NUMBER */}
      <span className="hidden text-[11px] font-medium tabular-nums text-[#8E8B85] sm:block">
        Step {currentStep} of 5
      </span>

      {/* CONTINUE BUTTON */}
      <button
        type="button"
        onClick={handleContinue}
        className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-[#064E3B] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-[#053C2D] disabled:pointer-events-none disabled:opacity-40"
      >
        {continueText}
        <span className="text-[12px]">→</span>
      </button>
    </div>
  );
}
