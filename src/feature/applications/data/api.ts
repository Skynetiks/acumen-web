import type { Application } from "./schema";

export const mockApplications: Application[] = [
  {
    id: "1",
    name: "University of Tokyo",
    program: "Engineering",
    degree: "Masters",
    date: "28 April 2025",
  },
  {
    id: "2",
    name: "Kyoto University",
    program: "Natural Sciences",
    degree: "PhD",
    date: "30 May 2025",
  },
  {
    id: "3",
    name: "Osaka University",
    program: "Social Sciences",
    degree: "Bachelors",
    date: "30 May 2025",
  },
  {
    id: "4",
    name: "Tokyo University",
    program: "Medicine / Health Sciences",
    degree: "PhD",
    date: "20 April 2025",
  },
  {
    id: "5",
    name: "Nagoya University",
    program: "Humanities",
    degree: "Masters",
    date: "28 May 2025",
  },
];

// pagination + filters
export async function fetchApplications({
  pageParam = 1,
  pageSize = 10,
  filters = {},
}: {
  pageParam?: number;
  pageSize?: number;
  filters?: {
    search?: string;
    degree?: string;
    program?: string;
    date?: string;
  };
}): Promise<Application[]> {
  // Simulate filtering + pagination on mock data
  const all = mockApplications; // Replace with real API if needed

  let filtered = [...all];
  if (filters.search) {
    filtered = filtered.filter(
      (uni) =>
        uni.name.toLowerCase().includes(filters.search?.toLowerCase() ?? "") ||
        uni.program
          .toLowerCase()
          .includes(filters.search?.toLowerCase() ?? "") ||
        uni.degree
          .toLowerCase()
          .includes(filters.search?.toLowerCase() ?? "") ||
        uni.date.toLowerCase().includes(filters.search?.toLowerCase() ?? "")
    );
  }

  if (filters.degree && filters.degree !== "All") {
    filtered = filtered.filter((uni) =>
      uni.degree.toLowerCase().includes(filters.degree?.toLowerCase() ?? "")
    );
  }

  if (filters.program && filters.program !== "All") {
    filtered = filtered.filter((uni) => uni.program === filters.program);
  }

  if (filters.date) {
    filtered = filtered.filter((uni) => uni.date.includes(filters.date ?? ""));
  }

  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  return filtered.slice(start, end);
}
