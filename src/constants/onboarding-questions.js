/**
 * type = radio | select
 */
export const onboardingQuestions = [
  {
    id: 0,
    question: 'What do you want me to help with?',
    code: 'objective',
    type: 'select',
    options: [
      {
        id: 1,
        body: 'Sleep on time',
      },
      {
        id: 2,
        body: 'Wake up fresh and energised',
      },
      {
        id: 3,
        body: 'Improve focus',
      },
      {
        id: 4,
        body: 'Maintain a healthy lifestyle',
      },
      {
        id: 5,
        body: "Fight insomnia (can't sleep at night)",
      },
      {
        id: 6,
        body: 'Expert consultation',
      },
      {
        id: 7,
        body: 'Just exploring',
      },
    ],
  },
  {
    id: 1,
    question: 'How do you feel when you wake up in the morning?',
    type: 'radio',
    code: 'wakeupfeeling',
    options: [
      {
        id: 1,
        body: 'Refreshed',
      },
      {
        id: 2,
        body: 'Feels like sleeping more',
      },
      {
        id: 3,
        body: 'Tired in the morning',
      },
      {
        id: 4,
        body: 'Tired all-day',
      },
    ],
  },
  {
    id: 2,
    question: 'How much do you sleep every night?',
    type: 'radio',
    code: 'sleephours',
    options: [
      {
        id: 1,
        body: 'Less than 5 hrs',
      },
      {
        id: 2,
        body: '5 to 6 hrs',
      },
      {
        id: 3,
        body: '6 to 7 hrs',
      },
      {
        id: 4,
        body: '7 to 9 hrs',
      },
      {
        id: 5,
        body: 'More than 9 hrs ',
      },
    ],
  },
  {
    id: 3,
    question: 'How much time do you take to fall asleep on a usual night?',
    type: 'radio',
    code: 'timetofallasleep',
    options: [
      {
        id: 1,
        body: '0 to 30 minutes',
      },
      {
        id: 2,
        body: '30 to 60 minutes',
      },
      {
        id: 3,
        body: 'Up to 2 hours',
      },
      {
        id: 4,
        body: 'More than 2 hours',
      },
    ],
  },
  {
    id: 4,
    question: 'What factors affect your sleep?',
    type: 'select',
    code: 'factors',
    options: [
      {
        id: 1,
        body: 'Stress',
      },
      {
        id: 2,
        body: 'Random thoughts',
      },
      {
        id: 3,
        body: 'Body pain',
      },
      {
        id: 4,
        body: 'Illness',
      },
      {
        id: 5,
        body: 'Disturbed sleep schedules',
      },
      {
        id: 6,
        body: "I don't know",
      },
    ],
  },
];
