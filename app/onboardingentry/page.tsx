"use client";

import { useState, useEffect } from "react";
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
   INDUSTRIES
============================================================ */

const industries = [
  {
    id: "ecommerce",
    title: "Ecommerce & D2C",
    description: "Shopify, WooCommerce, marketplaces.",
    glyph: "$",
    accent: "#7C3AED",
    examples: ["Fashion", "Beauty", "Home", "Electronics", "Food & beverage"],
  },
  {
    id: "saas",
    title: "SaaS & Software",
    description: "B2B + B2C software products.",
    glyph: "S",
    accent: "#0EA5E9",
    examples: ["Productivity", "Devtools", "Analytics", "Vertical SaaS"],
  },
  {
    id: "education",
    title: "Education & Coaching",
    description: "Coaches, academies, EdTech.",
    glyph: "E",
    accent: "#F59E0B",
    examples: ["K-12", "Higher-ed", "Skills bootcamp", "Coaching"],
  },
  {
    id: "creator",
    title: "Creator & Community",
    description: "Solo creators, podcasts, communities.",
    glyph: "C",
    accent: "#F43F5E",
    examples: ["Newsletter", "Podcast", "YouTube", "Community"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Wellness",
    description: "Clinics, telehealth, fitness.",
    glyph: "+",
    accent: "#10B981",
    examples: ["Clinics", "Wellness", "Telehealth", "Pharma"],
  },
  {
    id: "real_estate",
    title: "Real Estate & Property",
    description: "Brokers, developers, PropTech.",
    glyph: "R",
    accent: "#6366F1",
    examples: ["Residential", "Commercial", "Rentals", "PropTech"],
  },
  {
    id: "financial_services",
    title: "Financial Services",
    description: "FinTech, lending, insurance.",
    glyph: "F",
    accent: "#475569",
    examples: ["FinTech", "Insurance", "Wealth", "Lending"],
  },
  {
    id: "agency",
    title: "Agency & Reseller",
    description: "Marketing, ads, BSP resellers.",
    glyph: "A",
    accent: "#F97316",
    examples: ["Marketing", "Performance", "Branding", "Ops"],
  },
  {
    id: "hospitality",
    title: "Hospitality & F&B",
    description: "Restaurants, hotels, events.",
    glyph: "H",
    accent: "#EC4899",
    examples: ["Restaurants", "Hotels", "Events", "Travel"],
  },
  {
    id: "logistics",
    title: "Logistics & Delivery",
    description: "Shipping, delivery, fleet.",
    glyph: "L",
    accent: "#06B6D4",
    examples: ["3PL", "Last-mile", "Fleet", "Cross-border"],
  },
  {
    id: "nonprofit",
    title: "Nonprofit & NGO",
    description: "Foundations, charities, advocacy.",
    glyph: "N",
    accent: "#D946EF",
    examples: ["Education", "Healthcare", "Environment", "Advocacy"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing & B2B",
    description: "Industrial, supply, wholesale.",
    glyph: "M",
    accent: "#78716C",
    examples: ["Industrial", "Wholesale", "Supply chain"],
  },
  {
    id: "other",
    title: "Something else",
    description: "We support every industry.",
    glyph: "…",
    accent: "#525252",
    examples: [],
  },
];

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
   PAGE
============================================================ */

export default function OnboardingIndustryPage() {
  const { data, setIndustry } = useOnboarding();

  const [selectedIndustry, setSelectedIndustry] = useState(
    data.industry || "ecommerce"
  );

  const [closestMatch, setClosestMatch] = useState("");

  /*
   * Get user's name directly from OnboardingContext.
   * NO localStorage.
   */
  const userName = data.signup.full_name;

  /*
   * If the context already contains an industry,
   * use it when this page loads.
   */
  useEffect(() => {
    if (data.industry) {
      setSelectedIndustry(data.industry);
    }
  }, [data.industry]);

  /*
   * Find currently selected industry.
   */
  const currentObj =
    industries.find(
      (industry) =>
        industry.id === selectedIndustry ||
        industry.title === selectedIndustry
    ) || industries[0];

  const activeAccent = currentObj.accent || "#7C3AED";

  /*
   * Save industry into OnboardingContext.
   */
  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setClosestMatch("");

    /*
     * Save immediately to context.
     */
    setIndustry(industryId);
  };

  /*
   * Continue to next step.
   */
  const handleContinue = () => {
    /*
     * Make sure latest selection is stored in context.
     */
    setIndustry(selectedIndustry);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FAFAF8] text-[#111111]">
      <OnboardingHeader />

      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.18] blur-3xl transition-colors duration-[600ms]"
        style={{ backgroundColor: activeAccent }}
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
          Five quick questions — about a minute. We'll use them to pick channel
          defaults, suggest templates, and tune the copy across the app so it
          speaks your business's language from day one.
        </p>
      </section>

      {/* ====================================================
          MAIN 3-COLUMN LAYOUT
      ==================================================== */}

      <main className="relative mx-auto grid grid-cols-1 gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)_340px]">

        {/* ==================================================
            LEFT — STEPS NAV
        ================================================== */}

        <aside className="hidden lg:block">
          <nav aria-label="Onboarding steps" className="sticky top-6">
            <ul className="flex flex-col gap-1.5">
              {steps.map((step, index) => {
                const active = step.id === 1;
                const completed = step.id < 1;

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
                          active
                            ? "text-white"
                            : completed
                            ? "bg-[#064E3B] text-white"
                            : "bg-[#F5F4F0] text-[#8E8B85]"
                        }`}
                        style={
                          active
                            ? { backgroundColor: activeAccent }
                            : undefined
                        }
                      >
                        {completed ? "✓" : step.icon}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`text-[12px] font-semibold leading-tight ${
                            active ? "text-[#111111]" : "text-[#525252]"
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

            {/* Accent Bar */}
            <div
              aria-hidden
              className="h-[3px] w-full transition-colors duration-[400ms]"
              style={{
                background: `linear-gradient(to right, ${activeAccent}, ${activeAccent}66 35%, transparent)`,
              }}
            />

            <div className="p-6 sm:p-8 lg:p-9">

              {/* Step Header */}

              <div className="mb-6">
                <p className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                  STEP 1 OF 5
                </p>

                <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.022em] text-[#111111]">
                  What kind of business are you running?
                </h2>

                <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-[1.5] text-[#525252]">
                  We'll personalise your workspace copy, suggested templates,
                  and starter automations to match.
                </p>
              </div>

              {/* ==================================================
                  INDUSTRY GRID
              ================================================== */}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {industries.map((ind) => {
                  const isSelected =
                    selectedIndustry === ind.id ||
                    selectedIndustry === ind.title;

                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => handleIndustrySelect(ind.id)}
                      className={`relative overflow-hidden rounded-[8px] border p-3.5 text-left transition-all duration-[160ms] ${
                        isSelected
                          ? "bg-white shadow-sm"
                          : "bg-white hover:bg-[#F5F4F0]"
                      }`}
                      style={{
                        borderColor: isSelected
                          ? ind.accent
                          : "#E8E5DF",

                        boxShadow: isSelected
                          ? `0 0 0 2px ${ind.accent}26`
                          : undefined,
                      }}
                    >
                      {isSelected && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-[80px]"
                          style={{
                            background: `linear-gradient(to bottom, ${ind.accent}14, transparent)`,
                          }}
                        />
                      )}

                      <div className="relative mb-1.5 flex items-center gap-2">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] font-bold tabular-nums"
                          style={{
                            backgroundColor: isSelected
                              ? ind.accent
                              : `${ind.accent}1A`,
                            color: isSelected
                              ? "#FFFFFF"
                              : ind.accent,
                          }}
                        >
                          {ind.glyph}
                        </span>

                        <span className="truncate text-[13.5px] font-semibold text-[#111111]">
                          {ind.title}
                        </span>
                      </div>

                      <p className="relative text-[11.5px] leading-[1.4] text-[#8E8B85]">
                        {ind.description}
                      </p>

                      {isSelected && (
                        <span
                          className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: ind.accent,
                          }}
                        >
                          <span className="text-[9px] font-bold leading-none text-white">
                            ✓
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ==================================================
                  CLOSEST MATCH
              ================================================== */}

              {currentObj.examples &&
                currentObj.examples.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#8E8B85]">
                      Pick the closest match{" "}
                      <span className="ml-1.5 text-[10px] font-medium normal-case text-[#8E8B85]/70">
                        (optional)
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {currentObj.examples.map((example) => {
                        const isMatch = closestMatch === example;

                        return (
                          <button
                            key={example}
                            type="button"
                            onClick={() =>
                              setClosestMatch(
                                isMatch ? "" : example
                              )
                            }
                            className="h-7 rounded-full border px-2.5 text-[12px] font-medium transition-colors duration-[140ms]"
                            style={{
                              backgroundColor: isMatch
                                ? activeAccent
                                : "white",

                              color: isMatch
                                ? "#FFFFFF"
                                : "#525252",

                              borderColor: isMatch
                                ? activeAccent
                                : "#E8E5DF",
                            }}
                          >
                            {example}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* ==================================================
                  BOTTOM NAVIGATION
              ================================================== */}

              <OnboardingNavigation
                currentStep={1}
                nextPath="/usecases"
                backPath="/signup/business"
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
              Your workspace stays calm and neutral — the colours here on
              onboarding are just guideposts. Only the{" "}
              <span className="font-medium text-[#525252]">
                wording
              </span>{" "}
              and which{" "}
              <span className="font-medium text-[#525252]">
                tools unlock
              </span>{" "}
              change per business.
            </p>

            {/* Mini Dashboard */}

            <div className="overflow-hidden rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8]">

              <div className="flex h-7 items-center justify-between border-b border-[#E8E5DF] bg-white px-2">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                </div>

                <span className="truncate text-[9px] font-medium text-[#8E8B85]">
                  Superblock for {currentObj.title.toLowerCase()}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              </div>

              <div className="flex">

                {/* Sidebar */}

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
                    <span>♙</span> Contacts
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>⚒</span> Build
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◫</span> Insights
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
                      Superblock for {currentObj.title.toLowerCase()}
                    </p>
                  </div>

                  {/* Stat */}

                  <div className="rounded-[6px] border border-[#E8E5DF] bg-white p-2">
                    <p className="text-[8px] font-medium uppercase tracking-[0.06em] text-[#8E8B85]">
                      CONTACTS REACHED THIS WEEK
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

                  {/* Suggested */}

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

            {/* Preview Specs */}

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
              <PreviewSpec
                label="INDUSTRY"
                value={currentObj.title}
              />

              <PreviewSpec
                label="TONE"
                value={`Superblock for ${currentObj.id}`}
              />

              <PreviewSpec
                label="CONTACTS CALLED"
                value="Contacts"
              />

              <PreviewSpec
                label="AUDIENCE AS"
                value="Audience"
              />

              <PreviewSpec
                label="USE CASES"
                value="—"
              />

              <PreviewSpec
                label="TEAM"
                value="—"
              />

              {closestMatch && (
                <PreviewSpec
                  label="CLOSEST MATCH"
                  value={closestMatch}
                />
              )}
            </dl>

            {/* Footnote */}

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