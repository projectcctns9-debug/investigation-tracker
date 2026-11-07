# Parse official CG Police Master from User Request

RAW_DATA = """
DISTRICT	PS
BALOD	AJK BALOD
BALOD	ARJUNDA
BALOD	BALOD
BALOD	DEORI
BALOD	DOUNDI
BALOD	DOUNDI LOHARA
BALOD	GUNDARDEHI
BALOD	GURUR
BALOD	MAHAMAYA
BALOD	MANGCHUA
BALOD	Purur
BALOD	RAJHARA
BALOD	RANCHIRAI
BALOD	Sanoud
BALOD	SUREGAON
BALODABAZAR-BHATAPARA	AJK BALODA BAZAR
BALODABAZAR-BHATAPARA	BHATAPARA CITY
BALODABAZAR-BHATAPARA	BHATAPARA RURAL
BALODABAZAR-BHATAPARA	City Kotwali Balodabazar
BALODABAZAR-BHATAPARA	CYBER POLICE STATION, BALODABAZAR-BHATAPARA
BALODABAZAR-BHATAPARA	GIDHORI
BALODABAZAR-BHATAPARA	GIDHPURI
BALODABAZAR-BHATAPARA	Hathband
BALODABAZAR-BHATAPARA	KASDOL
BALODABAZAR-BHATAPARA	Lawan
BALODABAZAR-BHATAPARA	PALARI
BALODABAZAR-BHATAPARA	RAJADEORI
BALODABAZAR-BHATAPARA	SIMGA
BALODABAZAR-BHATAPARA	SUHELA
BALRAMPUR	AJK BALRAMPUR
BALRAMPUR	BALRAMPUR
BALRAMPUR	BASANTPUR
BALRAMPUR	CHALGALI
BALRAMPUR	CHANDO
BALRAMPUR	KARONDHA
BALRAMPUR	KUSAMI
BALRAMPUR	NEW RAJPUR
BALRAMPUR	PASTA
BALRAMPUR	RAGHUNATH NAGAR
BALRAMPUR	RAMANUJGANJ
BALRAMPUR	RAMCHANDRAPUR
BALRAMPUR	SAMRIPATH
BALRAMPUR	SANAWAL
BALRAMPUR	SHANKARGARH
BALRAMPUR	TRIKUNDA
BASTAR	AJK JAGDALPUR
BASTAR	Bakawand
BASTAR	BANDAJI
BASTAR	BASTAR
BASTAR	BHANPURI
BASTAR	BODHGHAT
BASTAR	BURGUM
BASTAR	Cyber Police Thana, Range Baster
BASTAR	DARBHA
BASTAR	FREZARPUR
BASTAR	JAGDALPUR
BASTAR	KARPAWAND
BASTAR	KODENAR
BASTAR	LOHANDIGUDA
BASTAR	MAHILA THANA
BASTAR	MALEWAHI
BASTAR	MARDUM
BASTAR	NAGARNAAR
BASTAR	NANGUR
BEMETARA	AJK BEMETARA
BEMETARA	BEMETARA
BEMETARA	BERLA
BEMETARA	CHANDNOO
BEMETARA	DARHI
BEMETARA	KHAMHARIA
BEMETARA	NANDGHAT
BEMETARA	NAWAGARH BEMETARA
BEMETARA	PARPODI
BEMETARA	SAJA
BIJAPUR	AJK BIJAPUR
BIJAPUR	AWAPALLI
BIJAPUR	BASAGUDA
BIJAPUR	BEDARE
BIJAPUR	BHADRAKALI
BIJAPUR	BHAIRAMGARH
BIJAPUR	BHOPALPATNAM
BIJAPUR	BIJAPUR
BIJAPUR	ELMIDI
BIJAPUR	FARSEGARH
BIJAPUR	GANGALOOR
BIJAPUR	Jangla
BIJAPUR	KUTRU
BIJAPUR	MADDED
BIJAPUR	MIRTUR
BIJAPUR	MODAKPAL
BIJAPUR	Naimed
BIJAPUR	NELASNAR
BIJAPUR	PAMED
BIJAPUR	TARALAGUDA
BIJAPUR	TARREM
BIJAPUR	TOYNAR
BIJAPUR	USOOR
BILASPUR	 MOPKA 
BILASPUR	A.J.K.
BILASPUR	Belgahna
BILASPUR	BILHA
BILASPUR	CHAKARBHATA
BILASPUR	CITY KOTWALI
BILASPUR	CIVIL LINES
BILASPUR	Cyber Police Thana, Range Bilaspur
BILASPUR	HIRRI
BILASPUR	KONI
BILASPUR	KOTA
BILASPUR	MAHILA THANA
BILASPUR	MANGLA 
BILASPUR	MASTURI
BILASPUR	Pachpedi
BILASPUR	RATANPUR
BILASPUR	SAKRI
BILASPUR	SARKANDA
BILASPUR	SIPAT
BILASPUR	SIRGITTI
BILASPUR	TAKHATPUR
BILASPUR	TARBAHAR
BILASPUR	TORWA
DANTEWADA	AJK DANTEWADA
DANTEWADA	ARANPUR
DANTEWADA	BACHELI
DANTEWADA	BARSOOR
DANTEWADA	BHANSI
DANTEWADA	DANTEWADA
DANTEWADA	FARASPAL
DANTEWADA	GEEDAM
DANTEWADA	KATEKALYAN
DANTEWADA	KIRANDUL
DANTEWADA	KUAKONDA
DANTEWADA	MAHILA THANA
DANTEWADA	POLICE STATION TIKANPAL
DHAMTARI	AJK DHAMTARI
DHAMTARI	Akladongri
DHAMTARI	ARJUNI
DHAMTARI	BHAKHARA
DHAMTARI	BORAI
DHAMTARI	CYBER POLICE STATION DHAMTARI
DHAMTARI	DHAMTARI
DHAMTARI	DUGLI
DHAMTARI	KEREGAON
DHAMTARI	KHALLARI
DHAMTARI	KURUD
DHAMTARI	MAGARLOD
DHAMTARI	MECHKA
DHAMTARI	NAGARI
DHAMTARI	RUDRI
DHAMTARI	SIHAWA
DURG	AJK DURG
DURG	AMLESHWAR
DURG	ANDA
DURG	BHILAI BHATTI
DURG	BHILAI NAGAR
DURG	BORI
DURG	CHAWANI
DURG	Cyber Police Thana, Range Durg
DURG	DHAMDHA
DURG	JAMGAON-R
DURG	JAMUL
DURG	KHURSIPAR
DURG	KOTWALI, DURG
DURG	KUMHARI
DURG	MAHILA THANA
DURG	MOHAN NAGAR
DURG	NANDINI
DURG	NEWAI
DURG	PADMANABHPUR
DURG	PATAN
DURG	PULGAON
DURG	PURANI BHILAI
DURG	RANI TARAI
DURG	SUPELA
DURG	UTAI
DURG	VAISHALI NAGAR
GARIYABAND	AJK GARIYABAND
GARIYABAND	AMLIPADAR
GARIYABAND	ATARMARA/PANDUKA
GARIYABAND	CHURA
GARIYABAND	DEOBHOG
GARIYABAND	FENGESWAR
GARIYABAND	GARIYABAND
GARIYABAND	INDAGAON
GARIYABAND	MAINPUR
GARIYABAND	PAYLIKHAND
GARIYABAND	PIPERCHEDI
GARIYABAND	RAJIM
GARIYABAND	SHOBHA
GAURELA-PENDRA-MARWAHI	AJK POLICE THANA
GAURELA-PENDRA-MARWAHI	GAURELA
GAURELA-PENDRA-MARWAHI	MARWAHI
GAURELA-PENDRA-MARWAHI	PENDRA
GRP 	BHILAI
GRP 	BILASPUR
GRP 	DONGARGARH
GRP 	RAIGARH
GRP 	RAIPUR
JANJGIR CHAMPA	AJK JANJGIR-CHAMPA
JANJGIR CHAMPA	AKALTARA
JANJGIR CHAMPA	BALOUDA
JANJGIR CHAMPA	BHAMNIDIH
JANJGIR CHAMPA	BIRRA
JANJGIR CHAMPA	CHAMPA
JANJGIR CHAMPA	CYBER POLICE STATION JANJGIR-CHAMPA
JANJGIR CHAMPA	JANJGIR
JANJGIR CHAMPA	Mahila Police Thana
JANJGIR CHAMPA	MULMULA
JANJGIR CHAMPA	NAWAGARH
JANJGIR CHAMPA	PAMGARH
JANJGIR CHAMPA	SARAGAON
JANJGIR CHAMPA	SHEORINARAYAN
JASHPUR	AJK JASHPUR
JASHPUR	ASTA
JASHPUR	BAGBAHAR
JASHPUR	BAGEECHA
JASHPUR	CYBER POLICE STATION, JASHPUR
JASHPUR	DULDULA
JASHPUR	JASHPUR
JASHPUR	KANSABELL
JASHPUR	KUNKURI
JASHPUR	LODAM
JASHPUR	MAHILA THANA
JASHPUR	NARAYANPUR
JASHPUR	PATTHALGAON
JASHPUR	PHARSABAHAR
JASHPUR	SANNA
JASHPUR	TAPKARA
JASHPUR	TUMLA
KABIRDHAM	AJK KABIRDHAM
KABIRDHAM	BHORAM DEV
KABIRDHAM	BODLA
KABIRDHAM	CHILPFI
KABIRDHAM	CYBER POLICE STATION, KABIRDHAM
KABIRDHAM	JHALMALA
KABIRDHAM	KABIRDHAM
KABIRDHAM	KUKDOOR
KABIRDHAM	KUNDA
KABIRDHAM	MAHILA THANA
KABIRDHAM	PANDARIYA
KABIRDHAM	PANDATARI
KABIRDHAM	PIPARIA
KABIRDHAM	RENGAKHAR
KABIRDHAM	SAHASPUR LOHARA
KABIRDHAM	SINGHANPURI
KABIRDHAM	TAREGAON JUNGLE
KANKER	AJK KANKER
KANKER	AMABEDA
KANKER	ANTAGARH
KANKER	BADGAON
KANKER	BANDE
KANKER	BHANUPRATAPPUR
KANKER	CHARAMA
KANKER	CHHOTE BETHIYA
KANKER	DURGUKONDAL
KANKER	GONDAHOOR
KANKER	KANKER
KANKER	KODEKURSE
KANKER	KORAR
KANKER	KOYALIBEDA
KANKER	LOHTTAR
KANKER	NARHARPUR
KANKER	PAKHANJOOR
KANKER	PARTAPUR
KANKER	RAOGHAT
KANKER	SARONA
KANKER	SIKSOD
KANKER	TADOKI
KHAIRAGARH-CHHUI KHADAN-GANDAI	AJK POLICE THANA
KHAIRAGARH-CHHUI KHADAN-GANDAI	BAKARKATTA
KHAIRAGARH-CHHUI KHADAN-GANDAI	CHHUIKHDAN
KHAIRAGARH-CHHUI KHADAN-GANDAI	GANDAI
KHAIRAGARH-CHHUI KHADAN-GANDAI	GATAPAR
KHAIRAGARH-CHHUI KHADAN-GANDAI	KHAIRAGARH
KHAIRAGARH-CHHUI KHADAN-GANDAI	MOHGAON
KHAIRAGARH-CHHUI KHADAN-GANDAI	SALHEWARA
KHAIRAGARH-CHHUI KHADAN-GANDAI	THELKADIH
KONDAGAON	AJK KONDAGAON
KONDAGAON	ANANTPUR
KONDAGAON	BADE DONGAR
KONDAGAON	BAYANAR
KONDAGAON	DHANORA KONDAGAON
KONDAGAON	FARASGAON KONDAGAON
KONDAGAON	IRAGAON
KONDAGAON	KESKAL
KONDAGAON	KONDAGAON
KONDAGAON	MAKDI
KONDAGAON	MARDAPAL
KONDAGAON	PUNGARPAL
KONDAGAON	URANDABEDA
KONDAGAON	VISHRAMPURI
KORBA	AJK KORBA
KORBA	BALKO
KORBA	BANGO
KORBA	BANKIMONGRA
KORBA	CIVIL LINE KORBA
KORBA	CYBER POLICE STATION, KORBA
KORBA	DARRI
KORBA	DEEPIKA
KORBA	HARDIBAZAR
KORBA	KARTALA
KORBA	KATGHORA
KORBA	KOTWALI
KORBA	KUSMANDA
KORBA	LEMRU
KORBA	Mahila Police Thana, KORBA
KORBA	PALI
KORBA	PASAAN
KORBA	SYANG
KORBA	URGA
KORIYA	AJK KORIYA
KORIYA	BAIKUNTHPUR
KORIYA	CHARCHA
KORIYA	PATNA
KORIYA	SONHAT
MAHASAMUND	AJK MAHASAMUND
MAHASAMUND	BAGBAHRA
MAHASAMUND	Baloda
MAHASAMUND	BASNA
MAHASAMUND	CYBER POLICE STATION, MAHASAMUND
MAHASAMUND	Khallari
MAHASAMUND	KOMAKHAN
MAHASAMUND	MAHASAMUND
MAHASAMUND	PATEWA
MAHASAMUND	PITHORA
MAHASAMUND	SANKARA
MAHASAMUND	SARAIPALI
MAHASAMUND	SINGHODA
MAHASAMUND	TENDUKONA
MAHASAMUND	TUMGAON
MANENDRAGARH-CHIRMIRI-BHARATPUR	AJK POLICE THANA
MANENDRAGARH-CHIRMIRI-BHARATPUR	CHRIMIRI
MANENDRAGARH-CHIRMIRI-BHARATPUR	JANAKPUR
MANENDRAGARH-CHIRMIRI-BHARATPUR	JHARAKHAND
MANENDRAGARH-CHIRMIRI-BHARATPUR	KELHARI
MANENDRAGARH-CHIRMIRI-BHARATPUR	KHADGAWAN
MANENDRAGARH-CHIRMIRI-BHARATPUR	KOTADOL
MANENDRAGARH-CHIRMIRI-BHARATPUR	MANENDRAGARH
MANENDRAGARH-CHIRMIRI-BHARATPUR	PONDI
MOHLA-MANPUR-AMBAGARH CHOUKI	AJK Police Thana 
MOHLA-MANPUR-AMBAGARH CHOUKI	AMBAGARH CHOWKI
MOHLA-MANPUR-AMBAGARH CHOUKI	AOUNDHI
MOHLA-MANPUR-AMBAGARH CHOUKI	CHILHATI
MOHLA-MANPUR-AMBAGARH CHOUKI	GOTATOLA
MOHLA-MANPUR-AMBAGARH CHOUKI	KHADGOAN
MOHLA-MANPUR-AMBAGARH CHOUKI	KOHKA
MOHLA-MANPUR-AMBAGARH CHOUKI	MANDAWADA
MOHLA-MANPUR-AMBAGARH CHOUKI	MANPUR
MOHLA-MANPUR-AMBAGARH CHOUKI	MOHLA
MOHLA-MANPUR-AMBAGARH CHOUKI	SITAGAON
MUNGELI	AJK MUNGELI
MUNGELI	Chilfi
MUNGELI	FASTARPUR
MUNGELI	JARHAGAON
MUNGELI	LALPUR
MUNGELI	LORMI
MUNGELI	MUNGELI
MUNGELI	PATHARIA
MUNGELI	SARGAON, MUNGELI
NARAYANPUR	ADKA
NARAYANPUR	AJK NARAYANPUR
NARAYANPUR	BENUR
NARAYANPUR	BHARANDA
NARAYANPUR	CHHOTEDONGAR
NARAYANPUR	DHANORA
NARAYANPUR	DHODAI
NARAYANPUR	FARASGAON
NARAYANPUR	JHARAGHATI
NARAYANPUR	KOHKAMETA
NARAYANPUR	KUKDAJHOR
NARAYANPUR	KURUSHNAAR
NARAYANPUR	NARAYANPUR
NARAYANPUR	ORCHA
NARAYANPUR	SONPUR
RAIGARH	AJK RAIGARH
RAIGARH	BHOOPDEOPUR
RAIGARH	CHAKRADHAR NAGAR
RAIGARH	CHHAL
RAIGARH	CYBER POLICE STATION, RAIGARH
RAIGARH	DHARAMJAIGARH
RAIGARH	GHARGODA
RAIGARH	Jutemill
RAIGARH	KAPU
RAIGARH	KHARSIYA
RAIGARH	KOTARAROAD
RAIGARH	KOTWALI
RAIGARH	LAILUNGA
RAIGARH	MAHILA THANA
RAIGARH	PUNJIPATRA
RAIGARH	PUSAUR
RAIGARH	TAMNAR
Raipur Commissionerate	AJK, RAIPUR
Raipur Commissionerate	AMANAKA
Raipur Commissionerate	AZAD CHOWK
Raipur Commissionerate	CIVIL LINES
Raipur Commissionerate	Cyber Police Thana, Range Raipur
Raipur Commissionerate	DEEN DAYAL NAGAR
Raipur Commissionerate	DEVENDRA NAGAR
Raipur Commissionerate	GANJ
Raipur Commissionerate	GOL BAZAR
Raipur Commissionerate	GUDHIYARI
Raipur Commissionerate	KABIR NAGAR
Raipur Commissionerate	KHAMHARDIH
Raipur Commissionerate	KHAMTARAI
Raipur Commissionerate	KOTWALI
Raipur Commissionerate	MAHILA THANA
Raipur Commissionerate	MAUDHAPARA
Raipur Commissionerate	PANDARI
Raipur Commissionerate	PURANI BASTI
Raipur Commissionerate	RAJENDRA NAGAR
Raipur Commissionerate	SARASWATI NAGAR
Raipur Commissionerate	SEJBAHAR
Raipur Commissionerate	TELIBANDHA
Raipur Commissionerate	TIKARAPARA
Raipur Rural	ABHANPUR
Raipur Rural	ARANG
Raipur Rural	DHARSIWA
Raipur Rural	GOBRA NAWAPARA
Raipur Rural	KHARORA
Raipur Rural	MANA CAMP
Raipur Rural	MANDIR HASAUD
Raipur Rural	Naya Raipur
Raipur Rural	RAKHI
Raipur Rural	Thana Siltara
Raipur Rural	TILDA NEORA
Raipur Rural	VIDHAN SABHA
RAJNANDGAON	AJK RAJNANDGAON
RAJNANDGAON	BAGHNADI
RAJNANDGAON	BASANTPUR
RAJNANDGAON	BORTALAB
RAJNANDGAON	CHHURIYA
RAJNANDGAON	CYBER POLICE STATION, RAJNANDGAON 
RAJNANDGAON	DONGARGAON
RAJNANDGAON	DONGARGARH
RAJNANDGAON	GAINDATOLA
RAJNANDGAON	GHUMKA
RAJNANDGAON	KOTWALI, RANJANDGAON
RAJNANDGAON	LALBAGH
RAJNANDGAON	MAHILA THANA
RAJNANDGAON	SOMANI
SAKTI	AJK POLICE THANA
SAKTI	BARADWAR
SAKTI	CHANDRAPUR
SAKTI	DABHRA
SAKTI	HASOD
SAKTI	JAIJAIPUR
SAKTI	MALKHARODA
SAKTI	NAGARDA
SAKTI	SAKTI
SARANGARH-BILAIGARH	BARAMKELA
SARANGARH-BILAIGARH	BHATGAON
SARANGARH-BILAIGARH	BILAIGARH
SARANGARH-BILAIGARH	DONGRIPALI
SARANGARH-BILAIGARH	KEDAR
SARANGARH-BILAIGARH	KOSIR
SARANGARH-BILAIGARH	SALIHA
SARANGARH-BILAIGARH	SARANGARH
SARANGARH-BILAIGARH	SARIYA
SARANGARH-BILAIGARH	SARSIWA
SARGUJA (AMBIKAPUR)	AJK AMBIKAPUR (SARGUJA)
SARGUJA (AMBIKAPUR)	AMBIKAPUR
SARGUJA (AMBIKAPUR)	AMBIKAPUR (RURAL)
SARGUJA (AMBIKAPUR)	BATOULI
SARGUJA (AMBIKAPUR)	Cyber Police Thana, Range Sarguja
SARGUJA (AMBIKAPUR)	DARIMA
SARGUJA (AMBIKAPUR)	DHAURPUR
SARGUJA (AMBIKAPUR)	KAMLESHWARPUR
SARGUJA (AMBIKAPUR)	LAKHANPUR
SARGUJA (AMBIKAPUR)	LUNDRA
SARGUJA (AMBIKAPUR)	MAHILA PS
SARGUJA (AMBIKAPUR)	Manipur
SARGUJA (AMBIKAPUR)	SITAPUR
SARGUJA (AMBIKAPUR)	UDAIPUR
SUKMA	AJK SUKMA
SUKMA	BHEJI
SUKMA	Chhindgarh
SUKMA	CHINTAGUFA
SUKMA	Chintalnar
SUKMA	DORNAPAL
SUKMA	ERRABOR
SUKMA	FULBAGDI
SUKMA	GADIRAS
SUKMA	GOLAPALLI
SUKMA	JAGARGUNDA
SUKMA	KERLAPAL
SUKMA	KISTARAM
SUKMA	KONTA
SUKMA	KUKANAAR
SUKMA	MARAIGUDA
SUKMA	POLAMPALLI
SUKMA	PUSHPAL
SUKMA	SUKMA
SUKMA	TONGPAL
SURAJPUR	AJK SURAJPUR
SURAJPUR	BHATGAON
SURAJPUR	CHANDANI
SURAJPUR	CHANDORA
SURAJPUR	JAINAGAR
SURAJPUR	JHILMILI (BHAIYA THANA)
SURAJPUR	MAHILA POLICE THANA
SURAJPUR	ODAGI
SURAJPUR	PRATAP PUR
SURAJPUR	PREM NAGAR
SURAJPUR	RAMANUJ NAGAR (SRINAGAR)
SURAJPUR	RAMKOLA
SURAJPUR	SURAJPUR
SURAJPUR	VISHRAMPUR
ATS, CHHATTISGARH	ATS
SIB, CHHATTISGARH	SIB
STATE CYBER POLICE, CHHATTISGARH	STATE CYBER POLICE STATION
HQ, EOW/ACB, Chhattisgarh	PS, EOW/ACB
CID, CHHATTISGARH	CID
"""

import json
import re

lines = [line.strip() for line in RAW_DATA.strip().split('\n') if line.strip()]
header = lines[0]

district_ps_map = {}
pair_list = []

for line in lines[1:]:
    parts = re.split(r'\t+', line)
    if len(parts) >= 2:
        dist = parts[0].strip()
        ps = parts[1].strip()
        if dist not in district_ps_map:
            district_ps_map[dist] = []
        district_ps_map[dist].append(ps)
        pair_list.append((dist, ps))

print(f"Total Unique Districts/Units: {len(district_ps_map)}")
print(f"Total Police Stations: {len(pair_list)}")

# Mapping Hindi names for Districts
HINDI_MAP = {
    "BALOD": "बालोद",
    "BALODABAZAR-BHATAPARA": "बलौदाबाजार-भाटापारा",
    "BALRAMPUR": "बलरामपुर",
    "BASTAR": "बस्तर",
    "BEMETARA": "बेमेतरा",
    "BIJAPUR": "बीजापुर",
    "BILASPUR": "बिलासपुर",
    "DANTEWADA": "दंतेवाड़ा",
    "DHAMTARI": "धमतरी",
    "DURG": "दुर्ग",
    "GARIYABAND": "गरियाबंद",
    "GAURELA-PENDRA-MARWAHI": "गौरेला-पेंड्रा-मरवाही",
    "GRP": "जीआरपी (GRP)",
    "JANJGIR CHAMPA": "जांजगीर-चांपा",
    "JASHPUR": "जशपुर",
    "KABIRDHAM": "कबीरधाम (कवर्धा)",
    "KANKER": "कांकेर",
    "KHAIRAGARH-CHHUI KHADAN-GANDAI": "खैरागढ़-छुईखदान-गंडई",
    "KONDAGAON": "कोंडागांव",
    "KORBA": "कोरबा",
    "KORIYA": "कोरिया",
    "MAHASAMUND": "महासमुंद",
    "MANENDRAGARH-CHIRMIRI-BHARATPUR": "मनेंद्रगढ़-चिरमिरी-भरतपुर",
    "MOHLA-MANPUR-AMBAGARH CHOUKI": "मोहला-मानपुर-अंबागढ़ चौकी",
    "MUNGELI": "मुंगेली",
    "NARAYANPUR": "नारायणपुर",
    "RAIGARH": "रायगढ़",
    "Raipur Commissionerate": "रायपुर कमिश्नरेट",
    "Raipur Rural": "रायपुर ग्रामीण",
    "RAJNANDGAON": "राजनांदगांव",
    "SAKTI": "सक्ती",
    "SARANGARH-BILAIGARH": "सारंगढ़-बिलाईगढ़",
    "SARGUJA (AMBIKAPUR)": "सरगुजा (अंबिकापुर)",
    "SUKMA": "सुकमा",
    "SURAJPUR": "सूरजपुर",
    "ATS, CHHATTISGARH": "एटीएस (ATS) छत्तीसगढ़",
    "SIB, CHHATTISGARH": "एसआइबी (SIB) छत्तीसगढ़",
    "STATE CYBER POLICE, CHHATTISGARH": "राज्य साइबर पुलिस छत्तीसगढ़",
    "HQ, EOW/ACB, Chhattisgarh": "मुख्यालय ईओडब्ल्यू/एसीबी",
    "CID, CHHATTISGARH": "सीआईडी (CID) छत्तीसगढ़"
}

def slugify(text):
    text = re.sub(r'[^a-zA-Z0-9]+', '_', text).strip('_').upper()
    return text[:20]

districts_output = []
ps_output = []

for idx, (dist, pss) in enumerate(district_ps_map.items()):
    dist_code = slugify(dist)
    dist_id = f"dist-{slugify(dist).lower()}"
    dist_hi = HINDI_MAP.get(dist, dist)
    
    districts_output.append({
        "id": dist_id,
        "nameEn": dist,
        "nameHi": dist_hi,
        "code": dist_code,
        "totalPoliceStations": len(pss)
    })
    
    for ps_idx, ps_name in enumerate(pss):
        ps_code = f"{dist_code[:4]}_{slugify(ps_name)[:12]}"
        ps_id = f"ps-{dist_code.lower()}-{slugify(ps_name).lower()}"
        ps_output.append({
            "id": ps_id,
            "districtId": dist_id,
            "nameEn": ps_name,
            "nameHi": ps_name, # Can display clean
            "code": ps_code,
            "shoName": f"TI/SHO {ps_name}",
            "shoMobile": "94252XXXXX"
        })

# Save to masterSeedData.ts
ts_content = f"""// Official Chhattisgarh Police Master Seed Data (Auto-Generated from Official Roster)
import {{ District, PoliceStation, Officer, DailySubmissionRecord, AuditLog }} from '../types';

export const mockDistricts: District[] = {json.dumps(districts_output, indent=2, ensure_ascii=False)};

export const mockPoliceStations: PoliceStation[] = {json.dumps(ps_output, indent=2, ensure_ascii=False)};

export const mockOfficers: Officer[] = [
  {{ id: 'off-1', policeStationId: 'ps-durg-kotwali_durg', pno: 'CG-980412', nameEn: 'SI Rajesh Sharma', nameHi: 'उ.नि. राजेश शर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX1', isActiveIO: true }},
  {{ id: 'off-2', policeStationId: 'ps-durg-kotwali_durg', pno: 'CG-020519', nameEn: 'ASI Vinod Kumar Sahu', nameHi: 'स.उ.नि. विनोद कुमार साहू', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX2', isActiveIO: true }},
  {{ id: 'off-3', policeStationId: 'ps-durg-supela', pno: 'CG-110293', nameEn: 'SI Anita Verma', nameHi: 'उ.नि. अनिता वर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX4', isActiveIO: true }},
  {{ id: 'off-4', policeStationId: 'ps-durg-supela', pno: 'CG-140882', nameEn: 'ASI Ramesh Dewangan', nameHi: 'स.उ.नि. रमेश देवांगन', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX5', isActiveIO: true }},
  {{ id: 'off-5', policeStationId: 'ps-raipur_commissionerate-kotwali', pno: 'CG-160399', nameEn: 'SI Jagdish Prasad', nameHi: 'उ.नि. जगदीश प्रसाद', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX6', isActiveIO: true }}
];

export const mockDailySubmissions: DailySubmissionRecord[] = [
  {{
    id: 'sub-durg-ktw-today',
    referenceNumber: 'CCTNS-CG-DURG-KTW-20261106-4412',
    districtId: 'dist-durg',
    districtCode: 'DURG',
    policeStationId: 'ps-durg-kotwali_durg',
    policeStationCode: 'DURG_KOTWALI_DUR',
    reportingDate: '2026-11-06',
    submittedByUserId: 'usr-sho-durg-kotwali',
    submittedByUserName: 'TI Santosh Mishra',
    overallStatus: 'Submitted',
    overallStatusHi: 'सफलतापूर्वक प्रस्तुत',
    createdAt: '2026-11-06T18:40:00Z',
    updatedAt: '2026-11-06T18:40:00Z',
    sectionA: {{
      status: 'Completed',
      totalFirsToday: 4,
      sidCreatedCount: 3,
      finalLinkCompletedCount: 2,
      pendingSidCount: 1,
      pendingFinalLinkCount: 1,
      firRecords: [
        {{ id: 'fir-sid-1', firNumber: '142/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-01', finalLinkCompleted: true, remarks: 'Murder case Scene of Crime video linked' }},
        {{ id: 'fir-sid-2', firNumber: '143/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-02', finalLinkCompleted: true, remarks: 'Photos uploaded & linked' }},
        {{ id: 'fir-sid-3', firNumber: '144/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-03', finalLinkCompleted: false, pendingReason: 'Pending for TI review', remarks: 'SID generated, final link tomorrow' }},
        {{ id: 'fir-sid-4', firNumber: '145/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: false, finalLinkCompleted: false, pendingReason: 'Night FIR, SOC inspection tomorrow', remarks: 'Late night registration' }}
      ],
      generalRemarks: 'All daytime FIRs processed for e-Sakshya SID creation.',
      savedAt: '06:15 PM'
    }},
    sectionB: {{
      status: 'Completed',
      totalIosPosted: 5,
      iosLoggedInToday: 4,
      iosNotLoggedInToday: 1,
      craLoginPercentage: 80,
      ioRecords: [
        {{ id: 'cra-io-1', ioName: 'SI Rajesh Sharma', ioCodePno: 'CG-980412', rank: 'SI', hasLoggedIn: true, loginTime: '09:42 AM', remarks: 'Case diary updated' }},
        {{ id: 'cra-io-2', ioName: 'ASI Vinod Kumar Sahu', ioCodePno: 'CG-020519', rank: 'ASI', hasLoggedIn: true, loginTime: '11:15 AM', remarks: 'FIR 168 entries' }},
        {{ id: 'cra-io-3', ioName: 'SI Anita Verma', ioCodePno: 'CG-110293', rank: 'SI', hasLoggedIn: true, loginTime: '10:05 AM', remarks: 'Witness statements' }},
        {{ id: 'cra-io-4', ioName: 'ASI Ramesh Dewangan', ioCodePno: 'CG-140882', rank: 'ASI', hasLoggedIn: false, remarks: 'On VIP duty escort' }}
      ],
      generalRemarks: 'ASI Ramesh Dewangan was on VIP duty, rest all logged in.',
      savedAt: '06:22 PM'
    }},
    sectionC: {{
      status: 'Completed',
      chargesheetsPreparedToday: 2,
      presentedInCourtToday: 1,
      enteredInCctnsToday: 1,
      pendingCctnsEntriesCumulative: 2,
      awaitingCourtPresentationCumulative: 1,
      firRecords: [
        {{ id: 'cs-1', firNumber: '89/2026', firYear: 2026, chargesheetPrepared: true, preparationDate: '2026-11-06', courtSubmissionStatus: 'Presented', courtSubmissionDate: '2026-11-06', courtEstablishmentName: 'CJM Court Durg', cctnsEntryStatus: 'Completed', cctnsEntryDate: '2026-11-06', cctnsDispatchNo: 'DISP-DURG-2026-8901', cisCaseNo: 'CIS-CR-2026-9041', remarks: 'Chargesheet submitted and entered in CCTNS' }}
      ],
      generalRemarks: '1 Challan successfully presented and entered in CCTNS.',
      savedAt: '06:30 PM'
    }},
    sectionD: {{
      status: 'Completed',
      bns60TotalCases: 3,
      bns60PreparedToday: 1,
      bns60PresentedToday: 0,
      bns60CctnsEnteredToday: 0,
      bns60PendingPreparation: 2,
      bns60PendingCourt: 1,
      bns60PendingCctns: 1,
      bns90TotalCases: 2,
      bns90PreparedToday: 1,
      bns90PresentedToday: 1,
      bns90CctnsEnteredToday: 1,
      bns90PendingPreparation: 0,
      bns90PendingCourt: 0,
      bns90PendingCctns: 0,
      caseRecords: [
        {{ id: 'bns-c-1', firNumber: '142/2026', firYear: 2026, registrationDate: '2026-08-10', arrestDate: '2026-08-10', bnsSections: 'BNS 103(1)', ioName: 'SI Rajesh Sharma', accusedName: 'Suraj @ Golu', statutoryDays: 90, deadlineDate: '2026-11-08', daysElapsed: 88, daysRemaining: 2, isDueToday: true, isOverdue: false, chargesheetPrepared: true, courtPresented: true, cctnsEntry: true, remarks: 'Submitted to avoid default bail' }}
      ],
      generalRemarks: 'BNS 90-day critical case presented to avoid default bail under Sec 187 BNSS.',
      savedAt: '06:38 PM'
    }}
  }}
];

export const initialAuditLogs: AuditLog[] = [
  {{
    id: 'audit-1',
    timestamp: '2026-11-06 18:40:12',
    userId: 'usr-sho-durg-kotwali',
    userName: 'TI Santosh Mishra',
    userRole: 'SHO',
    action: 'FINAL_DAILY_SUBMIT',
    entityType: 'DAILY_SUBMISSION',
    districtCode: 'DURG',
    psCode: 'DURG_KOTWALI_DUR',
    details: 'Final daily investigation report submitted for date 2026-11-06 (Ref: CCTNS-CG-DURG-KTW-20261106-4412)',
    ipAddress: '10.152.4.11'
  }},
  {{
    id: 'audit-2',
    timestamp: '2026-11-06 14:02:44',
    userId: 'usr-phq-1',
    userName: 'PHQ Super Admin',
    userRole: 'SUPER_ADMIN',
    action: 'MASTER_CATALOG_SYNC',
    entityType: 'MASTER_IMPORT',
    details: 'Synchronized official roster: {len(district_ps_map)} Districts and {len(pair_list)} Police Stations',
    ipAddress: '10.150.0.1'
  }}
];
"""

with open("C:\\Users\\Guruvendra Singh\\.gemini\\antigravity\\scratch\\cctns-investigation-tracker\\frontend\\src\\data\\masterSeedData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

# Also generate official CSV file
with open("C:\\Users\\Guruvendra Singh\\.gemini\\antigravity\\scratch\\cctns-investigation-tracker\\official_cg_police_master.csv", "w", encoding="utf-8") as f:
    f.write("DISTRICT,POLICE_STATION\n")
    for dist, ps in pair_list:
        f.write(f'"{dist}","{ps}"\n')

print("masterSeedData.ts and official_cg_police_master.csv written successfully!")
