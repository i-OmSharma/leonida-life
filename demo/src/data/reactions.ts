import type { ScenarioReaction } from '../types/app';

export const reactions: Record<string, ScenarioReaction> = {
  'street-takeover': {
    social: {
      handle: '@viceafterdark',
      displayName: 'Vice After Dark',
      location: 'Vice Beach',
      trend: 'Trending #1 in Vice Beach',
      views: '1.8M',
      likes: '184K',
      reposts: '27K',
      caption: 'Vice Beach traffic officially gave up.',
      comments: [
        {
          handle: '@coastlinecam',
          text: 'bro turned the intersection into a loading screen',
        },
        {
          handle: '@marlowe_ride',
          text: 'my insurance company just felt a disturbance',
        },
        { handle: '@exit39', text: 'that is literally my exit' },
      ],
    },
    news: {
      headline: 'Unsanctioned street event paralyzes Vice Beach',
      subheadline:
        'Viral footage shows a coastal intersection transformed into an overnight spectacle.',
      ticker: [
        'Transit delays spreading across coastal district',
        'Traffic teams rerouting late-night visitors',
        'Officials ask residents to avoid the promenade',
      ],
    },
    police: {
      classification: 'Reckless vehicle event',
      status: 'Active investigation',
      threatLevel: 'Elevated',
      unitsDispatched: 6,
      responseLevel: 3,
      flags: ['Traffic disruption', 'Public safety risk', 'Viral media event'],
    },
    report: {
      chaosScore: 87,
      propertyDamage: '$184K',
      publicSentiment: 'Absolute cinema',
      finalStatus: 'Case closed / internet open',
      summary:
        'One altered image escaped Vice Beach, reached 1.8M feeds, triggered an LCN breaking-news cycle, and ended in a Level 3 state response.',
    },
  },
  'wildlife-incident': {
    social: {
      handle: '@grassriverlocal',
      displayName: 'Grassriver Local',
      location: 'Grassrivers',
      trend: 'Trending across the wetlands',
      views: '984K',
      likes: '96K',
      reposts: '14K',
      caption: 'Leonida wildlife remains undefeated.',
      comments: [
        {
          handle: '@marshmood',
          text: 'why is the gator always the calmest person in the video',
        },
        { handle: '@reedrunner', text: 'average Tuesday in Grassrivers' },
        { handle: '@sunstateflora', text: 'nature has entered the chat' },
      ],
    },
    news: {
      headline: 'Unusual wildlife encounter draws statewide attention',
      subheadline:
        'A routine warning sign appears to have been treated as optional guidance.',
      ticker: [
        'Wildlife response crews monitoring the area',
        'Visitors reminded to respect posted boundaries',
        'Online footage sparks a fresh wave of jokes',
      ],
    },
    police: {
      classification: 'Wildlife / civilian incident',
      status: 'Response coordinated',
      threatLevel: 'Guarded',
      unitsDispatched: 3,
      responseLevel: 2,
      flags: [
        'Wildlife response',
        'Public safety risk',
        'Public media capture',
      ],
    },
    report: {
      chaosScore: 68,
      propertyDamage: '$22K',
      publicSentiment: 'Nature won',
      finalStatus: 'Case closed / wetlands undefeated',
      summary:
        'One wildlife encounter crossed 984K local feeds, made LCN’s overnight cycle, and finished with a coordinated Level 2 response.',
    },
  },
  'score-gone-wrong': {
    social: {
      handle: '@portwatch',
      displayName: 'Port Watch',
      location: 'Port Gellhorn',
      trend: 'Port Gellhorn is watching',
      views: '2.4M',
      likes: '211K',
      reposts: '42K',
      caption: "Whoever planned this forgot the part after 'get the money.'",
      comments: [
        { handle: '@docksidebenny', text: 'the getaway had one job' },
        { handle: '@gellhornwatcher', text: 'this plan needed a second draft' },
        {
          handle: '@nightshiftnews',
          text: 'the receipts are arriving faster than help',
        },
      ],
    },
    news: {
      headline: 'Port Gellhorn incident triggers multi-agency response',
      subheadline:
        'Authorities are reviewing a rapidly spreading public media capture from the waterfront district.',
      ticker: [
        'Harbor access temporarily restricted',
        'Response units surveying the surrounding blocks',
        'Footage review underway across multiple agencies',
      ],
    },
    police: {
      classification: 'High-risk property incident',
      status: 'Scene containment active',
      threatLevel: 'High',
      unitsDispatched: 9,
      responseLevel: 4,
      flags: ['Property damage', 'Evidence review', 'Multi-unit response'],
    },
    report: {
      chaosScore: 94,
      propertyDamage: '$410K',
      publicSentiment: 'Plan B never arrived',
      finalStatus: 'Case closed / receipts archived',
      summary:
        'A failed score reached 2.4M feeds, triggered a waterfront breaking-news cycle, and brought a Level 4 response to Port Gellhorn.',
    },
  },
  'beach-mayhem': {
    social: {
      handle: '@coastlinechaos',
      displayName: 'Coastline Chaos',
      location: 'Vice Beach',
      trend: 'Weekend trend // Vice Beach',
      views: '1.3M',
      likes: '151K',
      reposts: '19K',
      caption: 'Vice Beach has revoked everyone’s weekend privileges.',
      comments: [
        {
          handle: '@sandbarregular',
          text: 'the beach was quiet for almost eleven minutes',
        },
        {
          handle: '@sunburntsteve',
          text: 'not the vacation content I ordered',
        },
        {
          handle: '@pierpressure',
          text: 'somebody tell the lifeguards nothing is normal',
        },
      ],
    },
    news: {
      headline: 'Chaotic beach incident draws massive online audience',
      subheadline:
        'A sun-soaked disturbance has become the district’s most replayed clip of the night.',
      ticker: [
        'Promenade cleanup crews deployed overnight',
        'Visitors advised to follow coastal notices',
        'Local feed engagement continues to surge',
      ],
    },
    police: {
      classification: 'Public disturbance',
      status: 'Crowd dispersal complete',
      threatLevel: 'Moderate',
      unitsDispatched: 4,
      responseLevel: 2,
      flags: ['Crowd disruption', 'Coastal response', 'Viral media event'],
    },
    report: {
      chaosScore: 74,
      propertyDamage: '$96K',
      publicSentiment: 'Weekend privileges revoked',
      finalStatus: 'Case closed / beach reset pending',
      summary:
        'A Vice Beach disturbance turned into 1.3M views, an LCN bulletin, and a tidy Level 2 coastal response.',
    },
  },
  'celebrity-meltdown': {
    social: {
      handle: '@nightwirevice',
      displayName: 'Night Wire Vice',
      location: 'Vice City',
      trend: 'Trending #1 in Vice City',
      views: '3.1M',
      likes: '342K',
      reposts: '61K',
      caption: 'The apology video is going to need an apology video.',
      comments: [
        {
          handle: '@velvetrope',
          text: 'publicists are forming a support group as we speak',
        },
        {
          handle: '@citylightleonida',
          text: 'fifteen minutes became a whole calendar week',
        },
        { handle: '@flashbulbfeed', text: 'the comments section has no mercy' },
      ],
    },
    news: {
      headline: 'Vice City nightlife incident dominates social media',
      subheadline:
        'A high-profile evening has become a high-volume public spectacle by sunrise.',
      ticker: [
        'Venue representatives decline immediate comment',
        'Online attention pushes local feeds to capacity',
        'Public safety teams confirm a limited response',
      ],
    },
    police: {
      classification: 'High-profile public incident',
      status: 'Media perimeter established',
      threatLevel: 'Moderate',
      unitsDispatched: 5,
      responseLevel: 3,
      flags: ['Crowd attention', 'Media perimeter', 'Public safety review'],
    },
    report: {
      chaosScore: 81,
      propertyDamage: '$58K',
      publicSentiment: 'PR team offline',
      finalStatus: 'Case closed / cameras still rolling',
      summary:
        'A nightlife incident left the venue, consumed 3.1M feeds, and ended with a Level 3 media perimeter in Vice City.',
    },
  },
  'police-chase': {
    social: {
      handle: '@ambrosiaalert',
      displayName: 'Ambrosia Alert',
      location: 'Ambrosia',
      trend: 'Regional alert // Ambrosia',
      views: '4.6M',
      likes: '401K',
      reposts: '88K',
      caption: 'At some point this became everybody’s commute.',
      comments: [
        {
          handle: '@countylinelee',
          text: 'I left for groceries and entered a third act',
        },
        {
          handle: '@roadside_radio',
          text: 'every shortcut became the long way home',
        },
        {
          handle: '@amberlanes',
          text: 'the entire county is watching this at a red light',
        },
      ],
    },
    news: {
      headline: 'Pursuit disrupts traffic through Ambrosia',
      subheadline:
        'Authorities are tracking a fast-moving incident as public footage reaches statewide feeds.',
      ticker: [
        'Highway response units moving into position',
        'Drivers urged to avoid affected routes',
        'Public media capture added to incident review',
      ],
    },
    police: {
      classification: 'Vehicle pursuit',
      status: 'Priority response active',
      threatLevel: 'Critical',
      unitsDispatched: 12,
      responseLevel: 5,
      flags: ['Active pursuit', 'Highway disruption', 'Priority response'],
    },
    report: {
      chaosScore: 99,
      propertyDamage: '$680K',
      publicSentiment: 'Every exit was the wrong exit',
      finalStatus: 'Case closed / routes reopening',
      summary:
        'A moving incident became Leonida’s largest live audience, hit 4.6M feeds, and required a full Level 5 highway response.',
    },
  },
};
