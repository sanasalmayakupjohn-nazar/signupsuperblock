"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "../components/tempHeader";

export default function ContextPage() {
  const router = useRouter();

  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("");

  /* ============================================================
     LOAD USER + PREVIOUS NOTES
     NO SUPABASE
     NO API
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

    const savedContext = localStorage.getItem(
      "onboarding_context"
    );

    if (savedContext) {
      try {
        const context = JSON.parse(savedContext);

        if (context.notes) {
          setNotes(context.notes);
        }
      } catch (error) {
        console.error(
          "Failed to read context data:",
          error
        );
      }
    }
  }, []);

  /* ============================================================
     OPEN WORKSPACE
  ============================================================ */

  const handleOpenWorkspace = () => {
    localStorage.setItem(
      "onboarding_context",
      JSON.stringify({
        notes: notes,
      })
    );

    router.push("/workspace");
  };

  /* ============================================================
     BACK
  ============================================================ */

  const handleBack = () => {
    router.push("/onboarding/discovery");
  };

  return (
    <>
      <OnboardingHeader />

      <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">

        {/* ======================================================
            PAGE HEADER
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

              <StepItem
                title="Industry"
                subtitle="Pick your industry"
                completed
              />

              <StepItem
                title="Use cases"
                subtitle="What you'll send"
                completed
              />

              <StepItem
                title="Scale"
                subtitle="Team & volume"
                completed
              />

              <StepItem
                title="Discovery"
                subtitle="How you found us"
                completed
              />

              <StepItem
                title="Context"
                subtitle="Notes & docs"
                active
                last
              />

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
                  STEP 5 OF 5
                </p>

                <h2 className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.8px] text-[#111111]">
                  Anything else we should know?
                </h2>

                <p className="mt-2 max-w-[700px] text-[15px] leading-[24px] text-[#666666]">
                  Drop notes, upload product docs / SOPs /
                  FAQs. We use them to ground AI suggestions —
                  they never leave your workspace.
                </p>

                {/* ==================================================
                    WORKSPACE NOTES
                ================================================== */}

                <div className="mt-7">

                  <label
                    htmlFor="workspaceNotes"
                    className="block text-[14px] font-semibold text-[#33302C]"
                  >
                    Workspace Notes
                  </label>

                  <textarea
                    id="workspaceNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. We're a 5-person ecommerce brand selling skincare. We need cart recovery, COD confirmations, and a help-desk WhatsApp number."
                    maxLength={2000}
                    rows={8}
                    className="mt-3 w-full resize-none rounded-[10px] border border-[#E1DED9] bg-white p-4 text-[14px] leading-[22px] text-[#333333] outline-none transition placeholder:text-[#AAA6A0] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                  />

                  <p className="mt-1 text-right text-[11px] text-[#99958F]">
                    {notes.length}/2000
                  </p>

                </div>

                {/* ==================================================
                    BOTTOM NAVIGATION
                ================================================== */}

                <div className="relative mt-[42px] flex items-center justify-between border-t border-[#E2DFDA] pt-[22px]">

                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-[8px] border border-[#E1DED9] bg-white px-4 py-2.5 text-[14px] font-medium text-[#333333] transition hover:bg-[#F8F7F5]"
                  >
                    ← Back
                  </button>

                  <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#99958F]">
                    Step 5 of 5
                  </span>

                  <button
                    type="button"
                    onClick={handleOpenWorkspace}
                    className="rounded-[8px] bg-[#075B48] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#064D3E]"
                  >
                    Open my workspace →
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

              {/* ENGAGEMENT TOOLS */}

              <div className="mt-4 rounded-[8px] border border-[#E1DED9] p-3">

                <p className="text-[11px] font-semibold tracking-[0.5px] text-[#66615B]">
                  ✣ &nbsp; ENGAGEMENT TOOLS UNLOCKED
                </p>

                <div className="mt-2 space-y-1.5">

                  <p className="text-[11px] text-[#626262]">
                    ✓ Automation studio
                  </p>

                  <p className="text-[11px] text-[#626262]">
                    ✓ Offers
                  </p>

                  <p className="text-[11px] text-[#626262]">
                    ✓ Onboarding sequences
                  </p>

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
                  label="TEAM"
                  value="Just me"
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
   STEP ITEM
============================================================ */

function StepItem({
  title,
  subtitle,
  completed = false,
  active = false,
  last = false,
}: {
  title: string;
  subtitle: string;
  completed?: boolean;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`relative flex h-[60px] items-center gap-3 rounded-[10px] px-3 ${
        active
          ? "border border-[#E2DFDA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
    >

      {!last && (
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
          {completed ? "✓" : "★"}
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
          {title}
        </p>

        <p
          className={`mt-[1px] text-[12px] ${
            active || completed
              ? "text-[#8C8983]"
              : "text-[#C4C1BC]"
          }`}
        >
          {subtitle}
        </p>

      </div>

    </div>
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