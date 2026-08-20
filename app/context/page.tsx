"use client";

import React, { useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useOnboarding } from "@/app/components/onboardingContext/OnboardingContext";

import {
  FaBuilding,
  FaMagic,
  FaChartBar,
  FaCompass,
  FaStar,
} from "react-icons/fa";

/* ============================================================
   STEPS
============================================================ */

const steps = [
  {
    id: 1,
    title: "Industry",
    subtitle: "Pick your industry",
    icon: <FaBuilding />,
  },
  {
    id: 2,
    title: "Use cases",
    subtitle: "What you'll send",
    icon: <FaMagic />,
  },
  {
    id: 3,
    title: "Scale",
    subtitle: "Team & volume",
    icon: <FaChartBar />,
  },
  {
    id: 4,
    title: "Discovery",
    subtitle: "How you found us",
    icon: <FaCompass />,
  },
  {
    id: 5,
    title: "Context",
    subtitle: "Workspace notes",
    icon: <FaStar />,
  },
];

export default function ContextPage() {
  /*
   * ============================================================
   * ONBOARDING CONTEXT
   *
   * NO LOCAL STORAGE
   *
   * All previous onboarding values come from:
   *
   * Signup
   * Business
   * Industry
   * Use Cases
   * Scale
   * Discovery
   *
   * Context notes are also stored in the same context.
   * ============================================================
   */

  const {
    data,
    setContext,
  } = useOnboarding();

  const [notes, setNotes] = useState(data.context.notes);

  /*
   * ============================================================
   * VALUES FROM ONBOARDING CONTEXT
   * ============================================================
   */

  const userName =
    data.signup.full_name || "";

  const industryTitle =
    data.industry ||
    data.business.industry ||
    "Ecommerce & D2C";

  const useCaseCount =
    data.use_cases.length;

  const teamSizeLabel =
    data.scale.team_size === "solo"
      ? "Just me"
      : data.scale.team_size === "small"
      ? "Small team"
      : data.scale.team_size === "medium"
      ? "Mid-size team"
      : data.scale.team_size === "large"
      ? "Large team"
      : "—";

  /*
   * ============================================================
   * CONTEXT CHANGE
   * ============================================================
   */

  const handleNotesChange = (
    value: string
  ) => {
    setNotes(value);

    setContext({
      notes: value,
    });
  };

  /*
   * ============================================================
   * CONTINUE
   *
   * Context is already in OnboardingContext.
   *
   * Nothing is stored in:
   * - localStorage
   * - database
   * - API
   *
   * The next activation step can read the complete
   * OnboardingContext object.
   * ============================================================
   */

  const handleContinue = () => {
    setContext({
      notes,
    });
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FAFAF8] text-[#111111]">

      <OnboardingHeader />

      {/* Background glow */}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.18] blur-3xl transition-colors duration-[600ms]"
        style={{
          backgroundColor: "#064E3B",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -left-32 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 78, 59, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="relative mx-auto px-5 pb-4 pt-8 sm:px-8 sm:pb-5 sm:pt-10">

        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B85]">
          WELCOME TO SUPERBLOCK
        </p>

        <h1 className="max-w-[720px] text-[28px] font-semibold leading-[1.05] tracking-[-0.028em] text-[#111111] sm:text-[32px]">
          {userName
            ? `Hey ${userName}, `
            : "Hey there, "}

          <span className="font-medium text-[#525252]">
            let's shape your workspace.
          </span>
        </h1>

        <p className="mt-2.5 max-w-[640px] text-[13.5px] leading-[1.55] text-[#525252]">
          Five quick questions — about a minute.
          We'll use them to pick channel defaults,
          suggest templates, and tune the copy across
          the app so it speaks your business's language
          from day one.
        </p>

      </section>

      {/* ======================================================
          MAIN 3-COLUMN LAYOUT
      ====================================================== */}

      <main className="relative mx-auto grid grid-cols-1 gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)_340px]">

        {/* ====================================================
            LEFT — STEPS NAV
        ==================================================== */}

        <aside className="hidden lg:block">

          <nav
            aria-label="Onboarding steps"
            className="sticky top-6"
          >

            <ul className="flex flex-col gap-1.5">

              {steps.map((step, index) => {

                const active =
                  step.id === 5;

                const completed =
                  step.id < 5;

                return (
                  <li key={step.id}>

                    <div
                      className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-all duration-[180ms] ${
                        active
                          ? "border border-[#E8E5DF] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                          : completed
                          ? "cursor-pointer hover:bg-[#F5F4F0]"
                          : "cursor-not-allowed opacity-50"
                      }`}
                    >

                      <span
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] transition-all duration-[200ms] ${
                          completed
                            ? "bg-[#064E3B] text-white"
                            : active
                            ? "bg-[#064E3B] text-white"
                            : "bg-[#F5F4F0] text-[#8E8B85]"
                        }`}
                      >
                        {completed
                          ? "✓"
                          : step.icon}
                      </span>

                      <div className="min-w-0">

                        <p
                          className={`text-[12px] font-semibold leading-tight ${
                            active
                              ? "text-[#111111]"
                              : "text-[#525252]"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="mt-0.5 text-[10.5px] leading-tight text-[#8E8B85]">
                          {step.subtitle}
                        </p>

                      </div>

                    </div>

                    {index < steps.length - 1 && (
                      <div
                        aria-hidden
                        className="my-0.5 ml-[18px] h-1.5 w-px bg-[#E8E5DF]"
                      />
                    )}

                  </li>
                );
              })}

            </ul>

          </nav>

        </aside>

        {/* ====================================================
            CENTER — MAIN CARD
        ==================================================== */}

        <section className="min-w-0">

          <div className="relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white shadow-sm">

            <div
              aria-hidden
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to right, #064E3B, rgba(6, 78, 59, 0.4) 35%, transparent)",
              }}
            />

            <div className="space-y-6 p-6 sm:p-8 lg:p-9">

              {/* Step Header */}

              <div>

                <p className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                  STEP 5 OF 5
                </p>

                <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.022em] text-[#111111]">
                  Anything else we should know?
                </h2>

                <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-[1.5] text-[#525252]">
                  Drop notes to ground AI suggestions —
                  they never leave your workspace.
                </p>

              </div>

              {/* =================================================
                  WORKSPACE NOTES
              ================================================= */}

              <div>

                <p className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                  Workspace notes
                </p>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    handleNotesChange(
                      e.target.value
                    )
                  }
                  placeholder="e.g. We're a 5-person ecommerce brand selling skincare. We need cart recovery, COD confirmations, and a help-desk WhatsApp number."
                  maxLength={2000}
                  rows={7}
                  className="min-h-[160px] w-full resize-none rounded-[8px] border border-[#E8E5DF] bg-white p-3 text-[13.5px] leading-[22px] text-[#111111] outline-none transition-all duration-[180ms] placeholder:text-[#8E8B85] focus:border-[#064E3B] focus:ring-[3px] focus:ring-[#E8F5EE]"
                />

                <p className="mt-1 text-right text-[11px] tabular-nums text-[#8E8B85]">
                  {notes.length}/2000
                </p>

              </div>

              {/* =================================================
                  BOTTOM NAVIGATION
              ================================================= */}
              <OnboardingNavigation
  currentStep={5}
  nextPath="/activation"
  backPath="/discovery"
  continueText="Open my workspace"
  onContinue={async () => {
    try {
      // Save the latest context notes
      setContext({
        notes,
      });

      // Complete onboarding data
      // PASSWORD IS NOT INCLUDED
     const signupData = {
  username: data.signup.username,
  full_name: data.signup.full_name,
  email: data.signup.email,
};;

      const businessData = {
        business_name: data.business.business_name,
        phone: data.business.phone,
        country_code: data.business.country_code,
        industry: data.business.industry,
        website: data.business.website,
        location: data.business.location,
      };

      const onboardingData = {
        industry: data.industry,
        closest_match: data.closest_match,

        use_cases: data.use_cases.slice(0, 5),

        scale: {
          team_size: data.scale.team_size,
          role: data.scale.role,
          message_volume: data.scale.message_volume,
          objectives: data.scale.objectives,
        },

        discovery: {
          discovery: data.discovery.discovery,
          details: data.discovery.details,
        },

        context: {
          notes,
        },
      };

      // Final payload
      const payload = {
        signup: signupData,
        business: businessData,
        onboarding: onboardingData,
      };

      console.log("Signup payload:", payload);

      // Send everything to your existing signup endpoint
      const response = await fetch(
        "https://api.superblock.chat/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Signup failed:", result);

        alert(
          result.message ||
            result.error ||
            "Failed to create account"
        );

        return;
      }

      console.log("Signup successful:", result);

      // Move to activation/workspace
      window.location.href = "/activation";

    } catch (error) {
      console.error("Signup request failed:", error);

      alert(
        "Unable to connect to the signup server."
      );
    }
  }}
/>
              

            </div>

          </div>

        </section>

        {/* ====================================================
            RIGHT — LIVE PREVIEW
        ==================================================== */}

        <aside className="w-full shrink-0 self-start lg:sticky lg:top-6 lg:w-[340px]">

          <div className="overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white p-4 shadow-sm">

            {/* Header */}

            <div className="mb-1 flex items-center justify-between">

              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                LIVE PREVIEW
              </p>

              <div className="inline-flex h-[18px] items-center gap-1 rounded-full bg-[#E8F5EE] px-1.5 text-[10px] font-medium text-[#064E3B]">

                <span className="h-1 w-1 rounded-full bg-[#064E3B]" />

                updates as you answer

              </div>

            </div>

            <p className="mb-3 text-[11px] leading-[1.45] text-[#8E8B85]">
              Your workspace stays calm and neutral —
              these colours are only onboarding guideposts.
              Your preferences can always be changed later.
            </p>

            {/* Mini Dashboard */}

            <div className="overflow-hidden rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8]">

              {/* Browser Bar */}

              <div className="flex h-7 items-center justify-between border-b border-[#E8E5DF] bg-white px-2">

                <div className="flex items-center gap-1">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />

                  <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />

                  <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />

                </div>

                <span className="truncate text-[9px] font-medium text-[#8E8B85]">
                  Superblock for{" "}
                  {industryTitle.toLowerCase()}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />

              </div>

              {/* Dashboard */}

              <div className="flex">

                {/* Sidebar */}

                <div className="flex w-[88px] flex-col gap-[3px] border-r border-[#E8E5DF] bg-white px-1.5 py-2">

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] bg-[#E8F5EE] px-1.5 text-[8.5px] font-semibold text-[#064E3B]">
                    <span>⌂</span>
                    Home
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♢</span>
                    Inbox
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◇</span>
                    Send
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♙</span>
                    Customers
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>⚒</span>
                    Build
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◫</span>
                    Insights
                  </div>

                </div>

                {/* Content */}

                <div className="min-w-0 flex-1 space-y-2 p-2.5">

                  <div>

                    <p className="truncate text-[10.5px] font-semibold leading-tight text-[#111111]">
                      {userName
                        ? `Welcome back, ${userName}`
                        : "Welcome back"}
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-[#8E8B85]">
                      Superblock for{" "}
                      {industryTitle.toLowerCase()}
                    </p>

                  </div>

                  {/* Stat Card */}

                  <div className="rounded-[6px] border border-[#E8E5DF] bg-white p-2">

                    <p className="text-[8px] font-medium uppercase tracking-[0.06em] text-[#8E8B85]">
                      CUSTOMERS REACHED THIS WEEK
                    </p>

                    <div className="mt-1 flex items-baseline gap-1.5">

                      <span className="text-[14px] font-semibold tabular-nums text-[#111111]">
                        1,284
                      </span>

                      <span className="rounded-[3px] bg-[#E8F5EE] px-1 text-[8.5px] font-medium text-[#064E3B]">
                        +12%
                      </span>

                    </div>

                    <div className="mt-2 flex h-[18px] items-end gap-px">

                      {[5, 9, 6, 11, 8, 12, 14, 10, 13, 15].map(
                        (h, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded-[2px] ${
                              i === 9
                                ? "bg-[#064E3B]"
                                : "bg-[#8E8B85]/30"
                            }`}
                            style={{
                              height: `${(h / 15) * 100}%`,
                            }}
                          />
                        )
                      )}

                    </div>

                  </div>

                  {/* Suggested Card */}

                  <div className="flex items-center gap-2 rounded-[6px] border border-[#064E3B]/15 bg-[#E8F5EE] p-2">

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#064E3B] text-[10px] text-white">
                      ✦
                    </span>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-[9.5px] font-semibold leading-tight text-[#111111]">
                        Suggested: Abandoned-cart reco...
                      </p>

                      <p className="mt-0.5 truncate text-[8.5px] text-[#8E8B85]">
                        Tap to scaffold a flow for contacts.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Engagement Tools */}

            <div className="mt-3 rounded-[6px] border border-[#E8E5DF] bg-[#FAFAF8] p-2.5">

              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#525252]">
                ✦ Engagement tools unlocked
              </p>

              <ul className="space-y-[3px]">

                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Automation studio
                </li>

                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Offers
                </li>

                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Onboarding sequences
                </li>

              </ul>

            </div>

            {/* Preview Specs */}

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">

              <PreviewSpec
                label="INDUSTRY"
                value={industryTitle}
              />

              <PreviewSpec
                label="TONE"
                value={`Superblock for ${industryTitle.toLowerCase()}`}
              />

              <PreviewSpec
                label="CONTACTS CALLED"
                value="Customers"
              />

              <PreviewSpec
                label="AUDIENCE AS"
                value="Customers"
              />

              <PreviewSpec
                label="USE CASES"
                value={`${useCaseCount} picked`}
              />

              <PreviewSpec
                label="TEAM"
                value={teamSizeLabel}
              />

            </dl>

            <p className="mt-3 text-[10.5px] leading-[1.5] text-[#8E8B85]">
              Everything is editable in{" "}
              <span className="font-medium text-[#525252]">
                Settings → Preferences
              </span>{" "}
              any time.
            </p>

          </div>

        </aside>

      </main>

    </div>
  );
}

function PreviewSpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">

      <dt className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#8E8B85]">
        {label}
      </dt>

      <dd className="mt-0.5 truncate text-[11.5px] font-medium text-[#111111]">
        {value}
      </dd>

    </div>
  );
}