import { feature, product, priceItem, featureItem, pricedFeatureItem } from "atmn";

export const tests = feature({
  id: "tests",
  name: "IELTS Practice Tests",
  type: "single_use",
});

export const detailedFeedback = feature({
  id: "detailed_feedback",
  name: "Detailed Feedback and Reports",
  type: "boolean",
});

export const speakingEvaluation = feature({
  id: "speaking_evaluation",
  name: "AI-Powered Speaking Evaluation",
  type: "single_use",
});

export const writingEvaluation = feature({
  id: "writing_evaluation",
  name: "AI-Powered Writing Evaluation",
  type: "single_use",
});

export const expertSessions = feature({
  id: "expert_sessions",
  name: "1-on-1 Expert Consultation Sessions",
  type: "single_use",
});

export const free = product({
  id: "free",
  name: "Free",
  is_default: true,
  items: [
    featureItem({
      feature_id: tests.id,
      included_usage: 5,
      interval: "month",
    }),
  ],
});

export const pro = product({
  id: "pro",
  name: "Pro",
  items: [
    priceItem({
      price: 0.10,
      interval: "month",
    }),
    featureItem({
      feature_id: tests.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: detailedFeedback.id,
    }),
  ],
});

export const premium = product({
  id: "premium",
  name: "Premium",
  items: [
    priceItem({
      price: 0.10,
      interval: "month",
    }),
    featureItem({
      feature_id: tests.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: detailedFeedback.id,
    }),
    featureItem({
      feature_id: speakingEvaluation.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: writingEvaluation.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: expertSessions.id,
      included_usage: 1,
      interval: "month",
    }),
  ],
});