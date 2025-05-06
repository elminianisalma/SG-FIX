export function calculatePriority(impact: string, urgency: string): string {
    const i = impact.toLowerCase();
    const u = urgency.toLowerCase();

    if (i === "haut" && u === "haute") return "P1 (Critique)";
    if ((i === "haut" && u === "moyenne") || (i === "moyen" && u === "haute")) return "P2 (Haute)";
    if ((i === "moyen" && u === "moyenne") || (i === "haut" && u === "faible") || (i === "faible" && u === "haute")) return "P3 (Modérée)";
    return "P4 (Basse)";
}
