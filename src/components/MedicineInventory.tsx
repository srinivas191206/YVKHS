import React, { useState } from "react"
import { Package, AlertTriangle, Plus, Search, Filter, Calendar } from "lucide-react"
import { HealthcareCard } from "./ui/healthcare-card"
import { HealthcareButton } from "./ui/healthcare-button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"

interface Medicine {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  expiryDate: string
  batchNumber: string
  supplier: string
  price: number
}

const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    stock: 150,
    minStock: 50,
    expiryDate: "2024-12-15",
    batchNumber: "PCM2024A",
    supplier: "MediCore Ltd",
    price: 2.50
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    stock: 25,
    minStock: 30,
    expiryDate: "2024-08-20",
    batchNumber: "AMX2024B",
    supplier: "HealthPharma",
    price: 8.75
  },
  {
    id: "3",
    name: "Insulin Glargine",
    category: "Diabetes",
    stock: 8,
    minStock: 10,
    expiryDate: "2024-06-30",
    batchNumber: "INS2024C",
    supplier: "DiabetCare",
    price: 45.00
  },
  {
    id: "4",
    name: "Blood Pressure Monitor",
    category: "Equipment",
    stock: 5,
    minStock: 2,
    expiryDate: "2026-01-01",
    batchNumber: "BPM2024D",
    supplier: "MedTech Solutions",
    price: 125.00
  }
]

export function MedicineInventory() {
  const [medicines] = useState<Medicine[]>(mockMedicines)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { status: "out", color: "destructive" }
    if (stock <= minStock) return { status: "low", color: "outline" }
    return { status: "good", color: "secondary" }
  }

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) return { status: "expired", color: "destructive" }
    if (daysUntilExpiry <= 30) return { status: "expiring", color: "outline" }
    return { status: "good", color: "secondary" }
  }

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || medicine.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(medicines.map(m => m.category)))
  const lowStockCount = medicines.filter(m => m.stock <= m.minStock).length
  const expiringCount = medicines.filter(m => {
    const daysUntilExpiry = Math.ceil((new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0
  }).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-teal">Medicine Inventory</h1>
          <p className="text-muted-foreground mt-1">Track stock levels, expiry dates, and manage orders</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <HealthcareButton variant="caring" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Medicine
            </HealthcareButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input id="stock" type="number" className="col-span-3" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthcareCard className="border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <div>
              <h3 className="font-semibold text-warning">Low Stock Alert</h3>
              <p className="text-sm text-muted-foreground">{lowStockCount} items below minimum stock</p>
            </div>
          </div>
        </HealthcareCard>
        
        <HealthcareCard className="border-l-4 border-l-destructive">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-destructive" />
            <div>
              <h3 className="font-semibold text-destructive">Expiry Alert</h3>
              <p className="text-sm text-muted-foreground">{expiringCount} items expiring within 30 days</p>
            </div>
          </div>
        </HealthcareCard>
      </div>

      {/* Filters */}
      <HealthcareCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </HealthcareCard>

      {/* Medicine List */}
      <div className="grid gap-4">
        {filteredMedicines.map((medicine) => {
          const stockStatus = getStockStatus(medicine.stock, medicine.minStock)
          const expiryStatus = getExpiryStatus(medicine.expiryDate)
          
          return (
            <HealthcareCard key={medicine.id} className="hover:shadow-gentle transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-healing-mint/20 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-deep-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {medicine.category} • Batch: {medicine.batchNumber} • ${medicine.price}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supplier: {medicine.supplier}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Stock: {medicine.stock}</span>
                      <Badge variant={stockStatus.color as "default" | "secondary" | "destructive" | "outline"}>
                        {stockStatus.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                      </span>
                      <Badge variant={expiryStatus.color as "default" | "secondary" | "destructive" | "outline"} className="text-xs">
                        {expiryStatus.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <HealthcareButton variant="outline" size="sm">
                    Edit
                  </HealthcareButton>
                </div>
              </div>
            </HealthcareCard>
          )
        })}
      </div>
    </div>
  )
}