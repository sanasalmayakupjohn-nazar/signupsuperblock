"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

/* ============================================================
   TYPES
============================================================ */

type SignupData = {
  full_name: string;
  email: string;
  password: string;
};

type BusinessData = {
  business_name: string;
  phone: string;
  country_code: string;
  industry: string;
  website: string;
  location: string;
};

type ScaleData = {
  team_size: string;
  role: string;
  message_volume: number;
  objectives: string[];
};

type DiscoveryData = {
  discovery: string;
  details: string;
};

type ContextData = {
  notes: string;
};

export type OnboardingData = {
  signup: SignupData;
  business: BusinessData;
  industry: string;
  closest_match: string;
  use_cases: string[];
  scale: ScaleData;
  discovery: DiscoveryData;
  context: ContextData;
};

type OnboardingContextType = {
  data: OnboardingData;

  setSignup: (signup: SignupData) => void;
  setBusiness: (business: BusinessData) => void;

  setClosestMatch: (value: string) => void;

  setIndustry: (
    industry: string,
    closestMatch?: string
  ) => void;

  setUseCases: (useCases: string[]) => void;
  setScale: (scale: ScaleData) => void;
  setDiscovery: (discovery: DiscoveryData) => void;
  setContext: (context: ContextData) => void;

  resetOnboarding: () => void;
};

/* ============================================================
   INITIAL DATA
============================================================ */

const createInitialData = (): OnboardingData => ({
  signup: {
    full_name: "",
    email: "",
    password: "",
  },

  business: {
    business_name: "",
    phone: "",
    country_code: "+91",
    industry: "",
    website: "",
    location: "",
  },

  industry: "",
  closest_match: "",

  use_cases: [],

  scale: {
    team_size: "",
    role: "",
    message_volume: 1000,
    objectives: [],
  },

  discovery: {
    discovery: "google_search",
    details: "",
  },

  context: {
    notes: "",
  },
});

/* ============================================================
   CONTEXT
============================================================ */

const OnboardingContext =
  createContext<OnboardingContextType | undefined>(
    undefined
  );

/* ============================================================
   PROVIDER
============================================================ */

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>(
    createInitialData()
  );

  /* ==========================================================
     SIGNUP
  ========================================================== */

  const setSignup = (signup: SignupData) => {
    setData((prev) => ({
      ...prev,
      signup,
    }));
  };

  /* ==========================================================
     BUSINESS
  ========================================================== */

  const setBusiness = (business: BusinessData) => {
    setData((prev) => ({
      ...prev,
      business,
    }));
  };

  /* ==========================================================
     INDUSTRY
  ========================================================== */

  const setIndustry = (
    industry: string,
    closestMatch: string = ""
  ) => {
    setData((prev) => ({
      ...prev,
      industry,
      closest_match: closestMatch,
    }));
  };

  /* ==========================================================
     USE CASES
  ========================================================== */

  const setUseCases = (useCases: string[]) => {
    setData((prev) => ({
      ...prev,
      use_cases: useCases.slice(0, 5),
    }));
  };

  /* ==========================================================
     SCALE
  ========================================================== */

  const setScale = (scale: ScaleData) => {
    setData((prev) => ({
      ...prev,
      scale,
    }));
  };

  /* ==========================================================
     DISCOVERY
  ========================================================== */

  const setDiscovery = (discovery: DiscoveryData) => {
    setData((prev) => ({
      ...prev,
      discovery,
    }));
  };

  /* ==========================================================
     CONTEXT
  ========================================================== */

  const setContext = (context: ContextData) => {
    setData((prev) => ({
      ...prev,
      context,
    }));
  };
   
 const setClosestMatch = (value: string) => {
    setData((current) => ({
      ...current,
      closest_match: value,
    }));
  };
  
  /* ==========================================================
     RESET
  ========================================================== */

  const resetOnboarding = () => {
    setData(createInitialData());
  };

  /* ==========================================================
     PROVIDER
  ========================================================== */

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setSignup,
        setBusiness,
        setIndustry,
        setClosestMatch,
        setUseCases,
        setScale,
        setDiscovery,
        setContext,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

/* ============================================================
   HOOK
============================================================ */

export function useOnboarding(): OnboardingContextType {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }

  return context;
}