export interface DashboardItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: "excel" | "powerbi";
  description?: string;
  tags?: string[];
}

export const excelDashboards: DashboardItem[] = [
  {
    id: "excel-1",
    title: "Executive Sales Dashboard",
    subtitle: "Revenue, Trends & Regional Performance",
    image: "/images/dashboards/excel/excel-dashboard-1.png",
    category: "excel",
    description: "Multi-parameter sales analytics dashboard featuring automated timeline filters, MoM revenue variances, and regional sales distribution.",
    tags: ["Sales Analytics", "KPIs", "Revenue Modeling"]
  },
  {
    id: "excel-2",
    title: "Operations & Resource Dashboard",
    subtitle: "Operational Efficiency & Target Tracking",
    image: "/images/dashboards/excel/excel-dashboard-2.png",
    category: "excel",
    description: "Operational performance dashboard tracking team deliverables, milestone completions, and resource allocation metrics.",
    tags: ["Operations", "Productivity", "Resource Tracking"]
  },
  {
    id: "excel-3",
    title: "Financial Overview & P&L Dashboard",
    subtitle: "Cashflow, Margin Analysis & Projections",
    image: "/images/dashboards/excel/excel-dashboard-3.png",
    category: "excel",
    description: "Executive financial summary consolidating income statements, margin variances, and monthly cost optimization breakdowns.",
    tags: ["Financial Analysis", "Cashflow", "Budgeting"]
  },
  {
    id: "excel-4",
    title: "Inventory & Logistics Tracker",
    subtitle: "Stock Levels, Fulfillment & Supply Velocity",
    image: "/images/dashboards/excel/excel-dashboard-4.png",
    category: "excel",
    description: "Real-time inventory intelligence model providing reorder alerts, warehouse stock aging, and supplier fulfillment metrics.",
    tags: ["Supply Chain", "Inventory Control", "Fulfillment"]
  },
  {
    id: "excel-hlookup",
    title: "Dynamic HLOOKUP Architecture",
    subtitle: "Horizontal Matrix Retrieval & Lookups",
    image: "/images/dashboards/excel/excel-hlookup-model.png",
    category: "excel",
    description: "Automated lookup matrix utilizing nested HLOOKUP & MATCH logic to dynamically pull horizontal records without manual interventions.",
    tags: ["HLOOKUP", "Formulas", "Automated Matching"]
  },
  {
    id: "excel-pivot",
    title: "Advanced Pivot Table Analysis",
    subtitle: "Multi-Dimensional Drilldown & Slicers",
    image: "/images/dashboards/excel/excel-pivot-table-report.png",
    category: "excel",
    description: "Complex pivot reporting architecture with calculated fields, dynamic timeline slicers, and structured data summaries.",
    tags: ["Pivot Tables", "Data Slicing", "Summary Reports"]
  },
  {
    id: "excel-vlookup",
    title: "Advanced VLOOKUP Multi-Dataset Model",
    subtitle: "Cross-Table Data Reconciliation",
    image: "/images/dashboards/excel/excel-vlookup-analysis.png",
    category: "excel",
    description: "Robust data validation and cross-referencing model employing dynamic VLOOKUP pipelines for high-accuracy master data consolidation.",
    tags: ["VLOOKUP", "Data Cleaning", "Master Reconciliation"]
  }
];

export const powerBIDashboards: DashboardItem[] = [
  {
    id: "powerbi-1",
    title: "Enterprise Sales & Revenue Analytics",
    subtitle: "Interactive Multi-Channel Sales Intelligence",
    image: "/images/dashboards/powerbi/powerbi-dashboard-1.png",
    category: "powerbi",
    description: "Interactive Power BI intelligence suite with drill-down hierarchies, customer segment breakdowns, and real-time revenue KPIs.",
    tags: ["Power BI", "DAX", "Sales Intelligence"]
  },
  {
    id: "powerbi-2",
    title: "Executive KPI & Business Operations Overview",
    subtitle: "Cross-Functional Executive Decision Dashboard",
    image: "/images/dashboards/powerbi/powerbi-dashboard-2.png",
    category: "powerbi",
    description: "Comprehensive executive dashboard consolidating organizational KPIs, performance benchmarks, and automated forecast trends.",
    tags: ["Executive KPIs", "Business Intelligence", "Data Modeling"]
  },
  {
    id: "powerbi-3",
    title: "Performance & Operational Analytics",
    subtitle: "Departmental Delivery & Efficiency Tracking",
    image: "/images/dashboards/powerbi/powerbi-dashboard-3.png",
    category: "powerbi",
    description: "Advanced operational reporting tool providing departmental efficiency tracking, workflow bottlenecks, and throughput metrics.",
    tags: ["Operations", "Throughput", "Cloud Reporting"]
  }
];
