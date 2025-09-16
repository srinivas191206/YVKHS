import React, { useState } from "react"
import { DashboardLayout } from "../components/DashboardLayout"
import { DashboardOverview } from "../components/DashboardOverview"
import { PatientRegistration } from "../components/PatientRegistration"
import { DoctorConnect } from "../components/DoctorConnect"
import { EmergencyButton } from "../components/EmergencyButton"
import { MedicineInventory } from "../components/MedicineInventory"
import { ReportsAnalytics } from "../components/ReportsAnalytics"
import { Settings } from "../components/Settings"
import { ConsultationRequest } from "../components/ConsultationRequest"
import { ConsultationDashboard } from "../components/ConsultationDashboard"

console.log('Index.tsx loading');

const Index = () => {
  console.log('Index component rendering');
  const [currentSection, setCurrentSection] = useState("dashboard")

  const renderContent = () => {
    console.log('Rendering section:', currentSection);
    switch (currentSection) {
      case "dashboard":
        return <DashboardOverview />
      case "patients":
        return <PatientRegistration />
      case "doctors":
        return <DoctorConnect />
      case "consultations":
        return <ConsultationDashboard />
      case "new-consultation":
        return <ConsultationRequest />
      case "emergency":
        return <EmergencyButton />
      case "medicines":
        return <MedicineInventory />
      case "reports":
        return <ReportsAnalytics />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  try {
    return (
      <DashboardLayout 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      >
        {renderContent()}
      </DashboardLayout>
    )
  } catch (error) {
    console.error('Error in Index component:', error);
    return <div>Error in Index: {error.message}</div>;
  }
}

export default Index
