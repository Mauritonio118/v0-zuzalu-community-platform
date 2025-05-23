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

// Steps for "How it works" section - Intercambiados pasos 2 y 3
export const howItWorksSteps = [
  {
    title: "Apply to the whitelist",
    description: "Submit your application to join the Zuzalu community treasury.",
    icon: "ClipboardList",
  },
  {
    title: "Receive funds in your petty cash",
    description: "Get access to funds for your event expenses.",
    icon: "Wallet",
  },
  {
    title: "Organize an event",
    description: "Plan and prepare your Zuzalu gathering or event.",
    icon: "Calendar",
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

// Past events data
export const pastEventsData = [
  {
    id: 1,
    name: "Zuzalu Montenegro Kickoff",
    date: "March 15, 2024",
    place: "Budva, Montenegro",
    attendees: 120,
    description:
      "Opening ceremony for the Zuzalu Montenegro residency with welcome talks, networking sessions, and community building activities.",
    organizer: "0x1234...5678",
    totalExpenses: 2850,
    links: [
      "https://drive.google.com/folder/zuzalu-montenegro-kickoff",
      "https://twitter.com/zuzalu/status/1234567890",
      "https://www.youtube.com/watch?v=example1",
    ],
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    receipts: [
      { name: "Venue_rental_receipt.pdf", type: "pdf" },
      { name: "Catering_invoice.pdf", type: "pdf" },
      { name: "Equipment_rental.jpg", type: "image" },
    ],
  },
  {
    id: 2,
    name: "Crypto Privacy Workshop",
    date: "April 8, 2024",
    place: "Lisbon, Portugal",
    attendees: 45,
    description:
      "Technical workshop on privacy-preserving technologies in blockchain, featuring hands-on sessions with zero-knowledge proofs and private transactions.",
    organizer: "0xabcd...efgh",
    totalExpenses: 1200,
    links: ["https://github.com/zuzalu/privacy-workshop", "https://twitter.com/zuzalu/status/1234567891"],
    photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    receipts: [
      { name: "Workshop_materials.pdf", type: "pdf" },
      { name: "Refreshments_receipt.jpg", type: "image" },
    ],
  },
  {
    id: 3,
    name: "Longevity Research Symposium",
    date: "May 22, 2024",
    place: "Zurich, Switzerland",
    attendees: 80,
    description:
      "Academic symposium bringing together researchers, biotech entrepreneurs, and longevity enthusiasts to discuss latest breakthroughs in aging research.",
    organizer: "0x9876...5432",
    totalExpenses: 3400,
    links: [
      "https://longevity.zuzalu.org",
      "https://drive.google.com/folder/longevity-symposium",
      "https://www.youtube.com/playlist?list=PLexample",
    ],
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    receipts: [
      { name: "Conference_hall_rental.pdf", type: "pdf" },
      { name: "Speaker_travel_expenses.pdf", type: "pdf" },
      { name: "Lunch_catering.jpg", type: "image" },
      { name: "AV_equipment.pdf", type: "pdf" },
    ],
  },
  {
    id: 4,
    name: "DeFi Security Meetup",
    date: "June 10, 2024",
    place: "Berlin, Germany",
    attendees: 35,
    description:
      "Community meetup focused on DeFi security best practices, smart contract auditing, and recent vulnerability case studies.",
    organizer: "0x5555...7777",
    totalExpenses: 850,
    links: ["https://meetup.com/zuzalu-berlin/events/defi-security", "https://twitter.com/zuzalu/status/1234567892"],
    photos: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    receipts: [
      { name: "Venue_booking.pdf", type: "pdf" },
      { name: "Pizza_and_drinks.jpg", type: "image" },
    ],
  },
  {
    id: 5,
    name: "Regenerative Finance Summit",
    date: "July 5, 2024",
    place: "Costa Rica",
    attendees: 95,
    description:
      "Multi-day summit exploring the intersection of regenerative economics, environmental sustainability, and blockchain technology.",
    organizer: "0x2222...8888",
    totalExpenses: 4200,
    links: [
      "https://regen.zuzalu.org",
      "https://drive.google.com/folder/regen-finance-summit",
      "https://twitter.com/zuzalu/status/1234567893",
      "https://www.instagram.com/zuzalu/posts/regen-summit",
    ],
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    receipts: [
      { name: "Accommodation_expenses.pdf", type: "pdf" },
      { name: "Local_transport.pdf", type: "pdf" },
      { name: "Meals_and_catering.jpg", type: "image" },
      { name: "Activity_materials.pdf", type: "pdf" },
      { name: "Venue_setup.jpg", type: "image" },
    ],
  },
]
