"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "../components/tempHeader";

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
   DISCOVERY OPTIONS
============================================================ */

const options = [
  "Google search",
  "Social media",
  "LinkedIn",
  "X / Twitter",
  "YouTube",
  "Friend or colleague",
  "Agency or consultant",
  "Event or conference",
  "Online ad",
  "Newsletter",
  "Podcast",
  "Blog or article",
  "Somewhere else",
];

/* ============================================================
   PAGE
============================================================ */

export default function DiscoveryPage() {
  const router = useRouter();

  const [selected, setSelected] = useState("");
  const [userName, setUserName] = useState("");

  /* ============================================================
     LOAD SIGNUP USER + PREVIOUS DISCOVERY
     NO SUPABASE
     NO FETCH
     NO LAMBDA URL
  ============================================================ */

  useEffect(() => {
    const savedUser = localStorage.getItem("signup_user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user.full_name) {
          setUserName(user.full_name);
        }
      } catch (error) {
        console.error("Failed to read signup user:", error);
      }
    }

    const savedDiscovery = localStorage.getItem(
      "onboarding_discovery"
    );

    if (savedDiscovery) {
      try {
        const discovery = JSON.parse(savedDiscovery);

        if (discovery.discovery) {
          setSelected(discovery.discovery);
        }
      } catch (error) {
        console.error(
          "Failed to read discovery data:",
          error
        );
      }
    }
  }, []);

  /* ============================================================
     CONTINUE
  ============================================================ */

  const handleContinue = () => {
    localStorage.setItem(
      "onboarding_discovery",
      JSON.stringify({
        discovery: selected,
      })
    );

    router.push("/context");
  };

  /* ============================================================
     BACK
  ============================================================ */

  const handleBack = () => {
    router.push("/onboarding/scale");
  };

  return (
    <>
      <OnboardingHeader />

      <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">

        {/* ======================================================
            HEADER
        ====================================================== */}

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

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-7 flex min-h-[620px] gap-[30px]">

          {/* ====================================================
              LEFT STEPS
          ==================================================== */}

          <aside className="w-[224px] shrink-0">

            <div className="space-y-1">

              {steps.map((step, index) => {

                const completed = index < 3;
                const active = index === 3;

                return (
                  <div
                    key={step.title}
                    className={`relative flex h-[60px] items-center gap-3 rounded-[10px] px-3 ${
                      active
                        ? "border border-[#E2DFDA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                        : "bg-transparent"
                    }`}
                  >

                    {!step.title.includes("Context") && (
                      <div className="absolute left-[22px] top-[48px] h-[28px] w-px bg-[#E2DFDA]" />
                    )}

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

          {/* ====================================================
              CENTER
          ==================================================== */}

          <section className="min-w-0 flex-1">

            <div className="relative h-full overflow-hidden rounded-[16px] border border-[#E1DED9] bg-white">

              <div className="h-[3px] w-full bg-[#7C3AED]" />

              <div className="px-[42px] pt-[44px]">

                <p className="text-[12px] font-medium tracking-[1.2px] text-[#98948D]">
                  STEP 4 OF 5
                </p>

                <h2 className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.8px] text-[#111111]">
                  How did you hear about Superblock?
                </h2>

                <p className="mt-2 max-w-[700px] text-[15px] leading-[24px] text-[#666666]">
                  Optional, but it helps us understand what
                  brought you here. Your answer helps us build
                  more of what works.
                </p>

                {/* OPTIONS */}

                <div className="mt-7 grid grid-cols-3 gap-[10px]">

                  {options.map((option) => {

                    const isSelected = selected === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelected(option)}
                        className={`rounded-[10px] border px-4 py-3.5 text-left text-[14px] font-medium transition ${
                          isSelected
                            ? "border-[#075B48] bg-[#F0F8F5] text-[#075B48] shadow-[0_0_0_1px_#075B48]"
                            : "border-[#E1DED9] bg-white text-[#44413D] hover:border-[#B8B4AD] hover:bg-[#FCFCFB]"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <span>{option}</span>

                          {isSelected && (
                            <span className="ml-3 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#075B48] text-[11px] text-white">
                              ✓
                            </span>
                          )}

                        </div>

                      </button>
                    );
                  })}

                </div>

                {/* BOTTOM NAVIGATION */}

                <div className="relative mt-[42px] flex items-center justify-between border-t border-[#E2DFDA] pt-[22px]">

                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-[8px] border border-[#E1DED9] bg-white px-4 py-2.5 text-[14px] font-medium text-[#333333] transition hover:bg-[#F8F7F5]"
                  >
                    ← Back
                  </button>

                  <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#99958F]">
                    Step 4 of 5
                  </span>

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="rounded-[8px] bg-[#075B48] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#064D3E]"
                  >
                    Continue →
                  </button>

                </div>

              </div>

            </div>

          </section>

          {/* ====================================================
              RIGHT PREVIEW
          ==================================================== */}

          <aside className="w-[425px] shrink-0">

            <div className="rounded-[16px] border border-[#E1DED9] bg-white p-5">

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
                Your workspace stays calm and neutral — these
                colours are only onboarding guideposts. Your
                preferences can always be changed later.
              </p>

              {/* MINI DASHBOARD */}

              <div className="mt-5 overflow-hidden rounded-[10px] border border-[#DDD9D3]">

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

                <div className="flex min-h-[235px]">

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

                  <div className="flex-1 p-3">

                    <h3 className="text-[12px] font-semibold">
                      Welcome back, {userName || "there"}
                    </h3>

                    <p className="mt-1 text-[9px] text-[#99958F]">
                      Superblock for business
                    </p>

                    <div className="mt-3 rounded-[7px] border border-[#E2DFDA] p-2.5">

                      <p className="text-[8px] font-medium text-[#99958F]">
                        CUSTOMERS REACHED THIS WEEK
                      </p>

                      <div className="mt-1 flex items-center gap-2">

                        <span className="text-[17px] font-semibold">
                          1,284
                        </span>

                        <span className="rounded bg-[#E5F5ED] px-1 text-[7px] text-[#16805E]">
                          +12%
                        </span>

                      </div>

                      <div className="mt-3 flex h-[30px] items-end gap-1">

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
                            Tap to scaffold a flow for contacts.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* PREVIEW DETAILS */}

              <div className="mt-4 grid grid-cols-2 gap-y-4">

                <PreviewItem
                  label="INDUSTRY"
                  value="Ecommerce & D2C"
                />

                <PreviewItem
                  label="TONE"
                  value="Superblock for business"
                />

                <PreviewItem
                  label="CONTACTS CALLED"
                  value="Customers"
                />

                <PreviewItem
                  label="AUDIENCE AS"
                  value="Customers"
                />

                <PreviewItem
                  label="USE CASES"
                  value="5 picked"
                />

                <PreviewItem
                  label="DISCOVERY"
                  value={selected || "—"}
                />

              </div>

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