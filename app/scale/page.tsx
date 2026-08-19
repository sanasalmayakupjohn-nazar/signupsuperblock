"use client";

import { useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useOnboarding } from "@/app/onboardingContext/page";

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

/* ============================================================
   TEAM SIZES
============================================================ */

const teamSizes = [
  {
    id: "solo",
    label: "Just me",
    range: "1",
  },
  {
    id: "small",
    label: "Small team",
    range: "2–5",
  },
  {
    id: "medium",
    label: "Mid-size team",
    range: "6–20",
  },
  {
    id: "large",
    label: "Large team",
    range: "20+",
  },
];

/* ============================================================
   ROLES
============================================================ */

const roles = [
  "Founder / CEO",
  "Marketing",
  "Sales",
  "Customer support",
  "Operations",
  "Developer / IT",
  "Agency / Consultant",
  "Other",
];

/* ============================================================
   OBJECTIVES
============================================================ */

const objectives = [
  "Increase revenue",
  "Boost engagement",
  "Automate operations",
  "Scale support",
  "Grow community",
  "Generate leads",
  "Brand awareness",
  "Faster responses",
];

/* ============================================================
   PAGE
============================================================ */

export default function ScalePage() {
  const { data, setScale } = useOnboarding();

  /* ==========================================================
     CONTEXT DATA
  ========================================================== */

  const userName = data.signup.full_name;

  const industryTitle =
    data.industry ||
    data.business.industry ||
    "Ecommerce & D2C";

  /* ==========================================================
     TEAM SIZE
  ========================================================== */

  const [teamSize, setTeamSize] = useState(
    data.scale.team_size || "small"
  );

  /* ==========================================================
     ROLE
  ========================================================== */

  const [role, setRole] = useState(
    data.scale.role || ""
  );

  /* ==========================================================
     MESSAGE VOLUME
  ========================================================== */

  const initialSlider = (() => {
    const volume = data.scale.message_volume;

    if (!volume || volume < 1000) return 10;
    if (volume < 10000) return 33;
    if (volume < 100000) return 66;

    return 90;
  })();

  const [volumeSlider, setVolumeSlider] =
    useState(initialSlider);

  /* ==========================================================
     OBJECTIVES

     IMPORTANT:
     Context uses:
       objectives: string[]

     So do NOT use data.scale.objective.
     ========================================================== */

  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    data.scale.objectives || []
  );

  /* ==========================================================
     VOLUME INFORMATION
  ========================================================== */

  const getVolumeInfo = () => {
    if (volumeSlider <= 16) {
      return {
        label: "< 1K",
        desc: "Getting started",
        value: 500,
      };
    }

    if (volumeSlider <= 49) {
      return {
        label: "1K–10K",
        desc: "Growing",
        value: 5000,
      };
    }

    if (volumeSlider <= 82) {
      return {
        label: "10K–100K",
        desc: "Scaling",
        value: 50000,
      };
    }

    return {
      label: "100K+",
      desc: "Enterprise",
      value: 100000,
    };
  };

  const volumeInfo = getVolumeInfo();

  /* ==========================================================
     TOGGLE OBJECTIVE
  ========================================================== */

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  /* ==========================================================
     TEAM LABEL
  ========================================================== */

  const getTeamLabel = () => {
    const match = teamSizes.find(
      (item) => item.id === teamSize
    );

    return match ? match.label : "—";
  };

  /* ==========================================================
     CONTINUE
  ========================================================== */

  const handleContinue = () => {
    setScale({
      team_size: teamSize,
      role,
      message_volume: volumeInfo.value,
      objectives: selectedGoals,
    });
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FAFAF8] text-[#111111]">
      <OnboardingHeader />

      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#064E3B] opacity-[0.18] blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -left-32 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 78, 59, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <section className="relative mx-auto px-5 pb-4 pt-8 sm:px-8 sm:pb-5 sm:pt-10">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B85]">
          WELCOME TO SUPERBLOCK
        </p>

        <h1 className="max-w-[720px] text-[28px] font-semibold leading-[1.05] tracking-[-0.028em] text-[#111111] sm:text-[32px]">
          {userName ? `Hey ${userName}, ` : "Hey there, "}
          <span className="font-medium text-[#525252]">
            let's shape your workspace.
          </span>
        </h1>

        <p className="mt-2.5 max-w-[640px] text-[13.5px] leading-[1.55] text-[#525252]">
          Five quick questions — about a minute. We'll use them
          to pick channel defaults, suggest templates, and tune
          the copy across the app so it speaks your business's
          language from day one.
        </p>
      </section>

      {/* ====================================================
          MAIN LAYOUT
      ==================================================== */}

      <main className="relative mx-auto grid grid-cols-1 gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)_340px]">

        {/* ==================================================
            LEFT — STEPS
        ================================================== */}

        <aside className="hidden lg:block">
          <nav
            aria-label="Onboarding steps"
            className="sticky top-6"
          >
            <ul className="flex flex-col gap-1.5">
              {steps.map((step, index) => {
                const active = step.id === 3;
                const completed = step.id < 3;

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
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${
                          completed || active
                            ? "bg-[#064E3B] text-white"
                            : "bg-[#F5F4F0] text-[#8E8B85]"
                        }`}
                      >
                        {completed ? "✓" : step.icon}
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

        {/* ==================================================
            CENTER — MAIN CARD
        ================================================== */}

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

            <div className="space-y-7 p-6 sm:p-8 lg:p-9">

              {/* STEP HEADER */}

              <div>
                <p className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                  STEP 3 OF 5
                </p>

                <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.022em] text-[#111111]">
                  Tell us about your scale
                </h2>

                <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-[1.5] text-[#525252]">
                  This shapes recommended plans, channel defaults,
                  and the speed of your starter automations.
                </p>
              </div>

              {/* =================================================
                  TEAM SIZE
              ================================================= */}

              <div>
                <p className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                  Team size
                </p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {teamSizes.map((item) => {
                    const isSelected =
                      teamSize === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setTeamSize(item.id)
                        }
                        className="rounded-[8px] border bg-white px-3 py-2.5 text-left transition-all duration-[140ms]"
                        style={{
                          borderColor: isSelected
                            ? "#064E3B"
                            : "#E8E5DF",
                          boxShadow: isSelected
                            ? "0 0 0 2px rgba(6, 78, 59, 0.15)"
                            : undefined,
                        }}
                      >
                        <p
                          className="text-[13px] font-semibold"
                          style={{
                            color: isSelected
                              ? "#064E3B"
                              : "#111111",
                          }}
                        >
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-[11px] tabular-nums text-[#8E8B85]">
                          {item.range}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  ROLE
              ================================================= */}

              <div>
                <p className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                  Your role
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {roles.map((item) => {
                    const isSelected = role === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setRole(
                            isSelected ? "" : item
                          )
                        }
                        className="h-8 rounded-full border px-3 text-[12.5px] font-medium transition-colors duration-[140ms]"
                        style={{
                          backgroundColor: isSelected
                            ? "#064E3B"
                            : "white",
                          color: isSelected
                            ? "#FFFFFF"
                            : "#525252",
                          borderColor: isSelected
                            ? "#064E3B"
                            : "#E8E5DF",
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  MESSAGE VOLUME
              ================================================= */}

              <div>
                <p className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                  Monthly message volume
                </p>

                <div className="rounded-[8px] border border-[#E8E5DF] bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[15px] font-semibold tabular-nums text-[#111111]">
                      {volumeInfo.label}
                    </span>

                    <span className="inline-flex h-[20px] items-center gap-1 rounded-full bg-[#E8F5EE] px-2 text-[10.5px] font-medium text-[#064E3B]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#064E3B]" />
                      {volumeInfo.desc}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={volumeSlider}
                    onChange={(e) =>
                      setVolumeSlider(
                        Number(e.target.value)
                      )
                    }
                    className="w-full cursor-pointer accent-[#064E3B]"
                  />

                  <div className="mt-2 flex justify-between text-[10px] font-medium text-[#8E8B85]">
                    <span>&lt; 1K</span>
                    <span>1K–10K</span>
                    <span>10K–100K</span>
                    <span>100K+</span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  OBJECTIVES
              ================================================= */}

              <div>
                <p className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                  Primary objectives{" "}
                  <span className="ml-1.5 text-[10px] font-medium normal-case text-[#8E8B85]/70">
                    (optional)
                  </span>
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {objectives.map((item) => {
                    const isSelected =
                      selectedGoals.includes(item);

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          toggleGoal(item)
                        }
                        className="inline-flex h-8 items-center gap-1 rounded-full border px-3 text-[12.5px] font-medium transition-colors duration-[140ms]"
                        style={{
                          backgroundColor: isSelected
                            ? "#064E3B"
                            : "white",
                          color: isSelected
                            ? "#FFFFFF"
                            : "#525252",
                          borderColor: isSelected
                            ? "#064E3B"
                            : "#E8E5DF",
                        }}
                      >
                        {isSelected && (
                          <span className="text-[10px] font-bold">
                            ✓
                          </span>
                        )}

                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  NAVIGATION
              ================================================= */}

              <OnboardingNavigation
                currentStep={3}
                nextPath="/discovery"
                backPath="/usecases"
                onContinue={handleContinue}
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            RIGHT — LIVE PREVIEW
        ================================================== */}

        <aside className="w-full shrink-0 self-start lg:sticky lg:top-6 lg:w-[340px]">
          <div className="overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white p-4 shadow-sm">

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
              Your workspace stays calm and neutral — your scale
              helps Superblock recommend the right setup for your
              business.
            </p>

            {/* MINI DASHBOARD */}

            <div className="overflow-hidden rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8]">

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

              <div className="flex">

                {/* SIDEBAR */}

                <div className="flex w-[88px] flex-col gap-[3px] border-r border-[#E8E5DF] bg-white px-1.5 py-2">
                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] bg-[#E8F5EE] px-1.5 text-[8.5px] font-semibold text-[#064E3B]">
                    <span>⌂</span> Home
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♢</span> Inbox
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◇</span> Send
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♙</span> Customers
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>⚒</span> Build
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◫</span> Insights
                  </div>
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1 space-y-2 p-2.5">

                  <div>
                    <p className="truncate text-[10.5px] font-semibold leading-tight text-[#111111]">
                      {userName
                        ? `Welcome back, ${userName}`
                        : "Welcome back"}
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-[#8E8B85]">
                      Your workspace at a glance
                    </p>
                  </div>

                  {/* STAT */}

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

                  {/* SUGGESTED */}

                  <div className="flex items-center gap-2 rounded-[6px] border border-[#064E3B]/15 bg-[#E8F5EE] p-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#064E3B] text-[10px] text-white">
                      ✦
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[9.5px] font-semibold leading-tight text-[#111111]">
                        Suggested: Abandoned-cart reco...
                      </p>

                      <p className="mt-0.5 truncate text-[8.5px] text-[#8E8B85]">
                        {getTeamLabel()} ·{" "}
                        {volumeInfo.label} monthly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PREVIEW SPECS */}

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
                value="Audience"
              />

              <PreviewSpec
                label="VOLUME"
                value={volumeInfo.label}
              />

              <PreviewSpec
                label="TEAM"
                value={getTeamLabel()}
              />

              <PreviewSpec
                label="OBJECTIVES"
                value={`${selectedGoals.length} picked`}
              />

              {role && (
                <PreviewSpec
                  label="ROLE"
                  value={role}
                />
              )}
            </dl>

            {/* FOOTNOTE */}

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

/* ============================================================
   PREVIEW SPEC
============================================================ */

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