// City page content. Local descriptions are general and unverified: Nick should
// review them before launch (see TODO_FOR_HUMAN.md). No market statistics, no
// rate claims.

export const CITIES = [
  {
    slug: 'las-vegas',
    name: 'Las Vegas',
    county: 'Clark County',
    title: 'Las Vegas Mortgage Loan Officer',
    description:
      'Home loans in Las Vegas, NV with Nick Flores Sr. at SunnyHill Financial. Explore VA, FHA, conventional, jumbo, non-QM, DSCR, and refinance options.',
    h1: 'Las Vegas Mortgage Loan Officer',
    lead:
      'Whether you are buying in Summerlin, refinancing in the southwest valley, or looking at a condo near the Strip, Nick Flores Sr. can walk you through home loan options for Las Vegas.',
    neighborhoods: ['Summerlin', 'Southwest Las Vegas', 'Centennial Hills', 'Downtown and the Arts District', 'Spring Valley'],
    sections: [
      {
        heading: 'A market with many property types',
        body: [
          'Las Vegas offers single-family homes, townhomes, condos, and high-rise units. Different property types can come with different loan considerations. Condos and many planned communities have HOAs, and the HOA’s financials and rules can affect financing. Ask early if the property you are considering is a condo.',
        ],
      },
      {
        heading: 'Programs that come up often in Las Vegas',
        body: [
          'Nellis Air Force Base and the large veteran community make VA loans a frequent topic. Las Vegas also has many self-employed borrowers and workers whose income varies, who sometimes ask about non-QM options. Investors may look at DSCR loans for rentals, and they should check local and HOA rental rules first.',
        ],
      },
      {
        heading: 'Start with a conversation',
        body: [
          'Talking through your goals first makes it easier to see which program deserves a closer look. Use the form below, call Nick directly, or start with the pricing and application links.',
        ],
      },
    ],
    featuredPrograms: [
      { slug: 'va-loans', note: 'For eligible veterans and service members, including those near Nellis AFB.' },
      { slug: 'non-qm-loans', note: 'For borrowers with variable or self-employed income.' },
      { slug: 'dscr-investor-loans', note: 'For investors buying rental property.' },
      { slug: 'first-time-buyer', note: 'A roadmap if this is your first home.' },
    ],
    faq: [
      {
        q: 'Do I need a different loan for a condo in Las Vegas?',
        a: 'Not a different loan type necessarily, but the condo project itself can be reviewed. Ask your loan officer about the building and its HOA early.',
      },
      {
        q: 'Can I get a mortgage if my income varies?',
        a: 'Some programs review income differently. Talk with Nick about your situation and what documentation fits.',
      },
      {
        q: 'Do you work with buyers in North Las Vegas?',
        a: 'Please reach out and ask about the specific area. Nick serves the Las Vegas valley.',
      },
    ],
    nearby: ['henderson', 'reno', 'sparks'],
  },
  {
    slug: 'henderson',
    name: 'Henderson',
    county: 'Clark County',
    title: 'Henderson, NV Mortgage Loan Officer',
    description:
      'Home loans in Henderson, NV with Nick Flores Sr. at SunnyHill Financial. Explore jumbo, conventional, VA, FHA, and refinance options for Henderson homes.',
    h1: 'Henderson, NV Mortgage Loan Officer',
    lead:
      'From Green Valley to Anthem and Inspirada, Henderson has a mix of established and newer master-planned communities. Nick Flores Sr. can help you compare loan options for a Henderson home.',
    neighborhoods: ['Green Valley', 'Anthem', 'Inspirada', 'Lake Las Vegas', 'Seven Hills'],
    sections: [
      {
        heading: 'Master-planned living and HOAs',
        body: [
          'Many Henderson neighborhoods are master-planned communities with HOAs, and some include age-restricted communities. HOA dues and rules affect your monthly budget and sometimes your financing. Include them when you compare homes.',
        ],
      },
      {
        heading: 'New construction',
        body: [
          'Henderson has had significant new-home construction. If you are considering a builder, ask about timelines, rate-lock options, and whether the builder offers incentives tied to a preferred lender. Compare any incentive with your overall costs, and ask for the details in writing.',
        ],
      },
      {
        heading: 'Higher price points',
        body: [
          'Some Henderson homes, especially in golf and lakefront communities, may exceed the conforming loan limit and call for a jumbo loan. If that sounds like your situation, start early so you know what documentation to prepare.',
        ],
      },
    ],
    featuredPrograms: [
      { slug: 'jumbo-loans', note: 'For higher-priced homes above the conforming limit.' },
      { slug: 'conventional-loans', note: 'A common path for primary and second homes.' },
      { slug: 'refinance', note: 'For current Henderson homeowners reviewing their loan.' },
      { slug: 'va-loans', note: 'For eligible veterans and service members.' },
    ],
    faq: [
      {
        q: 'Can I finance a home in an age-restricted community?',
        a: 'Often yes, but the community’s rules apply to who can live there. Ask your agent and your loan officer early.',
      },
      {
        q: 'Should I use the builder’s preferred lender?',
        a: 'You can compare. Ask for a written estimate from each lender and weigh any incentive against the total cost.',
      },
      {
        q: 'Is Henderson a jumbo market?',
        a: 'Some homes are above the conforming limit and some are not. It depends on the price and the loan amount.',
      },
    ],
    nearby: ['las-vegas', 'reno', 'sparks'],
  },
  {
    slug: 'reno',
    name: 'Reno',
    county: 'Washoe County',
    title: 'Reno, NV Mortgage Loan Officer',
    description:
      'Home loans in Reno, NV with Nick Flores Sr. at SunnyHill Financial. Explore first-time buyer, conventional, VA, FHA, jumbo, and refinance options in Northern Nevada.',
    h1: 'Reno, NV Mortgage Loan Officer',
    lead:
      'Northern Nevada has its own rhythm: mountains, winters, and a mix of neighborhoods from Midtown to South Reno. Nick Flores Sr. can help you compare mortgage options for a Reno home.',
    neighborhoods: ['Midtown', 'South Reno and Damonte Ranch', 'Somersett', 'Caughlin Ranch', 'Old Southwest'],
    sections: [
      {
        heading: 'Relocating to Northern Nevada',
        body: [
          'Many buyers in the Reno area are relocating from other states. If you are moving, ask how timing works when you are selling a home elsewhere and buying here, and whether you can start a loan before you have sold.',
        ],
      },
      {
        heading: 'Homes with their own considerations',
        body: [
          'Reno includes older homes in established neighborhoods and newer homes in communities like Somersett and Damonte Ranch. Older homes may involve more appraisal and inspection questions, and homes near wooded or hilly areas may involve additional insurance considerations. Get quotes for homeowners insurance early so your budget is accurate.',
        ],
      },
      {
        heading: 'Second homes and Tahoe access',
        body: [
          'Reno’s proximity to Lake Tahoe and the Sierra means some buyers look at second homes or vacation properties. Financing a second home can follow different guidelines than a primary residence. Ask about down payment and occupancy rules.',
        ],
      },
    ],
    featuredPrograms: [
      { slug: 'first-time-buyer', note: 'A roadmap if you are buying your first Reno home.' },
      { slug: 'fha-loans', note: 'One option many first-time buyers explore.' },
      { slug: 'conventional-loans', note: 'A common path for primary and second homes.' },
      { slug: 'refinance', note: 'For Reno homeowners reviewing their current loan.' },
    ],
    faq: [
      {
        q: 'Can I start a loan before I sell my current home?',
        a: 'It depends on your situation. Talk with Nick about timing as early as possible.',
      },
      {
        q: 'Does homeowners insurance affect my loan?',
        a: 'Yes. Insurance is part of your monthly cost and is required for your loan. Get a quote early.',
      },
      {
        q: 'Do you help with second homes?',
        a: 'Talk with Nick about your plans. Second home guidelines differ from those for a primary residence.',
      },
    ],
    nearby: ['sparks', 'las-vegas', 'henderson'],
  },
  {
    slug: 'sparks',
    name: 'Sparks',
    county: 'Washoe County',
    title: 'Sparks, NV Mortgage Loan Officer',
    description:
      'Home loans in Sparks, NV with Nick Flores Sr. at SunnyHill Financial. Explore FHA, VA, conventional, and refinance options for Sparks and Spanish Springs homes.',
    h1: 'Sparks, NV Mortgage Loan Officer',
    lead:
      'Sparks sits right next to Reno and includes newer subdivisions and larger-lot properties. Nick Flores Sr. can help you compare loan options for a Sparks home.',
    neighborhoods: ['Spanish Springs', 'Wingfield Springs', 'Sparks Marina', 'Victorian Square'],
    sections: [
      {
        heading: 'Close to Reno, with its own character',
        body: [
          'Many buyers look at Sparks and Reno together. Loan options are mostly the same across both cities, though each home can bring its own considerations. If you are comparing both, you can use our Reno page too.',
        ],
      },
      {
        heading: 'Larger lots and rural-style properties',
        body: [
          'Parts of Spanish Springs and the surrounding area have larger lots. Properties with more acreage, a well, or a septic system can come with extra requirements, and some loan programs have limits on acreage or property use. Ask about this before you fall in love with a home.',
        ],
      },
      {
        heading: 'Newer subdivisions',
        body: [
          'Sparks has newer communities, including areas like Wingfield Springs. For new construction, ask about builder timelines and how the loan fits into the build schedule.',
        ],
      },
    ],
    featuredPrograms: [
      { slug: 'fha-loans', note: 'One option many buyers explore.' },
      { slug: 'va-loans', note: 'For eligible veterans and service members.' },
      { slug: 'conventional-loans', note: 'A common path for primary and second homes.' },
      { slug: 'refinance', note: 'For Sparks homeowners reviewing their loan.' },
    ],
    faq: [
      {
        q: 'Can I finance a home with acreage?',
        a: 'Often, but guidelines vary by program. Ask before you make an offer.',
      },
      {
        q: 'Does a well or septic system change the loan?',
        a: 'It can add property requirements. Your loan officer can explain what to expect.',
      },
      {
        q: 'Should I compare Sparks and Reno?',
        a: 'Many buyers do. Compare homes, HOA dues, and total monthly costs, not just the purchase price.',
      },
    ],
    nearby: ['reno', 'las-vegas', 'henderson'],
  },
];

export const getCity = (slug) => CITIES.find((c) => c.slug === slug);
