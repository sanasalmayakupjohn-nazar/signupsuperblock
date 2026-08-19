"use client";

import { useOnboarding } from "@/app/components/onboardingContext/OnboardingContext";

export default function ActivationPage() {
  const { data } = useOnboarding();

  const activationData = {
    signup: {
      full_name: data.signup.full_name,
      email: data.signup.email,
      password: data.signup.password,
    },

    business: {
      business_name: data.business.business_name,
      phone: data.business.phone,
      country_code: data.business.country_code,
      industry: data.business.industry,
      website: data.business.website,
      location: data.business.location,
    },

    onboarding: {
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
        notes: data.context.notes,
      },
    },
  };



  console.log("Activation data:", activationData);

  return null;
}