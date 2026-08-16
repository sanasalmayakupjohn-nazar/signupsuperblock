"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useEffect} from "react";
import {
  FaBuilding,
  FaMagic,
  FaChartBar,
  FaCompass,
  FaStar,
} from "react-icons/fa";

const industries = [
  {
    title: "Ecommerce & D2C",
    description: "Shopify, WooCommerce, marketplaces.",
    letter: "$",
    bg: "bg-[#F0E8FF]",
    text: "text-[#7C3AED]",
  },
  {
    title: "SaaS & Software",
    description: "B2B + B2C software products.",
    letter: "S",
    bg: "bg-[#E5F5FC]",
    text: "text-[#009FE3]",
  },
  {
    title: "Education & Coaching",
    description: "Coaches, academies, EdTech.",
    letter: "E",
    bg: "bg-[#FFF1DC]",
    text: "text-[#E98A00]",
  },
  {
    title: "Creator & Community",
    description: "Solo creators, podcasts, communities.",
    letter: "C",
    bg: "bg-[#FFE9ED]",
    text: "text-[#F43F5E]",
  },
  {
    title: "Healthcare & Wellness",
    description: "Clinics, telehealth, fitness.",
    letter: "+",
    bg: "bg-[#DDF7EE]",
    text: "text-[#10B981]",
  },
  {
    title: "Real Estate & Property",
    description: "Brokers, developers, PropTech.",
    letter: "R",
    bg: "bg-[#EDEBFF]",
    text: "text-[#6366F1]",
  },
  {
    title: "Financial Services",
    description: "FinTech, lending, insurance.",
    letter: "F",
    bg: "bg-[#EEF0F2]",
    text: "text-[#475569]",
  },
  {
    title: "Agency & Reseller",
    description: "Marketing, ads, BSP resellers.",
    letter: "A",
    bg: "bg-[#FFF0E4]",
    text: "text-[#F97316]",
  },
  {
    title: "Hospitality & F&B",
    description: "Restaurants, hotels, events.",
    letter: "H",
    bg: "bg-[#FDE8F4]",
    text: "text-[#EC4899]",
  },
  {
    title: "Logistics & Delivery",
    description: "Shipping, delivery, fleet.",
    letter: "L",
    bg: "bg-[#E5F7FC]",
    text: "text-[#0891B2]",
  },
  {
    title: "Nonprofit & NGO",
    description: "Foundations, charities, advocacy.",
    letter: "N",
    bg: "bg-[#F8E8FF]",
    text: "text-[#A855F7]",
  },
  {
    title: "Manufacturing & B2B",
    description: "Industrial, supply, wholesale.",
    letter: "M",
    bg: "bg-[#F0F0EE]",
    text: "text-[#555555]",
  },
];

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

export default function OnboardingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("superblockusers")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user name:", error);
        return;
      }

      if (data?.full_name) {
        setUserName(data.full_name);
      }
    };

    getUserName();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="px-0 pt-[35px]">

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
          Five quick questions — about a minute. We'll use them to pick
          channel defaults, suggest templates, and tune the copy across
          the app so it speaks your business's language from day one.
        </p>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mt-7 flex min-h-[620px] gap-[30px]">


        {/* =====================================================
            LEFT STEPS
        ===================================================== */}

        <aside className="w-[224px] shrink-0">

          <div className="space-y-1">

            {steps.map((step, index) => {

              const active = index === 0;

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
                      active
                        ? "bg-[#075B48] text-white"
                        : "bg-[#F3F2EF] text-[#C5C3BE]"
                    }`}
                  >
                    <span className="text-[12px]">
                      {step.icon}
                    </span>
                  </div>

                  {/* Text */}

                  <div>
                    <p
                      className={`text-[14px] font-semibold ${
                        active
                          ? "text-[#202020]"
                          : "text-[#B5B2AC]"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p
                      className={`mt-[1px] text-[12px] ${
                        active
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


        {/* =====================================================
            CENTER
        ===================================================== */}

        <section className="min-w-0 flex-1">

          <div className="h-full rounded-[16px] border border-[#E1DED9] bg-white px-[45px] py-[48px]">

            {/* Step */}

            <p className="text-[12px] font-medium tracking-[1.2px] text-[#98948D]">
              STEP 1 OF 5
            </p>

            {/* Heading */}

            <h2 className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.8px] text-[#111111]">
              What kind of business are you running?
            </h2>

            <p className="mt-2 max-w-[650px] text-[15px] leading-[24px] text-[#666666]">
              We'll personalise your workspace copy, suggested templates,
              and starter automations to match.
            </p>


            {/* =================================================
                INDUSTRY GRID
            ================================================= */}

            <div className="mt-7 grid grid-cols-3 gap-[10px]">

              {industries.map((industry) => {

                const selected =
                  selectedIndustry === industry.title;

                return (
                  <button
                    key={industry.title}
                    type="button"
                    onClick={() =>
                      setSelectedIndustry(industry.title)
                    }
                    className={`group min-h-[100px] rounded-[10px] border p-4 text-left transition ${
                      selected
                        ? "border-[#075B48] bg-[#F7FBF9] shadow-[0_0_0_1px_#075B48]"
                        : "border-[#E1DED9] bg-white hover:border-[#B8B4AD] hover:bg-[#FCFCFB]"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[7px] text-[16px] font-medium ${industry.bg} ${industry.text}`}
                      >
                        {industry.letter}
                      </div>

                      <p className="text-[15px] font-semibold text-[#161616]">
                        {industry.title}
                      </p>

                    </div>

                    <p className="mt-3 text-[13px] leading-[18px] text-[#99958F]">
                      {industry.description}
                    </p>

                  </button>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT LIVE PREVIEW
        ===================================================== */}

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
              Your workspace stays calm and neutral — the colours here
              on onboarding are just guideposts. Only the wording and
              which tools unlock change per business.
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
                    Welcome back, Sana
                  </h3>

                  <p className="mt-1 text-[9px] text-[#99958F]">
                    Pick an industry to begin
                  </p>


                  {/* Contacts */}

                  <div className="mt-3 rounded-[7px] border border-[#E2DFDA] p-2.5">

                    <p className="text-[8px] font-medium text-[#99958F]">
                      CONTACTS REACHED THIS WEEK
                    </p>

                    <div className="mt-1 flex items-center justify-between">

                      <span className="text-[17px] font-semibold">
                        1,284
                      </span>

                      <span className="rounded bg-[#E5F5ED] px-1 text-[7px] text-[#16805E]">
                        +12%
                      </span>

                    </div>

                    {/* chart */}

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


                  {/* Suggested message */}

                  <div className="mt-3 rounded-[7px] border border-[#BBD6CD] bg-[#EDF6F2] p-2.5">

                    <div className="flex items-center gap-2">

                      <div className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#075B48] text-[10px] text-white">
                        ✦
                      </div>

                      <div>

                        <p className="text-[9px] font-semibold">
                          Suggested: Welcome message
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


            {/* =================================================
                PREVIEW DETAILS
            ================================================= */}

            <div className="mt-4 grid grid-cols-2 gap-y-4">

              <PreviewItem
                label="INDUSTRY"
                value={selectedIndustry || "—"}
              />

              <PreviewItem
                label="TONE"
                value="Superblock for business"
              />

              <PreviewItem
                label="CONTACTS CALLED"
                value="Contacts"
              />

              <PreviewItem
                label="AUDIENCE AS"
                value="Audience"
              />

              <PreviewItem
                label="USE CASES"
                value="—"
              />

              <PreviewItem
                label="TEAM"
                value="—"
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