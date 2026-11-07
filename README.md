# CCTNS INVESTIGATION TRACKER (द्विभाषी / Bilingual)
## Internal Police Portal: e-Sakshya, CRA, and 60/90 Days BNS Case Monitoring
### सी.सी.टी.एन.एस विवेचना, ई-साक्ष्य एवं 60/90 दिवस BNS मामला निगरानी प्रणाली

---

## 📌 परियोजना का संक्षिप्त विवरण (Project Overview)
यह पोर्टल पुलिस अधिकारियों (SP, ASP, SDOP, TI) एवं विवेचना अधिकारियों (IOs) के लिए CCTNS विवेचना, ई-साक्ष्य (e-Sakshya) व BNSS धारा 187 के तहत 60/90 दिवसीय वैधानिक समय-सीमा की निगरानी हेतु विकसित आंतरिक प्रणाली है।

---

## 🗂️ मुख्य 8 मॉड्यूल्स (Core 8 Modules)

1. **PS-wise Investigation Register (थानावार विवेचना रजिस्टर):**
   - थानों में दर्ज FIRs, BNS धाराएं, जांच अधिकारी (IO) एवं वर्तमान स्थिति।
2. **60/90 Days BNS Case Monitoring (60/90 दिवस BNS मामला निगरानी):**
   - District -> Police Station कैस्केडिंग चयन।
   - 60 व 90 दिवस वैधानिक सीमा की उलटी गिनती (Countdown)।
   - कितने मामलों में चालान/Charge-sheet तैयार हुआ।
   - **आज कोर्ट में पेशी (Due Today for Court Submission)** की अलग पहचान।
   - **कोर्ट पेशी उपरांत CCTNS में प्रविष्टि स्थिति (Pending vs Done)**, जावक क्रमांक (Dispatch No.) एवं CIS Case No.।
3. **Daily Investigation Progress Entry (दैनिक विवेचना प्रगति प्रविष्टि):**
   - केस डायरी (CD), गवाह बयान, जब्ती एवं आगामी विवेचना योजना का दैनिक रिकॉर्ड।
4. **e-Sakshya Status Tracking (ई-साक्ष्य स्थिति ट्रैकिंग):**
   - District -> Police Station कैस्केडिंग चयन।
   - सीन ऑफ क्राइम वीडियो, फोटो, ऑडियो एवं पंचनामा के लिए उत्पन्न **SID (Sakshya ID)**।
   - CCTNS फाइनल चार्जशीट के साथ **SID Final Linking** की स्थिति।
5. **CRA Login & Entry Tracking (CRA लॉगिन एवं प्रविष्टि ट्रैकिंग):**
   - तारीख के अनुसार विवेचकों की दैनिक CRA लॉगिन स्थिति।
   - कितने IO ने लॉगिन किया और कितने अनुपस्थित/लंबित रहे।
   - IO-वार FIR एवं SID संख्या।
6. **Contacts & Officer Directory (अधिकारी एवं संपर्क निर्देशिका):**
   - थाना प्रभारी, IOs, PNO नंबर एवं शासकीय संपर्क।
7. **Tasks and Pending Work (कार्य एवं लंबित कार्य):**
   - FSL रिपोर्ट, वारंट तामीली, साक्ष्य लिंकिंग हेतु उच्च प्राथमिकता वाले टास्क।
8. **District & PS-wise Reports (जिलावार / थानावार रिपोर्ट):**
   - तुलनात्मक प्रगति पत्रक, एक्सेल/CSV डाउनलोड एवं प्रिंटेबल रिपोर्ट।

---

## 🚀 चलाने का तरीका (How to Run)

### 1. फ्रंटएंड (Frontend - React + Vite)
```powershell
cd "C:\Users\Guruvendra Singh\.gemini\antigravity\scratch\cctns-investigation-tracker\frontend"
npm run dev
```
पोर्टल लिंक: **http://localhost:5174**

### 2. बैकएंड (Backend - FastAPI)
```powershell
cd "C:\Users\Guruvendra Singh\.gemini\antigravity\scratch\cctns-investigation-tracker\backend"
python -m uvicorn app.main:app --reload --port 8000
```
Swagger API डॉक्स: **http://localhost:8000/docs**

### 3. एक-क्लिक स्टार्ट (One-Click Start)
`start.bat` पर डबल-क्लिक करें।
