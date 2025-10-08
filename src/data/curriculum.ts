// Full curriculum: 7 Foundation + 7 Industry modules
export const foundationModules = [
  {
    id: 'foundation-email',
    title: 'Business Email Writing',
    description: 'Write clear, professional emails for business contexts.',
    microsoftLearn: 'https://learn.microsoft.com/en-us/training/modules/write-professional-emails-outlook/',
    youtubeChannel: 'https://www.youtube.com/@bbclearningenglish',
    lessons: [
      { id: 'email-01', title: 'Professional Greetings' },
      { id: 'email-02', title: 'Subject Lines & CTAs' },
      { id: 'email-03', title: 'Polite Requests & Follow-ups' }
    ]
  },
  {
    id: 'foundation-meetings',
    title: 'Meetings & Discussions',
    description: 'Participate confidently in meetings and discussions.',
    microsoftLearn: 'https://learn.microsoft.com/en-us/training/modules/collaborate-effectively-teams/',
    youtubeChannel: 'https://www.youtube.com/@SpeakEnglishWithTiffani',
    lessons: [
      { id: 'meet-01', title: 'Agenda & Objectives' },
      { id: 'meet-02', title: 'Interjections & Turn-taking' }
    ]
  },
  {
    id: 'foundation-presentations',
    title: 'Presentations & Pitching',
    description: 'Create and deliver impactful presentations.',
    microsoftLearn: 'https://learn.microsoft.com/en-us/training/modules/create-impactful-presentations-powerpoint/',
    youtubeChannel: 'https://www.youtube.com/@EnglishwithLucy',
    lessons: [
      { id: 'pres-01', title: 'Openings & Hooks' },
      { id: 'pres-02', title: 'Clear Structure & Signposting' }
    ]
  },
  {
    id: 'foundation-negotiation',
    title: 'Negotiation Skills',
    description: 'Language and strategies for negotiation.',
    microsoftLearn: '',
    youtubeChannel: 'https://www.youtube.com/@Hadarr',
    lessons: [
      { id: 'neg-01', title: 'Preparing & Positioning' },
      { id: 'neg-02', title: 'Bargaining Language' }
    ]
  },
  {
    id: 'foundation-customer-service',
    title: 'Customer Service English',
    description: 'Polite, clear, and effective customer interactions.',
    microsoftLearn: '',
    youtubeChannel: 'https://www.youtube.com/@bbclearningenglish',
    lessons: [
      { id: 'cs-01', title: 'Handling Requests' },
      { id: 'cs-02', title: 'De-escalation & Apologies' }
    ]
  },
  {
    id: 'foundation-grammar',
    title: 'Grammar for Professionals',
    description: 'Applied grammar for writing and speaking in business.',
    microsoftLearn: '',
    youtubeChannel: 'https://www.youtube.com/@EnglishwithLucy',
    lessons: [
      { id: 'gram-01', title: 'Tense & Aspect in Business Writing' },
      { id: 'gram-02', title: 'Modal Verbs for Politeness' }
    ]
  },
  {
    id: 'foundation-cross-cultural',
    title: 'Cross-cultural Communication',
    description: 'Cultural awareness for international workplaces.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [
      { id: 'cc-01', title: 'Formality & Tone' },
      { id: 'cc-02', title: 'Email etiquette across cultures' }
    ]
  }
];

export const industryModules = [
  {
    id: 'industry-sales',
    title: 'English for Sales & Marketing',
    description: 'Persuasion, pitching and customer conversations.',
    microsoftLearn: '',
    youtubeChannel: 'https://www.youtube.com/@SpeakEnglishWithTiffani',
    lessons: [{ id: 'sales-01', title: 'Pitching Essentials' }]
  },
  {
    id: 'industry-hr',
    title: 'English for HR',
    description: 'Recruitment, interviews and employee relations.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [{ id: 'hr-01', title: 'Interview Language' }]
  },
  {
    id: 'industry-finance',
    title: 'English for Finance & Accounting',
    description: 'Reports, numbers and meetings for finance teams.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [{ id: 'fin-01', title: 'Reporting Basics' }]
  },
  {
    id: 'industry-operations',
    title: 'English for Operations & Logistics',
    description: 'Clear operational communication.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [{ id: 'ops-01', title: 'Operations Handover' }]
  },
  {
    id: 'industry-it',
    title: 'English for IT & Tech',
    description: 'Technical handoffs, tickets, and meetings.',
    microsoftLearn: '',
    youtubeChannel: 'https://www.youtube.com/@RachelsEnglish',
    lessons: [{ id: 'it-01', title: 'Explain Technical Issues Simply' }]
  },
  {
    id: 'industry-legal',
    title: 'English for Legal Contexts',
    description: 'Contracts, terms and formal writing.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [{ id: 'legal-01', title: 'Key Legal Phrases' }]
  },
  {
    id: 'industry-hospitality',
    title: 'English for Hospitality & Service',
    description: 'Service excellence and guest interactions.',
    microsoftLearn: '',
    youtubeChannel: '',
    lessons: [{ id: 'hos-01', title: 'Service Language Basics' }]
  }
];

export const allModules = [...foundationModules, ...industryModules];
