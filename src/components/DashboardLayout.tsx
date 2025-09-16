import React, { useState } from "react"
import { Heart, Users, Stethoscope, Pill, AlertTriangle, BarChart3, Settings, Menu, X, LayoutDashboard, Video, Plus } from "lucide-react"
import { HealthcareButton } from "./ui/healthcare-button"
import { HealthcareCard } from "./ui/healthcare-card"
import vaidhyaSetu from "@/assets/vaidhya-setu-logo.jpeg"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentSection?: string
  onSectionChange?: (section: string) => void
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patient Registration", icon: Users },
  { id: "doctors", label: "Doctor Connect", icon: Stethoscope },
  { id: "new-consultation", label: "New Consultation", icon: Plus },
  { id: "consultations", label: "Consultation Dashboard", icon: Video },
  { id: "medicines", label: "Medicine Inventory", icon: Pill },
  { id: "emergency", label: "Emergency SOS", icon: AlertTriangle },
  { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export function DashboardLayout({ children, currentSection = "dashboard", onSectionChange }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white border-b border-healing-mint/20 sticky top-0 z-50 shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src={vaidhyaSetu} 
                  alt="Vaidhya Setu Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">Vaidhya Setu</h1>
                <p className="text-sm text-white/80">Connecting Doctors, Empowering Rural Healthcare</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Dr. Sarah Miller</p>
                <p className="text-xs text-white/70">Health Center Admin</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <HealthcareButton 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/20"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </HealthcareButton>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-healing-mint/20 
          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-200 ease-in-out
          mt-16 md:mt-0 shadow-elevated md:shadow-none
        `}>
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentSection === item.id
              
              return (
                <HealthcareButton
                  key={item.id}
                  variant={isActive ? "caring" : "ghost"}
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => {
                    onSectionChange?.(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </HealthcareButton>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}