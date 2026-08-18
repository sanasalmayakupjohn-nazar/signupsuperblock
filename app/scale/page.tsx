"use client";

import { useState, useEffect } from "react";
import OnboardingHeader from "../components/tempHeader";
import OnboardingNavigation from "../components/comonboarding/page";

import {
  FaBuilding,
  FaMagic,
  FaChartBar,
  FaCompass,
  FaStar,
} from "react-icons/fa";

/* ============================================================
   ONBOARDING STEPS
============================================================ */

const steps = [
  {
    title: "Industry",
    subtitle: "Pick your industry",
    icon: <FaBuilding />,
  },
  {
    title: "Use cases",
    subtitle: "What you'll send",
    icon: <FaMagic />,
  },
  {
    title: "Scale",
    subtitle: "Team & volume",
    icon: <FaChartBar />,
  },
  {
    title: "Discovery",
    subtitle: "How you found us",
    icon: <FaCompass />,
  },
  {
    title: "Context",
    subtitle: "Notes & docs",
    icon: <FaStar />,
  },
];

/* ============================================================
   TEAM SIZE
============================================================ */

const teamSizes = [
  {
    label: "Just me",
    value: "solo",
    desc: "1",
    letter: "1",
    bg: "bg-[#F0E8FF]",
    text: "text-[#7C3AED]",
  },
  {
    label: "Small team",
    value: "small",
    desc: "2–5",
    letter: "S",
    bg: "bg-[#E5F5FC]",
    text: "text-[#009FE3]",
  },
  {
    label: "Mid-size team",
    value: "mid",
    desc: "6–20",
    letter: "M",
    bg: "bg-[#FFF1DC]",
    text: "text-[#E98A00]",
  },
  {
    label: "Large team",
    value: "large",
    desc: "20+",
    letter: "L",
    bg: "bg-[#DDF7EE]",
    text: "text-[#10B981]",
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
  const [teamSize, setTeamSize] = useState("small");
  const [role, setRole] = useState("");
  const [messageVolume, setMessageVolume] = useState(1000);
  const [objective, setObjective] = useState("");
  const [userName, setUserName] = useState("");

  /* ==========================================================
     LOAD SAVED DATA
  ========================================================== */

  useEffect(() => {
    /* ---------------- USER ---------------- */

    const savedUser = localStorage.getItem("signup_user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user?.full_name) {
          setUserName(user.full_name);
        }
      } catch (error) {
        console.error("Failed to read signup user:", error);
      }
    }

    /* ---------------- SCALE ---------------- */

    const savedScale = localStorage.getItem("onboarding_scale");

    if (savedScale) {
      try {
        const scale = JSON.parse(savedScale);

        if (scale?.team_size) {
          setTeamSize(scale.team_size);
        }

        if (scale?.role) {
          setRole(scale.role);
        }

        if (typeof scale?.message_volume === "number") {
          setMessageVolume(scale.message_volume);
        }

        if (scale?.objective) {
          setObjective(scale.objective);
        }
      } catch (error) {
        console.error("Failed to read scale data:", error);
      }
    }
  }, []);

  /* ==========================================================
     CONTINUE
     
     IMPORTANT:
     Navigation is handled by OnboardingNavigation.
     This function ONLY saves the Scale data.
  ========================================================== */

  const handleContinue = () => {
    const scaleData = {
      team_size: teamSize,
      role,
      message_volume: messageVolume,
      objective,
    };

    localStorage.setItem(
      "onboarding_scale",
      JSON.stringify(scaleData)
    );
  };

  /* ==========================================================
     MESSAGE VOLUME LABEL
  ========================================================== */

  const getVolumeLabel = () => {
    if (messageVolume < 10000) {
      return "1K–10K";
    }

    if (messageVolume < 100000) {
      return "10K–100K";
    }

    return "100K+";
  };

  /* ==========================================================
     TEAM LABEL
  ========================================================== */

  const getTeamLabel = () => {
    const selected = teamSizes.find(
      (item) => item.value === teamSize
    );

    return selected?.label || "—";
  };

  /* ==========================================================
     PLAN RANGE
  ========================================================== */

  const getPlanRange = () => {
    if (messageVolume < 10000) {
      return "Starter";
    }

    if (messageVolume < 100000) {
      return "Growth";
    }

    return "Scale";
  };

  return (
    <>
      <OnboardingHeader />

      <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="px-0 pt-[10px]">

          <p className="text-[12px] font-medium tracking-[1.5px] text-[#77736D]">
            WELCOME TO SUPERBLOCK
          </p>

          <h1 className="mt-4 text-[40px] font-semibold leading-[46px] tracking-[-1.2px]">
            Hey {userName || "there"},{" "}
            <span className="text-[#3D4650]">
              let's shape your workspace.
            </span>
          </h1>

          <p className="mt-3 max-w-[800px] text-[15px] leading-[24px] text-[#555555]">
            Five quick questions — about a minute. We'll use
            them to pick channel defaults, suggest templates,
            and tune the copy across the app so it speaks your
            business's language from day one.
          </p>

        </div>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="mt-7 flex min-h-[620px] gap-[30px]">

          {/* ==================================================
              LEFT — STEPS
          ================================================== */}

          <aside className="w-[224px] shrink-0">

            <div className="space-y-1">

              {steps.map((step, index) => {

                const completed = index < 2;
                const active = index === 2;

                return (
                  <div
                    key={step.title}
                    className={`relative flex h-[60px] items-center gap-3 rounded-[10px] px-3 ${
                      active
                        ? "border border-[#E2DFDA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                        : "bg-transparent"
                    }`}
                  >

                    {/* Vertical line */}

                    {index < steps.length - 1 && (
                      <div className="absolute left-[22px] top-[48px] h-[28px] w-px bg-[#E2DFDA]" />
                    )}

                    {/* Icon */}

                    <div
                      className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? "bg-[#075B48] text-white"
                          : active
                          ? "bg-[#7C3AED] text-white"
                          : "bg-[#F3F2EF] text-[#C5C3BE]"
                      }`}
                    >
                      <span className="text-[12px]">
                        {completed ? "✓" : step.icon}
                      </span>
                    </div>

                    {/* Text */}

                    <div>

                      <p
                        className={`text-[14px] font-semibold ${
                          active || completed
                            ? "text-[#202020]"
                            : "text-[#B5B2AC]"
                        }`}
                      >
                        {step.title}
                      </p>

                      <p
                        className={`mt-[1px] text-[12px] ${
                          active || completed
                            ? "text-[#8C8983]"
                            : "text-[#C4C1BC]"
                        }`}
                      >
                        {step.subtitle}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </aside>

          {/* ==================================================
              CENTER
          ================================================== */}

          <section className="min-w-0 flex-1">

            <div className="relative overflow-hidden rounded-[16px] border border-[#E1DED9] bg-white">

              {/* Purple top border */}

              <div className="h-[3px] w-full bg-[#7C3AED]" />

              <div className="px-[42px] pt-[44px] pb-[28px]">

                {/* Step */}

                <p className="text-[12px] font-medium tracking-[1.2px] text-[#98948D]">
                  STEP 3 OF 5
                </p>

                {/* Heading */}

                <h2 className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.8px] text-[#111111]">
                  Tell us about your scale
                </h2>

                <p className="mt-2 max-w-[650px] text-[15px] leading-[24px] text-[#666666]">
                  This shapes recommended plans, channel
                  defaults, and the speed of your starter
                  automations.
                </p>

                {/* =================================================
                    TEAM SIZE
                ================================================= */}

                <div className="mt-7">

                  <h3 className="text-[15px] font-semibold text-[#202020]">
                    Team size
                  </h3>

                  <div className="mt-4 grid grid-cols-4 gap-[10px]">

                    {teamSizes.map((item) => {

                      const selected =
                        teamSize === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() =>
                            setTeamSize(item.value)
                          }
                          className={`min-h-[92px] rounded-[10px] border p-3 text-left transition ${
                            selected
                              ? "border-[#075B48] bg-[#F7FBF9] shadow-[0_0_0_1px_#075B48]"
                              : "border-[#E1DED9] bg-white hover:border-[#B8B4AD] hover:bg-[#FCFCFB]"
                          }`}
                        >

                          <div className="flex items-center gap-2">

                            <div
                              className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[7px] text-[14px] font-semibold ${item.bg} ${item.text}`}
                            >
                              {item.letter}
                            </div>

                            <div className="min-w-0">

                              <p className="text-[13px] font-semibold text-[#161616]">
                                {item.label}
                              </p>

                              <p className="mt-1 text-[11px] text-[#99958F]">
                                {item.desc}{" "}
                                {item.desc === "1"
                                  ? "person"
                                  : "people"}
                              </p>

                            </div>

                          </div>

                        </button>
                      );
                    })}

                  </div>

                </div>

                {/* =================================================
                    ROLE
                ================================================= */}

                <div className="mt-7 border-t border-[#E8E5E0] pt-6">

                  <div className="flex items-center justify-between">

                    <h3 className="text-[15px] font-semibold text-[#202020]">
                      Your role
                    </h3>

                    <span className="text-[11px] font-medium text-[#AAA69F]">
                      OPTIONAL
                    </span>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {roles.map((item) => {

                      const selected = role === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setRole(item)}
                          className={`rounded-[8px] border px-4 py-2.5 text-[13px] font-medium transition ${
                            selected
                              ? "border-[#075B48] bg-[#F0F8F5] text-[#075B48] shadow-[0_0_0_1px_#075B48]"
                              : "border-[#E1DED9] bg-white text-[#55514B] hover:border-[#B8B4AD] hover:bg-[#FCFCFB]"
                          }`}
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

                <div className="mt-7 border-t border-[#E8E5E0] pt-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-[15px] font-semibold text-[#202020]">
                        Monthly message volume
                      </h3>

                      <p className="mt-1 text-[12px] text-[#99958F]">
                        Approximate number of messages you'll
                        send each month.
                      </p>

                    </div>

                    <span className="rounded-[7px] bg-[#F3F2EF] px-3 py-1.5 text-[12px] font-semibold text-[#55514B]">
                      {getVolumeLabel()}
                    </span>

                  </div>

                  <div className="mt-5">

                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={messageVolume}
                      onChange={(e) =>
                        setMessageVolume(
                          Number(e.target.value)
                        )
                      }
                      className="w-full accent-[#075B48]"
                    />

                    <div className="mt-2 flex justify-between text-[11px] text-[#AAA69F]">
                      <span>1K</span>
                      <span>25K</span>
                      <span>50K</span>
                      <span>75K</span>
                      <span>100K+</span>
                    </div>

                  </div>

                </div>

                {/* =================================================
                    OBJECTIVES
                ================================================= */}

                <div className="mt-7 border-t border-[#E8E5E0] pt-6">

                  <div className="flex items-center justify-between">

                    <h3 className="text-[15px] font-semibold text-[#202020]">
                      Primary objectives
                    </h3>

                    <span className="text-[11px] font-medium text-[#AAA69F]">
                      OPTIONAL
                    </span>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {objectives.map((item) => {

                      const selected =
                        objective === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setObjective(item)
                          }
                          className={`rounded-[8px] border px-4 py-2.5 text-[13px] font-medium transition ${
                            selected
                              ? "border-[#075B48] bg-[#F0F8F5] text-[#075B48] shadow-[0_0_0_1px_#075B48]"
                              : "border-[#E1DED9] bg-white text-[#55514B] hover:border-[#B8B4AD] hover:bg-[#FCFCFB]"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}

                  </div>

                </div>

              </div>

              {/* =================================================
                  REUSABLE NAVIGATION
              ================================================= */}

              <OnboardingNavigation
                currentStep={3}
                nextPath="/discovery"
                backPath="/onboarding/use-cases"
                onContinue={handleContinue}
              />

            </div>

          </section>

          {/* ==================================================
              RIGHT — LIVE PREVIEW
          ================================================== */}

          <aside className="w-[425px] shrink-0">

            <div className="rounded-[16px] border border-[#E1DED9] bg-white p-5">

              {/* Preview heading */}

              <div className="flex items-center justify-between">

                <p className="text-[12px] font-semibold tracking-[1.1px] text-[#99958F]">
                  LIVE PREVIEW
                </p>

                <div className="flex items-center gap-1.5 rounded-full bg-[#E9F2EF] px-2.5 py-1 text-[10px] font-medium text-[#176653]">

                  <span className="h-[5px] w-[5px] rounded-full bg-[#087F63]" />

                  updates as you answer

                </div>

              </div>

              <p className="mt-2 text-[13px] leading-[20px] text-[#99958F]">
                Your workspace stays calm and neutral — your
                scale helps Superblock recommend the right
                setup for your business.
              </p>

              {/* =================================================
                  MINI DASHBOARD
              ================================================= */}

              <div className="mt-5 overflow-hidden rounded-[10px] border border-[#DDD9D3]">

                {/* Browser bar */}

                <div className="flex h-[34px] items-center justify-between border-b border-[#DDD9D3] px-3">

                  <div className="flex gap-1.5">

                    <span className="h-[7px] w-[7px] rounded-full bg-[#FF6257]" />

                    <span className="h-[7px] w-[7px] rounded-full bg-[#FFBD2E]" />

                    <span className="h-[7px] w-[7px] rounded-full bg-[#28C840]" />

                  </div>

                  <span className="text-[9px] text-[#88837D]">
                    Superblock for business
                  </span>

                  <span className="h-[7px] w-[7px] rounded-full bg-[#12B886]" />

                </div>

                {/* Dashboard */}

                <div className="flex min-h-[235px]">

                  {/* Sidebar */}

                  <div className="w-[95px] border-r border-[#E2DFDA] p-2">

                    <div className="rounded-[5px] bg-[#E9F1EF] px-2 py-1.5 text-[9px] font-medium text-[#176653]">
                      ⌂ &nbsp; Home
                    </div>

                    <div className="mt-1 px-2 py-1.5 text-[9px] text-[#77736D]">
                      ♢ &nbsp; Inbox
                    </div>

                    <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                      ◇ &nbsp; Send
                    </div>

                    <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                      ♙ &nbsp; Contacts
                    </div>

                    <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                      ⚒ &nbsp; Build
                    </div>

                    <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                      ◫ &nbsp; Insights
                    </div>

                  </div>

                  {/* Dashboard content */}

                  <div className="flex-1 p-3">

                    <h3 className="text-[12px] font-semibold">
                      Welcome back, {userName || "there"}
                    </h3>

                    <p className="mt-1 text-[9px] text-[#99958F]">
                      Your workspace at a glance
                    </p>

                    {/* Customers */}

                    <div className="mt-3 rounded-[7px] border border-[#E2DFDA] p-2.5">

                      <p className="text-[8px] font-medium text-[#99958F]">
                        CUSTOMERS REACHED THIS WEEK
                      </p>

                      <div className="mt-1 flex items-center justify-between">

                        <span className="text-[17px] font-semibold">
                          1,284
                        </span>

                        <span className="rounded bg-[#E5F5ED] px-1 text-[7px] text-[#16805E]">
                          +12%
                        </span>

                      </div>

                      {/* Chart */}

                      <div className="mt-3 flex h-[22px] items-end gap-1">

                        {[8, 12, 9, 15, 10, 16, 13, 19, 14].map(
                          (height, index) => (
                            <div
                              key={index}
                              className={`flex-1 rounded-[2px] ${
                                index === 8
                                  ? "bg-[#075B48]"
                                  : "bg-[#D8D8D5]"
                              }`}
                              style={{
                                height: `${height}px`,
                              }}
                            />
                          )
                        )}

                      </div>

                    </div>

                    {/* Suggested */}

                    <div className="mt-3 rounded-[7px] border border-[#BBD6CD] bg-[#EDF6F2] p-2.5">

                      <div className="flex items-center gap-2">

                        <div className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#075B48] text-[10px] text-white">
                          ✦
                        </div>

                        <div>

                          <p className="text-[9px] font-semibold">
                            Suggested: Abandoned-cart reco...
                          </p>

                          <p className="mt-0.5 text-[7px] text-[#77736D]">
                            {getTeamLabel()} ·{" "}
                            {getVolumeLabel()} monthly
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  PREVIEW DETAILS
              ================================================= */}

              <div className="mt-4 grid grid-cols-2 gap-y-4">

                <PreviewItem
                  label="TEAM"
                  value={getTeamLabel()}
                />

                <PreviewItem
                  label="ROLE"
                  value={role || "—"}
                />

                <PreviewItem
                  label="MONTHLY VOLUME"
                  value={getVolumeLabel()}
                />

                <PreviewItem
                  label="PLAN RANGE"
                  value={getPlanRange()}
                />

                <PreviewItem
                  label="OBJECTIVE"
                  value={objective || "—"}
                />

                <PreviewItem
                  label="CUSTOMERS REACHED"
                  value="1,284"
                />

              </div>

              {/* Footer note */}

              <p className="mt-5 text-[11px] text-[#99958F]">
                Everything is editable in{" "}
                <span className="font-semibold text-[#55514B]">
                  Settings → Preferences
                </span>{" "}
                any time.
              </p>

            </div>

          </aside>

        </div>

      </main>
    </>
  );
}

/* ============================================================
   PREVIEW ITEM
============================================================ */

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-medium tracking-[0.7px] text-[#99958F]">
        {label}
      </p>

      <p className="mt-1 text-[13px] font-medium text-[#202020]">
        {value}
      </p>

    </div>
  );
}