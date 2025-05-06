export function calculateSLA(priority: string): string {
    switch (priority) {
        case "P1 (Critique)":
            return "4 heures";
        case "P2 (Haute)":
            return "8 heures";
        case "P3 (Modérée)":
            return "24 heures";
        case "P4 (Basse)":
            return "48 heures";
        default:
            return "Non défini";
    }
}
