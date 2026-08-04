import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"

const sampleData = [
  {
    id: 1,
    header: "Executive Summary",
    type: "Executive Summary",
    status: "Done",
    target: "1,500",
    limit: "2,000",
    reviewer: "Sojib Ahmed",
  },
  {
    id: 2,
    header: "Technical Approach & Architecture",
    type: "Technical Approach",
    status: "In Progress",
    target: "3,000",
    limit: "5,000",
    reviewer: "Assign reviewer",
  },
  {
    id: 3,
    header: "Project Portfolio & Case Studies",
    type: "Capabilities",
    status: "Done",
    target: "2,500",
    limit: "3,000",
    reviewer: "Sojib Ahmed",
  },
  {
    id: 4,
    header: "Security Audit & System Metrics",
    type: "Focus Documents",
    status: "In Progress",
    target: "1,000",
    limit: "1,500",
    reviewer: "Assign reviewer",
  },
  {
    id: 5,
    header: "User Interface & Experience Guidelines",
    type: "Design",
    status: "Done",
    target: "4,000",
    limit: "4,000",
    reviewer: "Sojib Ahmed",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Top Stat Section Cards */}
      <SectionCards />

      {/* Interactive Chart Component */}
      <ChartAreaInteractive />

      {/* Interactive Data Table Component */}
      <div className="px-4 lg:px-6">
        <DataTable data={sampleData} />
      </div>
    </div>
  )
}
