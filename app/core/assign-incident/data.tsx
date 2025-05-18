import { Incident } from '@/app/utils/Incidents';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import { IncidentPriority } from '@/app/utils/IncidentPriority';

export const initialIncidents: Incident[] = [
  {
    id: "ID123",
    title: "Erreur de connexion à la base SG_ABS_PROD",
    progress: 0,
    status: IncidentStatus.DECLARE,
    assignedTo: "Mahmoud Fassi",
    comments: [
      { author: "Ahmed Benali", date: "2025-05-10T09:15:00", message: "Incident signalé suite à la maintenance." },
      { author: "Mahmoud Fassi", date: "2025-05-10T11:30:00", message: "Je vais analyser les logs de connexion." },
      { author: "Ahmed Benali", date: "2025-05-10T13:00:00", message: "Merci, n'oublie pas de vérifier le service SG_ABS_PROD." }
    ],
    documentation: "Voir rapport maintenance v1.2",
    declarationDate: "2025-05-10",
    declaredBy: "Ahmed Benali",
    affectedService: "Database",
    tags: ["API", "Database", "Production", "Urgent"],
    priorité: IncidentPriority.ELEVE,
    environment: "Prod",
    description: "L'incident concerne une erreur persistante de connexion à la base de données SG_ABS_PROD, empêchant l'accès aux données essentielles pour les opérations en production. Ce problème a été signalé suite à la maintenance planifiée et impacte la continuité du service.",
    attachments: [
      { name: "rapport-maintenance-v1.2.pdf", size: 1200000, url: "/files/rapport-maintenance-v1.2.pdf" },
      { name: "logs-connexion.txt", size: 45000, url: "/files/logs-connexion.txt" }
    ]
  },
  {
    id: "ID716",
    title: "Timeout lors de l'ouverture d'un compte client",
    progress: 0,
    status: IncidentStatus.DECLARE,
    assignedTo: "Mehdi Bouhlaoui",
    comments: [
      { author: "Sara El Amrani", date: "2025-05-12T08:45:00", message: "Client a relancé deux fois." },
      { author: "Mehdi Bouhlaoui", date: "2025-05-12T10:00:00", message: "Je vais analyser les logs serveur client #45." }
    ],
    documentation: "Logs disponibles sur serveur client #45",
    declarationDate: "2025-05-12",
    declaredBy: "Sara El Amrani",
    affectedService: "Client Portal",
    tags: ["API", "Timeout", "Client", "Messaging", "Urgent"],
    priorité: IncidentPriority.MOYEN,
    environment: "Prod",
    description: "Des timeouts récurrents sont observés lors de la tentative d'ouverture de comptes clients via le portail. Cette défaillance ralentit fortement l'expérience utilisateur et peut entraîner une perte de clients potentiels, nécessitant une investigation urgente.",
    attachments: [
      { name: "logs-client-45.txt", size: 86000, url: "/files/logs-client-45.txt" }
    ]
  },
  {
    id: "ID182",
    title: "Problème de lenteur sur interface de virements",
    progress: 50,
    status: IncidentStatus.EN_COURS_ANALYSE,
    assignedTo: "Fatima Ezzahra Arbaoui",
    comments: [
      { author: "Khalid Mounir", date: "2025-05-08T09:00:00", message: "Analyse en cours, soupçon de surcharge réseau." },
      { author: "Fatima Ezzahra Arbaoui", date: "2025-05-08T11:15:00", message: "Je vérifie les performances réseau." }
    ],
    documentation: "Analyse réseau en cours, voir ticket #789",
    declarationDate: "2025-05-08",
    declaredBy: "Khalid Mounir",
    affectedService: "Payments",
    tags: ["API", "Lenteur", "Virements", "Interop"],
    priorité: IncidentPriority.MOYEN,
    environment: "Dev",
    description: "L'interface de virements présente des temps de réponse très longs, perturbant les opérations bancaires. Une surcharge réseau est suspectée, et une analyse approfondie est en cours pour identifier la cause et remédier au problème.",
    attachments: []
  },
  {
    id: "ID717",
    title: "Bug lors de la validation d’un prêt personnel",
    progress: 80,
    status: IncidentStatus.TRANSFERE,
    assignedTo: "Hicham Zeroual",
    comments: [
      { author: "Laila Cherkaoui", date: "2025-05-07T07:30:00", message: "Bug critique identifié." },
      { author: "Hicham Zeroual", date: "2025-05-07T10:00:00", message: "Correctif en cours de test." }
    ],
    documentation: "Correctif v2.1 en test, voir PR #456",
    declarationDate: "2025-05-07",
    declaredBy: "Laila Cherkaoui",
    affectedService: "Loans",
    tags: ["API", "Prêt Personnel", "Test", "Bill Payments"],
    priorité: IncidentPriority.ELEVE,
    environment: "HF",
    description: "Un bug critique empêche la validation correcte des demandes de prêt personnel, causant des erreurs dans le traitement des dossiers clients. Un correctif est en phase de test afin de rétablir la fiabilité du service.",
    attachments: [
      { name: "prêt-correctif-v2.1.zip", size: 2400000, url: "/files/prêt-correctif-v2.1.zip" }
    ]
  },
  {
    id: "ID818",
    title: "Messaging V1 > problème d’envoi de push notif",
    progress: 75,
    status: IncidentStatus.EN_COURS_ANALYSE,
    assignedTo: "Keba",
    comments: [
      { author: "Omar Idrissi", date: "2025-05-09T08:00:00", message: "Erreur de mapping identifiée." },
      { author: "Keba", date: "2025-05-09T12:00:00", message: "Correction en cours d'intégration." }
    ],
    documentation: "Mapping corrigé, voir doc v3.0",
    declarationDate: "2025-05-09",
    declaredBy: "Omar Idrissi",
    affectedService: "Reporting",
    tags: ["API", "Export Excel", "Erreur Mapping", "OpenR"],
    priorité: IncidentPriority.FAIBLE,
    environment: "HT",
    description: "Les notifications push ne sont pas envoyées correctement via la version 1 du système Messaging, dû à un problème de mapping des données. Une correction a été identifiée et est en cours d'intégration.",
    attachments: []
  },
  {
    id: "ID909",
    title: "Problème d’authentification des agents internes",
    progress: 100,
    status: IncidentStatus.RESOLU,
    assignedTo: "Amine Abdelhak",
    comments: [
      { author: "Nadia Haddad", date: "2025-05-05T07:00:00", message: "Problème identifié." },
      { author: "Amine Abdelhak", date: "2025-05-05T09:30:00", message: "Résolu après mise à jour des certificats." }
    ],
    documentation: "Certificats mis à jour, voir changelog v1.5",
    declarationDate: "2025-05-05",
    declaredBy: "Nadia Haddad",
    affectedService: "Authentication",
    tags: ["API", "Authentification", "Mise à jour", "Beneficiaries"],
    priorité: IncidentPriority.ELEVE,
    environment: "Prod",
    description: "Un problème d'authentification empêchait les agents internes d'accéder aux ressources critiques. La mise à jour des certificats a permis de résoudre ce dysfonctionnement rapidement.",
    attachments: [
      { name: "certificats-v1.5-update.log", size: 5500, url: "/files/certificats-v1.5-update.log" }
    ]
  },
  {
    id: "ID817",
    title: "Erreur lors de la communication avec l’API beneficiaries",
    progress: 0,
    status: IncidentStatus.DECLARE,
    assignedTo: "Ali Fadili",
    comments: [
      { author: "Karim Lahlou", date: "2025-05-15T08:00:00", message: "Problème de communication avec l'API des bénéficiaires." },
      { author: "Ali Fadili", date: "2025-05-15T10:15:00", message: "Analyse en cours des logs API." }
    ],
    documentation: "Logs API disponibles, analyse en cours.",
    declarationDate: "2025-05-15",
    declaredBy: "Karim Lahlou",
    affectedService: "Beneficiaries",
    tags: ["API", "Erreur", "Beneficiaries", "Communication", "Urgent"],
    priorité: IncidentPriority.MOYEN,
    environment: "Prod",
    description: "L'API bénéficiaires rencontre des erreurs de communication, empêchant la récupération correcte des données clients. Une analyse est en cours pour identifier la source des erreurs et rétablir le service.",
    attachments: []
  },
  {
    id: "ID176",
    title: "Erreur 400 lors de l’appel de l’API Transfer",
    progress: 0,
    status: IncidentStatus.DECLARE,
    assignedTo: "Imane Ait Ali",
    comments: [
      { author: "Yassir Benslimane", date: "2025-05-16T07:50:00", message: "Erreur 400 rencontrée lors de l'appel API de transfert." },
      { author: "Imane Ait Ali", date: "2025-05-16T09:00:00", message: "Analyse des logs serveur en cours." }
    ],
    documentation: "Analyser les logs du serveur, tickets en cours.",
    declarationDate: "2025-05-16",
    declaredBy: "Yassir Benslimane",
    affectedService: "Transfer API",
    tags: ["API", "Erreur 400", "Transfer", "Communication"],
    priorité: IncidentPriority.ELEVE,
    environment: "Prod",
    description: "Une erreur 400 est retournée lors de chaque tentative d'appel à l'API de transfert, empêchant les opérations. Des logs détaillés sont en cours d'analyse pour résoudre cette anomalie.",
    attachments: []
  },
];
