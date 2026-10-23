// Loan program content. General education only.
// Never hardcode loan limits, minimums, rates, or program rules here. Anything
// that depends on current guidelines goes in `guidelines` as a [[VERIFY]] item.

export const PROGRAMS = [
  {
    slug: 'va-loans',
    name: 'VA Loans',
    short: 'VA',
    title: 'VA Home Loans in Nevada',
    description:
      'Learn how VA home loans work for eligible service members and veterans in Nevada, and talk with Nick Flores Sr. at SunnyHill Financial about your options.',
    h1: 'VA Home Loans for Nevada Veterans and Service Members',
    lead:
      'VA loans are a home financing benefit for eligible veterans, active-duty service members, and certain surviving spouses. They are backed by the U.S. Department of Veterans Affairs and offered through approved lenders.',
    sections: [
      {
        heading: 'Who may be eligible',
        body: [
          'Eligibility is based on your service history and is confirmed through VA documentation, commonly a Certificate of Eligibility. Your loan officer can help you figure out what you need to request.',
          'Having service history does not by itself mean a loan will be approved. Income, credit, assets, and the property all still go through underwriting.',
        ],
      },
      {
        heading: 'What to think about before you apply',
        body: [
          'VA loans can be used for a home purchase or a refinance. Ask how the VA funding fee, if one applies to you, would affect your costs, and whether any exemption could apply.',
          'The property generally has to meet VA property requirements and be intended as your primary residence. Your loan officer can explain how that affects the homes you are considering in Las Vegas, Henderson, Reno, or Sparks.',
        ],
      },
      {
        heading: 'Nevada considerations',
        body: [
          'Nevada has a significant military and veteran community, including around Nellis Air Force Base near Las Vegas. Many master-planned neighborhoods have HOAs, so factor HOA dues into your monthly budget when you compare homes.',
        ],
      },
    ],
    guidelines: [
      'Current VA loan limits and entitlement rules for your county',
      'Down payment requirements, if any',
      'VA funding fee amounts and exemptions',
      'Credit and income guidelines used by SunnyHill Financial for VA loans',
    ],
    faq: [
      {
        q: 'Do I need a Certificate of Eligibility before I talk to a loan officer?',
        a: 'No. You can start a conversation first. Your loan officer can explain how to request the documentation.',
      },
      {
        q: 'Can I use a VA loan to refinance?',
        a: 'VA refinance options exist for eligible borrowers. Which option fits depends on your current loan and goals, so ask about the specifics for your situation.',
      },
      {
        q: 'Can I use a VA loan for an investment property?',
        a: 'VA loans are generally intended for a primary residence. If you are buying an investment property, see our DSCR and investor loan page.',
      },
    ],
    related: ['fha-loans', 'conventional-loans', 'refinance'],
  },
  {
    slug: 'fha-loans',
    name: 'FHA Loans',
    short: 'FHA',
    title: 'FHA Home Loans in Nevada',
    description:
      'Understand how FHA loans work for Nevada home buyers and where they may fit. Talk with Nick Flores Sr. at SunnyHill Financial about your options.',
    h1: 'FHA Home Loans for Nevada Buyers',
    lead:
      'FHA loans are insured by the Federal Housing Administration. Buyers often look at them when they want to explore financing with a smaller down payment or a credit history that is still being rebuilt.',
    sections: [
      {
        heading: 'How FHA loans work',
        body: [
          'The government insurance backs the lender, which is why guidelines can be more flexible than some other programs. In exchange, FHA loans carry mortgage insurance costs that become part of your monthly payment and upfront costs.',
          'FHA loans can be used to buy a primary residence and, in some cases, for certain refinance transactions.',
        ],
      },
      {
        heading: 'Questions worth asking',
        body: [
          'How would mortgage insurance change my monthly payment compared with a conventional loan? How long would the insurance last? Would I be better served by another program once my down payment or credit improves?',
          'Your loan officer can walk through a side-by-side comparison using your actual numbers, so you are comparing real estimates and not generalities.',
        ],
      },
      {
        heading: 'Property condition matters',
        body: [
          'FHA appraisals include property condition standards. A home that needs significant repairs may need the work completed, or a different financing plan. Ask about this early when you tour homes.',
        ],
      },
    ],
    guidelines: [
      'Current FHA loan limits for Clark County and Washoe County',
      'Minimum down payment and credit score guidelines',
      'Mortgage insurance premium amounts and duration',
      'Debt-to-income guidelines used by SunnyHill Financial for FHA loans',
    ],
    faq: [
      {
        q: 'Is an FHA loan only for first-time buyers?',
        a: 'No. First-time and repeat buyers can both ask about FHA loans. Eligibility depends on the program guidelines and your finances.',
      },
      {
        q: 'Will I pay mortgage insurance?',
        a: 'FHA loans include mortgage insurance. The details, amounts, and how long it applies depend on the loan and current rules.',
      },
      {
        q: 'Can gift funds be used for a down payment?',
        a: 'Gift funds are often allowed with proper documentation. Ask your loan officer what documentation is needed in your case.',
      },
    ],
    related: ['first-time-buyer', 'conventional-loans', 'va-loans'],
  },
  {
    slug: 'conventional-loans',
    name: 'Conventional Loans',
    short: 'Conventional',
    title: 'Conventional Home Loans in Nevada',
    description:
      'A plain-English look at conventional mortgages for Nevada buyers and homeowners. Talk with Nick Flores Sr. at SunnyHill Financial about fixed and adjustable options.',
    h1: 'Conventional Mortgages in Nevada',
    lead:
      'Conventional loans are not insured or guaranteed by a government agency. Many follow guidelines set by Fannie Mae and Freddie Mac and are a common choice for buyers and homeowners with stable income and established credit.',
    sections: [
      {
        heading: 'Fixed and adjustable options',
        body: [
          'A fixed-rate loan keeps the same interest rate for the life of the loan. An adjustable-rate mortgage starts with a fixed period and can change afterward based on its terms. An adjustable loan can cost more or less over time, so ask for a clear explanation of how adjustments, caps, and your plans for the home fit together.',
        ],
      },
      {
        heading: 'Mortgage insurance and down payment',
        body: [
          'With a smaller down payment, conventional loans typically involve private mortgage insurance. With a larger down payment, that cost may not apply. Your loan officer can show how different down payment amounts change your estimated monthly payment.',
        ],
      },
      {
        heading: 'When conventional may fit',
        body: [
          'Buyers purchasing primary homes, second homes, or investment properties may all look at conventional financing, subject to program rules. If the loan amount is above the conforming loan limit, a jumbo loan may be the next step to explore.',
        ],
      },
    ],
    guidelines: [
      'Current conforming loan limits for Clark County and Washoe County',
      'Minimum down payment and credit score guidelines',
      'Private mortgage insurance requirements',
      'Debt-to-income and reserve guidelines used by SunnyHill Financial',
    ],
    faq: [
      {
        q: 'What is the difference between conventional and FHA?',
        a: 'Conventional loans are not government-insured and FHA loans are. Costs, mortgage insurance, and qualification guidelines differ, so compare them using your own numbers.',
      },
      {
        q: 'Can I use a conventional loan for a second home or investment property?',
        a: 'Often yes, subject to program rules. Terms for second homes and investment properties can differ from primary residences.',
      },
      {
        q: 'What if my loan amount is above the conforming limit?',
        a: 'That is typically when a jumbo loan comes into the picture. See our jumbo loan page.',
      },
    ],
    related: ['jumbo-loans', 'fha-loans', 'refinance'],
  },
  {
    slug: 'jumbo-loans',
    name: 'Jumbo Loans',
    short: 'Jumbo',
    title: 'Jumbo Home Loans in Nevada',
    description:
      'Learn when a jumbo mortgage may apply for higher-priced Nevada homes in Las Vegas, Henderson, Reno, and Sparks. Talk with Nick Flores Sr. at SunnyHill Financial.',
    h1: 'Jumbo Mortgages for Higher-Priced Nevada Homes',
    lead:
      'A jumbo loan is a mortgage for an amount above the conforming loan limit. Buyers in areas like Henderson, Summerlin, and parts of the Reno area may run into this threshold on higher-priced homes.',
    sections: [
      {
        heading: 'How jumbo loans differ',
        body: [
          'Because they are not eligible for purchase by Fannie Mae or Freddie Mac, jumbo loans follow investor-specific guidelines. These can involve more documentation, larger reserves, and a more detailed review of assets and income.',
        ],
      },
      {
        heading: 'Plan ahead',
        body: [
          'Start the conversation before you shop. Knowing how much documentation to gather, and how a larger down payment or a different structure could change your options, helps you move quickly when you find a home.',
          'Some buyers use jumbo financing for primary homes, second homes, or luxury and golf-community properties. Eligibility for each property type depends on the investor guidelines.',
        ],
      },
    ],
    guidelines: [
      'The current conforming loan limit for Clark County and Washoe County',
      'Maximum loan amounts available through SunnyHill Financial',
      'Down payment, credit score, and reserve guidelines',
      'Eligible property types and occupancy',
    ],
    faq: [
      {
        q: 'How do I know if I need a jumbo loan?',
        a: 'If your loan amount is above the conforming limit for the county where the home is located, a jumbo loan may be needed. Your loan officer can confirm the current limit.',
      },
      {
        q: 'Do jumbo loans require more paperwork?',
        a: 'Often they involve a more detailed review of income and assets. Ask what to gather before you start.',
      },
      {
        q: 'Can I get a jumbo loan for a second home?',
        a: 'Some investors allow it. Availability depends on the property and the guidelines in effect.',
      },
    ],
    related: ['conventional-loans', 'non-qm-loans', 'refinance'],
  },
  {
    slug: 'non-qm-loans',
    name: 'Non-QM Loans',
    short: 'Non-QM',
    title: 'Non-QM Home Loans in Nevada',
    description:
      'Explore non-QM loan options for Nevada borrowers with self-employed or non-traditional income. Talk with Nick Flores Sr. at SunnyHill Financial to see what may fit.',
    h1: 'Non-QM Loans for Nevada Borrowers with Non-Traditional Income',
    lead:
      'Non-QM, or non-qualified mortgage, loans are designed for borrowers who may not fit standard agency documentation. They can be a fit for some self-employed borrowers, business owners, and people with income that varies.',
    sections: [
      {
        heading: 'Who looks at non-QM',
        body: [
          'Las Vegas and Reno have many business owners, entrepreneurs, and workers in industries with variable or tip-based income. If your tax returns do not tell the full story of your income, non-QM programs may let a lender review your finances in a different way, such as through bank statements.',
        ],
      },
      {
        heading: 'What to keep in mind',
        body: [
          'Non-QM loans are not available for every situation. Pricing, down payment requirements, and documentation depend on the investor. They may cost more than standard loans. Ask for a clear comparison and consider whether a standard option could work first.',
          'Programs, terms, and availability can change. Your loan officer can tell you what is currently offered.',
        ],
      },
    ],
    guidelines: [
      'Which non-QM programs SunnyHill Financial currently offers',
      'Income documentation options, such as bank statements',
      'Minimum down payment, credit score, and reserve guidelines',
      'Eligible property types and states',
    ],
    faq: [
      {
        q: 'Is a non-QM loan the same as a bad-credit loan?',
        a: 'Not necessarily. Non-QM refers to loans that do not follow standard qualified-mortgage guidelines, which can be about how income is documented or about the property.',
      },
      {
        q: 'Do I still have to document my income?',
        a: 'Yes. The documentation may be different, for example bank statements instead of tax returns, but a lender still needs to evaluate your ability to repay.',
      },
      {
        q: 'Will a non-QM loan cost more?',
        a: 'It can. Compare it with other options and ask your loan officer about the trade-offs.',
      },
    ],
    related: ['dscr-investor-loans', 'jumbo-loans', 'conventional-loans'],
  },
  {
    slug: 'dscr-investor-loans',
    name: 'DSCR and Investor Loans',
    short: 'DSCR / Investor',
    title: 'DSCR and Investor Loans in Nevada',
    description:
      'Learn how DSCR loans evaluate a rental property by its income instead of your personal income. Nevada real estate investors can talk with Nick Flores Sr. at SunnyHill Financial.',
    h1: 'DSCR and Investor Loans for Nevada Rental Properties',
    lead:
      'A DSCR, or debt service coverage ratio, loan looks at whether a rental property can support its own payment. Real estate investors sometimes use them when personal income is hard to document or when they are growing a portfolio.',
    sections: [
      {
        heading: 'How DSCR is evaluated',
        body: [
          'In simple terms, the lender compares the property’s expected rental income with the monthly costs of owning it, including the loan payment, taxes, insurance, and any HOA dues. The ratio helps determine whether the property is a fit.',
        ],
      },
      {
        heading: 'Before you buy a rental in Nevada',
        body: [
          'Short-term rental rules vary by city and by HOA. Before you buy a property that you plan to rent, confirm what the local jurisdiction and the HOA allow, since that affects the income you can reasonably expect.',
          'DSCR and investor loans can be used to purchase or refinance. Documentation, down payment, and reserves vary by program.',
        ],
      },
    ],
    guidelines: [
      'Minimum DSCR ratio and how rental income is determined',
      'Down payment, credit score, and reserve guidelines for investment properties',
      'Eligible property types, including short-term rentals',
      'Prepayment penalty terms, if any',
    ],
    faq: [
      {
        q: 'Do I need to show my personal income for a DSCR loan?',
        a: 'These programs focus on the property’s income, but you should still expect to document other items. Ask your loan officer what a specific program requires.',
      },
      {
        q: 'Can I use a DSCR loan on a short-term rental?',
        a: 'It depends on the program and the property. Confirm local and HOA rules too.',
      },
      {
        q: 'Is this the same as a conventional investment property loan?',
        a: 'No. Conventional loans for investment properties usually rely on your personal income. DSCR loans rely more on the property’s income.',
      },
    ],
    related: ['non-qm-loans', 'conventional-loans', 'refinance'],
  },
  {
    slug: 'refinance',
    name: 'Refinance',
    short: 'Refinance',
    title: 'Mortgage Refinance in Nevada',
    description:
      'Understand rate-and-term and cash-out refinancing for Nevada homeowners, including costs and break-even. Talk with Nick Flores Sr. at SunnyHill Financial.',
    h1: 'Mortgage Refinancing for Nevada Homeowners',
    lead:
      'Refinancing replaces your current mortgage with a new one. People refinance for different reasons, such as changing the loan term, changing the type of loan, or using home equity. Whether it makes sense depends on your numbers and goals.',
    sections: [
      {
        heading: 'Common reasons to refinance',
        body: [
          'A rate-and-term refinance changes the interest rate, the term, or both. A cash-out refinance borrows against your equity. Some homeowners also refinance to move from an adjustable loan to a fixed one, or to remove a borrower from the loan.',
        ],
      },
      {
        heading: 'Weigh the costs',
        body: [
          'Refinancing has closing costs, and a lower payment is not guaranteed. Extending the term could reduce your monthly payment but increase the total interest you pay over time. A useful exercise is a break-even estimate: how long it would take for any monthly savings to cover your costs, and whether you expect to stay in the home that long.',
          'Our educational mortgage calculator can help you explore scenarios, though it is an estimate only.',
        ],
      },
    ],
    guidelines: [
      'Which refinance programs SunnyHill Financial currently offers',
      'Maximum loan-to-value limits for cash-out and rate-and-term',
      'Seasoning requirements and eligible occupancy types',
      'Typical closing costs and how they are quoted',
    ],
    faq: [
      {
        q: 'How do I know if a refinance makes sense?',
        a: 'Compare your current loan with the new one, including closing costs, term, and how long you plan to stay in the home.',
      },
      {
        q: 'What is a cash-out refinance?',
        a: 'It replaces your mortgage with a larger one and gives you the difference in cash. It increases your loan balance, so consider the cost carefully.',
      },
      {
        q: 'Will refinancing hurt my credit?',
        a: 'A credit inquiry and new account can have an effect. Ask your loan officer what to expect.',
      },
    ],
    related: ['conventional-loans', 'fha-loans', 'va-loans'],
  },
  {
    slug: 'first-time-buyer',
    name: 'First-Time Buyer',
    short: 'First-Time Buyer',
    title: 'First-Time Home Buyer Loans in Nevada',
    description:
      'A step-by-step look at the home buying process for first-time buyers in Las Vegas, Henderson, Reno, and Sparks. Talk with Nick Flores Sr. at SunnyHill Financial.',
    h1: 'First-Time Home Buyer Guidance in Nevada',
    lead:
      'Buying your first home involves a lot of unfamiliar steps. Starting a conversation with a loan officer early helps you understand your options, build a realistic budget, and avoid surprises later.',
    sections: [
      {
        heading: 'A simple roadmap',
        body: [
          'Talk with a loan officer, gather your documents, get pre-approved, shop for a home with a real estate agent, make an offer, and complete underwriting and closing. A pre-approval is a lender review of your information. It is not a commitment to lend, and your final approval depends on the property and on underwriting.',
        ],
      },
      {
        heading: 'Get organized early',
        body: [
          'Your loan officer will tell you exactly what is needed. In general, expect to provide identification, income documentation, and statements for your accounts. Avoid large unexplained deposits and new debt while you are in the process, and ask before making big financial changes.',
        ],
      },
      {
        heading: 'Down payment help',
        body: [
          'State and local down payment assistance programs may exist for eligible buyers in Nevada. Availability, eligibility, and terms vary and change, so ask about what is currently available.',
          'Compare loan types for your situation. First-time buyers often look at FHA and conventional options, and VA loans if they are eligible.',
        ],
      },
    ],
    guidelines: [
      'Nevada and local down payment assistance programs currently available',
      'Which loan programs SunnyHill Financial recommends for first-time buyers',
      'Minimum down payment and credit guidelines by program',
      'Typical timeline from pre-approval to closing',
    ],
    faq: [
      {
        q: 'When should I talk to a loan officer?',
        a: 'Before you start touring homes. It helps you set a realistic budget and be ready to act.',
      },
      {
        q: 'What is the difference between pre-qualification and pre-approval?',
        a: 'Terms vary by lender. Generally a pre-approval involves a more thorough review of your documents than a quick estimate. Neither is a commitment to lend.',
      },
      {
        q: 'How much should I have saved?',
        a: 'It depends on the program, price, and closing costs. Your loan officer can estimate it with your numbers.',
      },
    ],
    related: ['fha-loans', 'conventional-loans', 'va-loans'],
  },
];

export const getProgram = (slug) => PROGRAMS.find((p) => p.slug === slug);
