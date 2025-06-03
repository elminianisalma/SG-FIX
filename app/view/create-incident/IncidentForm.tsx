"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IncidentSummaryPopup from "@/app/view/create-incident/IncidentSummaryPopup";
import IncidentQuestions from "@/app/view/create-incident/IncidentQuestions";
import IncidentHeader from "@/app/view/create-incident/IncidentHeader";
import HeaderBar from "@/app/view/components/HeaderBar";
import Sidebar from "../SideBarComponent/SideBar";

import { Incident } from "@/app/models/Incident";
import { IncidentService } from "@/app/service/IncidentService";
import { IncidentPriority } from "@/app/utils/IncidentPriority";

interface Question {
  id: string;
  text: string;
  type: "text" | "textarea" | "radio" | "select" | "file" | "multitag";
  placeholder?: string;
  options?: string[];
}

const IncidentForm = () => {
  const router = useRouter();
  const [étape, setÉtape] = useState(1);
  const [réponses, setRéponses] = useState<{ [key: string]: string | string[] | FileList | null }>({});
  const [sla, setSla] = useState("");
  const [priorité, setPriorité] = useState<IncidentPriority | "">("");
  const [afficherPopup, setAfficherPopup] = useState(false);
  const [champErreur, setChampErreur] = useState<string[]>([]);
  const [dateRapport] = useState(new Date().toLocaleString());
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [transformedAnswers, setTransformedAnswers] = useState<{ [key: string]: string }>({});

  const questionsIncident: Question[] = [
    {
      id: "application",
      text: "Quel application est concerné par l’incident ?",
      type: "select",
      options: ["BILL_PAYMENT", "Bankup", "Interop", "OpenR", "Cockpit"]
    },
    {
      id: "environment",
      text: "Quel est l’environnement affecté ?",
      type: "radio",
      options: ["Dev", "HF", "HT", "Stabilisation"]
    },
    {
      id: "gravité",
      text: "Quel est l’effet ou les conséquences de l’incident ? (impact)",
      type: "radio",
      options: ["Mineur", "Majeur", "Critique"]
    },
    {
      id: "tags",
      text: "Quels tags correspondent à cet incident ?",
      type: "multitag",
      options: ["Bridge", "Transfert", "Elevy", "Account", "E-tax", "Guce"]
    },
    {
      id: "shortDescription",
      text: "Quel est l’objet principal de l’incident ?",
      type: "text",
      placeholder: "Exemple : Échec de l’authentification via SSO"
    },
    {
      id: "details",
      text: "Décrivez les détails techniques de l’incident",
      type: "textarea",
      placeholder: "Expliquez les étapes, erreurs rencontrées et conséquences fonctionnelles"
    },
    {
      id: "attachments",
      text: "Ajoutez les fichiers nécessaires (logs, captures d’écran, etc.)",
      type: "file"
    }
  ];

  const totalQuestions = questionsIncident.length;
  const answeredCount = questionsIncident.filter((q) => {
    const val = réponses[q.id];
    if (q.type === "file") return (val as FileList)?.length > 0;
    if (q.type === "multitag") return (val as string[])?.length > 0;
    return !!val;
  }).length;

  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const gérerChangementRéponse = (id: string, valeur: string | string[] | FileList | null) => {
    setRéponses((prev) => ({ ...prev, [id]: valeur }));
    setChampErreur((prev) => prev.filter((champ) => champ !== id));
  };

  useEffect(() => {
    const gravite = réponses["gravité"] as string;
    if (gravite) {
      const prioritéMap: Record<string, IncidentPriority> = {
        "Critique": IncidentPriority.CRITIQUE,
        "Majeur": IncidentPriority.ELEVEE,
        "Mineur": IncidentPriority.MOYENNE
      };
      const nouvellePriorité = prioritéMap[gravite];
      setPriorité(nouvellePriorité);
      const slaMap: Record<IncidentPriority, string> = {
        [IncidentPriority.MOYENNE]: "8 heures",
        [IncidentPriority.ELEVEE]: "4 heures",
        [IncidentPriority.CRITIQUE]: "2 heures",
        [IncidentPriority.FAIBLE]: "24 heures"
      };
      setSla(slaMap[nouvellePriorité]);
    }
  }, [réponses["gravité"]]);

  const handleSubmitClick = async () => {
    const champsManquants = questionsIncident.filter((q) => {
      const val = réponses[q.id];
      if (q.type === "file") return !(val as FileList)?.length;
      if (q.type === "multitag") return !(val as string[])?.length;
      return !val;
    });

    if (champsManquants.length > 0) {
      const ids = champsManquants.map((q) => q.id);
      setChampErreur(ids);
      const firstId = ids[0];
      refs.current[firstId]?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const transformed: { [key: string]: string } = {};
    for (const [key, val] of Object.entries(réponses)) {
      if (typeof val === "string") {
        transformed[key] = val;
      } else if (val instanceof FileList) {
        transformed[key] = Array.from(val).map((f) => f.name).join(", ");
      } else if (Array.isArray(val)) {
        transformed[key] = val.join(", ");
      }
    }

    setTransformedAnswers(transformed);

    try {
      const formData = new FormData();
      formData.append("titre", transformed.shortDescription || "");
      formData.append("description", transformed.details || "");
      formData.append("gravite", transformed.gravité || "");
      formData.append("priorite", priorité || "");
      formData.append("clientIgg", localStorage.getItem("clientIgg") || "");
      formData.append("environnement", transformed.environment || "");
      formData.append("application", transformed.application || "");

      if (Array.isArray(réponses.tags)) {
        réponses.tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      const fichiers = réponses["attachments"] as FileList;
      if (fichiers && fichiers.length > 0) {
        Array.from(fichiers).forEach((file) => {
          formData.append("files", file);
        });
      }

      await IncidentService.createIncident(formData);
      toast.success("Incident créé avec succès !");
      setAfficherPopup(true);
      setRéponses({});
    } catch (error) {
      console.error("Erreur lors de la création de l'incident :", error);
      toast.error("Erreur lors de la création de l'incident.");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <div className="flex justify-center items-start p-10">
          <div className="w-full max-w-screen-2xl space-y-6">
            <IncidentHeader step={étape} progress={progress} />
            <div className="bg-white backdrop-blur-md rounded-2xl shadow-lg p-8">
              <IncidentQuestions
                questions={questionsIncident}
                answers={réponses}
                onAnswerChange={gérerChangementRéponse}
                errorFields={champErreur}
                refs={refs}
              />
              {sla && (
                <div className="text-right text-sm text-gray-600 font-medium mt-4">
                  ⏱️ SLA attribué : <span className="text-black font-bold">{sla}</span>
                </div>
              )}
              {priorité && (
                <div className="text-right text-sm text-gray-600 font-medium mt-2">
                  📌 Priorité calculée : <span className="text-black font-bold">{priorité}</span>
                </div>
              )}
              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmitClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
                >
                  Soumettre l’incident
                </button>
              </div>
            </div>
          </div>
        </div>

        <IncidentSummaryPopup
          visible={afficherPopup}
          onClose={() => setAfficherPopup(false)}
          answers={transformedAnswers}
          sla={sla}
          priorité={priorité}
          reportDate={dateRapport}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default IncidentForm;
