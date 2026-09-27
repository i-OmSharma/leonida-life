export type ExperiencePhase =
  | 'landing'
  | 'scenario'
  | 'upload'
  | 'edit'
  | 'locked'
  | 'reactions'
  | 'report';
export type ScenarioCategory =
  'takeover' | 'wildlife' | 'score' | 'beach' | 'celebrity' | 'pursuit';

export interface Scenario {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  location: string;
  category: ScenarioCategory;
  risk: 'High' | 'Severe';
  accent: 'orange' | 'aqua' | 'coral' | 'yellow';
}

export interface EvidenceMetadata {
  name: string;
  size: number;
  type: string;
}

export type ReactionStage = 'publishing' | 'social' | 'news' | 'police';
export type ReportStage = 'generating' | 'ready';

export interface ScenarioReaction {
  social: {
    handle: string;
    displayName: string;
    caption: string;
    location: string;
    trend: string;
    views: string;
    likes: string;
    reposts: string;
    comments: { handle: string; text: string }[];
  };
  news: {
    headline: string;
    subheadline: string;
    ticker: string[];
  };
  police: {
    classification: string;
    status: string;
    threatLevel: string;
    unitsDispatched: number;
    responseLevel: number;
    flags: string[];
  };
  report: {
    chaosScore: number;
    propertyDamage: string;
    publicSentiment: string;
    finalStatus: string;
    summary: string;
  };
}
