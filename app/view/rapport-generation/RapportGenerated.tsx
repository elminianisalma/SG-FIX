import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IncidentDetail } from '@/app/models/IncidentDetail'; // Utiliser IncidentDetail
import { IncidentDetailed } from '@/app/models/IncidentDetailed';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const IncidentReport = forwardRef(({ incidentData }: { incidentData: IncidentDetailed }, ref) => {
  const [logoImage, setLogoImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch('/images/logoImage.png');
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('Image loaded as base64:', reader.result);
          setLogoImage(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'image :', error);
      }
    };
    loadImage();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    try {
      if (logoImage) {
        doc.addImage(logoImage, 'PNG', 10, 10, 30, 30);
      } else {
        console.log('Image non chargée, logo non inclus dans le PDF');
      }
    } catch (error) {
      console.log('Erreur lors de l\'ajout de l\'image au PDF :', error);
    }

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(200, 0, 0);
    doc.setFontSize(18);
    doc.text(
      ` ${incidentData.id.toString()} - ${incidentData.titre}`,
      105,
      20,
      { align: 'center', maxWidth: 180 }
    );

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Priority:', 50, 35);
    doc.setTextColor(135, 206, 235);
    doc.text(incidentData.priorite, 70, 35);

    doc.setTextColor(0, 0, 0);
    doc.text('Severity:', 90, 35);
    doc.setTextColor(200, 0, 0);
    doc.text(incidentData.gravite, 110, 35);

    doc.setTextColor(0, 0, 0);
    doc.text(
      `Date Déclaration: ${new Date(incidentData.dateDeclaration).toLocaleDateString('fr-FR')} - Date Résolution: ${
        incidentData.dateResolution
          ? new Date(incidentData.dateResolution).toLocaleDateString('fr-FR')
          : 'Non résolu'
      }`,
      10,
      45
    );

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Informations Client', 10, 65);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(10, 70, 90, 60);

    autoTable(doc, {
      startY: 75,
      head: [['Champ', 'Détails']],
      body: [
        ['Subscription', incidentData.clientSub],
        ['Nom complet', incidentData.client_fullName],
        ['IGG', incidentData.client_igg],
        ['Rôles', incidentData.Client_role ? Array.from(incidentData.Client_role).join(', ') : 'Aucun'],
        ['Email', incidentData.Client_mail],
        ['Service', incidentData.Client_serviceName],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [200, 200, 200] },
      margin: { left: 15, right: 110 },
    });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Informations Développeur', 110, 65);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(110, 70, 90, 60);

    autoTable(doc, {
      startY: 75,
      head: [['Champ', 'Détails']],
      body: [
        ['Subscription', incidentData.coeDevSub],
        ['Nom complet', incidentData.CoeDev_fullName],
        ['IGG', incidentData.CoeDev_igg],
        ['Rôles', incidentData.CoeDev_role ? Array.from(incidentData.CoeDev_role).join(', ') : 'Aucun'],
        ['Email', incidentData.CoeDev_mail],
        ['Service', incidentData.CoeDev_serviceName],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [200, 200, 200] },
      margin: { left: 115, right: 10 },
    });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Détails de l\'Incident', 10, 140);
    autoTable(doc, {
      startY: 145,
      head: [['Champ', 'Détails']],
      body: [
        ['Description', incidentData.description],
        ['Environnement', incidentData.environnement],
        ['Application', incidentData.application],
        ['Fichiers joints', incidentData.fichier_Joints ? incidentData.fichier_Joints.join(', ') : 'Aucun'], 
        ['Titre documentation', 'Non spécifié'],
        ['Cause racine', 'Non spécifié'],
        ['Actions correctives', 'Non spécifié'],
        ['Étapes de résolution', 'Non spécifié'],
        ['Mesures préventives', 'Non spécifié'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [200, 200, 200] },
      margin: { left: 10, right: 10 },
    });

    doc.save(`Rapport_Incident_${incidentData.id.toString()}.pdf`);
  };

  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  return (
    <div style={{ display: 'none' }}>
      <h2>Rapport d'Incident</h2>
      <button
        onClick={generatePDF}
        style={{
          backgroundColor: '#cc0000',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Générer le Rapport PDF
      </button>
    </div>
  );
});

export default IncidentReport;