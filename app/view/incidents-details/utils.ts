export interface DocumentationFormData {
  documentationTitle: string;
  documentationDate: string;
  rootCause: string;
  actionsTaken: string;
  resolutionSteps: string;
  preventiveMeasures?: string;
  submittedBy: { name: string; email: string };
}

export interface DocumentationEntry {
  id: string;
  formData: DocumentationFormData;
  createdAt: string;
}


export const COLORS = {
  border: "#E5E7EB",
  brand: "#3B82F6",
  dusk: "#4A90E2",
};

// Props interface for the component, updated for Next.js dynamic route
export interface DetailedIncidentInfoProps {
  params: {
    id: string; // ID comes from the dynamic route parameter
  };
}