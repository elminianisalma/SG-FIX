"use client";
import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import HeaderBar from "../components/HeaderBar";
import { Code, Mail, User, Briefcase, Building, AlertTriangle, Search, SlidersHorizontal } from "lucide-react";

interface Developer {
  id: number;
  name: string;
  role: string;
  availability: "Disponible" | "Occupé" | "En congé";
  skills: string[];
  workload: number;
  sub: string;
  email: string;
  sgJob: string;
  sgServiceName: string;
}

const developers: Developer[] = [
  {
    id: 1,
    name: "Fatima Ezzahra Arbaoui",
    role: "Tech Lead",
    availability: "Disponible",
    skills: ["Java", "Spring Boot"],
    workload: 2,
    sub: "F123456",
    email: "fatima.arbaoui@socgen.com",
    sgJob: "Full Stack Developer",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 2,
    name: "Mahmoud Fassi",
    role: "Tech Lead",
    availability: "Occupé",
    skills: ["Java", "Spring Boot"],
    workload: 4,
    sub: "F654321",
    email: "mahmoud.fassi@socgen.com",
    sgJob: "Tech Lead",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 3,
    name: "Keba Deme",
    role: "Tech lead",
    availability: "Disponible",
    skills: ["Java", "Spring Boot"],
    workload: 1,
    sub: "F789456",
    email: "keba.deme@socgen.com",
    sgJob: "DevOps Engineer",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
  {
    id: 4,
    name: "Mehdi Bouhlaoui",
    role: "Full Stack Developer",
    availability: "En congé",
    skills: ["React", "Java", "Spring Boot"],
    workload: 0,
    sub: "F321789",
    email: "mehdi.bouhlaoui@socgen.com",
    sgJob: "Business Analyst",
    sgServiceName: "AFMO/BAN/ABS/CAS",
  },
];

const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  let initials = "";
  if (nameParts.length >= 1) initials += nameParts[0][0] || "";
  if (nameParts.length >= 2) initials += nameParts[1][0] || "";
  else if (nameParts[0].length >= 2) initials += nameParts[0][1] || "";
  return initials.toUpperCase();
};

const DeveloperAvailability: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterAvailability, setFilterAvailability] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const developersPerPage = 2;

  // Filter developers based on search term and availability
  const filteredDevelopers = developers.filter((developer) => {
    const matchesSearch =
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability =
      filterAvailability === "" || developer.availability === filterAvailability;
    return matchesSearch && matchesAvailability;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDevelopers.length / developersPerPage);
  const indexOfLastDeveloper = currentPage * developersPerPage;
  const indexOfFirstDeveloper = indexOfLastDeveloper - developersPerPage;
  const currentDevelopers = filteredDevelopers.slice(indexOfFirstDeveloper, indexOfLastDeveloper);

  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isHovered ? "ml-48" : "ml-16"}`}>
        <HeaderBar />
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 ml-40 mr-10">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Rechercher un développeur..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-3 py-3 bg-white border border-green-600 rounded-md shadow-sm hover:bg-gray-100 text-green-600 text-lg font-medium"
              >
                <SlidersHorizontal size={16} />
                Filtres
              </button>
              {showFilter && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setFilterAvailability("");
                      setCurrentPage(1);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-base ${
                      filterAvailability === "" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => {
                      setFilterAvailability("Disponible");
                      setCurrentPage(1);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-base ${
                      filterAvailability === "Disponible" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    Disponible
                  </button>
                  <button
                    onClick={() => {
                      setFilterAvailability("Occupé");
                      setCurrentPage(1);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-base ${
                      filterAvailability === "Occupé" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    Occupé
                  </button>
                  <button
                    onClick={() => {
                      setFilterAvailability("En congé");
                      setCurrentPage(1);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-base ${
                      filterAvailability === "En congé" ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    En congé
                  </button>
                </div>
              )}
            </div>
          </div>

          <main>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 ml-40 text-center">
              Disponibilité des Développeurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mr-10 ml-40">
              {currentDevelopers.length > 0 ? (
                currentDevelopers.map((developer) => (
                  <div
                    key={developer.id}
                    className="bg-white rounded-lg w-full max-w-5xl shadow-md p-8 border hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-lg font-semibold mr-3">
                          {getInitials(developer.name)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{developer.name}</h3>
                          <p className="text-base text-gray-500">{developer.role}</p>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-base font-medium ${
                          developer.availability === "Disponible"
                            ? "bg-green-100 text-green-700"
                            : developer.availability === "Occupé"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {developer.availability}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center text-base font-medium text-gray-600">
                        <Code className="w-5 h-5 mr-2" /> Compétences :
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {developer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-base text-gray-600 mb-4">
                      <Mail className="w-5 h-5 mr-2" /> <strong>Email :</strong> {developer.email}
                    </div>
                    <div className="flex items-center text-base text-gray-600 mb-4">
                      <User className="w-5 h-5 mr-2" /> <strong>Sub :</strong> {developer.sub}
                    </div>
                    <div className="flex items-center text-base text-gray-600 mb-4">
                      <Briefcase className="w-5 h-5 mr-2" /> <strong>SG Job :</strong> {developer.sgJob}
                    </div>
                    <div className="flex items-center text-base text-gray-600 mb-4">
                      <Building className="w-5 h-5 mr-2" /> <strong>Service :</strong> {developer.sgServiceName}
                    </div>
                    <div className="flex items-center text-base text-gray-600 mb-4">
                      <AlertTriangle className="w-5 h-5 mr-2" /> <strong>Charge :</strong> {developer.workload}{" "}
                      incident(s)
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-600 text-lg">
                  Aucun développeur trouvé.
                </div>
              )}
            </div>

            {filteredDevelopers.length > 0 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded text-base font-medium ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                >
                  Précédent
                </button>
                <span className="text-base text-gray-600">
                  Page {currentPage} sur {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded text-base font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                >
                  Suivant
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAvailability;