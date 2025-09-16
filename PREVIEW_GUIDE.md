# 🏥 Evergreen Health Portal - Preview Guide

## 🎯 Application Overview

The Evergreen Health Portal is a comprehensive healthcare management system designed for rural health centers. Here's what you'll see when you run the application:

## 🖥️ Main Dashboard Interface

### Header Section
```
┌─────────────────────────────────────────────────────────────────┐
│ [🏥 Logo] Vaidhya Setu                    Dr. Sarah Miller [👤] │
│           Connecting Doctors, Empowering Rural Healthcare        │
└─────────────────────────────────────────────────────────────────┘
```

### Sidebar Navigation
```
┌─────────────────────┐
│ 📊 Dashboard        │ ← Default view
│ 👥 Patient Reg.     │
│ 🩺 Doctor Connect   │
│ ➕ New Consultation │
│ 📹 Consultations    │
│ 💊 Medicine Inv.    │
│ 🚨 Emergency SOS    │
│ 📈 Reports          │
│ ⚙️  Settings        │
└─────────────────────┘
```

## 📱 Key Features & Screenshots Preview

### 1. 📊 Dashboard Overview
**What you'll see:**
- 4 colorful metric cards showing:
  - 👥 **12 Patients Today** (healing mint theme)
  - 🩺 **8 Consultations** (sky blue theme)  
  - 💊 **45 Medicines Dispensed** (success green)
  - 🚨 **2 Emergency Cases** (coral warning)

- **Recent Patients List:**
  ```
  [R] Ramesh Kumar, 45   | Hypertension     | P001 | 2 mins ago
  [S] Sunita Devi, 28    | Fever           | P002 | 15 mins ago
  [A] Arjun Singh, 62    | Diabetes Check  | P003 | 1 hour ago
  ```

- **Available Doctors:**
  ```
  [❤️] Dr. Rajesh Kumar    | General Medicine | 🟢 Available
  [❤️] Dr. Priya Sharma   | Pediatrics      | 🔵 In Consultation  
  [❤️] Dr. Amit Patel     | Cardiology      | 🟢 Available
  ```

- **Quick Action Buttons:**
  ```
  [👥 Register]  [🩺 Connect]  [💊 Inventory]  [🚨 Emergency]
  [Patient]      [Doctor]      [Check]         [SOS]
  ```

### 2. 👥 Patient Registration
**Interface Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Patient Registration                    [📷 Capture Photo] │
├─────────────────────────────────────────────────────────┤
│ Basic Information          │ Symptoms & Vitals           │
│ ┌─────────────────────────┐ │ ┌─────────────────────────┐ │
│ │ Full Name: [_________] │ │ │ Chief Complaints:       │ │
│ │ Age: [___] Gender:[▼] │ │ │ [Text Area]             │ │
│ │ Phone: [____________] │ │ │                         │ │
│ │ Address: [__________] │ │ │ Temperature: [_____]°F  │ │
│ │ [________________]    │ │ │ Heart Rate: [_____] bpm │ │
│ └─────────────────────────┘ │ │ Blood Pressure: [____] │ │
│                             │ │ Oxygen Level: [_____]% │ │
│                             │ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│                    [Save Draft] [Register Patient]       │
└─────────────────────────────────────────────────────────┘
```

### 3. 🩺 Doctor Connect
**Network Status:** 🟢 Good • Video calls available • 4G/WiFi detected

**Doctor Cards Display:**
```
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ [🩺] Dr. Rajesh Kumar          🟢 On │ │ [🩺] Dr. Priya Sharma         🔵 Busy│
│      General Medicine              │ │      Pediatrics                    │
│ ⭐ 4.8  ⏱️ ~2min  💰 ₹200         │ │ ⭐ 4.9  ⏱️ ~3min  💰 ₹250         │
│ [📹 Video Call] [📞 Audio Only]   │ │ [📹 Video Call] [📞 Audio Only]   │
└──────────────────────────────────────┘ └──────────────────────────────────────┘
```

### 4. ➕ New Consultation Request
**Form Interface:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🩺 New Consultation Request                                 │
├─────────────────────────────────────────────────────────────┤
│ Patient Information        │ Vital Signs                    │
│ ┌─────────────────────────┐ │ ┌─────────────────────────────┐ │
│ │ Patient Name: [_______]│ │ │ Temperature: [____]°F       │ │
│ │ Age: [__] Contact:[___]│ │ │ Blood Pressure: [_________] │ │
│ │ Symptoms: [___________]│ │ │ Heart Rate: [____] BPM      │ │
│ │ [_____________________]│ │ │ Oxygen Level: [____]%       │ │
│ └─────────────────────────┘ │ └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Consultation Type: [🔄 Routine - Schedule Later] [📅 DateTime]│
│                                                             │
│ Available Doctors:                                          │
│ ○ Dr. Sarah Johnson    | Emergency Medicine  | 5min Response│
│ ○ Dr. Michael Chen     | Pediatrics         | 15min Response│
├─────────────────────────────────────────────────────────────┤
│           [🚨 Send Emergency Request] [⏰ Schedule]           │
└─────────────────────────────────────────────────────────────┘
```

### 5. 📹 Consultation Dashboard
**Real-time Status Overview:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🩺 Consultation Dashboard                                   │
├─────────────────────────────────────────────────────────────┤
│ [📊 Total: 15] [🟠 Pending: 3] [🔵 Scheduled: 2] [🟢 Live: 1] [⚫ Complete: 9] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 👤 Ramesh Kumar, 45y  🚨 Emergency  🟠 Pending         │ │
│ │ 🩺 Dr. Sarah Johnson | Emergency Medicine              │ │
│ │ 📅 ASAP | Created: Sep 16, 10:30 AM                   │ │
│ │ 👁️ Symptoms: Chest pain, difficulty breathing          │ │
│ │ 📞 Contact: +91 9876543210                             │ │
│ │                    [📹 Start Video Call] [❌ Cancel]    │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 👤 Sunita Devi, 28y  ⏰ Routine  🔵 Scheduled          │ │
│ │ 🩺 Dr. Michael Chen | Pediatrics                       │ │
│ │ 📅 Sep 16, 2:00 PM | Created: Sep 16, 9:15 AM         │ │
│ │ 👁️ Symptoms: Child fever, cough                        │ │
│ │                    [📹 Join Call] [❌ Cancel]           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 6. 📝 Digital Prescription System
**Prescription Creation Interface:**
```
┌─────────────────────────────────────────────────────────────┐
│ 📄 Create Prescription | Dr. Sarah Johnson | ID: MED-2024-001│
├─────────────────────────────────────────────────────────────┤
│ 👤 Ramesh Kumar | Age: 45 years | Consultation ID: abc12345 │
├─────────────────────────────────────────────────────────────┤
│ 🩺 Diagnosis                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Primary Diagnosis: [Text Area]                          │ │
│ │ Enter the primary diagnosis and clinical findings...    │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 💊 Medications                            [➕ Add Medicine] │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💊 Medication 1                         [🗑️ Remove]    │ │
│ │ Medicine: [Paracetamol ▼] Dosage: [500mg ▼]           │ │
│ │ Frequency: [Twice daily ▼] Duration: [7 days]         │ │
│ │ Instructions: [Take with food, avoid alcohol]          │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 📋 Additional Instructions                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ General Instructions: [Text Area]                       │ │
│ │ Follow-up Date: [📅 Date Picker]                       │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│              [📄 Create Digital Prescription] [❌ Cancel]   │
└─────────────────────────────────────────────────────────────┘
```

**Generated Prescription View:**
```
┌─────────────────────────────────────────────────────────────┐
│                    🏥 VAIDHYA SETU                          │
│           Connecting Doctors, Empowering Rural Healthcare   │
│                   DIGITAL PRESCRIPTION                      │
├─────────────────────────────────────────────────────────────┤
│ Patient Information        │ Doctor Information             │
│ Name: Ramesh Kumar         │ Dr. Sarah Johnson              │
│ Age: 45 years              │ License: MED-2024-001          │
│ Date: 16/09/2024          │ Digital Signature: Verified ✓  │
├─────────────────────────────────────────────────────────────┤
│ 🩺 Diagnosis: Hypertension with mild chest discomfort      │
├─────────────────────────────────────────────────────────────┤
│ 💊 Prescribed Medications:                                  │
│ 1. Paracetamol 500mg • Twice daily • 7 days               │
│    Instructions: Take with food, avoid alcohol             │
│ 2. Amlodipine 5mg • Once daily • 30 days                  │
│    Instructions: Take in the morning                       │
├─────────────────────────────────────────────────────────────┤
│ 📋 Additional Instructions: Regular BP monitoring          │
│ 📅 Follow-up: September 23, 2024                          │
├─────────────────────────────────────────────────────────────┤
│     [🖨️ Print] [⬇️ Download] [✅ Mark as Dispensed] [← Back] │
└─────────────────────────────────────────────────────────────┘
```

### 7. 🚨 Emergency SOS
**Emergency Interface:**
```
┌─────────────────────────────────────────────────────────────┐
│                    🚨 Emergency Services                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                        ┌─────────┐                         │
│                        │   🚨    │                         │
│                        │   SOS   │ ← Large pulsing button │
│                        │Emergency│                         │
│                        │  Call   │                         │
│                        └─────────┘                         │
│                                                             │
│                    Emergency Hotline                       │
│                         108                                 │
│                    Available 24/7                         │
├─────────────────────────────────────────────────────────────┤
│ 📞 Emergency Contacts     │ 📍 Location Services           │
│ District Hospital         │ 🟢 GPS Status: Active          │
│ +91 9876543210           │ Location shared automatically   │
│ Police Station: 100       │ Coordinates: 28.6139°N         │
│ Fire Department: 101      │ Address: Village Health Center │
└─────────────────────────────────────────────────────────────┘
```

**Emergency Alert Animation (when activated):**
```
┌─────────────────────────────────────────────────────────────┐
│                    🚨 EMERGENCY ALERT SENT                 │
├─────────────────────────────────────────────────────────────┤
│                    [🚨 Pulsing Animation]                   │
│                                                             │
│ Step 1: ⏳ Connecting to nearest ambulance service...      │
│ Step 2: ✅ Ambulance Located - District Hospital           │
│ Step 3: 🚗 Help is Coming - ETA: 15 minutes               │
│                                                             │
│ 📍 GPS location shared • Contact: +91 9876543210           │
│ 📍 Location: Village Health Center, Sector 12              │
└─────────────────────────────────────────────────────────────┘
```

### 8. 💊 Medicine Inventory
**Inventory Management Interface:**
```
┌─────────────────────────────────────────────────────────────┐
│ 💊 Medicine Inventory                    [➕ Add Medicine]  │
├─────────────────────────────────────────────────────────────┤
│ ⚠️ Low Stock Alert: 3 items  │ 📅 Expiry Alert: 2 items   │
├─────────────────────────────────────────────────────────────┤
│ [🔍 Search medicines...] [🔽 Filter: All Categories]       │
├─────────────────────────────────────────────────────────────┤
│ [📦] Paracetamol 500mg                            [Edit]   │
│      Pain Relief • Batch: PCM2024A • $2.50               │
│      Supplier: MediCore Ltd                               │
│      Stock: 150 [🟢 Good] Expires: Dec 15, 2024 [🟢 Good] │
├─────────────────────────────────────────────────────────────┤
│ [📦] Amoxicillin 250mg                           [Edit]   │
│      Antibiotic • Batch: AMX2024B • $8.75                │
│      Supplier: HealthPharma                               │
│      Stock: 25 [🟡 Low] Expires: Aug 20, 2024 [🔴 Expiring] │
├─────────────────────────────────────────────────────────────┤
│ [📦] Insulin Glargine                            [Edit]   │
│      Diabetes • Batch: INS2024C • $45.00                 │
│      Supplier: DiabetCare                                 │
│      Stock: 8 [🟡 Low] Expires: Jun 30, 2024 [🔴 Expiring] │
└─────────────────────────────────────────────────────────────┘
```

### 9. 📈 Reports & Analytics
**Analytics Dashboard:**
```
┌─────────────────────────────────────────────────────────────┐
│ 📈 Reports & Analytics              [📅 Last 7 days ▼] [⬇️ Export] │
├─────────────────────────────────────────────────────────────┤
│ [👥 234] [📈 45] [❤️ 8] [⏱️ 12m]                           │
│ Total    New    Critical Avg Wait                           │
│ Visits   Patients Cases  Time                               │
├─────────────────────────────────────────────────────────────┤
│ Weekly Patient Flow        │ Consultation Success Rate      │
│ Mon ████████░░ 28         │         94.5%                  │
│ Tue ███████████ 35         │    ████████████████████░       │
│ Wed █████████████ 42       │ Successfully completed         │
│ Thu ██████████░ 38         │                                │
│ Fri ██████████████ 45      │                                │
│ Sat ████████░ 32           │                                │
│ Sun ██████░ 25             │                                │
├─────────────────────────────────────────────────────────────┤
│ [📊 Overview] [🦠 Diseases] [👨‍⚕️ Doctors] [📈 Trends]        │
└─────────────────────────────────────────────────────────────┘
```

### 10. ⚙️ Settings
**Configuration Tabs:**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚙️ Settings                                                 │
├─────────────────────────────────────────────────────────────┤
│ [👤 Profile] [🔔 Notifications] [🌐 System] [🔒 Security]   │
├─────────────────────────────────────────────────────────────┤
│ Profile Management                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [👤] Dr. Sarah Miller                                   │ │
│ │      Health Center Admin                     🟢 Active  │ │
│ │                                                         │ │
│ │ Full Name: [Dr. Sarah Miller]                          │ │
│ │ Email: [sarah.miller@healthcenter.com]                 │ │
│ │ Phone: [+1 (555) 123-4567]                           │ │
│ │ Role: [Health Center Admin ▼]                         │ │
│ │                                    [Save Changes]      │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Visual Theme & Colors

The application uses a carefully designed healthcare theme:

- **Primary Colors:**
  - 🟢 Healing Mint: For calming, positive actions
  - 🔵 Sky Blue: For information and doctor-related functions
  - 🟢 Deep Teal: For primary text and emphasis
  - 🟡 Warm Coral: For warnings and urgent items

- **Status Colors:**
  - 🟢 Success Green: Completed actions, good status
  - 🟡 Warning Amber: Attention needed, low stock
  - 🔴 Error Rose: Critical alerts, emergencies
  - 🔵 Info Blue: Information, scheduled items

## 🚀 How to Run the Preview

To see this application in action:

1. **Install Dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```

3. **Open Browser:**
   ```
   http://localhost:8080
   ```

4. **For Production Preview:**
   ```bash
   npm run build && npm run preview
   ```

## 📱 Mobile Responsive Design

The application is fully responsive and works beautifully on:
- 📱 **Mobile Phones**: Collapsible sidebar, touch-optimized buttons
- 📱 **Tablets**: Optimized layout for medium screens
- 💻 **Desktop**: Full-featured dashboard experience

## 🎯 Key User Interactions

1. **Click** the SOS button for emergency simulation
2. **Navigate** through different sections using the sidebar
3. **Fill forms** to register patients or create consultations
4. **View real-time** consultation status updates
5. **Generate** digital prescriptions with professional layout
6. **Monitor** medicine inventory with alerts
7. **Analyze** data through comprehensive reports

This healthcare portal provides an intuitive, professional interface that makes complex medical workflows simple and efficient for rural healthcare workers.