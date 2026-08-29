<div align="center">

```
██╗  ██╗██████╗ ██╗███████╗██╗  ██╗██╗    ██████╗ ██████╗ ██████╗ ██╗██╗      ██████╗ ████████╗
██║ ██╔╝██╔══██╗██║██╔════╝██║  ██║██║   ██╔════╝██╔═══██╗██╔══██╗██║██║     ██╔═══██╗╚══██╔══╝
█████╔╝ ██████╔╝██║███████╗███████║██║   ██║     ██║   ██║██████╔╝██║██║     ██║   ██║   ██║   
██╔═██╗ ██╔══██╗██║╚════██║██╔══██║██║   ██║     ██║   ██║██╔═══╝ ██║██║     ██║   ██║   ██║   
██║  ██╗██║  ██║██║███████║██║  ██║██║   ╚██████╗╚██████╔╝██║     ██║███████╗╚██████╔╝   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝    ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝    ╚═╝   
```

### **Enterprise-Grade AI Decision Support & Rural Precision Agritech System**
*Aligned with ICAR (Govt. of India), IMD Hyper-Local Telemetry, and e-NAM APMC Open Standards*

---

[![React 19](https://img.shields.io/badge/Frontend-React_19_SPA-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/Language-TypeScript_5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 3.4](https://img.shields.io/badge/UI_Engine-Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite 6](https://img.shields.io/badge/Bundler-Vite_6_Engine-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-C4_Enterprise_Standard-10B981?style=for-the-badge)](https://c4model.com/)
[![Languages](https://img.shields.io/badge/Vernacular-9_Indian_Languages-FF9933?style=for-the-badge)](https://github.com/)

[🌐 Launch Live Platform](http://localhost:5173/) • [🏛️ System Architecture](#-1-enterprise-system-context--c4-architecture) • [📊 Data Model & ERD](#-3-domain-entity-relationship-diagram-erd) • [🧠 AI Decision Engine](#-4-mathematical-formulation--ai-decision-matrix) • [🚀 Quickstart](#-8-deployment--quickstart)

</div>

---

## 🏛️ 1. Enterprise System Context & C4 Architecture

### **C4 Level 1: Enterprise System Context Diagram**
The system context illustrates how **Krishi Copilot** acts as the central intelligence nexus orchestrating data from satellites, meteorological radar, soil IoT, agricultural markets, and financial rails:

```mermaid
flowchart TB
    %% STAKEHOLDERS SUBGRAPH
    subgraph STAKEHOLDERS ["👥 PRIMARY AGRICULTURAL STAKEHOLDERS"]
        FARMER["👨🏽‍🌾 Verified Farmer<br/><b>Landholding: 0.5 - 20 Acres</b><br/>• Daily Action Plan & STOP/DO Badges<br/>• What-If Consequence Simulator<br/>• Truck Booking & Labour Hiring"]
        LABOURER["👷 Farm Labour / Operator<br/><b>Skilled Agricultural Workforce</b><br/>• Job Stream (Harvesting / Sowing)<br/>• Transparent Daily Wage Tracking<br/>• Worker Registration"]
        DRIVER["🚚 Logistics Fleet Operator<br/><b>Rural Transport Provider</b><br/>• Live Harvest Pickup Dispatches<br/>• APMC Mandi Transit Routes<br/>• Transparent ₹/km Fares"]
    end

    %% CORE SYSTEM SUBGRAPH
    subgraph CORE_PLATFORM ["🌾 KRISHI COPILOT ENTERPRISE PLATFORM (CENTRAL NEXUS)"]
        DECISION_CORE["🧠 AI Prescriptive Engine<br/>• STOP / DO Daily Decisions<br/>• ₹ Savings & Timing Windows"]
        VISION_CORE["📸 Crop Disease Vision CNN<br/>• Leaf Diagnostic & Safe Spray Window"]
        SIM_CORE["🌦️ What-If Consequence Simulator<br/>• Rain & Moisture Risk Physics"]
        SCHEME_CORE["💰 Government Scheme Matcher<br/>• 3-Step Apply $\to$ Review $\to$ Live DBT Tracking"]
        LOGISTICS_CORE["🚚 Rural Supply Chain Hub<br/>• GPS Truck Fleet & Labour Marketplace"]
        VOICE_CORE["🎙️ Vernacular Audio Brain<br/>• 9 Indian Languages Speech Synthesis"]
    end

    %% EXTERNAL DATA INGESTION
    subgraph TELEMETRY_GRID ["📡 NATIONAL TELEMETRY & INSTITUTIONAL GRIDS"]
        IMD["🌧️ IMD Weather Radar Grid<br/><i>1km x 1km Numerical Forecast (Rain, Temp, Wind)</i>"]
        SENTINEL["🛰️ ESA Sentinel-2 Satellites<br/><i>Multi-Spectral 10m Canopy NDVI Imagery</i>"]
        MANDI["🏛️ e-NAM / APMC Gateway<br/><i>Live Modal Auction Rates & 24h Trends</i>"]
        DBT["🧪 DBT Subsidized Fertilizer Portal<br/><i>Fixed MRPs (Urea ₹266.5, DAP ₹1,350) & Kendra Stocks</i>"]
        IOT["📡 In-Situ Soil IoT Nodes<br/><i>Dual-Depth 15cm/30cm Moisture & Smart Solenoid Drip</i>"]
        UPI["💳 NPCI UPI / Banking Rails<br/><i>1.0% P2P Micro-Loans & Direct Wage Payouts</i>"]
    end

    %% RELATIONSHIPS
    FARMER <==>|"HTTPS / Vernacular Voice & Touch"| CORE_PLATFORM
    LABOURER <==>|"HTTPS / Job Offers & Availability"| CORE_PLATFORM
    DRIVER <==>|"HTTPS / Fleet Booking & Calls"| CORE_PLATFORM

    IMD -->|"REST / JSON Precipitation Windows"| DECISION_CORE
    SENTINEL -->|"OGC WCS / GeoTIFF Multi-Spectral"| DECISION_CORE
    MANDI -->|"API Gateway / Real-Time Modal Prices"| LOGISTICS_CORE
    DBT -->|"REST / Subsidized Store Inventory"| SCHEME_CORE
    IOT <==>|"MQTT / Bi-Directional Valve Telemetry"| DECISION_CORE
    CORE_PLATFORM <==>|"NPCI UPI / Instant Payouts"| UPI

    classDef stakeholder fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#fff;
    classDef core fill:#064e3b,stroke:#34d399,stroke-width:3px,color:#fff;
    classDef external fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff;

    class FARMER,LABOURER,DRIVER stakeholder;
    class CORE_PLATFORM,DECISION_CORE,VISION_CORE,SIM_CORE,SCHEME_CORE,LOGISTICS_CORE,VOICE_CORE core;
    class IMD,SENTINEL,MANDI,DBT,IOT,UPI external;
```

---

### **C4 Level 2: Container Architecture Diagram**
Detailed container topology of the client-side reactive frontend, on-device inference pipeline, and edge services:

```mermaid
graph TB
    subgraph CLIENT_CONTAINER ["💻 CLIENT SPA CONTAINER (React 19 + TypeScript)"]
        UI_ROUTER["🧭 Dynamic View Router<br/>(App.tsx • 13 Modules)"]
        STATE_STORE["⚡ Reactive Global State<br/>(Language, Farmer Profile, Role Mode)"]
        AUDIO_ENGINE["🎙️ Web Speech Audio Core<br/>(SpeechSynthesis • 9 Dialects)"]
        SIM_SANDBOX["🌦️ What-If Consequence Simulator<br/>(Physics & Cost Calculation)"]
        VISION_ENGINE["📸 MobileNet-V3 Vision CNN<br/>(In-Browser Crop Disease Diagnostic)"]
    end

    subgraph TELEMETRY_CACHE ["🗄️ IN-MEMORY TELEMETRY & CACHE"]
        FARMER_STORE["👨🏽‍🌾 Farmer Presets DB<br/>(Yavatmal, Ludhiana, Godavari)"]
        LOGISTICS_STORE["🚚 Fleet & Labour Registry<br/>(Trucks, Drivers, Labour Crews)"]
        MANDI_STORE["🏛️ APMC Real-time Price Ledger<br/>(Daily Modal Prices & Trend Data)"]
        SCHEME_RULES["📜 Central & State Scheme Rulebook<br/>(PM-KISAN, PMFBY, PKVY, SMAM)"]
    end

    subgraph TELEMETRY_INGESTION ["📡 REAL-TIME DATA INGESTION BRIDGES"]
        MQTT_BRIDGE["📡 IoT LoRa/MQTT Telemetry Stream<br/>(15cm Root Moisture & Drip Actuator)"]
        WEATHER_API["🌧️ Hyper-Local IMD Downscaled Grid<br/>(Rain Probability & Wind Speed)"]
    end

    UI_ROUTER --> STATE_STORE
    STATE_STORE --> SIM_SANDBOX
    STATE_STORE --> AUDIO_ENGINE
    STATE_STORE --> VISION_ENGINE

    SIM_SANDBOX --> FARMER_STORE
    VISION_ENGINE --> WEATHER_API
    UI_ROUTER --> LOGISTICS_STORE
    UI_ROUTER --> MANDI_STORE
    UI_ROUTER --> SCHEME_RULES
    UI_ROUTER --> MQTT_BRIDGE

    classDef client fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef store fill:#1e293b,stroke:#64748b,stroke-width:2px,color:#fff;
    classDef bridge fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff;

    class UI_ROUTER,STATE_STORE,AUDIO_ENGINE,SIM_SANDBOX,VISION_ENGINE client;
    class FARMER_STORE,LOGISTICS_STORE,MANDI_STORE,SCHEME_RULES store;
    class MQTT_BRIDGE,WEATHER_API bridge;
```

---

## ⚡ 2. Prescriptive Decision & Consequence Flowchart

Krishi Copilot does **not** dump raw sensor charts on farmers; it computes a deterministic **Decision Matrix**:

```mermaid
flowchart TD
    Init([⏰ 05:00 AM Diagnostic Trigger]) --> FetchData[📥 Ingest Telemetry: Weather 1km + Soil 15cm/30cm + Crop Stage]
    
    FetchData --> RainCheck{🌧️ Rain Probability ≥ 60%<br/>Expected within 24h?}
    
    %% RAIN PATH
    RainCheck -- YES --> RainBlock[🛑 ACTION RESTRICTION TRIGGERED]
    RainBlock --> ActionHoldIrrigation["🚨 STOP: Hold Irrigation Today<br/>💧 Saves ~24,000L/Acre & ₹450 Electricity"]
    RainBlock --> ActionHoldSpray["🛑 STOP: Do NOT Spray Chemicals<br/>🌿 Prevents Chemical Washout & ₹1,200 Loss"]
    RainBlock --> ActionDrainage["✅ DO: Clear Furrow Drainage Outlets<br/>🚜 Prevents Waterlogging in Low Elevations"]

    %% DRY PATH
    RainCheck -- NO --> MoistureCheck{💧 15cm Root Soil Moisture < 35%?}
    MoistureCheck -- YES --> ActionIrrigate["✅ DO: Safe Irrigation Window Active<br/>⏰ Run Drip for 2.5h before 11:00 AM"]
    MoistureCheck -- NO --> MoistureHighCheck{💧 15cm Soil Moisture > 75%?}
    MoistureHighCheck -- YES --> ActionMoistureOpt["🟡 CAUTION: Soil Saturated - Hold Water"]
    MoistureHighCheck -- NO --> PestCheck{🐛 Humidity > 80% AND Temp > 28°C?}

    %% PEST PATH
    PestCheck -- YES --> ActionPest["⚠️ HIGH PEST/FUNGAL SURGE THREAT<br/>🌿 Spray 5% Bio-Neem Kernel Extract (NSKE)"]
    PestCheck -- NO --> ActionOptimal["🌱 CROP STATUS: Optimal Farm Health"]

    %% SYNTHESIS
    ActionHoldIrrigation & ActionHoldSpray & ActionDrainage & ActionIrrigate & ActionMoistureOpt & ActionPest & ActionOptimal --> Synthesize[🧠 Decision Engine Synthesizer]
    Synthesize --> SpeechGen[🔊 Synthesize Vernacular Speech in 9 Languages]
    SpeechGen --> RenderUI[📱 Render High-Contrast DO/STOP Badges on Farmer UI]
    SpeechGen --> DispatchWhatsApp[💬 Dispatch Proactive WhatsApp/SMS Warning]

    classDef critical fill:#7f1d1d,stroke:#f87171,stroke-width:2px,color:#fff;
    classDef positive fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef caution fill:#78350f,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef process fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff;

    class RainBlock,ActionHoldIrrigation,ActionHoldSpray critical;
    class ActionDrainage,ActionIrrigate,ActionOptimal positive;
    class ActionMoistureOpt,ActionPest caution;
    class FetchData,Synthesize,SpeechGen,RenderUI,DispatchWhatsApp process;
```

---

## 📊 3. Domain Entity-Relationship Diagram (ERD)

The relational schema underpinning Krishi Copilot's agricultural decision engine, logistics, and labour marketplace:

```mermaid
erDiagram
    FARMER_PROFILE ||--o{ FARM_ZONE : contains
    FARMER_PROFILE ||--o{ DAILY_ACTION : receives
    FARMER_PROFILE ||--o{ P2P_LOAN_REQUEST : initiates
    FARMER_PROFILE ||--o{ HARVEST_LEDGER : records
    FARM_ZONE ||--o{ SENSOR_TELEMETRY : produces

    RENTAL_TRUCK_FLEET ||--o{ TRUCK_BOOKING : accepts
    FARMER_PROFILE ||--o{ TRUCK_BOOKING : requests
    
    LABOUR_CREW ||--o{ LABOUR_BOOKING : accepts
    FARMER_PROFILE ||--o{ LABOUR_BOOKING : contracts

    MANDI_MARKET ||--o{ AUCTION_RATE : broadcasts
    GOVERNMENT_SCHEME ||--o{ SCHEME_ELIGIBILITY_RECORD : evaluates
    FARMER_PROFILE ||--o{ SCHEME_ELIGIBILITY_RECORD : matches

    FARMER_PROFILE {
        string id PK
        string name
        string phone
        string village
        string district
        string state
        string crop
        string cropStage
        float totalAcreage
        int soilMoisturePercent
        int kisanCreditScore
    }

    FARM_ZONE {
        string id PK
        string farmerId FK
        string zoneName
        float areaAcres
        string status
        float ndviHealthIndex
        int soilMoisture
    }

    DAILY_ACTION {
        string id PK
        string farmerId FK
        string urgency
        string title
        string actionText
        string reasoning
        string timingWindow
        string financialImpact
        boolean isCompleted
    }

    RENTAL_TRUCK_FLEET {
        string id PK
        string driverName
        string driverPhone
        string vehicleType
        string vehiclePlateNumber
        float capacityTonnes
        int ratePerKmRupees
        int baseFareRupees
        string currentLocation
        float distanceKm
        string availabilityStatus
    }

    LABOUR_CREW {
        string id PK
        string crewLeadName
        string crewType
        string crewSizeOrAge
        string phone
        string village
        int expectedDailyWageRupees
        string workPreference
        string availabilityStatus
    }

    MANDI_MARKET {
        string id PK
        string mandiName
        string district
        float distanceKm
        string phone
        int dailyArrivalsQuintal
    }

    AUCTION_RATE {
        string id PK
        string mandiId FK
        string cropName
        int modalPriceRupees
        int minPriceRupees
        int maxPriceRupees
        string priceTrend24h
        string aiRecommendation
    }
```

---

## 🧠 4. Mathematical Formulation & AI Decision Matrix

Krishi Copilot translates physical agricultural telemetry into deterministic mathematical decision models:

### **A. Multi-Spectral NDVI Canopy Vigor Formula**
Computed from Sentinel-2 optical Band 8 (Near-Infrared, 842 nm) and Band 4 (Visible Red, 665 nm):

```
          (NIR Band 8 - RED Band 4)
  NDVI = ---------------------------
          (NIR Band 8 + RED Band 4)
```

| NDVI Range | Crop Canopy Health Status | Recommended System Action |
| :--- | :--- | :--- |
| **0.75 to 1.00** | 🟢 **FLOURISHING** (Optimal Chlorophyll) | Maintain regular nutrient scheduling |
| **0.60 to 0.74** | 🟡 **WATER / NUTRIENT STRESS** | Trigger precision drip irrigation & bio-fertilizer |
| **< 0.60** | 🔴 **SEVERE PEST / FUNGAL NECROSIS** | Alert farmer for immediate leaf spot diagnostic |

---

### **B. Closed-Loop Composite Farm Risk Index (R_farm)**
A dynamic weighted synthesis across 5 risk dimensions scaled on a [0, 100] index:

```
  R_farm = (0.35 × R_weather) + (0.25 × R_pest) + (0.20 × R_water) + (0.15 × R_crop) + (0.05 × R_market)
```

* **R_weather (35% Weight):** 24-hour IMD precipitation radar, wind velocity, and storm probability.
* **R_pest (25% Weight):** Ambient relative humidity (>80%) and temperature (>28°C) fungal growth thresholds.
* **R_water (20% Weight):** 15cm shallow root zone soil volumetric moisture content.
* **R_crop (15% Weight):** Phenological stage vulnerability (e.g. flowering/boll formation is high risk).
* **R_market (5% Weight):** APMC mandi price volatility index.

---

### **C. Chemical Runoff Financial & Ecological Loss (L_loss)**
Calculated when spraying occurs within an approaching rain window (t_rain < 4 hours):

```
  L_loss = (Chemical Cost × Farm Acreage) + Pumping Energy + Ecological Penalty
  L_loss = (₹1,200 × 3.2 Acres) + ₹350 + ₹600 = ₹4,790 WASTED
```

> **🚨 Resulting AI Decision:** The system triggers an immediate **"🛑 STOP! DO NOT SPRAY"** advisory, preventing ₹4,790 in wasted chemicals and soil toxicity.

---

## 🌦️ 5. 'What-If' Sandbox Decision Simulation Engine

The sequence lifecycle executed when a farmer tests a decision before risking field capital:

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as 👨🏽‍🌾 Farmer (Ramesh Patil)
    participant UI as 📱 What-If Sandbox UI
    participant Core as ⚙️ Physics & Cost Engine
    participant Synthesizer as ⚖️ Verdict Synthesizer
    participant Voice as 🔊 Vernacular Speech Engine

    Farmer->>UI: Selects Scenario: "💧 Irrigate Field Today?"
    Farmer->>UI: Adjusts Rain Probability Slider $\to$ 85%
    Farmer->>UI: Adjusts Root Soil Moisture $\to$ 72%
    UI->>Core: ComputeConsequences(Crop='Cotton', Rain=85%, Moisture=72%, Area=3.2 Acres)

    rect rgb(254, 226, 226)
        Note over Core: Real-time Consequence Equations
        Core->>Core: Water Wasted = 24,000 L / Acre = 76,800 Litres Total
        Core->>Core: Electricity Cost Wasted = ₹450
        Core->>Core: Root Zone Anoxia Risk = +45% (Root Rot Threat)
        Core->>Core: Fungal Spore Surge = +30% (Spore Germination)
    end

    Core->>Synthesizer: Synthesize Verdict(Verdict='NOT_RECOMMENDED')
    Synthesizer-->>UI: ❌ VERDICT: NOT RECOMMENDED (आज पानी न दें)
    Synthesizer-->>UI: Prescribe Best Alternative: "Clear drainage trenches before 5 PM."

    Farmer->>UI: Clicks "🔊 Listen (सलाह सुनें)"
    UI->>Voice: speakVernacular("नमस्ते रमेश जी, आज खेत में पानी न दें...")
    Voice-->>Farmer: Speaks in Native Dialect (Hindi / Marathi / Telugu / Tamil)
```

---

## 🚜 6. Rural Supply Chain & Farm Logistics Workflow

The harvest lifecycle coordinating labour hiring, field transport, and APMC mandi monetization:

```mermaid
flowchart TD
    subgraph STAGE_1 ["1. LABOUR HIRING & HARVEST CREW"]
        H1["👨🏽‍🌾 Farmer Opens Farm Labour Hub"] --> H2["🔍 Filter Skills: Cotton Pickers / Harvester Operator"]
        H2 --> H3["👥 Select Verified Crew: Savitribai Mahila Toli (8 Workers)"]
        H3 --> H4["📞 1-Tap Call Crew Leader & Lock Wage: ₹450 / Day"]
        H4 --> H5["🌾 Harvest 45 Quintals Cotton in Sawangi Field"]
    end

    subgraph STAGE_2 ["2. HARVEST LOGISTICS & TRUCK BOOKING"]
        H5 --> T1["🚚 Farmer Opens Rental Truck Service"]
        T1 --> T2["📍 Live GPS Search: Finds Nearest Tata Ace (2.1 km away)"]
        T2 --> T3["💰 Transparent Pricing: Base ₹350 + ₹22/km (Est ₹680)"]
        T3 --> T4["⚡ Click 'Book Truck for Farm' -> Confetti Confirmation"]
        T4 --> T5["🚛 Driver Sanjay Deshmukh Arrives with Rain Tarpaulin"]
    end

    subgraph STAGE_3 ["3. APMC MANDI DISPATCH & SETTLEMENT"]
        T5 --> M1["🏛️ Transport Produce to Ghatanji APMC Mandi"]
        M1 --> M2["📊 e-NAM Auction Realization: ₹7,450 / Quintal"]
        M2 --> M3["💰 Total Revenue: ₹3,35,250 Realized via Direct Bank Transfer"]
        M3 --> M4["📒 Auto-Record Entry in Krishi Copilot Harvest Ledger"]
    end
```

---

## 🎨 7. ASCII Component Wireframes & Layout Hierarchy

### **A. Main Agricultural Dashboard Layout**
```
+---------------------------------------------------------------------------------------------------+
|  🌾 KRISHI COPILOT [Krishi AI]       [🌤️ 28°C Yavatmal | Rain 78% | Moisture 68%]   [🔊 Listen] [👤 Ramesh] [🌐 हिन्दी ▾] |
+---------------------------------------------------------------------------------------------------+
|  [🌾 Today's Plan] [🌦️ What-If] [🚚 Trucks] [👷 Labour] [📊 Production] [📡 IoT] [📸 Diseases] [💰 Schemes] [🧪 NPK]  |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  +-------------------------------------------------------------------+  +-----------------------+  |
|  | 🌾 TODAY'S PRIORITY ACTION PLAN                                   |  | 📊 COMPOSITE RISK     |  |
|  | AI-calculated high priority decisions for Ramesh Patil (3.2 Acres)|  | 65 / 100 [HIGH RISK]  |  |
|  +-------------------------------------------------------------------+  +-----------------------+  |
|                                                                         | 🌧️ Weather Risk   85% |  |
|  +-------------------------------------------------------------------+  | 🐛 Pest Threat    90% |  |
|  | 🚨 URGENT DECISION: HOLD IRRIGATION TODAY                         |  | 💧 Water Stress   15% |  |
|  | ----------------------------------------------------------------- |  | 🌱 Crop Health    55% |  |
|  | 🛑 Action: DO NOT turn on your 5HP borewell motor today.          |  +-----------------------+  |
|  | 💡 Why: 78% Heavy Rain is approaching your field within 24 hours. |                             |
|  | 💰 Savings: Saves ~24,000 Litres of Water & ₹450 Electricity Bill.|  +-----------------------+  |
|  | ⏱️ Window: Complete furrow drainage clearance before 5:00 PM.    |  | 🏪 NEARBY STORES      |  |
|  |                                                                   |  | Urea: ₹266.50 (Avail) |  |
|  | [ 🔊 Listen Audio ]   [ 🌦️ Simulate in What-If ]   [ ✓ Mark Done ] |  | DAP:  ₹1,350  (Avail) |  |
|  +-------------------------------------------------------------------+  | [ Reserve 24h Token ] |  |
|                                                                         +-----------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 🚀 8. Deployment & Quickstart

### **Local Setup**
```bash
# 1. Clone the repository
git clone https://github.com/lucyyy01/krishi.git
cd krishi

# 2. Install dependencies (React 19, TypeScript, Lucide, Tailwind)
npm install

# 3. Launch reactive development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### **Production Build**
```bash
npm run build
```

---

## 🏆 9. Hackathon Judge 60-Second Evaluation Matrix

| Test Goal | Demonstration Workflow | Expected System Output |
| :--- | :--- | :--- |
| **1. Smart Login Gate** | Open app $\to$ Click **"👨🏽‍🌾 Ramesh Patil"** preset $\to$ Enter. | Opens Cotton farm dashboard with live localized Yavatmal telemetry. |
| **2. Prescriptive Action** | On **"Today's Action Plan"** tab $\to$ Click **"🔊 Listen"**. | Native vernacular audio engine synthesizes DO/STOP actions and ₹ savings. |
| **3. What-If Sandbox** | On **"What-If Simulator"** $\to$ Slide Rain to 90% $\to$ Click **"💧 Irrigate?"**. | AI generates **"❌ NOT RECOMMENDED"**, computing ₹450 loss and anoxia risk. |
| **4. Rental Truck Booking** | On **"🚚 Rental Trucks"** $\to$ Click **"Book Truck for Farm"** on Tata Ace. | Dispatches nearest driver (2.1 km) with transparent pricing and confetti. |
| **5. Labour Marketplace** | On **"👷 Farm Labour"** $\to$ Click **"Apply as Farm Labour"** or hire crew. | Opens worker registration or books labour crew with transparent daily wages. |
| **6. Crop Vision AI** | On **"📸 Crop Disease"** $\to$ Select **"Cotton Whitefly"**. | Neural network spots pest $\to$ validates safe spray window $\to$ prescribes dosage. |
| **7. Dual-Role Mode** | Click **"🚪 Logout"** $\to$ Choose **"🔄 Both"** $\to$ Click **"Switch to Labour View"**. | Header toggles live between Farmer decisions and Labour job opportunities. |

---

<div align="center">
  <strong>Built with ❤️ for 140 Million Indian Farmers (जय जवान, जय किसान)</strong>
</div>
