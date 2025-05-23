// Treasury data
export const treasuryData = {
  principal: 1000000,
  accumulatedYields: 53500,
  expenses: 12750,
  nextDistribution: "July 15, 2025",
}

// Monthly history data for charts
export const monthlyHistoryData = [
  {
    month: "Jan",
    principal: 1000000,
    yield: 8500,
    expenses: 2100,
  },
  {
    month: "Feb",
    principal: 1000000,
    yield: 8700,
    expenses: 1950,
  },
  {
    month: "Mar",
    principal: 1000000,
    yield: 8900,
    expenses: 2300,
  },
  {
    month: "Apr",
    principal: 1000000,
    yield: 9100,
    expenses: 2200,
  },
  {
    month: "May",
    principal: 1000000,
    yield: 9200,
    expenses: 2100,
  },
  {
    month: "Jun",
    principal: 1000000,
    yield: 9100,
    expenses: 2100,
  },
]

// New treasury timeline data for the line chart
export const treasuryTimelineData = [
  {
    date: "2024-01",
    principal: 800000,
    totalFunds: 800000,
    periodReturns: 0,
    periodExpenses: 0,
  },
  {
    date: "2024-02",
    principal: 800000,
    totalFunds: 815000,
    periodReturns: 15000,
    periodExpenses: -2500,
  },
  {
    date: "2024-03",
    principal: 850000,
    totalFunds: 862000,
    periodReturns: 14500,
    periodExpenses: -3200,
  },
  {
    date: "2024-04",
    principal: 850000,
    totalFunds: 875000,
    periodReturns: 16200,
    periodExpenses: -2800,
  },
  {
    date: "2024-05",
    principal: 900000,
    totalFunds: 918000,
    periodReturns: 15800,
    periodExpenses: -2100,
  },
  {
    date: "2024-06",
    principal: 900000,
    totalFunds: 932000,
    periodReturns: 16500,
    periodExpenses: -2400,
  },
  {
    date: "2024-07",
    principal: 950000,
    totalFunds: 968000,
    periodReturns: 18200,
    periodExpenses: -2900,
  },
  {
    date: "2024-08",
    principal: 950000,
    totalFunds: 981000,
    periodReturns: 16800,
    periodExpenses: -3100,
  },
  {
    date: "2024-09",
    principal: 1000000,
    totalFunds: 1015000,
    periodReturns: 17500,
    periodExpenses: -2700,
  },
  {
    date: "2024-10",
    principal: 1000000,
    totalFunds: 1028000,
    periodReturns: 15800,
    periodExpenses: -2600,
  },
  {
    date: "2024-11",
    principal: 1000000,
    totalFunds: 1041000,
    periodReturns: 16200,
    periodExpenses: -3000,
  },
  {
    date: "2024-12",
    principal: 1000000,
    totalFunds: 1053500,
    periodReturns: 15500,
    periodExpenses: -3000,
  },
]

// Fund distribution data for pie chart
export const fundDistributionData = [
  { name: "Events", value: 45 },
  { name: "Meetups", value: 30 },
  { name: "Workshops", value: 15 },
  { name: "Other", value: 10 },
]

// Steps for "How it works" section
export const howItWorksSteps = [
  {
    title: "Apply to the whitelist",
    description: "Submit your application to join the Zuzalu community treasury.",
    icon: "ClipboardList",
  },
  {
    title: "Organize an event",
    description: "Plan and prepare your Zuzalu gathering or event.",
    icon: "Calendar",
  },
  {
    title: "Receive funds in your petty cash",
    description: "Get access to funds for your event expenses.",
    icon: "Wallet",
  },
  {
    title: "Hold the event and upload the report",
    description: "Run your event and document it with photos and receipts.",
    icon: "FileText",
  },
  {
    title: "Receive reimbursement",
    description: "Get reimbursed for expenses and continue organizing events.",
    icon: "RefreshCw",
  },
]
