<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport d'Incident PDF - Société Générale</title>
    <style>
        /* SG Brand Colors & Global Styles */
        :root {
            --sg-red: #E60028;
            --sg-black: #000000;
            --sg-dark-grey: #333333; /* Main text color */
            --sg-medium-grey: #6c757d; /* Softer grey for secondary text */
            --sg-light-text: #495057; /* For less prominent text */
            --sg-section-bg: #fdfdfd; /* Very light background for sections */
            --sg-border-color: #e7e7e7; /* Lighter border color */
            --sg-white: #FFFFFF;
            --sg-timeline-dot-border: var(--sg-red);
            --sg-timeline-dot-completed-border: var(--sg-red);
        }

        @font-face {
            font-family: 'SGSans';
            src: url('https://fonts.gstatic.com/s/opensans/v27/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2') format('woff2');
            font-weight: normal;
        }
        @font-face {
            font-family: 'SGSans';
            src: url('https://fonts.gstatic.com/s/opensans/v27/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2') format('woff2');
            font-weight: bold;
        }

        body {
            font-family: 'SGSans', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--sg-white);
            color: var(--sg-dark-grey);
            font-size: 11px;
            line-height: 1.5;
        }

        .page-container {
            width: 100%;
            max-width: 780px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }

        .page-break { page-break-after: always; }

        .report-main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 15px;
            border-bottom: 2px solid var(--sg-red);
            margin-bottom: 25px;
        }
        .report-main-header .logo-placeholder {
            width: 150px; height: 40px; background-color: #f0f0f0; border: 1px solid #ccc;
            display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; text-align: center;
        }
        .report-main-header .report-title { font-size: 22px; color: var(--sg-dark-grey); font-weight: bold; text-align: right; }

        .report-footer-static {
            text-align: center; font-size: 9px; color: var(--sg-medium-grey);
            padding-top: 20px; margin-top: 30px; border-top: 1px solid var(--sg-border-color);
        }

        h1, h2, h3, h4 { margin-top: 0; color: var(--sg-dark-grey); font-weight: bold; }
        .section-title {
            font-size: 18px; color: var(--sg-dark-grey); padding-bottom: 8px;
            border-bottom: 1px solid var(--sg-border-color); margin-bottom: 20px;
            display: flex; align-items: center;
        }
        .section-title svg { width: 20px; height: 20px; fill: var(--sg-red); margin-right: 10px; }


        /* NEW STYLES for Incident Details Section */
        .incident-hero-header {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--sg-border-color);
        }

        .incident-main-title {
            font-size: 26px; /* Larger title */
            color: var(--sg-red);
            font-weight: bold;
            margin-bottom: 8px;
            line-height: 1.2;
        }

        .incident-meta-info {
            font-size: 11px;
            color: var(--sg-medium-grey);
            margin-bottom: 20px;
        }
        .incident-meta-info span { margin-right: 15px; }
        .incident-meta-info strong { color: var(--sg-dark-grey); font-weight: normal; }

        .incident-kpi-metrics {
            display: flex;
            justify-content: space-around; /* Distribute metrics evenly */
            align-items: flex-start;
            background-color: var(--sg-section-bg); /* Subtle background for the metrics bar */
            padding: 15px 10px;
            border-radius: 8px;
            margin-bottom: 25px;
            border: 1px solid var(--sg-border-color);
        }

        .kpi-metric-item {
            text-align: center;
            flex-basis: 30%; /* Roughly a third for each metric */
            padding: 0 5px;
        }

        .kpi-metric-label {
            display: block;
            font-size: 10px;
            color: var(--sg-medium-grey);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .kpi-metric-value {
            font-size: 18px; /* Larger value */
            font-weight: bold;
            color: var(--sg-dark-grey);
            line-height: 1.1;
        }
        /* Color coding for KPI values */
        .priority-high, .impact-critical, .urgency-high { color: var(--sg-red); }
        .priority-medium, .impact-high, .urgency-medium { color: #fd7e14; } /* Orange */
        .priority-low, .impact-medium, .urgency-low { color: #28a745; } /* Green */


        .incident-description-content {
            font-size: 12px;
            line-height: 1.6;
            color: var(--sg-light-text); /* Slightly lighter for description */
            text-align: justify;
            margin-bottom: 20px;
        }
        .incident-description-content strong.desc-title-label { /* Class for the "Description Détaillée:" label */
            display:block;
            margin-bottom:5px;
            font-size:13px;
            color: var(--sg-dark-grey);
            font-weight: bold;
        }


        .incident-attachment-block {
            margin-top: 20px; /* Increased margin for better separation */
        }
        .incident-attachment-block strong.attachment-label { /* Class for the "Pièce jointe :" label */
            display:block;
            margin-bottom:8px; /* Space between label and content */
            font-size:13px;
            color: var(--sg-dark-grey);
            font-weight: bold;
        }
        .attachment-button {
            display: inline-flex; /* Use inline-flex for icon and text alignment */
            align-items: center;
            padding: 10px 18px;
            background-color: var(--sg-red);
            color: var(--sg-white);
            text-decoration: none;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            transition: background-color 0.2s ease;
        }
        .attachment-button svg {
            width: 16px;
            height: 16px;
            fill: var(--sg-white);
            margin-right: 8px;
        }
        .attachment-button:hover {
            background-color: #c4001f; /* Darker SG red */
        }
        .attachment-not-provided-text {
            font-style: italic;
            color: var(--sg-medium-grey);
            font-size: 12px;
        }
        /* END OF NEW STYLES for Incident Details Section */


        /* Horizontal Timeline - Page 1 */
        .horizontal-timeline-wrapper {
            margin-top: 25px; margin-bottom: 30px; padding: 25px 15px;
            background-color: var(--sg-section-bg); border-radius: 8px; border: 1px solid var(--sg-border-color);
        }
        .horizontal-timeline { display: flex; justify-content: space-around; align-items: flex-start; position: relative; }
        .horizontal-timeline::before {
            content: ''; position: absolute; top: 10px; left: 10%; right: 10%;
            height: 4px; background-color: var(--sg-red); z-index: 0; border-radius: 2px;
        }
        .timeline-step {
            display: flex; flex-direction: column; align-items: center; text-align: center;
            width: calc(100% / 3 - 20px); max-width: 200px; position: relative; z-index: 1;
        }
        .timeline-marker {
            width: 20px; height: 20px; background-color: var(--sg-white);
            border: 4px solid var(--sg-timeline-dot-border); border-radius: 50%;
            margin-bottom: 15px; z-index: 2; box-shadow: 0 0 0 4px var(--sg-section-bg);
        }
        .timeline-step.completed .timeline-marker {
            background-color: var(--sg-timeline-dot-completed-border);
            border-color: var(--sg-timeline-dot-completed-border);
        }
        .timeline-step-content {
            background-color: var(--sg-white); padding: 12px; border-radius: 6px;
            border: 1px solid var(--sg-border-color); box-shadow: 0 2px 4px rgba(0,0,0,0.06); width: 100%;
        }
        .timeline-step-content h4 { font-size: 13px; margin-bottom: 5px; font-weight: bold; color: var(--sg-dark-grey); }
        .timeline-step-timestamp { font-size: 10px; color: var(--sg-medium-grey); margin-bottom: 8px; display: block; }
        .timeline-step-description { font-size: 11px; color: var(--sg-dark-grey); line-height: 1.4; }

        /* Page 2: Documentation Report Specifics */
        .documentation-section {
            background-color: var(--sg-section-bg); border: 1px solid var(--sg-border-color);
            border-left: 4px solid var(--sg-red); border-radius: 6px;
            padding: 20px; margin-bottom: 20px;
        }
        .documentation-section .section-header { display: flex; align-items: center; margin-bottom: 12px; }
        .documentation-section .section-header svg { width: 24px; height: 24px; fill: var(--sg-red); margin-right: 12px; flex-shrink: 0; }
        .documentation-section .section-header h3 { font-size: 16px; color: var(--sg-dark-grey); margin: 0; font-weight: bold; }
        .documentation-section p { font-size: 12px; color: var(--sg-dark-grey); text-align: justify; margin-bottom: 0; line-height: 1.5; }
    </style>
</head>
<body>

    <div class="page-container">
        <header class="report-main-header">
            <div class="logo-placeholder">LOGO SG</div>
            <div class="report-title">Rapport d'Incident</div>
        </header>

        <section id="incident-details-hero">
            <h2 class="section-title">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg>
                Aperçu de l'Incident
            </h2>

            <div class="incident-hero-header">
                <h3 class="incident-main-title" th:text="${incident.titre}">Panne Majeure du Serveur de Production X</h3>
                <div class="incident-meta-info">
                    <span>ID: <strong th:text="${incident.id}">INC-239</strong></span>
                    <span>Déclaré par: <strong th:text="${incident.declarePar}">Ghita Boukri</strong></span>
                    <span>Résolu par: <strong th:text="${incident.declarePar}">Oussmane mbacke</strong></span>

                </div>

                <div class="incident-kpi-metrics">
                    <div class="kpi-metric-item">
                        <span class="kpi-metric-label">Priorité</span>
                        <span class="kpi-metric-value"
                              th:classappend="${#strings.equalsIgnoreCase(incident.priorite, 'HAUTE')} ? 'priority-high' : (${#strings.equalsIgnoreCase(incident.priorite, 'MOYENNE')} ? 'priority-medium' : 'priority-low')"
                              th:text="${incident.priorite}">HAUTE</span>
                    </div>
                    <div class="kpi-metric-item">
                        <span class="kpi-metric-label">Impact</span>
                        <span class="kpi-metric-value"
                              th:classappend="${#strings.equalsIgnoreCase(incident.impact, 'CRITIQUE')} ? 'impact-critical' : (${#strings.equalsIgnoreCase(incident.impact, 'ÉLEVÉ')} ? 'impact-high' : 'impact-medium')"
                              th:text="${incident.impact}">CRITIQUE</span>
                    </div>
                    <div class="kpi-metric-item">
                        <span class="kpi-metric-label">Urgence</span>
                        <span class="kpi-metric-value"
                              th:classappend="${#strings.equalsIgnoreCase(incident.urgence, 'ÉLEVÉE')} ? 'urgency-high' : (${#strings.equalsIgnoreCase(incident.urgence, 'MOYENNE')} ? 'urgency-medium' : 'urgency-low')"
                              th:text="${incident.urgence}">ÉLEVÉE</span>
                    </div>
                </div>

                <div class="incident-description-content">
                    <strong class="desc-title-label">Description Détaillée:</strong>
                    <p th:text="${incident.description}" style="margin:0;">Description complète de l'incident, expliquant la nature du problème, les systèmes impactés, et l'heure de découverte. Ce texte peut être assez long et doit s'adapter correctement à l'espace disponible, tout en restant lisible pour une compréhension rapide et efficace de la situation.</p>
                </div>

                <div class="incident-attachment-block">
                    <strong class="attachment-label">Pièce jointe :</strong>
                    <th:block th:if="${incident.pieceJointeUrl != null}">
                        <a th:href="${incident.pieceJointeUrl}" class="attachment-button" target="_blank">
                            <svg viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                            <span th:text="${incident.pieceJointeNom ?: 'Voir la Pièce Jointe'}">document.pdf</span>
                        </a>
                    </th:block>
                  
                </div>
                </div>
        </section>
        <section id="incident-horizontal-timeline">
            <h2 class="section-title">
                <svg viewBox="0 0 24 24" style="width:22px; height:22px;"><path d="M21.41 9.41l-2.83-2.83A1 1 0 0017.17 6H6.83A1 1 0 005.41 7.41l-2.83 2.83A1 1 0 002 11v2a1 1 0 00.59.91l2.83 2.83A1 1 0 006.83 18h10.34a1 1 0 00.71-.29l2.83-2.83A1 1 0 0022 13v-2a1 1 0 00-.59-.91zM17.17 16H6.83l-2-2H19.17l-2 2zM6.83 8h10.34l2 2H4.83l2-2z"/></svg>
                Phases Clés de l'Incident
            </h2>
            <div class="horizontal-timeline-wrapper">
                <div class="horizontal-timeline">
                    <div th:if="${incident.chronologie != null && !incident.chronologie.isEmpty() && incident.chronologie.size() > 0}"
                         th:with="event=${incident.chronologie[0]}"
                         class="timeline-step" th:classappend="${event.completed} ? 'completed' : ''">
                        <div class="timeline-marker"></div>
                        <div class="timeline-step-content">
                            <h4 th:text="${event.label ?: 'Déclaré'}">Déclaré</h4>
                            <span class="timeline-step-timestamp" th:text="${#temporals.format(event.timestamp, 'dd MMM, HH:mm')}">15 Mai, 09:30</span>
                            <p class="timeline-step-description" th:text="${event.description}">Incident signalé.</p>
                        </div>
                    </div>

                    <div th:if="${incident.chronologie != null && incident.chronologie.size() > 1}"
                         th:with="event=${incident.chronologie[1]}"
                         class="timeline-step" th:classappend="${event.completed} ? 'completed' : ''">
                        <div class="timeline-marker"></div>
                        <div class="timeline-step-content">
                            <h4 th:text="${event.label ?: 'Affecté'}">Affecté</h4>
                            <span class="timeline-step-timestamp" th:text="${#temporals.format(event.timestamp, 'dd MMM, HH:mm')}">15 Mai, 11:00</span>
                            <p class="timeline-step-description" th:text="${event.description}">Impact confirmé.</p>
                        </div>
                    </div>

                    <div th:if="${incident.chronologie != null && incident.chronologie.size() > 2}"
                         th:with="event=${incident.chronologie[2]}"
                         class="timeline-step" th:classappend="${event.completed} ? 'completed' : ''">
                        <div class="timeline-marker"></div>
                        <div class="timeline-step-content">
                            <h4 th:text="${event.label ?: 'Résolu'}">Résolu</h4>
                            <span class="timeline-step-timestamp" th:text="${#temporals.format(event.timestamp, 'dd MMM, HH:mm')}">16 Mai, 14:30</span>
                            <p class="timeline-step-description" th:text="${event.description}">Service rétabli.</p>
                        </div>
                    </div>
                    </div>
            </div>
        </section>
        <footer class="report-footer-static">
            <p>Société Générale - Rapport d'Incident Confidentiel &nbsp;&nbsp;|&nbsp;&nbsp; Page 1 / 2</p>
            <p>Généré le: <span th:text="${#temporals.format(#dates.createNow(), 'dd MMMM yy, HH:mm')}">Date de Génération</span></p>
        </footer>
    </div>

    <div class="page-break"></div>

    <div class="page-container">
        <header class="report-main-header">
             <div class="logo-placeholder">LOGO SG</div>
            <div class="report-title">Rapport de Documentation</div>
        </header>

        <section class="documentation-section" id="root-cause-analysis">
            <div class="section-header">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5-.67-1.5-1.5S11.17 14 12 14s1.5.67 1.5 1.5S12.83 17 12 17zm0-3.5c-.83 0-1.5-.67-1.5-1.5S11.17 10.5 12 10.5s1.5.67 1.5 1.5S12.83 13.5 12 13.5zm0-3.5c-.83 0-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5S12.83 10 12 10zM12 4.5c.83 0 1.5.67 1.5 1.5S12.83 7.5 12 7.5s-1.5-.67-1.5-1.5S11.17 4.5 12 4.5z"/></svg>
                <h3>Analyse de la Cause Racine</h3>
            </div>
            <p th:text="${documentation.analyseCauseRacine}">Analyse détaillée...</p>
        </section>

        <section class="documentation-section" id="immediate-corrective-actions">
            <div class="section-header">
                <svg viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"/></svg>
                <h3>Actions Correctives Immédiates</h3>
            </div>
            <p th:text="${documentation.actionsCorrectives}">Description des mesures...</p>
        </section>

        <section class="documentation-section" id="resolution-steps">
            <div class="section-header">
                 <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
                <h3>Étapes de Résolution</h3>
            </div>
            <p th:text="${documentation.etapesResolution}">Détail chronologique...</p>
        </section>

        <section class="documentation-section" id="preventive-measures">
            <div class="section-header">
                <svg viewBox="0 0 24 24"><path d="M12 2L4.5 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 2zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                <h3>Mesures Préventives Recommandées</h3>
            </div>
            <p th:text="${documentation.mesuresPreventives}">Recommandations pour éviter...</p>
        </section>

        <footer class="report-footer-static">
            <p>Société Générale - Rapport d'Incident Confidentiel &nbsp;&nbsp;|&nbsp;&nbsp; Page 2 / 2</p>
            <p>Généré le: <span th:text="${#temporals.format(#dates.createNow(), 'dd MMMM yy, HH:mm')}">Date de Génération</span></p>
        </footer>
    </div>

</body>
</html>