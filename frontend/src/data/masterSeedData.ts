// Official Chhattisgarh Police Master Seed Data (Auto-Generated from Official Roster)
import { District, PoliceStation, Officer, DailySubmissionRecord, AuditLog } from '../types';

export const mockDistricts: District[] = [
  {
    "id": "dist-balod",
    "nameEn": "BALOD",
    "nameHi": "बालोद",
    "code": "BALOD",
    "totalPoliceStations": 15
  },
  {
    "id": "dist-balodabazar_bhatapar",
    "nameEn": "BALODABAZAR-BHATAPARA",
    "nameHi": "बलौदाबाजार-भाटापारा",
    "code": "BALODABAZAR_BHATAPAR",
    "totalPoliceStations": 14
  },
  {
    "id": "dist-balrampur",
    "nameEn": "BALRAMPUR",
    "nameHi": "बलरामपुर",
    "code": "BALRAMPUR",
    "totalPoliceStations": 16
  },
  {
    "id": "dist-bastar",
    "nameEn": "BASTAR",
    "nameHi": "बस्तर",
    "code": "BASTAR",
    "totalPoliceStations": 19
  },
  {
    "id": "dist-bemetara",
    "nameEn": "BEMETARA",
    "nameHi": "बेमेतरा",
    "code": "BEMETARA",
    "totalPoliceStations": 10
  },
  {
    "id": "dist-bijapur",
    "nameEn": "BIJAPUR",
    "nameHi": "बीजापुर",
    "code": "BIJAPUR",
    "totalPoliceStations": 23
  },
  {
    "id": "dist-bilaspur",
    "nameEn": "BILASPUR",
    "nameHi": "बिलासपुर",
    "code": "BILASPUR",
    "totalPoliceStations": 23
  },
  {
    "id": "dist-dantewada",
    "nameEn": "DANTEWADA",
    "nameHi": "दंतेवाड़ा",
    "code": "DANTEWADA",
    "totalPoliceStations": 13
  },
  {
    "id": "dist-dhamtari",
    "nameEn": "DHAMTARI",
    "nameHi": "धमतरी",
    "code": "DHAMTARI",
    "totalPoliceStations": 16
  },
  {
    "id": "dist-durg",
    "nameEn": "DURG",
    "nameHi": "दुर्ग",
    "code": "DURG",
    "totalPoliceStations": 26
  },
  {
    "id": "dist-gariyaband",
    "nameEn": "GARIYABAND",
    "nameHi": "गरियाबंद",
    "code": "GARIYABAND",
    "totalPoliceStations": 13
  },
  {
    "id": "dist-gaurela_pendra_marwa",
    "nameEn": "GAURELA-PENDRA-MARWAHI",
    "nameHi": "गौरेला-पेंड्रा-मरवाही",
    "code": "GAURELA_PENDRA_MARWA",
    "totalPoliceStations": 4
  },
  {
    "id": "dist-grp",
    "nameEn": "GRP",
    "nameHi": "जीआरपी (GRP)",
    "code": "GRP",
    "totalPoliceStations": 5
  },
  {
    "id": "dist-janjgir_champa",
    "nameEn": "JANJGIR CHAMPA",
    "nameHi": "जांजगीर-चांपा",
    "code": "JANJGIR_CHAMPA",
    "totalPoliceStations": 14
  },
  {
    "id": "dist-jashpur",
    "nameEn": "JASHPUR",
    "nameHi": "जशपुर",
    "code": "JASHPUR",
    "totalPoliceStations": 17
  },
  {
    "id": "dist-kabirdham",
    "nameEn": "KABIRDHAM",
    "nameHi": "कबीरधाम (कवर्धा)",
    "code": "KABIRDHAM",
    "totalPoliceStations": 17
  },
  {
    "id": "dist-kanker",
    "nameEn": "KANKER",
    "nameHi": "कांकेर",
    "code": "KANKER",
    "totalPoliceStations": 22
  },
  {
    "id": "dist-khairagarh_chhui_kha",
    "nameEn": "KHAIRAGARH-CHHUI KHADAN-GANDAI",
    "nameHi": "खैरागढ़-छुईखदान-गंडई",
    "code": "KHAIRAGARH_CHHUI_KHA",
    "totalPoliceStations": 9
  },
  {
    "id": "dist-kondagaon",
    "nameEn": "KONDAGAON",
    "nameHi": "कोंडागांव",
    "code": "KONDAGAON",
    "totalPoliceStations": 14
  },
  {
    "id": "dist-korba",
    "nameEn": "KORBA",
    "nameHi": "कोरबा",
    "code": "KORBA",
    "totalPoliceStations": 19
  },
  {
    "id": "dist-koriya",
    "nameEn": "KORIYA",
    "nameHi": "कोरिया",
    "code": "KORIYA",
    "totalPoliceStations": 5
  },
  {
    "id": "dist-mahasamund",
    "nameEn": "MAHASAMUND",
    "nameHi": "महासमुंद",
    "code": "MAHASAMUND",
    "totalPoliceStations": 15
  },
  {
    "id": "dist-manendragarh_chirmir",
    "nameEn": "MANENDRAGARH-CHIRMIRI-BHARATPUR",
    "nameHi": "मनेंद्रगढ़-चिरमिरी-भरतपुर",
    "code": "MANENDRAGARH_CHIRMIR",
    "totalPoliceStations": 9
  },
  {
    "id": "dist-mohla_manpur_ambagar",
    "nameEn": "MOHLA-MANPUR-AMBAGARH CHOUKI",
    "nameHi": "मोहला-मानपुर-अंबागढ़ चौकी",
    "code": "MOHLA_MANPUR_AMBAGAR",
    "totalPoliceStations": 11
  },
  {
    "id": "dist-mungeli",
    "nameEn": "MUNGELI",
    "nameHi": "मुंगेली",
    "code": "MUNGELI",
    "totalPoliceStations": 9
  },
  {
    "id": "dist-narayanpur",
    "nameEn": "NARAYANPUR",
    "nameHi": "नारायणपुर",
    "code": "NARAYANPUR",
    "totalPoliceStations": 15
  },
  {
    "id": "dist-raigarh",
    "nameEn": "RAIGARH",
    "nameHi": "रायगढ़",
    "code": "RAIGARH",
    "totalPoliceStations": 17
  },
  {
    "id": "dist-raipur_commissionera",
    "nameEn": "Raipur Commissionerate",
    "nameHi": "रायपुर कमिश्नरेट",
    "code": "RAIPUR_COMMISSIONERA",
    "totalPoliceStations": 23
  },
  {
    "id": "dist-raipur_rural",
    "nameEn": "Raipur Rural",
    "nameHi": "रायपुर ग्रामीण",
    "code": "RAIPUR_RURAL",
    "totalPoliceStations": 12
  },
  {
    "id": "dist-rajnandgaon",
    "nameEn": "RAJNANDGAON",
    "nameHi": "राजनांदगांव",
    "code": "RAJNANDGAON",
    "totalPoliceStations": 14
  },
  {
    "id": "dist-sakti",
    "nameEn": "SAKTI",
    "nameHi": "सक्ती",
    "code": "SAKTI",
    "totalPoliceStations": 9
  },
  {
    "id": "dist-sarangarh_bilaigarh",
    "nameEn": "SARANGARH-BILAIGARH",
    "nameHi": "सारंगढ़-बिलाईगढ़",
    "code": "SARANGARH_BILAIGARH",
    "totalPoliceStations": 10
  },
  {
    "id": "dist-sarguja_ambikapur",
    "nameEn": "SARGUJA (AMBIKAPUR)",
    "nameHi": "सरगुजा (अंबिकापुर)",
    "code": "SARGUJA_AMBIKAPUR",
    "totalPoliceStations": 14
  },
  {
    "id": "dist-sukma",
    "nameEn": "SUKMA",
    "nameHi": "सुकमा",
    "code": "SUKMA",
    "totalPoliceStations": 20
  },
  {
    "id": "dist-surajpur",
    "nameEn": "SURAJPUR",
    "nameHi": "सूरजपुर",
    "code": "SURAJPUR",
    "totalPoliceStations": 14
  }
];

export const mockPoliceStations: PoliceStation[] = [
  {
    "id": "ps-balod-ajk_balod",
    "districtId": "dist-balod",
    "nameEn": "AJK BALOD",
    "nameHi": "AJK BALOD",
    "code": "BALO_AJK_BALOD",
    "shoName": "TI/SHO AJK BALOD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-arjunda",
    "districtId": "dist-balod",
    "nameEn": "ARJUNDA",
    "nameHi": "ARJUNDA",
    "code": "BALO_ARJUNDA",
    "shoName": "TI/SHO ARJUNDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-balod",
    "districtId": "dist-balod",
    "nameEn": "BALOD",
    "nameHi": "BALOD",
    "code": "BALO_BALOD",
    "shoName": "TI/SHO BALOD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-deori",
    "districtId": "dist-balod",
    "nameEn": "DEORI",
    "nameHi": "DEORI",
    "code": "BALO_DEORI",
    "shoName": "TI/SHO DEORI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-doundi",
    "districtId": "dist-balod",
    "nameEn": "DOUNDI",
    "nameHi": "DOUNDI",
    "code": "BALO_DOUNDI",
    "shoName": "TI/SHO DOUNDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-doundi_lohara",
    "districtId": "dist-balod",
    "nameEn": "DOUNDI LOHARA",
    "nameHi": "DOUNDI LOHARA",
    "code": "BALO_DOUNDI_LOHAR",
    "shoName": "TI/SHO DOUNDI LOHARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-gundardehi",
    "districtId": "dist-balod",
    "nameEn": "GUNDARDEHI",
    "nameHi": "GUNDARDEHI",
    "code": "BALO_GUNDARDEHI",
    "shoName": "TI/SHO GUNDARDEHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-gurur",
    "districtId": "dist-balod",
    "nameEn": "GURUR",
    "nameHi": "GURUR",
    "code": "BALO_GURUR",
    "shoName": "TI/SHO GURUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-mahamaya",
    "districtId": "dist-balod",
    "nameEn": "MAHAMAYA",
    "nameHi": "MAHAMAYA",
    "code": "BALO_MAHAMAYA",
    "shoName": "TI/SHO MAHAMAYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-mangchua",
    "districtId": "dist-balod",
    "nameEn": "MANGCHUA",
    "nameHi": "MANGCHUA",
    "code": "BALO_MANGCHUA",
    "shoName": "TI/SHO MANGCHUA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-purur",
    "districtId": "dist-balod",
    "nameEn": "Purur",
    "nameHi": "Purur",
    "code": "BALO_PURUR",
    "shoName": "TI/SHO Purur",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-rajhara",
    "districtId": "dist-balod",
    "nameEn": "RAJHARA",
    "nameHi": "RAJHARA",
    "code": "BALO_RAJHARA",
    "shoName": "TI/SHO RAJHARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-ranchirai",
    "districtId": "dist-balod",
    "nameEn": "RANCHIRAI",
    "nameHi": "RANCHIRAI",
    "code": "BALO_RANCHIRAI",
    "shoName": "TI/SHO RANCHIRAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-sanoud",
    "districtId": "dist-balod",
    "nameEn": "Sanoud",
    "nameHi": "Sanoud",
    "code": "BALO_SANOUD",
    "shoName": "TI/SHO Sanoud",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balod-suregaon",
    "districtId": "dist-balod",
    "nameEn": "SUREGAON",
    "nameHi": "SUREGAON",
    "code": "BALO_SUREGAON",
    "shoName": "TI/SHO SUREGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-ajk_baloda_bazar",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "AJK BALODA BAZAR",
    "nameHi": "AJK BALODA BAZAR",
    "code": "BALO_AJK_BALODA_B",
    "shoName": "TI/SHO AJK BALODA BAZAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-bhatapara_city",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "BHATAPARA CITY",
    "nameHi": "BHATAPARA CITY",
    "code": "BALO_BHATAPARA_CI",
    "shoName": "TI/SHO BHATAPARA CITY",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-bhatapara_rural",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "BHATAPARA RURAL",
    "nameHi": "BHATAPARA RURAL",
    "code": "BALO_BHATAPARA_RU",
    "shoName": "TI/SHO BHATAPARA RURAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-city_kotwali_balodab",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "City Kotwali Balodabazar",
    "nameHi": "City Kotwali Balodabazar",
    "code": "BALO_CITY_KOTWALI",
    "shoName": "TI/SHO City Kotwali Balodabazar",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-cyber_police_station",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "CYBER POLICE STATION, BALODABAZAR-BHATAPARA",
    "nameHi": "CYBER POLICE STATION, BALODABAZAR-BHATAPARA",
    "code": "BALO_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, BALODABAZAR-BHATAPARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-gidhori",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "GIDHORI",
    "nameHi": "GIDHORI",
    "code": "BALO_GIDHORI",
    "shoName": "TI/SHO GIDHORI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-gidhpuri",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "GIDHPURI",
    "nameHi": "GIDHPURI",
    "code": "BALO_GIDHPURI",
    "shoName": "TI/SHO GIDHPURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-hathband",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "Hathband",
    "nameHi": "Hathband",
    "code": "BALO_HATHBAND",
    "shoName": "TI/SHO Hathband",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-kasdol",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "KASDOL",
    "nameHi": "KASDOL",
    "code": "BALO_KASDOL",
    "shoName": "TI/SHO KASDOL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-lawan",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "Lawan",
    "nameHi": "Lawan",
    "code": "BALO_LAWAN",
    "shoName": "TI/SHO Lawan",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-palari",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "PALARI",
    "nameHi": "PALARI",
    "code": "BALO_PALARI",
    "shoName": "TI/SHO PALARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-rajadeori",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "RAJADEORI",
    "nameHi": "RAJADEORI",
    "code": "BALO_RAJADEORI",
    "shoName": "TI/SHO RAJADEORI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-simga",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "SIMGA",
    "nameHi": "SIMGA",
    "code": "BALO_SIMGA",
    "shoName": "TI/SHO SIMGA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balodabazar_bhatapar-suhela",
    "districtId": "dist-balodabazar_bhatapar",
    "nameEn": "SUHELA",
    "nameHi": "SUHELA",
    "code": "BALO_SUHELA",
    "shoName": "TI/SHO SUHELA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-ajk_balrampur",
    "districtId": "dist-balrampur",
    "nameEn": "AJK BALRAMPUR",
    "nameHi": "AJK BALRAMPUR",
    "code": "BALR_AJK_BALRAMPU",
    "shoName": "TI/SHO AJK BALRAMPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-balrampur",
    "districtId": "dist-balrampur",
    "nameEn": "BALRAMPUR",
    "nameHi": "BALRAMPUR",
    "code": "BALR_BALRAMPUR",
    "shoName": "TI/SHO BALRAMPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-basantpur",
    "districtId": "dist-balrampur",
    "nameEn": "BASANTPUR",
    "nameHi": "BASANTPUR",
    "code": "BALR_BASANTPUR",
    "shoName": "TI/SHO BASANTPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-chalgali",
    "districtId": "dist-balrampur",
    "nameEn": "CHALGALI",
    "nameHi": "CHALGALI",
    "code": "BALR_CHALGALI",
    "shoName": "TI/SHO CHALGALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-chando",
    "districtId": "dist-balrampur",
    "nameEn": "CHANDO",
    "nameHi": "CHANDO",
    "code": "BALR_CHANDO",
    "shoName": "TI/SHO CHANDO",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-karondha",
    "districtId": "dist-balrampur",
    "nameEn": "KARONDHA",
    "nameHi": "KARONDHA",
    "code": "BALR_KARONDHA",
    "shoName": "TI/SHO KARONDHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-kusami",
    "districtId": "dist-balrampur",
    "nameEn": "KUSAMI",
    "nameHi": "KUSAMI",
    "code": "BALR_KUSAMI",
    "shoName": "TI/SHO KUSAMI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-new_rajpur",
    "districtId": "dist-balrampur",
    "nameEn": "NEW RAJPUR",
    "nameHi": "NEW RAJPUR",
    "code": "BALR_NEW_RAJPUR",
    "shoName": "TI/SHO NEW RAJPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-pasta",
    "districtId": "dist-balrampur",
    "nameEn": "PASTA",
    "nameHi": "PASTA",
    "code": "BALR_PASTA",
    "shoName": "TI/SHO PASTA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-raghunath_nagar",
    "districtId": "dist-balrampur",
    "nameEn": "RAGHUNATH NAGAR",
    "nameHi": "RAGHUNATH NAGAR",
    "code": "BALR_RAGHUNATH_NA",
    "shoName": "TI/SHO RAGHUNATH NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-ramanujganj",
    "districtId": "dist-balrampur",
    "nameEn": "RAMANUJGANJ",
    "nameHi": "RAMANUJGANJ",
    "code": "BALR_RAMANUJGANJ",
    "shoName": "TI/SHO RAMANUJGANJ",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-ramchandrapur",
    "districtId": "dist-balrampur",
    "nameEn": "RAMCHANDRAPUR",
    "nameHi": "RAMCHANDRAPUR",
    "code": "BALR_RAMCHANDRAPU",
    "shoName": "TI/SHO RAMCHANDRAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-samripath",
    "districtId": "dist-balrampur",
    "nameEn": "SAMRIPATH",
    "nameHi": "SAMRIPATH",
    "code": "BALR_SAMRIPATH",
    "shoName": "TI/SHO SAMRIPATH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-sanawal",
    "districtId": "dist-balrampur",
    "nameEn": "SANAWAL",
    "nameHi": "SANAWAL",
    "code": "BALR_SANAWAL",
    "shoName": "TI/SHO SANAWAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-shankargarh",
    "districtId": "dist-balrampur",
    "nameEn": "SHANKARGARH",
    "nameHi": "SHANKARGARH",
    "code": "BALR_SHANKARGARH",
    "shoName": "TI/SHO SHANKARGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-balrampur-trikunda",
    "districtId": "dist-balrampur",
    "nameEn": "TRIKUNDA",
    "nameHi": "TRIKUNDA",
    "code": "BALR_TRIKUNDA",
    "shoName": "TI/SHO TRIKUNDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-ajk_jagdalpur",
    "districtId": "dist-bastar",
    "nameEn": "AJK JAGDALPUR",
    "nameHi": "AJK JAGDALPUR",
    "code": "BAST_AJK_JAGDALPU",
    "shoName": "TI/SHO AJK JAGDALPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-bakawand",
    "districtId": "dist-bastar",
    "nameEn": "Bakawand",
    "nameHi": "Bakawand",
    "code": "BAST_BAKAWAND",
    "shoName": "TI/SHO Bakawand",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-bandaji",
    "districtId": "dist-bastar",
    "nameEn": "BANDAJI",
    "nameHi": "BANDAJI",
    "code": "BAST_BANDAJI",
    "shoName": "TI/SHO BANDAJI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-bastar",
    "districtId": "dist-bastar",
    "nameEn": "BASTAR",
    "nameHi": "BASTAR",
    "code": "BAST_BASTAR",
    "shoName": "TI/SHO BASTAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-bhanpuri",
    "districtId": "dist-bastar",
    "nameEn": "BHANPURI",
    "nameHi": "BHANPURI",
    "code": "BAST_BHANPURI",
    "shoName": "TI/SHO BHANPURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-bodhghat",
    "districtId": "dist-bastar",
    "nameEn": "BODHGHAT",
    "nameHi": "BODHGHAT",
    "code": "BAST_BODHGHAT",
    "shoName": "TI/SHO BODHGHAT",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-burgum",
    "districtId": "dist-bastar",
    "nameEn": "BURGUM",
    "nameHi": "BURGUM",
    "code": "BAST_BURGUM",
    "shoName": "TI/SHO BURGUM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-cyber_police_thana_r",
    "districtId": "dist-bastar",
    "nameEn": "Cyber Police Thana, Range Baster",
    "nameHi": "Cyber Police Thana, Range Baster",
    "code": "BAST_CYBER_POLICE",
    "shoName": "TI/SHO Cyber Police Thana, Range Baster",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-darbha",
    "districtId": "dist-bastar",
    "nameEn": "DARBHA",
    "nameHi": "DARBHA",
    "code": "BAST_DARBHA",
    "shoName": "TI/SHO DARBHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-frezarpur",
    "districtId": "dist-bastar",
    "nameEn": "FREZARPUR",
    "nameHi": "FREZARPUR",
    "code": "BAST_FREZARPUR",
    "shoName": "TI/SHO FREZARPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-jagdalpur",
    "districtId": "dist-bastar",
    "nameEn": "JAGDALPUR",
    "nameHi": "JAGDALPUR",
    "code": "BAST_JAGDALPUR",
    "shoName": "TI/SHO JAGDALPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-karpawand",
    "districtId": "dist-bastar",
    "nameEn": "KARPAWAND",
    "nameHi": "KARPAWAND",
    "code": "BAST_KARPAWAND",
    "shoName": "TI/SHO KARPAWAND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-kodenar",
    "districtId": "dist-bastar",
    "nameEn": "KODENAR",
    "nameHi": "KODENAR",
    "code": "BAST_KODENAR",
    "shoName": "TI/SHO KODENAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-lohandiguda",
    "districtId": "dist-bastar",
    "nameEn": "LOHANDIGUDA",
    "nameHi": "LOHANDIGUDA",
    "code": "BAST_LOHANDIGUDA",
    "shoName": "TI/SHO LOHANDIGUDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-mahila_thana",
    "districtId": "dist-bastar",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "BAST_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-malewahi",
    "districtId": "dist-bastar",
    "nameEn": "MALEWAHI",
    "nameHi": "MALEWAHI",
    "code": "BAST_MALEWAHI",
    "shoName": "TI/SHO MALEWAHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-mardum",
    "districtId": "dist-bastar",
    "nameEn": "MARDUM",
    "nameHi": "MARDUM",
    "code": "BAST_MARDUM",
    "shoName": "TI/SHO MARDUM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-nagarnaar",
    "districtId": "dist-bastar",
    "nameEn": "NAGARNAAR",
    "nameHi": "NAGARNAAR",
    "code": "BAST_NAGARNAAR",
    "shoName": "TI/SHO NAGARNAAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bastar-nangur",
    "districtId": "dist-bastar",
    "nameEn": "NANGUR",
    "nameHi": "NANGUR",
    "code": "BAST_NANGUR",
    "shoName": "TI/SHO NANGUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-ajk_bemetara",
    "districtId": "dist-bemetara",
    "nameEn": "AJK BEMETARA",
    "nameHi": "AJK BEMETARA",
    "code": "BEME_AJK_BEMETARA",
    "shoName": "TI/SHO AJK BEMETARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-bemetara",
    "districtId": "dist-bemetara",
    "nameEn": "BEMETARA",
    "nameHi": "BEMETARA",
    "code": "BEME_BEMETARA",
    "shoName": "TI/SHO BEMETARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-berla",
    "districtId": "dist-bemetara",
    "nameEn": "BERLA",
    "nameHi": "BERLA",
    "code": "BEME_BERLA",
    "shoName": "TI/SHO BERLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-chandnoo",
    "districtId": "dist-bemetara",
    "nameEn": "CHANDNOO",
    "nameHi": "CHANDNOO",
    "code": "BEME_CHANDNOO",
    "shoName": "TI/SHO CHANDNOO",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-darhi",
    "districtId": "dist-bemetara",
    "nameEn": "DARHI",
    "nameHi": "DARHI",
    "code": "BEME_DARHI",
    "shoName": "TI/SHO DARHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-khamharia",
    "districtId": "dist-bemetara",
    "nameEn": "KHAMHARIA",
    "nameHi": "KHAMHARIA",
    "code": "BEME_KHAMHARIA",
    "shoName": "TI/SHO KHAMHARIA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-nandghat",
    "districtId": "dist-bemetara",
    "nameEn": "NANDGHAT",
    "nameHi": "NANDGHAT",
    "code": "BEME_NANDGHAT",
    "shoName": "TI/SHO NANDGHAT",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-nawagarh_bemetara",
    "districtId": "dist-bemetara",
    "nameEn": "NAWAGARH BEMETARA",
    "nameHi": "NAWAGARH BEMETARA",
    "code": "BEME_NAWAGARH_BEM",
    "shoName": "TI/SHO NAWAGARH BEMETARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-parpodi",
    "districtId": "dist-bemetara",
    "nameEn": "PARPODI",
    "nameHi": "PARPODI",
    "code": "BEME_PARPODI",
    "shoName": "TI/SHO PARPODI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bemetara-saja",
    "districtId": "dist-bemetara",
    "nameEn": "SAJA",
    "nameHi": "SAJA",
    "code": "BEME_SAJA",
    "shoName": "TI/SHO SAJA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-ajk_bijapur",
    "districtId": "dist-bijapur",
    "nameEn": "AJK BIJAPUR",
    "nameHi": "AJK BIJAPUR",
    "code": "BIJA_AJK_BIJAPUR",
    "shoName": "TI/SHO AJK BIJAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-awapalli",
    "districtId": "dist-bijapur",
    "nameEn": "AWAPALLI",
    "nameHi": "AWAPALLI",
    "code": "BIJA_AWAPALLI",
    "shoName": "TI/SHO AWAPALLI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-basaguda",
    "districtId": "dist-bijapur",
    "nameEn": "BASAGUDA",
    "nameHi": "BASAGUDA",
    "code": "BIJA_BASAGUDA",
    "shoName": "TI/SHO BASAGUDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-bedare",
    "districtId": "dist-bijapur",
    "nameEn": "BEDARE",
    "nameHi": "BEDARE",
    "code": "BIJA_BEDARE",
    "shoName": "TI/SHO BEDARE",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-bhadrakali",
    "districtId": "dist-bijapur",
    "nameEn": "BHADRAKALI",
    "nameHi": "BHADRAKALI",
    "code": "BIJA_BHADRAKALI",
    "shoName": "TI/SHO BHADRAKALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-bhairamgarh",
    "districtId": "dist-bijapur",
    "nameEn": "BHAIRAMGARH",
    "nameHi": "BHAIRAMGARH",
    "code": "BIJA_BHAIRAMGARH",
    "shoName": "TI/SHO BHAIRAMGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-bhopalpatnam",
    "districtId": "dist-bijapur",
    "nameEn": "BHOPALPATNAM",
    "nameHi": "BHOPALPATNAM",
    "code": "BIJA_BHOPALPATNAM",
    "shoName": "TI/SHO BHOPALPATNAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-bijapur",
    "districtId": "dist-bijapur",
    "nameEn": "BIJAPUR",
    "nameHi": "BIJAPUR",
    "code": "BIJA_BIJAPUR",
    "shoName": "TI/SHO BIJAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-elmidi",
    "districtId": "dist-bijapur",
    "nameEn": "ELMIDI",
    "nameHi": "ELMIDI",
    "code": "BIJA_ELMIDI",
    "shoName": "TI/SHO ELMIDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-farsegarh",
    "districtId": "dist-bijapur",
    "nameEn": "FARSEGARH",
    "nameHi": "FARSEGARH",
    "code": "BIJA_FARSEGARH",
    "shoName": "TI/SHO FARSEGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-gangaloor",
    "districtId": "dist-bijapur",
    "nameEn": "GANGALOOR",
    "nameHi": "GANGALOOR",
    "code": "BIJA_GANGALOOR",
    "shoName": "TI/SHO GANGALOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-jangla",
    "districtId": "dist-bijapur",
    "nameEn": "Jangla",
    "nameHi": "Jangla",
    "code": "BIJA_JANGLA",
    "shoName": "TI/SHO Jangla",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-kutru",
    "districtId": "dist-bijapur",
    "nameEn": "KUTRU",
    "nameHi": "KUTRU",
    "code": "BIJA_KUTRU",
    "shoName": "TI/SHO KUTRU",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-madded",
    "districtId": "dist-bijapur",
    "nameEn": "MADDED",
    "nameHi": "MADDED",
    "code": "BIJA_MADDED",
    "shoName": "TI/SHO MADDED",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-mirtur",
    "districtId": "dist-bijapur",
    "nameEn": "MIRTUR",
    "nameHi": "MIRTUR",
    "code": "BIJA_MIRTUR",
    "shoName": "TI/SHO MIRTUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-modakpal",
    "districtId": "dist-bijapur",
    "nameEn": "MODAKPAL",
    "nameHi": "MODAKPAL",
    "code": "BIJA_MODAKPAL",
    "shoName": "TI/SHO MODAKPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-naimed",
    "districtId": "dist-bijapur",
    "nameEn": "Naimed",
    "nameHi": "Naimed",
    "code": "BIJA_NAIMED",
    "shoName": "TI/SHO Naimed",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-nelasnar",
    "districtId": "dist-bijapur",
    "nameEn": "NELASNAR",
    "nameHi": "NELASNAR",
    "code": "BIJA_NELASNAR",
    "shoName": "TI/SHO NELASNAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-pamed",
    "districtId": "dist-bijapur",
    "nameEn": "PAMED",
    "nameHi": "PAMED",
    "code": "BIJA_PAMED",
    "shoName": "TI/SHO PAMED",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-taralaguda",
    "districtId": "dist-bijapur",
    "nameEn": "TARALAGUDA",
    "nameHi": "TARALAGUDA",
    "code": "BIJA_TARALAGUDA",
    "shoName": "TI/SHO TARALAGUDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-tarrem",
    "districtId": "dist-bijapur",
    "nameEn": "TARREM",
    "nameHi": "TARREM",
    "code": "BIJA_TARREM",
    "shoName": "TI/SHO TARREM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-toynar",
    "districtId": "dist-bijapur",
    "nameEn": "TOYNAR",
    "nameHi": "TOYNAR",
    "code": "BIJA_TOYNAR",
    "shoName": "TI/SHO TOYNAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bijapur-usoor",
    "districtId": "dist-bijapur",
    "nameEn": "USOOR",
    "nameHi": "USOOR",
    "code": "BIJA_USOOR",
    "shoName": "TI/SHO USOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-mopka",
    "districtId": "dist-bilaspur",
    "nameEn": "MOPKA",
    "nameHi": "MOPKA",
    "code": "BILA_MOPKA",
    "shoName": "TI/SHO MOPKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-a_j_k",
    "districtId": "dist-bilaspur",
    "nameEn": "A.J.K.",
    "nameHi": "A.J.K.",
    "code": "BILA_A_J_K",
    "shoName": "TI/SHO A.J.K.",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-belgahna",
    "districtId": "dist-bilaspur",
    "nameEn": "Belgahna",
    "nameHi": "Belgahna",
    "code": "BILA_BELGAHNA",
    "shoName": "TI/SHO Belgahna",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-bilha",
    "districtId": "dist-bilaspur",
    "nameEn": "BILHA",
    "nameHi": "BILHA",
    "code": "BILA_BILHA",
    "shoName": "TI/SHO BILHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-chakarbhata",
    "districtId": "dist-bilaspur",
    "nameEn": "CHAKARBHATA",
    "nameHi": "CHAKARBHATA",
    "code": "BILA_CHAKARBHATA",
    "shoName": "TI/SHO CHAKARBHATA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-city_kotwali",
    "districtId": "dist-bilaspur",
    "nameEn": "CITY KOTWALI",
    "nameHi": "CITY KOTWALI",
    "code": "BILA_CITY_KOTWALI",
    "shoName": "TI/SHO CITY KOTWALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-civil_lines",
    "districtId": "dist-bilaspur",
    "nameEn": "CIVIL LINES",
    "nameHi": "CIVIL LINES",
    "code": "BILA_CIVIL_LINES",
    "shoName": "TI/SHO CIVIL LINES",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-cyber_police_thana_r",
    "districtId": "dist-bilaspur",
    "nameEn": "Cyber Police Thana, Range Bilaspur",
    "nameHi": "Cyber Police Thana, Range Bilaspur",
    "code": "BILA_CYBER_POLICE",
    "shoName": "TI/SHO Cyber Police Thana, Range Bilaspur",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-hirri",
    "districtId": "dist-bilaspur",
    "nameEn": "HIRRI",
    "nameHi": "HIRRI",
    "code": "BILA_HIRRI",
    "shoName": "TI/SHO HIRRI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-koni",
    "districtId": "dist-bilaspur",
    "nameEn": "KONI",
    "nameHi": "KONI",
    "code": "BILA_KONI",
    "shoName": "TI/SHO KONI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-kota",
    "districtId": "dist-bilaspur",
    "nameEn": "KOTA",
    "nameHi": "KOTA",
    "code": "BILA_KOTA",
    "shoName": "TI/SHO KOTA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-mahila_thana",
    "districtId": "dist-bilaspur",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "BILA_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-mangla",
    "districtId": "dist-bilaspur",
    "nameEn": "MANGLA",
    "nameHi": "MANGLA",
    "code": "BILA_MANGLA",
    "shoName": "TI/SHO MANGLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-masturi",
    "districtId": "dist-bilaspur",
    "nameEn": "MASTURI",
    "nameHi": "MASTURI",
    "code": "BILA_MASTURI",
    "shoName": "TI/SHO MASTURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-pachpedi",
    "districtId": "dist-bilaspur",
    "nameEn": "Pachpedi",
    "nameHi": "Pachpedi",
    "code": "BILA_PACHPEDI",
    "shoName": "TI/SHO Pachpedi",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-ratanpur",
    "districtId": "dist-bilaspur",
    "nameEn": "RATANPUR",
    "nameHi": "RATANPUR",
    "code": "BILA_RATANPUR",
    "shoName": "TI/SHO RATANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-sakri",
    "districtId": "dist-bilaspur",
    "nameEn": "SAKRI",
    "nameHi": "SAKRI",
    "code": "BILA_SAKRI",
    "shoName": "TI/SHO SAKRI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-sarkanda",
    "districtId": "dist-bilaspur",
    "nameEn": "SARKANDA",
    "nameHi": "SARKANDA",
    "code": "BILA_SARKANDA",
    "shoName": "TI/SHO SARKANDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-sipat",
    "districtId": "dist-bilaspur",
    "nameEn": "SIPAT",
    "nameHi": "SIPAT",
    "code": "BILA_SIPAT",
    "shoName": "TI/SHO SIPAT",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-sirgitti",
    "districtId": "dist-bilaspur",
    "nameEn": "SIRGITTI",
    "nameHi": "SIRGITTI",
    "code": "BILA_SIRGITTI",
    "shoName": "TI/SHO SIRGITTI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-takhatpur",
    "districtId": "dist-bilaspur",
    "nameEn": "TAKHATPUR",
    "nameHi": "TAKHATPUR",
    "code": "BILA_TAKHATPUR",
    "shoName": "TI/SHO TAKHATPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-tarbahar",
    "districtId": "dist-bilaspur",
    "nameEn": "TARBAHAR",
    "nameHi": "TARBAHAR",
    "code": "BILA_TARBAHAR",
    "shoName": "TI/SHO TARBAHAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-bilaspur-torwa",
    "districtId": "dist-bilaspur",
    "nameEn": "TORWA",
    "nameHi": "TORWA",
    "code": "BILA_TORWA",
    "shoName": "TI/SHO TORWA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-ajk_dantewada",
    "districtId": "dist-dantewada",
    "nameEn": "AJK DANTEWADA",
    "nameHi": "AJK DANTEWADA",
    "code": "DANT_AJK_DANTEWAD",
    "shoName": "TI/SHO AJK DANTEWADA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-aranpur",
    "districtId": "dist-dantewada",
    "nameEn": "ARANPUR",
    "nameHi": "ARANPUR",
    "code": "DANT_ARANPUR",
    "shoName": "TI/SHO ARANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-bacheli",
    "districtId": "dist-dantewada",
    "nameEn": "BACHELI",
    "nameHi": "BACHELI",
    "code": "DANT_BACHELI",
    "shoName": "TI/SHO BACHELI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-barsoor",
    "districtId": "dist-dantewada",
    "nameEn": "BARSOOR",
    "nameHi": "BARSOOR",
    "code": "DANT_BARSOOR",
    "shoName": "TI/SHO BARSOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-bhansi",
    "districtId": "dist-dantewada",
    "nameEn": "BHANSI",
    "nameHi": "BHANSI",
    "code": "DANT_BHANSI",
    "shoName": "TI/SHO BHANSI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-dantewada",
    "districtId": "dist-dantewada",
    "nameEn": "DANTEWADA",
    "nameHi": "DANTEWADA",
    "code": "DANT_DANTEWADA",
    "shoName": "TI/SHO DANTEWADA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-faraspal",
    "districtId": "dist-dantewada",
    "nameEn": "FARASPAL",
    "nameHi": "FARASPAL",
    "code": "DANT_FARASPAL",
    "shoName": "TI/SHO FARASPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-geedam",
    "districtId": "dist-dantewada",
    "nameEn": "GEEDAM",
    "nameHi": "GEEDAM",
    "code": "DANT_GEEDAM",
    "shoName": "TI/SHO GEEDAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-katekalyan",
    "districtId": "dist-dantewada",
    "nameEn": "KATEKALYAN",
    "nameHi": "KATEKALYAN",
    "code": "DANT_KATEKALYAN",
    "shoName": "TI/SHO KATEKALYAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-kirandul",
    "districtId": "dist-dantewada",
    "nameEn": "KIRANDUL",
    "nameHi": "KIRANDUL",
    "code": "DANT_KIRANDUL",
    "shoName": "TI/SHO KIRANDUL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-kuakonda",
    "districtId": "dist-dantewada",
    "nameEn": "KUAKONDA",
    "nameHi": "KUAKONDA",
    "code": "DANT_KUAKONDA",
    "shoName": "TI/SHO KUAKONDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-mahila_thana",
    "districtId": "dist-dantewada",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "DANT_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dantewada-police_station_tikan",
    "districtId": "dist-dantewada",
    "nameEn": "POLICE STATION TIKANPAL",
    "nameHi": "POLICE STATION TIKANPAL",
    "code": "DANT_POLICE_STATI",
    "shoName": "TI/SHO POLICE STATION TIKANPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-ajk_dhamtari",
    "districtId": "dist-dhamtari",
    "nameEn": "AJK DHAMTARI",
    "nameHi": "AJK DHAMTARI",
    "code": "DHAM_AJK_DHAMTARI",
    "shoName": "TI/SHO AJK DHAMTARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-akladongri",
    "districtId": "dist-dhamtari",
    "nameEn": "Akladongri",
    "nameHi": "Akladongri",
    "code": "DHAM_AKLADONGRI",
    "shoName": "TI/SHO Akladongri",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-arjuni",
    "districtId": "dist-dhamtari",
    "nameEn": "ARJUNI",
    "nameHi": "ARJUNI",
    "code": "DHAM_ARJUNI",
    "shoName": "TI/SHO ARJUNI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-bhakhara",
    "districtId": "dist-dhamtari",
    "nameEn": "BHAKHARA",
    "nameHi": "BHAKHARA",
    "code": "DHAM_BHAKHARA",
    "shoName": "TI/SHO BHAKHARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-borai",
    "districtId": "dist-dhamtari",
    "nameEn": "BORAI",
    "nameHi": "BORAI",
    "code": "DHAM_BORAI",
    "shoName": "TI/SHO BORAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-cyber_police_station",
    "districtId": "dist-dhamtari",
    "nameEn": "CYBER POLICE STATION DHAMTARI",
    "nameHi": "CYBER POLICE STATION DHAMTARI",
    "code": "DHAM_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION DHAMTARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-dhamtari",
    "districtId": "dist-dhamtari",
    "nameEn": "DHAMTARI",
    "nameHi": "DHAMTARI",
    "code": "DHAM_DHAMTARI",
    "shoName": "TI/SHO DHAMTARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-dugli",
    "districtId": "dist-dhamtari",
    "nameEn": "DUGLI",
    "nameHi": "DUGLI",
    "code": "DHAM_DUGLI",
    "shoName": "TI/SHO DUGLI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-keregaon",
    "districtId": "dist-dhamtari",
    "nameEn": "KEREGAON",
    "nameHi": "KEREGAON",
    "code": "DHAM_KEREGAON",
    "shoName": "TI/SHO KEREGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-khallari",
    "districtId": "dist-dhamtari",
    "nameEn": "KHALLARI",
    "nameHi": "KHALLARI",
    "code": "DHAM_KHALLARI",
    "shoName": "TI/SHO KHALLARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-kurud",
    "districtId": "dist-dhamtari",
    "nameEn": "KURUD",
    "nameHi": "KURUD",
    "code": "DHAM_KURUD",
    "shoName": "TI/SHO KURUD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-magarlod",
    "districtId": "dist-dhamtari",
    "nameEn": "MAGARLOD",
    "nameHi": "MAGARLOD",
    "code": "DHAM_MAGARLOD",
    "shoName": "TI/SHO MAGARLOD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-mechka",
    "districtId": "dist-dhamtari",
    "nameEn": "MECHKA",
    "nameHi": "MECHKA",
    "code": "DHAM_MECHKA",
    "shoName": "TI/SHO MECHKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-nagari",
    "districtId": "dist-dhamtari",
    "nameEn": "NAGARI",
    "nameHi": "NAGARI",
    "code": "DHAM_NAGARI",
    "shoName": "TI/SHO NAGARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-rudri",
    "districtId": "dist-dhamtari",
    "nameEn": "RUDRI",
    "nameHi": "RUDRI",
    "code": "DHAM_RUDRI",
    "shoName": "TI/SHO RUDRI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-dhamtari-sihawa",
    "districtId": "dist-dhamtari",
    "nameEn": "SIHAWA",
    "nameHi": "SIHAWA",
    "code": "DHAM_SIHAWA",
    "shoName": "TI/SHO SIHAWA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-ajk_durg",
    "districtId": "dist-durg",
    "nameEn": "AJK DURG",
    "nameHi": "AJK DURG",
    "code": "DURG_AJK_DURG",
    "shoName": "TI/SHO AJK DURG",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-amleshwar",
    "districtId": "dist-durg",
    "nameEn": "AMLESHWAR",
    "nameHi": "AMLESHWAR",
    "code": "DURG_AMLESHWAR",
    "shoName": "TI/SHO AMLESHWAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-anda",
    "districtId": "dist-durg",
    "nameEn": "ANDA",
    "nameHi": "ANDA",
    "code": "DURG_ANDA",
    "shoName": "TI/SHO ANDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-bhilai_bhatti",
    "districtId": "dist-durg",
    "nameEn": "BHILAI BHATTI",
    "nameHi": "BHILAI BHATTI",
    "code": "DURG_BHILAI_BHATT",
    "shoName": "TI/SHO BHILAI BHATTI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-bhilai_nagar",
    "districtId": "dist-durg",
    "nameEn": "BHILAI NAGAR",
    "nameHi": "BHILAI NAGAR",
    "code": "DURG_BHILAI_NAGAR",
    "shoName": "TI/SHO BHILAI NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-bori",
    "districtId": "dist-durg",
    "nameEn": "BORI",
    "nameHi": "BORI",
    "code": "DURG_BORI",
    "shoName": "TI/SHO BORI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-chawani",
    "districtId": "dist-durg",
    "nameEn": "CHAWANI",
    "nameHi": "CHAWANI",
    "code": "DURG_CHAWANI",
    "shoName": "TI/SHO CHAWANI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-cyber_police_thana_r",
    "districtId": "dist-durg",
    "nameEn": "Cyber Police Thana, Range Durg",
    "nameHi": "Cyber Police Thana, Range Durg",
    "code": "DURG_CYBER_POLICE",
    "shoName": "TI/SHO Cyber Police Thana, Range Durg",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-dhamdha",
    "districtId": "dist-durg",
    "nameEn": "DHAMDHA",
    "nameHi": "DHAMDHA",
    "code": "DURG_DHAMDHA",
    "shoName": "TI/SHO DHAMDHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-jamgaon_r",
    "districtId": "dist-durg",
    "nameEn": "JAMGAON-R",
    "nameHi": "JAMGAON-R",
    "code": "DURG_JAMGAON_R",
    "shoName": "TI/SHO JAMGAON-R",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-jamul",
    "districtId": "dist-durg",
    "nameEn": "JAMUL",
    "nameHi": "JAMUL",
    "code": "DURG_JAMUL",
    "shoName": "TI/SHO JAMUL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-khursipar",
    "districtId": "dist-durg",
    "nameEn": "KHURSIPAR",
    "nameHi": "KHURSIPAR",
    "code": "DURG_KHURSIPAR",
    "shoName": "TI/SHO KHURSIPAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-kotwali_durg",
    "districtId": "dist-durg",
    "nameEn": "KOTWALI, DURG",
    "nameHi": "KOTWALI, DURG",
    "code": "DURG_KOTWALI_DURG",
    "shoName": "TI/SHO KOTWALI, DURG",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-kumhari",
    "districtId": "dist-durg",
    "nameEn": "KUMHARI",
    "nameHi": "KUMHARI",
    "code": "DURG_KUMHARI",
    "shoName": "TI/SHO KUMHARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-mahila_thana",
    "districtId": "dist-durg",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "DURG_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-mohan_nagar",
    "districtId": "dist-durg",
    "nameEn": "MOHAN NAGAR",
    "nameHi": "MOHAN NAGAR",
    "code": "DURG_MOHAN_NAGAR",
    "shoName": "TI/SHO MOHAN NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-nandini",
    "districtId": "dist-durg",
    "nameEn": "NANDINI",
    "nameHi": "NANDINI",
    "code": "DURG_NANDINI",
    "shoName": "TI/SHO NANDINI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-newai",
    "districtId": "dist-durg",
    "nameEn": "NEWAI",
    "nameHi": "NEWAI",
    "code": "DURG_NEWAI",
    "shoName": "TI/SHO NEWAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-padmanabhpur",
    "districtId": "dist-durg",
    "nameEn": "PADMANABHPUR",
    "nameHi": "PADMANABHPUR",
    "code": "DURG_PADMANABHPUR",
    "shoName": "TI/SHO PADMANABHPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-patan",
    "districtId": "dist-durg",
    "nameEn": "PATAN",
    "nameHi": "PATAN",
    "code": "DURG_PATAN",
    "shoName": "TI/SHO PATAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-pulgaon",
    "districtId": "dist-durg",
    "nameEn": "PULGAON",
    "nameHi": "PULGAON",
    "code": "DURG_PULGAON",
    "shoName": "TI/SHO PULGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-purani_bhilai",
    "districtId": "dist-durg",
    "nameEn": "PURANI BHILAI",
    "nameHi": "PURANI BHILAI",
    "code": "DURG_PURANI_BHILA",
    "shoName": "TI/SHO PURANI BHILAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-rani_tarai",
    "districtId": "dist-durg",
    "nameEn": "RANI TARAI",
    "nameHi": "RANI TARAI",
    "code": "DURG_RANI_TARAI",
    "shoName": "TI/SHO RANI TARAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-supela",
    "districtId": "dist-durg",
    "nameEn": "SUPELA",
    "nameHi": "SUPELA",
    "code": "DURG_SUPELA",
    "shoName": "TI/SHO SUPELA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-utai",
    "districtId": "dist-durg",
    "nameEn": "UTAI",
    "nameHi": "UTAI",
    "code": "DURG_UTAI",
    "shoName": "TI/SHO UTAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-durg-vaishali_nagar",
    "districtId": "dist-durg",
    "nameEn": "VAISHALI NAGAR",
    "nameHi": "VAISHALI NAGAR",
    "code": "DURG_VAISHALI_NAG",
    "shoName": "TI/SHO VAISHALI NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-ajk_gariyaband",
    "districtId": "dist-gariyaband",
    "nameEn": "AJK GARIYABAND",
    "nameHi": "AJK GARIYABAND",
    "code": "GARI_AJK_GARIYABA",
    "shoName": "TI/SHO AJK GARIYABAND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-amlipadar",
    "districtId": "dist-gariyaband",
    "nameEn": "AMLIPADAR",
    "nameHi": "AMLIPADAR",
    "code": "GARI_AMLIPADAR",
    "shoName": "TI/SHO AMLIPADAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-atarmara_panduka",
    "districtId": "dist-gariyaband",
    "nameEn": "ATARMARA/PANDUKA",
    "nameHi": "ATARMARA/PANDUKA",
    "code": "GARI_ATARMARA_PAN",
    "shoName": "TI/SHO ATARMARA/PANDUKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-chura",
    "districtId": "dist-gariyaband",
    "nameEn": "CHURA",
    "nameHi": "CHURA",
    "code": "GARI_CHURA",
    "shoName": "TI/SHO CHURA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-deobhog",
    "districtId": "dist-gariyaband",
    "nameEn": "DEOBHOG",
    "nameHi": "DEOBHOG",
    "code": "GARI_DEOBHOG",
    "shoName": "TI/SHO DEOBHOG",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-fengeswar",
    "districtId": "dist-gariyaband",
    "nameEn": "FENGESWAR",
    "nameHi": "FENGESWAR",
    "code": "GARI_FENGESWAR",
    "shoName": "TI/SHO FENGESWAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-gariyaband",
    "districtId": "dist-gariyaband",
    "nameEn": "GARIYABAND",
    "nameHi": "GARIYABAND",
    "code": "GARI_GARIYABAND",
    "shoName": "TI/SHO GARIYABAND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-indagaon",
    "districtId": "dist-gariyaband",
    "nameEn": "INDAGAON",
    "nameHi": "INDAGAON",
    "code": "GARI_INDAGAON",
    "shoName": "TI/SHO INDAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-mainpur",
    "districtId": "dist-gariyaband",
    "nameEn": "MAINPUR",
    "nameHi": "MAINPUR",
    "code": "GARI_MAINPUR",
    "shoName": "TI/SHO MAINPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-paylikhand",
    "districtId": "dist-gariyaband",
    "nameEn": "PAYLIKHAND",
    "nameHi": "PAYLIKHAND",
    "code": "GARI_PAYLIKHAND",
    "shoName": "TI/SHO PAYLIKHAND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-piperchedi",
    "districtId": "dist-gariyaband",
    "nameEn": "PIPERCHEDI",
    "nameHi": "PIPERCHEDI",
    "code": "GARI_PIPERCHEDI",
    "shoName": "TI/SHO PIPERCHEDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-rajim",
    "districtId": "dist-gariyaband",
    "nameEn": "RAJIM",
    "nameHi": "RAJIM",
    "code": "GARI_RAJIM",
    "shoName": "TI/SHO RAJIM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gariyaband-shobha",
    "districtId": "dist-gariyaband",
    "nameEn": "SHOBHA",
    "nameHi": "SHOBHA",
    "code": "GARI_SHOBHA",
    "shoName": "TI/SHO SHOBHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gaurela_pendra_marwa-ajk_police_thana",
    "districtId": "dist-gaurela_pendra_marwa",
    "nameEn": "AJK POLICE THANA",
    "nameHi": "AJK POLICE THANA",
    "code": "GAUR_AJK_POLICE_T",
    "shoName": "TI/SHO AJK POLICE THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gaurela_pendra_marwa-gaurela",
    "districtId": "dist-gaurela_pendra_marwa",
    "nameEn": "GAURELA",
    "nameHi": "GAURELA",
    "code": "GAUR_GAURELA",
    "shoName": "TI/SHO GAURELA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gaurela_pendra_marwa-marwahi",
    "districtId": "dist-gaurela_pendra_marwa",
    "nameEn": "MARWAHI",
    "nameHi": "MARWAHI",
    "code": "GAUR_MARWAHI",
    "shoName": "TI/SHO MARWAHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-gaurela_pendra_marwa-pendra",
    "districtId": "dist-gaurela_pendra_marwa",
    "nameEn": "PENDRA",
    "nameHi": "PENDRA",
    "code": "GAUR_PENDRA",
    "shoName": "TI/SHO PENDRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-grp-bhilai",
    "districtId": "dist-grp",
    "nameEn": "BHILAI",
    "nameHi": "BHILAI",
    "code": "GRP_BHILAI",
    "shoName": "TI/SHO BHILAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-grp-bilaspur",
    "districtId": "dist-grp",
    "nameEn": "BILASPUR",
    "nameHi": "BILASPUR",
    "code": "GRP_BILASPUR",
    "shoName": "TI/SHO BILASPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-grp-dongargarh",
    "districtId": "dist-grp",
    "nameEn": "DONGARGARH",
    "nameHi": "DONGARGARH",
    "code": "GRP_DONGARGARH",
    "shoName": "TI/SHO DONGARGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-grp-raigarh",
    "districtId": "dist-grp",
    "nameEn": "RAIGARH",
    "nameHi": "RAIGARH",
    "code": "GRP_RAIGARH",
    "shoName": "TI/SHO RAIGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-grp-raipur",
    "districtId": "dist-grp",
    "nameEn": "RAIPUR",
    "nameHi": "RAIPUR",
    "code": "GRP_RAIPUR",
    "shoName": "TI/SHO RAIPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-ajk_janjgir_champa",
    "districtId": "dist-janjgir_champa",
    "nameEn": "AJK JANJGIR-CHAMPA",
    "nameHi": "AJK JANJGIR-CHAMPA",
    "code": "JANJ_AJK_JANJGIR_",
    "shoName": "TI/SHO AJK JANJGIR-CHAMPA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-akaltara",
    "districtId": "dist-janjgir_champa",
    "nameEn": "AKALTARA",
    "nameHi": "AKALTARA",
    "code": "JANJ_AKALTARA",
    "shoName": "TI/SHO AKALTARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-balouda",
    "districtId": "dist-janjgir_champa",
    "nameEn": "BALOUDA",
    "nameHi": "BALOUDA",
    "code": "JANJ_BALOUDA",
    "shoName": "TI/SHO BALOUDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-bhamnidih",
    "districtId": "dist-janjgir_champa",
    "nameEn": "BHAMNIDIH",
    "nameHi": "BHAMNIDIH",
    "code": "JANJ_BHAMNIDIH",
    "shoName": "TI/SHO BHAMNIDIH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-birra",
    "districtId": "dist-janjgir_champa",
    "nameEn": "BIRRA",
    "nameHi": "BIRRA",
    "code": "JANJ_BIRRA",
    "shoName": "TI/SHO BIRRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-champa",
    "districtId": "dist-janjgir_champa",
    "nameEn": "CHAMPA",
    "nameHi": "CHAMPA",
    "code": "JANJ_CHAMPA",
    "shoName": "TI/SHO CHAMPA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-cyber_police_station",
    "districtId": "dist-janjgir_champa",
    "nameEn": "CYBER POLICE STATION JANJGIR-CHAMPA",
    "nameHi": "CYBER POLICE STATION JANJGIR-CHAMPA",
    "code": "JANJ_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION JANJGIR-CHAMPA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-janjgir",
    "districtId": "dist-janjgir_champa",
    "nameEn": "JANJGIR",
    "nameHi": "JANJGIR",
    "code": "JANJ_JANJGIR",
    "shoName": "TI/SHO JANJGIR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-mahila_police_thana",
    "districtId": "dist-janjgir_champa",
    "nameEn": "Mahila Police Thana",
    "nameHi": "Mahila Police Thana",
    "code": "JANJ_MAHILA_POLIC",
    "shoName": "TI/SHO Mahila Police Thana",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-mulmula",
    "districtId": "dist-janjgir_champa",
    "nameEn": "MULMULA",
    "nameHi": "MULMULA",
    "code": "JANJ_MULMULA",
    "shoName": "TI/SHO MULMULA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-nawagarh",
    "districtId": "dist-janjgir_champa",
    "nameEn": "NAWAGARH",
    "nameHi": "NAWAGARH",
    "code": "JANJ_NAWAGARH",
    "shoName": "TI/SHO NAWAGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-pamgarh",
    "districtId": "dist-janjgir_champa",
    "nameEn": "PAMGARH",
    "nameHi": "PAMGARH",
    "code": "JANJ_PAMGARH",
    "shoName": "TI/SHO PAMGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-saragaon",
    "districtId": "dist-janjgir_champa",
    "nameEn": "SARAGAON",
    "nameHi": "SARAGAON",
    "code": "JANJ_SARAGAON",
    "shoName": "TI/SHO SARAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-janjgir_champa-sheorinarayan",
    "districtId": "dist-janjgir_champa",
    "nameEn": "SHEORINARAYAN",
    "nameHi": "SHEORINARAYAN",
    "code": "JANJ_SHEORINARAYA",
    "shoName": "TI/SHO SHEORINARAYAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-ajk_jashpur",
    "districtId": "dist-jashpur",
    "nameEn": "AJK JASHPUR",
    "nameHi": "AJK JASHPUR",
    "code": "JASH_AJK_JASHPUR",
    "shoName": "TI/SHO AJK JASHPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-asta",
    "districtId": "dist-jashpur",
    "nameEn": "ASTA",
    "nameHi": "ASTA",
    "code": "JASH_ASTA",
    "shoName": "TI/SHO ASTA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-bagbahar",
    "districtId": "dist-jashpur",
    "nameEn": "BAGBAHAR",
    "nameHi": "BAGBAHAR",
    "code": "JASH_BAGBAHAR",
    "shoName": "TI/SHO BAGBAHAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-bageecha",
    "districtId": "dist-jashpur",
    "nameEn": "BAGEECHA",
    "nameHi": "BAGEECHA",
    "code": "JASH_BAGEECHA",
    "shoName": "TI/SHO BAGEECHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-cyber_police_station",
    "districtId": "dist-jashpur",
    "nameEn": "CYBER POLICE STATION, JASHPUR",
    "nameHi": "CYBER POLICE STATION, JASHPUR",
    "code": "JASH_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, JASHPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-duldula",
    "districtId": "dist-jashpur",
    "nameEn": "DULDULA",
    "nameHi": "DULDULA",
    "code": "JASH_DULDULA",
    "shoName": "TI/SHO DULDULA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-jashpur",
    "districtId": "dist-jashpur",
    "nameEn": "JASHPUR",
    "nameHi": "JASHPUR",
    "code": "JASH_JASHPUR",
    "shoName": "TI/SHO JASHPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-kansabell",
    "districtId": "dist-jashpur",
    "nameEn": "KANSABELL",
    "nameHi": "KANSABELL",
    "code": "JASH_KANSABELL",
    "shoName": "TI/SHO KANSABELL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-kunkuri",
    "districtId": "dist-jashpur",
    "nameEn": "KUNKURI",
    "nameHi": "KUNKURI",
    "code": "JASH_KUNKURI",
    "shoName": "TI/SHO KUNKURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-lodam",
    "districtId": "dist-jashpur",
    "nameEn": "LODAM",
    "nameHi": "LODAM",
    "code": "JASH_LODAM",
    "shoName": "TI/SHO LODAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-mahila_thana",
    "districtId": "dist-jashpur",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "JASH_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-narayanpur",
    "districtId": "dist-jashpur",
    "nameEn": "NARAYANPUR",
    "nameHi": "NARAYANPUR",
    "code": "JASH_NARAYANPUR",
    "shoName": "TI/SHO NARAYANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-patthalgaon",
    "districtId": "dist-jashpur",
    "nameEn": "PATTHALGAON",
    "nameHi": "PATTHALGAON",
    "code": "JASH_PATTHALGAON",
    "shoName": "TI/SHO PATTHALGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-pharsabahar",
    "districtId": "dist-jashpur",
    "nameEn": "PHARSABAHAR",
    "nameHi": "PHARSABAHAR",
    "code": "JASH_PHARSABAHAR",
    "shoName": "TI/SHO PHARSABAHAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-sanna",
    "districtId": "dist-jashpur",
    "nameEn": "SANNA",
    "nameHi": "SANNA",
    "code": "JASH_SANNA",
    "shoName": "TI/SHO SANNA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-tapkara",
    "districtId": "dist-jashpur",
    "nameEn": "TAPKARA",
    "nameHi": "TAPKARA",
    "code": "JASH_TAPKARA",
    "shoName": "TI/SHO TAPKARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-jashpur-tumla",
    "districtId": "dist-jashpur",
    "nameEn": "TUMLA",
    "nameHi": "TUMLA",
    "code": "JASH_TUMLA",
    "shoName": "TI/SHO TUMLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-ajk_kabirdham",
    "districtId": "dist-kabirdham",
    "nameEn": "AJK KABIRDHAM",
    "nameHi": "AJK KABIRDHAM",
    "code": "KABI_AJK_KABIRDHA",
    "shoName": "TI/SHO AJK KABIRDHAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-bhoram_dev",
    "districtId": "dist-kabirdham",
    "nameEn": "BHORAM DEV",
    "nameHi": "BHORAM DEV",
    "code": "KABI_BHORAM_DEV",
    "shoName": "TI/SHO BHORAM DEV",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-bodla",
    "districtId": "dist-kabirdham",
    "nameEn": "BODLA",
    "nameHi": "BODLA",
    "code": "KABI_BODLA",
    "shoName": "TI/SHO BODLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-chilpfi",
    "districtId": "dist-kabirdham",
    "nameEn": "CHILPFI",
    "nameHi": "CHILPFI",
    "code": "KABI_CHILPFI",
    "shoName": "TI/SHO CHILPFI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-cyber_police_station",
    "districtId": "dist-kabirdham",
    "nameEn": "CYBER POLICE STATION, KABIRDHAM",
    "nameHi": "CYBER POLICE STATION, KABIRDHAM",
    "code": "KABI_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, KABIRDHAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-jhalmala",
    "districtId": "dist-kabirdham",
    "nameEn": "JHALMALA",
    "nameHi": "JHALMALA",
    "code": "KABI_JHALMALA",
    "shoName": "TI/SHO JHALMALA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-kabirdham",
    "districtId": "dist-kabirdham",
    "nameEn": "KABIRDHAM",
    "nameHi": "KABIRDHAM",
    "code": "KABI_KABIRDHAM",
    "shoName": "TI/SHO KABIRDHAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-kukdoor",
    "districtId": "dist-kabirdham",
    "nameEn": "KUKDOOR",
    "nameHi": "KUKDOOR",
    "code": "KABI_KUKDOOR",
    "shoName": "TI/SHO KUKDOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-kunda",
    "districtId": "dist-kabirdham",
    "nameEn": "KUNDA",
    "nameHi": "KUNDA",
    "code": "KABI_KUNDA",
    "shoName": "TI/SHO KUNDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-mahila_thana",
    "districtId": "dist-kabirdham",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "KABI_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-pandariya",
    "districtId": "dist-kabirdham",
    "nameEn": "PANDARIYA",
    "nameHi": "PANDARIYA",
    "code": "KABI_PANDARIYA",
    "shoName": "TI/SHO PANDARIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-pandatari",
    "districtId": "dist-kabirdham",
    "nameEn": "PANDATARI",
    "nameHi": "PANDATARI",
    "code": "KABI_PANDATARI",
    "shoName": "TI/SHO PANDATARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-piparia",
    "districtId": "dist-kabirdham",
    "nameEn": "PIPARIA",
    "nameHi": "PIPARIA",
    "code": "KABI_PIPARIA",
    "shoName": "TI/SHO PIPARIA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-rengakhar",
    "districtId": "dist-kabirdham",
    "nameEn": "RENGAKHAR",
    "nameHi": "RENGAKHAR",
    "code": "KABI_RENGAKHAR",
    "shoName": "TI/SHO RENGAKHAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-sahaspur_lohara",
    "districtId": "dist-kabirdham",
    "nameEn": "SAHASPUR LOHARA",
    "nameHi": "SAHASPUR LOHARA",
    "code": "KABI_SAHASPUR_LOH",
    "shoName": "TI/SHO SAHASPUR LOHARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-singhanpuri",
    "districtId": "dist-kabirdham",
    "nameEn": "SINGHANPURI",
    "nameHi": "SINGHANPURI",
    "code": "KABI_SINGHANPURI",
    "shoName": "TI/SHO SINGHANPURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kabirdham-taregaon_jungle",
    "districtId": "dist-kabirdham",
    "nameEn": "TAREGAON JUNGLE",
    "nameHi": "TAREGAON JUNGLE",
    "code": "KABI_TAREGAON_JUN",
    "shoName": "TI/SHO TAREGAON JUNGLE",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-ajk_kanker",
    "districtId": "dist-kanker",
    "nameEn": "AJK KANKER",
    "nameHi": "AJK KANKER",
    "code": "KANK_AJK_KANKER",
    "shoName": "TI/SHO AJK KANKER",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-amabeda",
    "districtId": "dist-kanker",
    "nameEn": "AMABEDA",
    "nameHi": "AMABEDA",
    "code": "KANK_AMABEDA",
    "shoName": "TI/SHO AMABEDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-antagarh",
    "districtId": "dist-kanker",
    "nameEn": "ANTAGARH",
    "nameHi": "ANTAGARH",
    "code": "KANK_ANTAGARH",
    "shoName": "TI/SHO ANTAGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-badgaon",
    "districtId": "dist-kanker",
    "nameEn": "BADGAON",
    "nameHi": "BADGAON",
    "code": "KANK_BADGAON",
    "shoName": "TI/SHO BADGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-bande",
    "districtId": "dist-kanker",
    "nameEn": "BANDE",
    "nameHi": "BANDE",
    "code": "KANK_BANDE",
    "shoName": "TI/SHO BANDE",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-bhanupratappur",
    "districtId": "dist-kanker",
    "nameEn": "BHANUPRATAPPUR",
    "nameHi": "BHANUPRATAPPUR",
    "code": "KANK_BHANUPRATAPP",
    "shoName": "TI/SHO BHANUPRATAPPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-charama",
    "districtId": "dist-kanker",
    "nameEn": "CHARAMA",
    "nameHi": "CHARAMA",
    "code": "KANK_CHARAMA",
    "shoName": "TI/SHO CHARAMA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-chhote_bethiya",
    "districtId": "dist-kanker",
    "nameEn": "CHHOTE BETHIYA",
    "nameHi": "CHHOTE BETHIYA",
    "code": "KANK_CHHOTE_BETHI",
    "shoName": "TI/SHO CHHOTE BETHIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-durgukondal",
    "districtId": "dist-kanker",
    "nameEn": "DURGUKONDAL",
    "nameHi": "DURGUKONDAL",
    "code": "KANK_DURGUKONDAL",
    "shoName": "TI/SHO DURGUKONDAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-gondahoor",
    "districtId": "dist-kanker",
    "nameEn": "GONDAHOOR",
    "nameHi": "GONDAHOOR",
    "code": "KANK_GONDAHOOR",
    "shoName": "TI/SHO GONDAHOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-kanker",
    "districtId": "dist-kanker",
    "nameEn": "KANKER",
    "nameHi": "KANKER",
    "code": "KANK_KANKER",
    "shoName": "TI/SHO KANKER",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-kodekurse",
    "districtId": "dist-kanker",
    "nameEn": "KODEKURSE",
    "nameHi": "KODEKURSE",
    "code": "KANK_KODEKURSE",
    "shoName": "TI/SHO KODEKURSE",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-korar",
    "districtId": "dist-kanker",
    "nameEn": "KORAR",
    "nameHi": "KORAR",
    "code": "KANK_KORAR",
    "shoName": "TI/SHO KORAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-koyalibeda",
    "districtId": "dist-kanker",
    "nameEn": "KOYALIBEDA",
    "nameHi": "KOYALIBEDA",
    "code": "KANK_KOYALIBEDA",
    "shoName": "TI/SHO KOYALIBEDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-lohttar",
    "districtId": "dist-kanker",
    "nameEn": "LOHTTAR",
    "nameHi": "LOHTTAR",
    "code": "KANK_LOHTTAR",
    "shoName": "TI/SHO LOHTTAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-narharpur",
    "districtId": "dist-kanker",
    "nameEn": "NARHARPUR",
    "nameHi": "NARHARPUR",
    "code": "KANK_NARHARPUR",
    "shoName": "TI/SHO NARHARPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-pakhanjoor",
    "districtId": "dist-kanker",
    "nameEn": "PAKHANJOOR",
    "nameHi": "PAKHANJOOR",
    "code": "KANK_PAKHANJOOR",
    "shoName": "TI/SHO PAKHANJOOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-partapur",
    "districtId": "dist-kanker",
    "nameEn": "PARTAPUR",
    "nameHi": "PARTAPUR",
    "code": "KANK_PARTAPUR",
    "shoName": "TI/SHO PARTAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-raoghat",
    "districtId": "dist-kanker",
    "nameEn": "RAOGHAT",
    "nameHi": "RAOGHAT",
    "code": "KANK_RAOGHAT",
    "shoName": "TI/SHO RAOGHAT",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-sarona",
    "districtId": "dist-kanker",
    "nameEn": "SARONA",
    "nameHi": "SARONA",
    "code": "KANK_SARONA",
    "shoName": "TI/SHO SARONA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-siksod",
    "districtId": "dist-kanker",
    "nameEn": "SIKSOD",
    "nameHi": "SIKSOD",
    "code": "KANK_SIKSOD",
    "shoName": "TI/SHO SIKSOD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kanker-tadoki",
    "districtId": "dist-kanker",
    "nameEn": "TADOKI",
    "nameHi": "TADOKI",
    "code": "KANK_TADOKI",
    "shoName": "TI/SHO TADOKI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-ajk_police_thana",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "AJK POLICE THANA",
    "nameHi": "AJK POLICE THANA",
    "code": "KHAI_AJK_POLICE_T",
    "shoName": "TI/SHO AJK POLICE THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-bakarkatta",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "BAKARKATTA",
    "nameHi": "BAKARKATTA",
    "code": "KHAI_BAKARKATTA",
    "shoName": "TI/SHO BAKARKATTA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-chhuikhdan",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "CHHUIKHDAN",
    "nameHi": "CHHUIKHDAN",
    "code": "KHAI_CHHUIKHDAN",
    "shoName": "TI/SHO CHHUIKHDAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-gandai",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "GANDAI",
    "nameHi": "GANDAI",
    "code": "KHAI_GANDAI",
    "shoName": "TI/SHO GANDAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-gatapar",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "GATAPAR",
    "nameHi": "GATAPAR",
    "code": "KHAI_GATAPAR",
    "shoName": "TI/SHO GATAPAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-khairagarh",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "KHAIRAGARH",
    "nameHi": "KHAIRAGARH",
    "code": "KHAI_KHAIRAGARH",
    "shoName": "TI/SHO KHAIRAGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-mohgaon",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "MOHGAON",
    "nameHi": "MOHGAON",
    "code": "KHAI_MOHGAON",
    "shoName": "TI/SHO MOHGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-salhewara",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "SALHEWARA",
    "nameHi": "SALHEWARA",
    "code": "KHAI_SALHEWARA",
    "shoName": "TI/SHO SALHEWARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-khairagarh_chhui_kha-thelkadih",
    "districtId": "dist-khairagarh_chhui_kha",
    "nameEn": "THELKADIH",
    "nameHi": "THELKADIH",
    "code": "KHAI_THELKADIH",
    "shoName": "TI/SHO THELKADIH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-ajk_kondagaon",
    "districtId": "dist-kondagaon",
    "nameEn": "AJK KONDAGAON",
    "nameHi": "AJK KONDAGAON",
    "code": "KOND_AJK_KONDAGAO",
    "shoName": "TI/SHO AJK KONDAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-anantpur",
    "districtId": "dist-kondagaon",
    "nameEn": "ANANTPUR",
    "nameHi": "ANANTPUR",
    "code": "KOND_ANANTPUR",
    "shoName": "TI/SHO ANANTPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-bade_dongar",
    "districtId": "dist-kondagaon",
    "nameEn": "BADE DONGAR",
    "nameHi": "BADE DONGAR",
    "code": "KOND_BADE_DONGAR",
    "shoName": "TI/SHO BADE DONGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-bayanar",
    "districtId": "dist-kondagaon",
    "nameEn": "BAYANAR",
    "nameHi": "BAYANAR",
    "code": "KOND_BAYANAR",
    "shoName": "TI/SHO BAYANAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-dhanora_kondagaon",
    "districtId": "dist-kondagaon",
    "nameEn": "DHANORA KONDAGAON",
    "nameHi": "DHANORA KONDAGAON",
    "code": "KOND_DHANORA_KOND",
    "shoName": "TI/SHO DHANORA KONDAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-farasgaon_kondagaon",
    "districtId": "dist-kondagaon",
    "nameEn": "FARASGAON KONDAGAON",
    "nameHi": "FARASGAON KONDAGAON",
    "code": "KOND_FARASGAON_KO",
    "shoName": "TI/SHO FARASGAON KONDAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-iragaon",
    "districtId": "dist-kondagaon",
    "nameEn": "IRAGAON",
    "nameHi": "IRAGAON",
    "code": "KOND_IRAGAON",
    "shoName": "TI/SHO IRAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-keskal",
    "districtId": "dist-kondagaon",
    "nameEn": "KESKAL",
    "nameHi": "KESKAL",
    "code": "KOND_KESKAL",
    "shoName": "TI/SHO KESKAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-kondagaon",
    "districtId": "dist-kondagaon",
    "nameEn": "KONDAGAON",
    "nameHi": "KONDAGAON",
    "code": "KOND_KONDAGAON",
    "shoName": "TI/SHO KONDAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-makdi",
    "districtId": "dist-kondagaon",
    "nameEn": "MAKDI",
    "nameHi": "MAKDI",
    "code": "KOND_MAKDI",
    "shoName": "TI/SHO MAKDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-mardapal",
    "districtId": "dist-kondagaon",
    "nameEn": "MARDAPAL",
    "nameHi": "MARDAPAL",
    "code": "KOND_MARDAPAL",
    "shoName": "TI/SHO MARDAPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-pungarpal",
    "districtId": "dist-kondagaon",
    "nameEn": "PUNGARPAL",
    "nameHi": "PUNGARPAL",
    "code": "KOND_PUNGARPAL",
    "shoName": "TI/SHO PUNGARPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-urandabeda",
    "districtId": "dist-kondagaon",
    "nameEn": "URANDABEDA",
    "nameHi": "URANDABEDA",
    "code": "KOND_URANDABEDA",
    "shoName": "TI/SHO URANDABEDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-kondagaon-vishrampuri",
    "districtId": "dist-kondagaon",
    "nameEn": "VISHRAMPURI",
    "nameHi": "VISHRAMPURI",
    "code": "KOND_VISHRAMPURI",
    "shoName": "TI/SHO VISHRAMPURI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-ajk_korba",
    "districtId": "dist-korba",
    "nameEn": "AJK KORBA",
    "nameHi": "AJK KORBA",
    "code": "KORB_AJK_KORBA",
    "shoName": "TI/SHO AJK KORBA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-balko",
    "districtId": "dist-korba",
    "nameEn": "BALKO",
    "nameHi": "BALKO",
    "code": "KORB_BALKO",
    "shoName": "TI/SHO BALKO",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-bango",
    "districtId": "dist-korba",
    "nameEn": "BANGO",
    "nameHi": "BANGO",
    "code": "KORB_BANGO",
    "shoName": "TI/SHO BANGO",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-bankimongra",
    "districtId": "dist-korba",
    "nameEn": "BANKIMONGRA",
    "nameHi": "BANKIMONGRA",
    "code": "KORB_BANKIMONGRA",
    "shoName": "TI/SHO BANKIMONGRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-civil_line_korba",
    "districtId": "dist-korba",
    "nameEn": "CIVIL LINE KORBA",
    "nameHi": "CIVIL LINE KORBA",
    "code": "KORB_CIVIL_LINE_K",
    "shoName": "TI/SHO CIVIL LINE KORBA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-cyber_police_station",
    "districtId": "dist-korba",
    "nameEn": "CYBER POLICE STATION, KORBA",
    "nameHi": "CYBER POLICE STATION, KORBA",
    "code": "KORB_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, KORBA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-darri",
    "districtId": "dist-korba",
    "nameEn": "DARRI",
    "nameHi": "DARRI",
    "code": "KORB_DARRI",
    "shoName": "TI/SHO DARRI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-deepika",
    "districtId": "dist-korba",
    "nameEn": "DEEPIKA",
    "nameHi": "DEEPIKA",
    "code": "KORB_DEEPIKA",
    "shoName": "TI/SHO DEEPIKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-hardibazar",
    "districtId": "dist-korba",
    "nameEn": "HARDIBAZAR",
    "nameHi": "HARDIBAZAR",
    "code": "KORB_HARDIBAZAR",
    "shoName": "TI/SHO HARDIBAZAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-kartala",
    "districtId": "dist-korba",
    "nameEn": "KARTALA",
    "nameHi": "KARTALA",
    "code": "KORB_KARTALA",
    "shoName": "TI/SHO KARTALA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-katghora",
    "districtId": "dist-korba",
    "nameEn": "KATGHORA",
    "nameHi": "KATGHORA",
    "code": "KORB_KATGHORA",
    "shoName": "TI/SHO KATGHORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-kotwali",
    "districtId": "dist-korba",
    "nameEn": "KOTWALI",
    "nameHi": "KOTWALI",
    "code": "KORB_KOTWALI",
    "shoName": "TI/SHO KOTWALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-kusmanda",
    "districtId": "dist-korba",
    "nameEn": "KUSMANDA",
    "nameHi": "KUSMANDA",
    "code": "KORB_KUSMANDA",
    "shoName": "TI/SHO KUSMANDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-lemru",
    "districtId": "dist-korba",
    "nameEn": "LEMRU",
    "nameHi": "LEMRU",
    "code": "KORB_LEMRU",
    "shoName": "TI/SHO LEMRU",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-mahila_police_thana_",
    "districtId": "dist-korba",
    "nameEn": "Mahila Police Thana, KORBA",
    "nameHi": "Mahila Police Thana, KORBA",
    "code": "KORB_MAHILA_POLIC",
    "shoName": "TI/SHO Mahila Police Thana, KORBA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-pali",
    "districtId": "dist-korba",
    "nameEn": "PALI",
    "nameHi": "PALI",
    "code": "KORB_PALI",
    "shoName": "TI/SHO PALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-pasaan",
    "districtId": "dist-korba",
    "nameEn": "PASAAN",
    "nameHi": "PASAAN",
    "code": "KORB_PASAAN",
    "shoName": "TI/SHO PASAAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-syang",
    "districtId": "dist-korba",
    "nameEn": "SYANG",
    "nameHi": "SYANG",
    "code": "KORB_SYANG",
    "shoName": "TI/SHO SYANG",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-korba-urga",
    "districtId": "dist-korba",
    "nameEn": "URGA",
    "nameHi": "URGA",
    "code": "KORB_URGA",
    "shoName": "TI/SHO URGA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-koriya-ajk_koriya",
    "districtId": "dist-koriya",
    "nameEn": "AJK KORIYA",
    "nameHi": "AJK KORIYA",
    "code": "KORI_AJK_KORIYA",
    "shoName": "TI/SHO AJK KORIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-koriya-baikunthpur",
    "districtId": "dist-koriya",
    "nameEn": "BAIKUNTHPUR",
    "nameHi": "BAIKUNTHPUR",
    "code": "KORI_BAIKUNTHPUR",
    "shoName": "TI/SHO BAIKUNTHPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-koriya-charcha",
    "districtId": "dist-koriya",
    "nameEn": "CHARCHA",
    "nameHi": "CHARCHA",
    "code": "KORI_CHARCHA",
    "shoName": "TI/SHO CHARCHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-koriya-patna",
    "districtId": "dist-koriya",
    "nameEn": "PATNA",
    "nameHi": "PATNA",
    "code": "KORI_PATNA",
    "shoName": "TI/SHO PATNA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-koriya-sonhat",
    "districtId": "dist-koriya",
    "nameEn": "SONHAT",
    "nameHi": "SONHAT",
    "code": "KORI_SONHAT",
    "shoName": "TI/SHO SONHAT",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-ajk_mahasamund",
    "districtId": "dist-mahasamund",
    "nameEn": "AJK MAHASAMUND",
    "nameHi": "AJK MAHASAMUND",
    "code": "MAHA_AJK_MAHASAMU",
    "shoName": "TI/SHO AJK MAHASAMUND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-bagbahra",
    "districtId": "dist-mahasamund",
    "nameEn": "BAGBAHRA",
    "nameHi": "BAGBAHRA",
    "code": "MAHA_BAGBAHRA",
    "shoName": "TI/SHO BAGBAHRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-baloda",
    "districtId": "dist-mahasamund",
    "nameEn": "Baloda",
    "nameHi": "Baloda",
    "code": "MAHA_BALODA",
    "shoName": "TI/SHO Baloda",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-basna",
    "districtId": "dist-mahasamund",
    "nameEn": "BASNA",
    "nameHi": "BASNA",
    "code": "MAHA_BASNA",
    "shoName": "TI/SHO BASNA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-cyber_police_station",
    "districtId": "dist-mahasamund",
    "nameEn": "CYBER POLICE STATION, MAHASAMUND",
    "nameHi": "CYBER POLICE STATION, MAHASAMUND",
    "code": "MAHA_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, MAHASAMUND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-khallari",
    "districtId": "dist-mahasamund",
    "nameEn": "Khallari",
    "nameHi": "Khallari",
    "code": "MAHA_KHALLARI",
    "shoName": "TI/SHO Khallari",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-komakhan",
    "districtId": "dist-mahasamund",
    "nameEn": "KOMAKHAN",
    "nameHi": "KOMAKHAN",
    "code": "MAHA_KOMAKHAN",
    "shoName": "TI/SHO KOMAKHAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-mahasamund",
    "districtId": "dist-mahasamund",
    "nameEn": "MAHASAMUND",
    "nameHi": "MAHASAMUND",
    "code": "MAHA_MAHASAMUND",
    "shoName": "TI/SHO MAHASAMUND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-patewa",
    "districtId": "dist-mahasamund",
    "nameEn": "PATEWA",
    "nameHi": "PATEWA",
    "code": "MAHA_PATEWA",
    "shoName": "TI/SHO PATEWA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-pithora",
    "districtId": "dist-mahasamund",
    "nameEn": "PITHORA",
    "nameHi": "PITHORA",
    "code": "MAHA_PITHORA",
    "shoName": "TI/SHO PITHORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-sankara",
    "districtId": "dist-mahasamund",
    "nameEn": "SANKARA",
    "nameHi": "SANKARA",
    "code": "MAHA_SANKARA",
    "shoName": "TI/SHO SANKARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-saraipali",
    "districtId": "dist-mahasamund",
    "nameEn": "SARAIPALI",
    "nameHi": "SARAIPALI",
    "code": "MAHA_SARAIPALI",
    "shoName": "TI/SHO SARAIPALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-singhoda",
    "districtId": "dist-mahasamund",
    "nameEn": "SINGHODA",
    "nameHi": "SINGHODA",
    "code": "MAHA_SINGHODA",
    "shoName": "TI/SHO SINGHODA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-tendukona",
    "districtId": "dist-mahasamund",
    "nameEn": "TENDUKONA",
    "nameHi": "TENDUKONA",
    "code": "MAHA_TENDUKONA",
    "shoName": "TI/SHO TENDUKONA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mahasamund-tumgaon",
    "districtId": "dist-mahasamund",
    "nameEn": "TUMGAON",
    "nameHi": "TUMGAON",
    "code": "MAHA_TUMGAON",
    "shoName": "TI/SHO TUMGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-ajk_police_thana",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "AJK POLICE THANA",
    "nameHi": "AJK POLICE THANA",
    "code": "MANE_AJK_POLICE_T",
    "shoName": "TI/SHO AJK POLICE THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-chrimiri",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "CHRIMIRI",
    "nameHi": "CHRIMIRI",
    "code": "MANE_CHRIMIRI",
    "shoName": "TI/SHO CHRIMIRI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-janakpur",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "JANAKPUR",
    "nameHi": "JANAKPUR",
    "code": "MANE_JANAKPUR",
    "shoName": "TI/SHO JANAKPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-jharakhand",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "JHARAKHAND",
    "nameHi": "JHARAKHAND",
    "code": "MANE_JHARAKHAND",
    "shoName": "TI/SHO JHARAKHAND",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-kelhari",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "KELHARI",
    "nameHi": "KELHARI",
    "code": "MANE_KELHARI",
    "shoName": "TI/SHO KELHARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-khadgawan",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "KHADGAWAN",
    "nameHi": "KHADGAWAN",
    "code": "MANE_KHADGAWAN",
    "shoName": "TI/SHO KHADGAWAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-kotadol",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "KOTADOL",
    "nameHi": "KOTADOL",
    "code": "MANE_KOTADOL",
    "shoName": "TI/SHO KOTADOL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-manendragarh",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "MANENDRAGARH",
    "nameHi": "MANENDRAGARH",
    "code": "MANE_MANENDRAGARH",
    "shoName": "TI/SHO MANENDRAGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-manendragarh_chirmir-pondi",
    "districtId": "dist-manendragarh_chirmir",
    "nameEn": "PONDI",
    "nameHi": "PONDI",
    "code": "MANE_PONDI",
    "shoName": "TI/SHO PONDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-ajk_police_thana",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "AJK Police Thana",
    "nameHi": "AJK Police Thana",
    "code": "MOHL_AJK_POLICE_T",
    "shoName": "TI/SHO AJK Police Thana",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-ambagarh_chowki",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "AMBAGARH CHOWKI",
    "nameHi": "AMBAGARH CHOWKI",
    "code": "MOHL_AMBAGARH_CHO",
    "shoName": "TI/SHO AMBAGARH CHOWKI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-aoundhi",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "AOUNDHI",
    "nameHi": "AOUNDHI",
    "code": "MOHL_AOUNDHI",
    "shoName": "TI/SHO AOUNDHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-chilhati",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "CHILHATI",
    "nameHi": "CHILHATI",
    "code": "MOHL_CHILHATI",
    "shoName": "TI/SHO CHILHATI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-gotatola",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "GOTATOLA",
    "nameHi": "GOTATOLA",
    "code": "MOHL_GOTATOLA",
    "shoName": "TI/SHO GOTATOLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-khadgoan",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "KHADGOAN",
    "nameHi": "KHADGOAN",
    "code": "MOHL_KHADGOAN",
    "shoName": "TI/SHO KHADGOAN",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-kohka",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "KOHKA",
    "nameHi": "KOHKA",
    "code": "MOHL_KOHKA",
    "shoName": "TI/SHO KOHKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-mandawada",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "MANDAWADA",
    "nameHi": "MANDAWADA",
    "code": "MOHL_MANDAWADA",
    "shoName": "TI/SHO MANDAWADA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-manpur",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "MANPUR",
    "nameHi": "MANPUR",
    "code": "MOHL_MANPUR",
    "shoName": "TI/SHO MANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-mohla",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "MOHLA",
    "nameHi": "MOHLA",
    "code": "MOHL_MOHLA",
    "shoName": "TI/SHO MOHLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mohla_manpur_ambagar-sitagaon",
    "districtId": "dist-mohla_manpur_ambagar",
    "nameEn": "SITAGAON",
    "nameHi": "SITAGAON",
    "code": "MOHL_SITAGAON",
    "shoName": "TI/SHO SITAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-ajk_mungeli",
    "districtId": "dist-mungeli",
    "nameEn": "AJK MUNGELI",
    "nameHi": "AJK MUNGELI",
    "code": "MUNG_AJK_MUNGELI",
    "shoName": "TI/SHO AJK MUNGELI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-chilfi",
    "districtId": "dist-mungeli",
    "nameEn": "Chilfi",
    "nameHi": "Chilfi",
    "code": "MUNG_CHILFI",
    "shoName": "TI/SHO Chilfi",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-fastarpur",
    "districtId": "dist-mungeli",
    "nameEn": "FASTARPUR",
    "nameHi": "FASTARPUR",
    "code": "MUNG_FASTARPUR",
    "shoName": "TI/SHO FASTARPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-jarhagaon",
    "districtId": "dist-mungeli",
    "nameEn": "JARHAGAON",
    "nameHi": "JARHAGAON",
    "code": "MUNG_JARHAGAON",
    "shoName": "TI/SHO JARHAGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-lalpur",
    "districtId": "dist-mungeli",
    "nameEn": "LALPUR",
    "nameHi": "LALPUR",
    "code": "MUNG_LALPUR",
    "shoName": "TI/SHO LALPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-lormi",
    "districtId": "dist-mungeli",
    "nameEn": "LORMI",
    "nameHi": "LORMI",
    "code": "MUNG_LORMI",
    "shoName": "TI/SHO LORMI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-mungeli",
    "districtId": "dist-mungeli",
    "nameEn": "MUNGELI",
    "nameHi": "MUNGELI",
    "code": "MUNG_MUNGELI",
    "shoName": "TI/SHO MUNGELI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-patharia",
    "districtId": "dist-mungeli",
    "nameEn": "PATHARIA",
    "nameHi": "PATHARIA",
    "code": "MUNG_PATHARIA",
    "shoName": "TI/SHO PATHARIA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-mungeli-sargaon_mungeli",
    "districtId": "dist-mungeli",
    "nameEn": "SARGAON, MUNGELI",
    "nameHi": "SARGAON, MUNGELI",
    "code": "MUNG_SARGAON_MUNG",
    "shoName": "TI/SHO SARGAON, MUNGELI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-adka",
    "districtId": "dist-narayanpur",
    "nameEn": "ADKA",
    "nameHi": "ADKA",
    "code": "NARA_ADKA",
    "shoName": "TI/SHO ADKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-ajk_narayanpur",
    "districtId": "dist-narayanpur",
    "nameEn": "AJK NARAYANPUR",
    "nameHi": "AJK NARAYANPUR",
    "code": "NARA_AJK_NARAYANP",
    "shoName": "TI/SHO AJK NARAYANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-benur",
    "districtId": "dist-narayanpur",
    "nameEn": "BENUR",
    "nameHi": "BENUR",
    "code": "NARA_BENUR",
    "shoName": "TI/SHO BENUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-bharanda",
    "districtId": "dist-narayanpur",
    "nameEn": "BHARANDA",
    "nameHi": "BHARANDA",
    "code": "NARA_BHARANDA",
    "shoName": "TI/SHO BHARANDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-chhotedongar",
    "districtId": "dist-narayanpur",
    "nameEn": "CHHOTEDONGAR",
    "nameHi": "CHHOTEDONGAR",
    "code": "NARA_CHHOTEDONGAR",
    "shoName": "TI/SHO CHHOTEDONGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-dhanora",
    "districtId": "dist-narayanpur",
    "nameEn": "DHANORA",
    "nameHi": "DHANORA",
    "code": "NARA_DHANORA",
    "shoName": "TI/SHO DHANORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-dhodai",
    "districtId": "dist-narayanpur",
    "nameEn": "DHODAI",
    "nameHi": "DHODAI",
    "code": "NARA_DHODAI",
    "shoName": "TI/SHO DHODAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-farasgaon",
    "districtId": "dist-narayanpur",
    "nameEn": "FARASGAON",
    "nameHi": "FARASGAON",
    "code": "NARA_FARASGAON",
    "shoName": "TI/SHO FARASGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-jharaghati",
    "districtId": "dist-narayanpur",
    "nameEn": "JHARAGHATI",
    "nameHi": "JHARAGHATI",
    "code": "NARA_JHARAGHATI",
    "shoName": "TI/SHO JHARAGHATI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-kohkameta",
    "districtId": "dist-narayanpur",
    "nameEn": "KOHKAMETA",
    "nameHi": "KOHKAMETA",
    "code": "NARA_KOHKAMETA",
    "shoName": "TI/SHO KOHKAMETA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-kukdajhor",
    "districtId": "dist-narayanpur",
    "nameEn": "KUKDAJHOR",
    "nameHi": "KUKDAJHOR",
    "code": "NARA_KUKDAJHOR",
    "shoName": "TI/SHO KUKDAJHOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-kurushnaar",
    "districtId": "dist-narayanpur",
    "nameEn": "KURUSHNAAR",
    "nameHi": "KURUSHNAAR",
    "code": "NARA_KURUSHNAAR",
    "shoName": "TI/SHO KURUSHNAAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-narayanpur",
    "districtId": "dist-narayanpur",
    "nameEn": "NARAYANPUR",
    "nameHi": "NARAYANPUR",
    "code": "NARA_NARAYANPUR",
    "shoName": "TI/SHO NARAYANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-orcha",
    "districtId": "dist-narayanpur",
    "nameEn": "ORCHA",
    "nameHi": "ORCHA",
    "code": "NARA_ORCHA",
    "shoName": "TI/SHO ORCHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-narayanpur-sonpur",
    "districtId": "dist-narayanpur",
    "nameEn": "SONPUR",
    "nameHi": "SONPUR",
    "code": "NARA_SONPUR",
    "shoName": "TI/SHO SONPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-ajk_raigarh",
    "districtId": "dist-raigarh",
    "nameEn": "AJK RAIGARH",
    "nameHi": "AJK RAIGARH",
    "code": "RAIG_AJK_RAIGARH",
    "shoName": "TI/SHO AJK RAIGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-bhoopdeopur",
    "districtId": "dist-raigarh",
    "nameEn": "BHOOPDEOPUR",
    "nameHi": "BHOOPDEOPUR",
    "code": "RAIG_BHOOPDEOPUR",
    "shoName": "TI/SHO BHOOPDEOPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-chakradhar_nagar",
    "districtId": "dist-raigarh",
    "nameEn": "CHAKRADHAR NAGAR",
    "nameHi": "CHAKRADHAR NAGAR",
    "code": "RAIG_CHAKRADHAR_N",
    "shoName": "TI/SHO CHAKRADHAR NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-chhal",
    "districtId": "dist-raigarh",
    "nameEn": "CHHAL",
    "nameHi": "CHHAL",
    "code": "RAIG_CHHAL",
    "shoName": "TI/SHO CHHAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-cyber_police_station",
    "districtId": "dist-raigarh",
    "nameEn": "CYBER POLICE STATION, RAIGARH",
    "nameHi": "CYBER POLICE STATION, RAIGARH",
    "code": "RAIG_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, RAIGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-dharamjaigarh",
    "districtId": "dist-raigarh",
    "nameEn": "DHARAMJAIGARH",
    "nameHi": "DHARAMJAIGARH",
    "code": "RAIG_DHARAMJAIGAR",
    "shoName": "TI/SHO DHARAMJAIGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-ghargoda",
    "districtId": "dist-raigarh",
    "nameEn": "GHARGODA",
    "nameHi": "GHARGODA",
    "code": "RAIG_GHARGODA",
    "shoName": "TI/SHO GHARGODA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-jutemill",
    "districtId": "dist-raigarh",
    "nameEn": "Jutemill",
    "nameHi": "Jutemill",
    "code": "RAIG_JUTEMILL",
    "shoName": "TI/SHO Jutemill",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-kapu",
    "districtId": "dist-raigarh",
    "nameEn": "KAPU",
    "nameHi": "KAPU",
    "code": "RAIG_KAPU",
    "shoName": "TI/SHO KAPU",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-kharsiya",
    "districtId": "dist-raigarh",
    "nameEn": "KHARSIYA",
    "nameHi": "KHARSIYA",
    "code": "RAIG_KHARSIYA",
    "shoName": "TI/SHO KHARSIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-kotararoad",
    "districtId": "dist-raigarh",
    "nameEn": "KOTARAROAD",
    "nameHi": "KOTARAROAD",
    "code": "RAIG_KOTARAROAD",
    "shoName": "TI/SHO KOTARAROAD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-kotwali",
    "districtId": "dist-raigarh",
    "nameEn": "KOTWALI",
    "nameHi": "KOTWALI",
    "code": "RAIG_KOTWALI",
    "shoName": "TI/SHO KOTWALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-lailunga",
    "districtId": "dist-raigarh",
    "nameEn": "LAILUNGA",
    "nameHi": "LAILUNGA",
    "code": "RAIG_LAILUNGA",
    "shoName": "TI/SHO LAILUNGA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-mahila_thana",
    "districtId": "dist-raigarh",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "RAIG_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-punjipatra",
    "districtId": "dist-raigarh",
    "nameEn": "PUNJIPATRA",
    "nameHi": "PUNJIPATRA",
    "code": "RAIG_PUNJIPATRA",
    "shoName": "TI/SHO PUNJIPATRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-pusaur",
    "districtId": "dist-raigarh",
    "nameEn": "PUSAUR",
    "nameHi": "PUSAUR",
    "code": "RAIG_PUSAUR",
    "shoName": "TI/SHO PUSAUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raigarh-tamnar",
    "districtId": "dist-raigarh",
    "nameEn": "TAMNAR",
    "nameHi": "TAMNAR",
    "code": "RAIG_TAMNAR",
    "shoName": "TI/SHO TAMNAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-ajk_raipur",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "AJK, RAIPUR",
    "nameHi": "AJK, RAIPUR",
    "code": "RAIP_AJK_RAIPUR",
    "shoName": "TI/SHO AJK, RAIPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-amanaka",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "AMANAKA",
    "nameHi": "AMANAKA",
    "code": "RAIP_AMANAKA",
    "shoName": "TI/SHO AMANAKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-azad_chowk",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "AZAD CHOWK",
    "nameHi": "AZAD CHOWK",
    "code": "RAIP_AZAD_CHOWK",
    "shoName": "TI/SHO AZAD CHOWK",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-civil_lines",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "CIVIL LINES",
    "nameHi": "CIVIL LINES",
    "code": "RAIP_CIVIL_LINES",
    "shoName": "TI/SHO CIVIL LINES",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-cyber_police_thana_r",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "Cyber Police Thana, Range Raipur",
    "nameHi": "Cyber Police Thana, Range Raipur",
    "code": "RAIP_CYBER_POLICE",
    "shoName": "TI/SHO Cyber Police Thana, Range Raipur",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-deen_dayal_nagar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "DEEN DAYAL NAGAR",
    "nameHi": "DEEN DAYAL NAGAR",
    "code": "RAIP_DEEN_DAYAL_N",
    "shoName": "TI/SHO DEEN DAYAL NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-devendra_nagar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "DEVENDRA NAGAR",
    "nameHi": "DEVENDRA NAGAR",
    "code": "RAIP_DEVENDRA_NAG",
    "shoName": "TI/SHO DEVENDRA NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-ganj",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "GANJ",
    "nameHi": "GANJ",
    "code": "RAIP_GANJ",
    "shoName": "TI/SHO GANJ",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-gol_bazar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "GOL BAZAR",
    "nameHi": "GOL BAZAR",
    "code": "RAIP_GOL_BAZAR",
    "shoName": "TI/SHO GOL BAZAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-gudhiyari",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "GUDHIYARI",
    "nameHi": "GUDHIYARI",
    "code": "RAIP_GUDHIYARI",
    "shoName": "TI/SHO GUDHIYARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-kabir_nagar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "KABIR NAGAR",
    "nameHi": "KABIR NAGAR",
    "code": "RAIP_KABIR_NAGAR",
    "shoName": "TI/SHO KABIR NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-khamhardih",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "KHAMHARDIH",
    "nameHi": "KHAMHARDIH",
    "code": "RAIP_KHAMHARDIH",
    "shoName": "TI/SHO KHAMHARDIH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-khamtarai",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "KHAMTARAI",
    "nameHi": "KHAMTARAI",
    "code": "RAIP_KHAMTARAI",
    "shoName": "TI/SHO KHAMTARAI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-kotwali",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "KOTWALI",
    "nameHi": "KOTWALI",
    "code": "RAIP_KOTWALI",
    "shoName": "TI/SHO KOTWALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-mahila_thana",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "RAIP_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-maudhapara",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "MAUDHAPARA",
    "nameHi": "MAUDHAPARA",
    "code": "RAIP_MAUDHAPARA",
    "shoName": "TI/SHO MAUDHAPARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-pandari",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "PANDARI",
    "nameHi": "PANDARI",
    "code": "RAIP_PANDARI",
    "shoName": "TI/SHO PANDARI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-purani_basti",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "PURANI BASTI",
    "nameHi": "PURANI BASTI",
    "code": "RAIP_PURANI_BASTI",
    "shoName": "TI/SHO PURANI BASTI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-rajendra_nagar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "RAJENDRA NAGAR",
    "nameHi": "RAJENDRA NAGAR",
    "code": "RAIP_RAJENDRA_NAG",
    "shoName": "TI/SHO RAJENDRA NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-saraswati_nagar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "SARASWATI NAGAR",
    "nameHi": "SARASWATI NAGAR",
    "code": "RAIP_SARASWATI_NA",
    "shoName": "TI/SHO SARASWATI NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-sejbahar",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "SEJBAHAR",
    "nameHi": "SEJBAHAR",
    "code": "RAIP_SEJBAHAR",
    "shoName": "TI/SHO SEJBAHAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-telibandha",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "TELIBANDHA",
    "nameHi": "TELIBANDHA",
    "code": "RAIP_TELIBANDHA",
    "shoName": "TI/SHO TELIBANDHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_commissionera-tikarapara",
    "districtId": "dist-raipur_commissionera",
    "nameEn": "TIKARAPARA",
    "nameHi": "TIKARAPARA",
    "code": "RAIP_TIKARAPARA",
    "shoName": "TI/SHO TIKARAPARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-abhanpur",
    "districtId": "dist-raipur_rural",
    "nameEn": "ABHANPUR",
    "nameHi": "ABHANPUR",
    "code": "RAIP_ABHANPUR",
    "shoName": "TI/SHO ABHANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-arang",
    "districtId": "dist-raipur_rural",
    "nameEn": "ARANG",
    "nameHi": "ARANG",
    "code": "RAIP_ARANG",
    "shoName": "TI/SHO ARANG",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-dharsiwa",
    "districtId": "dist-raipur_rural",
    "nameEn": "DHARSIWA",
    "nameHi": "DHARSIWA",
    "code": "RAIP_DHARSIWA",
    "shoName": "TI/SHO DHARSIWA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-gobra_nawapara",
    "districtId": "dist-raipur_rural",
    "nameEn": "GOBRA NAWAPARA",
    "nameHi": "GOBRA NAWAPARA",
    "code": "RAIP_GOBRA_NAWAPA",
    "shoName": "TI/SHO GOBRA NAWAPARA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-kharora",
    "districtId": "dist-raipur_rural",
    "nameEn": "KHARORA",
    "nameHi": "KHARORA",
    "code": "RAIP_KHARORA",
    "shoName": "TI/SHO KHARORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-mana_camp",
    "districtId": "dist-raipur_rural",
    "nameEn": "MANA CAMP",
    "nameHi": "MANA CAMP",
    "code": "RAIP_MANA_CAMP",
    "shoName": "TI/SHO MANA CAMP",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-mandir_hasaud",
    "districtId": "dist-raipur_rural",
    "nameEn": "MANDIR HASAUD",
    "nameHi": "MANDIR HASAUD",
    "code": "RAIP_MANDIR_HASAU",
    "shoName": "TI/SHO MANDIR HASAUD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-naya_raipur",
    "districtId": "dist-raipur_rural",
    "nameEn": "Naya Raipur",
    "nameHi": "Naya Raipur",
    "code": "RAIP_NAYA_RAIPUR",
    "shoName": "TI/SHO Naya Raipur",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-rakhi",
    "districtId": "dist-raipur_rural",
    "nameEn": "RAKHI",
    "nameHi": "RAKHI",
    "code": "RAIP_RAKHI",
    "shoName": "TI/SHO RAKHI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-thana_siltara",
    "districtId": "dist-raipur_rural",
    "nameEn": "Thana Siltara",
    "nameHi": "Thana Siltara",
    "code": "RAIP_THANA_SILTAR",
    "shoName": "TI/SHO Thana Siltara",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-tilda_neora",
    "districtId": "dist-raipur_rural",
    "nameEn": "TILDA NEORA",
    "nameHi": "TILDA NEORA",
    "code": "RAIP_TILDA_NEORA",
    "shoName": "TI/SHO TILDA NEORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-raipur_rural-vidhan_sabha",
    "districtId": "dist-raipur_rural",
    "nameEn": "VIDHAN SABHA",
    "nameHi": "VIDHAN SABHA",
    "code": "RAIP_VIDHAN_SABHA",
    "shoName": "TI/SHO VIDHAN SABHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-ajk_rajnandgaon",
    "districtId": "dist-rajnandgaon",
    "nameEn": "AJK RAJNANDGAON",
    "nameHi": "AJK RAJNANDGAON",
    "code": "RAJN_AJK_RAJNANDG",
    "shoName": "TI/SHO AJK RAJNANDGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-baghnadi",
    "districtId": "dist-rajnandgaon",
    "nameEn": "BAGHNADI",
    "nameHi": "BAGHNADI",
    "code": "RAJN_BAGHNADI",
    "shoName": "TI/SHO BAGHNADI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-basantpur",
    "districtId": "dist-rajnandgaon",
    "nameEn": "BASANTPUR",
    "nameHi": "BASANTPUR",
    "code": "RAJN_BASANTPUR",
    "shoName": "TI/SHO BASANTPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-bortalab",
    "districtId": "dist-rajnandgaon",
    "nameEn": "BORTALAB",
    "nameHi": "BORTALAB",
    "code": "RAJN_BORTALAB",
    "shoName": "TI/SHO BORTALAB",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-chhuriya",
    "districtId": "dist-rajnandgaon",
    "nameEn": "CHHURIYA",
    "nameHi": "CHHURIYA",
    "code": "RAJN_CHHURIYA",
    "shoName": "TI/SHO CHHURIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-cyber_police_station",
    "districtId": "dist-rajnandgaon",
    "nameEn": "CYBER POLICE STATION, RAJNANDGAON",
    "nameHi": "CYBER POLICE STATION, RAJNANDGAON",
    "code": "RAJN_CYBER_POLICE",
    "shoName": "TI/SHO CYBER POLICE STATION, RAJNANDGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-dongargaon",
    "districtId": "dist-rajnandgaon",
    "nameEn": "DONGARGAON",
    "nameHi": "DONGARGAON",
    "code": "RAJN_DONGARGAON",
    "shoName": "TI/SHO DONGARGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-dongargarh",
    "districtId": "dist-rajnandgaon",
    "nameEn": "DONGARGARH",
    "nameHi": "DONGARGARH",
    "code": "RAJN_DONGARGARH",
    "shoName": "TI/SHO DONGARGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-gaindatola",
    "districtId": "dist-rajnandgaon",
    "nameEn": "GAINDATOLA",
    "nameHi": "GAINDATOLA",
    "code": "RAJN_GAINDATOLA",
    "shoName": "TI/SHO GAINDATOLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-ghumka",
    "districtId": "dist-rajnandgaon",
    "nameEn": "GHUMKA",
    "nameHi": "GHUMKA",
    "code": "RAJN_GHUMKA",
    "shoName": "TI/SHO GHUMKA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-kotwali_ranjandgaon",
    "districtId": "dist-rajnandgaon",
    "nameEn": "KOTWALI, RANJANDGAON",
    "nameHi": "KOTWALI, RANJANDGAON",
    "code": "RAJN_KOTWALI_RANJ",
    "shoName": "TI/SHO KOTWALI, RANJANDGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-lalbagh",
    "districtId": "dist-rajnandgaon",
    "nameEn": "LALBAGH",
    "nameHi": "LALBAGH",
    "code": "RAJN_LALBAGH",
    "shoName": "TI/SHO LALBAGH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-mahila_thana",
    "districtId": "dist-rajnandgaon",
    "nameEn": "MAHILA THANA",
    "nameHi": "MAHILA THANA",
    "code": "RAJN_MAHILA_THANA",
    "shoName": "TI/SHO MAHILA THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-rajnandgaon-somani",
    "districtId": "dist-rajnandgaon",
    "nameEn": "SOMANI",
    "nameHi": "SOMANI",
    "code": "RAJN_SOMANI",
    "shoName": "TI/SHO SOMANI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-ajk_police_thana",
    "districtId": "dist-sakti",
    "nameEn": "AJK POLICE THANA",
    "nameHi": "AJK POLICE THANA",
    "code": "SAKT_AJK_POLICE_T",
    "shoName": "TI/SHO AJK POLICE THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-baradwar",
    "districtId": "dist-sakti",
    "nameEn": "BARADWAR",
    "nameHi": "BARADWAR",
    "code": "SAKT_BARADWAR",
    "shoName": "TI/SHO BARADWAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-chandrapur",
    "districtId": "dist-sakti",
    "nameEn": "CHANDRAPUR",
    "nameHi": "CHANDRAPUR",
    "code": "SAKT_CHANDRAPUR",
    "shoName": "TI/SHO CHANDRAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-dabhra",
    "districtId": "dist-sakti",
    "nameEn": "DABHRA",
    "nameHi": "DABHRA",
    "code": "SAKT_DABHRA",
    "shoName": "TI/SHO DABHRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-hasod",
    "districtId": "dist-sakti",
    "nameEn": "HASOD",
    "nameHi": "HASOD",
    "code": "SAKT_HASOD",
    "shoName": "TI/SHO HASOD",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-jaijaipur",
    "districtId": "dist-sakti",
    "nameEn": "JAIJAIPUR",
    "nameHi": "JAIJAIPUR",
    "code": "SAKT_JAIJAIPUR",
    "shoName": "TI/SHO JAIJAIPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-malkharoda",
    "districtId": "dist-sakti",
    "nameEn": "MALKHARODA",
    "nameHi": "MALKHARODA",
    "code": "SAKT_MALKHARODA",
    "shoName": "TI/SHO MALKHARODA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-nagarda",
    "districtId": "dist-sakti",
    "nameEn": "NAGARDA",
    "nameHi": "NAGARDA",
    "code": "SAKT_NAGARDA",
    "shoName": "TI/SHO NAGARDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sakti-sakti",
    "districtId": "dist-sakti",
    "nameEn": "SAKTI",
    "nameHi": "SAKTI",
    "code": "SAKT_SAKTI",
    "shoName": "TI/SHO SAKTI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-baramkela",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "BARAMKELA",
    "nameHi": "BARAMKELA",
    "code": "SARA_BARAMKELA",
    "shoName": "TI/SHO BARAMKELA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-bhatgaon",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "BHATGAON",
    "nameHi": "BHATGAON",
    "code": "SARA_BHATGAON",
    "shoName": "TI/SHO BHATGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-bilaigarh",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "BILAIGARH",
    "nameHi": "BILAIGARH",
    "code": "SARA_BILAIGARH",
    "shoName": "TI/SHO BILAIGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-dongripali",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "DONGRIPALI",
    "nameHi": "DONGRIPALI",
    "code": "SARA_DONGRIPALI",
    "shoName": "TI/SHO DONGRIPALI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-kedar",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "KEDAR",
    "nameHi": "KEDAR",
    "code": "SARA_KEDAR",
    "shoName": "TI/SHO KEDAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-kosir",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "KOSIR",
    "nameHi": "KOSIR",
    "code": "SARA_KOSIR",
    "shoName": "TI/SHO KOSIR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-saliha",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "SALIHA",
    "nameHi": "SALIHA",
    "code": "SARA_SALIHA",
    "shoName": "TI/SHO SALIHA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-sarangarh",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "SARANGARH",
    "nameHi": "SARANGARH",
    "code": "SARA_SARANGARH",
    "shoName": "TI/SHO SARANGARH",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-sariya",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "SARIYA",
    "nameHi": "SARIYA",
    "code": "SARA_SARIYA",
    "shoName": "TI/SHO SARIYA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarangarh_bilaigarh-sarsiwa",
    "districtId": "dist-sarangarh_bilaigarh",
    "nameEn": "SARSIWA",
    "nameHi": "SARSIWA",
    "code": "SARA_SARSIWA",
    "shoName": "TI/SHO SARSIWA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-ajk_ambikapur_sarguj",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "AJK AMBIKAPUR (SARGUJA)",
    "nameHi": "AJK AMBIKAPUR (SARGUJA)",
    "code": "SARG_AJK_AMBIKAPU",
    "shoName": "TI/SHO AJK AMBIKAPUR (SARGUJA)",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-ambikapur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "AMBIKAPUR",
    "nameHi": "AMBIKAPUR",
    "code": "SARG_AMBIKAPUR",
    "shoName": "TI/SHO AMBIKAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-ambikapur_rural",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "AMBIKAPUR (RURAL)",
    "nameHi": "AMBIKAPUR (RURAL)",
    "code": "SARG_AMBIKAPUR_RU",
    "shoName": "TI/SHO AMBIKAPUR (RURAL)",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-batouli",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "BATOULI",
    "nameHi": "BATOULI",
    "code": "SARG_BATOULI",
    "shoName": "TI/SHO BATOULI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-cyber_police_thana_r",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "Cyber Police Thana, Range Sarguja",
    "nameHi": "Cyber Police Thana, Range Sarguja",
    "code": "SARG_CYBER_POLICE",
    "shoName": "TI/SHO Cyber Police Thana, Range Sarguja",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-darima",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "DARIMA",
    "nameHi": "DARIMA",
    "code": "SARG_DARIMA",
    "shoName": "TI/SHO DARIMA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-dhaurpur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "DHAURPUR",
    "nameHi": "DHAURPUR",
    "code": "SARG_DHAURPUR",
    "shoName": "TI/SHO DHAURPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-kamleshwarpur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "KAMLESHWARPUR",
    "nameHi": "KAMLESHWARPUR",
    "code": "SARG_KAMLESHWARPU",
    "shoName": "TI/SHO KAMLESHWARPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-lakhanpur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "LAKHANPUR",
    "nameHi": "LAKHANPUR",
    "code": "SARG_LAKHANPUR",
    "shoName": "TI/SHO LAKHANPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-lundra",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "LUNDRA",
    "nameHi": "LUNDRA",
    "code": "SARG_LUNDRA",
    "shoName": "TI/SHO LUNDRA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-mahila_ps",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "MAHILA PS",
    "nameHi": "MAHILA PS",
    "code": "SARG_MAHILA_PS",
    "shoName": "TI/SHO MAHILA PS",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-manipur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "Manipur",
    "nameHi": "Manipur",
    "code": "SARG_MANIPUR",
    "shoName": "TI/SHO Manipur",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-sitapur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "SITAPUR",
    "nameHi": "SITAPUR",
    "code": "SARG_SITAPUR",
    "shoName": "TI/SHO SITAPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sarguja_ambikapur-udaipur",
    "districtId": "dist-sarguja_ambikapur",
    "nameEn": "UDAIPUR",
    "nameHi": "UDAIPUR",
    "code": "SARG_UDAIPUR",
    "shoName": "TI/SHO UDAIPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-ajk_sukma",
    "districtId": "dist-sukma",
    "nameEn": "AJK SUKMA",
    "nameHi": "AJK SUKMA",
    "code": "SUKM_AJK_SUKMA",
    "shoName": "TI/SHO AJK SUKMA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-bheji",
    "districtId": "dist-sukma",
    "nameEn": "BHEJI",
    "nameHi": "BHEJI",
    "code": "SUKM_BHEJI",
    "shoName": "TI/SHO BHEJI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-chhindgarh",
    "districtId": "dist-sukma",
    "nameEn": "Chhindgarh",
    "nameHi": "Chhindgarh",
    "code": "SUKM_CHHINDGARH",
    "shoName": "TI/SHO Chhindgarh",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-chintagufa",
    "districtId": "dist-sukma",
    "nameEn": "CHINTAGUFA",
    "nameHi": "CHINTAGUFA",
    "code": "SUKM_CHINTAGUFA",
    "shoName": "TI/SHO CHINTAGUFA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-chintalnar",
    "districtId": "dist-sukma",
    "nameEn": "Chintalnar",
    "nameHi": "Chintalnar",
    "code": "SUKM_CHINTALNAR",
    "shoName": "TI/SHO Chintalnar",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-dornapal",
    "districtId": "dist-sukma",
    "nameEn": "DORNAPAL",
    "nameHi": "DORNAPAL",
    "code": "SUKM_DORNAPAL",
    "shoName": "TI/SHO DORNAPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-errabor",
    "districtId": "dist-sukma",
    "nameEn": "ERRABOR",
    "nameHi": "ERRABOR",
    "code": "SUKM_ERRABOR",
    "shoName": "TI/SHO ERRABOR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-fulbagdi",
    "districtId": "dist-sukma",
    "nameEn": "FULBAGDI",
    "nameHi": "FULBAGDI",
    "code": "SUKM_FULBAGDI",
    "shoName": "TI/SHO FULBAGDI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-gadiras",
    "districtId": "dist-sukma",
    "nameEn": "GADIRAS",
    "nameHi": "GADIRAS",
    "code": "SUKM_GADIRAS",
    "shoName": "TI/SHO GADIRAS",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-golapalli",
    "districtId": "dist-sukma",
    "nameEn": "GOLAPALLI",
    "nameHi": "GOLAPALLI",
    "code": "SUKM_GOLAPALLI",
    "shoName": "TI/SHO GOLAPALLI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-jagargunda",
    "districtId": "dist-sukma",
    "nameEn": "JAGARGUNDA",
    "nameHi": "JAGARGUNDA",
    "code": "SUKM_JAGARGUNDA",
    "shoName": "TI/SHO JAGARGUNDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-kerlapal",
    "districtId": "dist-sukma",
    "nameEn": "KERLAPAL",
    "nameHi": "KERLAPAL",
    "code": "SUKM_KERLAPAL",
    "shoName": "TI/SHO KERLAPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-kistaram",
    "districtId": "dist-sukma",
    "nameEn": "KISTARAM",
    "nameHi": "KISTARAM",
    "code": "SUKM_KISTARAM",
    "shoName": "TI/SHO KISTARAM",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-konta",
    "districtId": "dist-sukma",
    "nameEn": "KONTA",
    "nameHi": "KONTA",
    "code": "SUKM_KONTA",
    "shoName": "TI/SHO KONTA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-kukanaar",
    "districtId": "dist-sukma",
    "nameEn": "KUKANAAR",
    "nameHi": "KUKANAAR",
    "code": "SUKM_KUKANAAR",
    "shoName": "TI/SHO KUKANAAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-maraiguda",
    "districtId": "dist-sukma",
    "nameEn": "MARAIGUDA",
    "nameHi": "MARAIGUDA",
    "code": "SUKM_MARAIGUDA",
    "shoName": "TI/SHO MARAIGUDA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-polampalli",
    "districtId": "dist-sukma",
    "nameEn": "POLAMPALLI",
    "nameHi": "POLAMPALLI",
    "code": "SUKM_POLAMPALLI",
    "shoName": "TI/SHO POLAMPALLI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-pushpal",
    "districtId": "dist-sukma",
    "nameEn": "PUSHPAL",
    "nameHi": "PUSHPAL",
    "code": "SUKM_PUSHPAL",
    "shoName": "TI/SHO PUSHPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-sukma",
    "districtId": "dist-sukma",
    "nameEn": "SUKMA",
    "nameHi": "SUKMA",
    "code": "SUKM_SUKMA",
    "shoName": "TI/SHO SUKMA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-sukma-tongpal",
    "districtId": "dist-sukma",
    "nameEn": "TONGPAL",
    "nameHi": "TONGPAL",
    "code": "SUKM_TONGPAL",
    "shoName": "TI/SHO TONGPAL",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-ajk_surajpur",
    "districtId": "dist-surajpur",
    "nameEn": "AJK SURAJPUR",
    "nameHi": "AJK SURAJPUR",
    "code": "SURA_AJK_SURAJPUR",
    "shoName": "TI/SHO AJK SURAJPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-bhatgaon",
    "districtId": "dist-surajpur",
    "nameEn": "BHATGAON",
    "nameHi": "BHATGAON",
    "code": "SURA_BHATGAON",
    "shoName": "TI/SHO BHATGAON",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-chandani",
    "districtId": "dist-surajpur",
    "nameEn": "CHANDANI",
    "nameHi": "CHANDANI",
    "code": "SURA_CHANDANI",
    "shoName": "TI/SHO CHANDANI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-chandora",
    "districtId": "dist-surajpur",
    "nameEn": "CHANDORA",
    "nameHi": "CHANDORA",
    "code": "SURA_CHANDORA",
    "shoName": "TI/SHO CHANDORA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-jainagar",
    "districtId": "dist-surajpur",
    "nameEn": "JAINAGAR",
    "nameHi": "JAINAGAR",
    "code": "SURA_JAINAGAR",
    "shoName": "TI/SHO JAINAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-jhilmili_bhaiya_than",
    "districtId": "dist-surajpur",
    "nameEn": "JHILMILI (BHAIYA THANA)",
    "nameHi": "JHILMILI (BHAIYA THANA)",
    "code": "SURA_JHILMILI_BHA",
    "shoName": "TI/SHO JHILMILI (BHAIYA THANA)",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-mahila_police_thana",
    "districtId": "dist-surajpur",
    "nameEn": "MAHILA POLICE THANA",
    "nameHi": "MAHILA POLICE THANA",
    "code": "SURA_MAHILA_POLIC",
    "shoName": "TI/SHO MAHILA POLICE THANA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-odagi",
    "districtId": "dist-surajpur",
    "nameEn": "ODAGI",
    "nameHi": "ODAGI",
    "code": "SURA_ODAGI",
    "shoName": "TI/SHO ODAGI",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-pratap_pur",
    "districtId": "dist-surajpur",
    "nameEn": "PRATAP PUR",
    "nameHi": "PRATAP PUR",
    "code": "SURA_PRATAP_PUR",
    "shoName": "TI/SHO PRATAP PUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-prem_nagar",
    "districtId": "dist-surajpur",
    "nameEn": "PREM NAGAR",
    "nameHi": "PREM NAGAR",
    "code": "SURA_PREM_NAGAR",
    "shoName": "TI/SHO PREM NAGAR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-ramanuj_nagar_srinag",
    "districtId": "dist-surajpur",
    "nameEn": "RAMANUJ NAGAR (SRINAGAR)",
    "nameHi": "RAMANUJ NAGAR (SRINAGAR)",
    "code": "SURA_RAMANUJ_NAGA",
    "shoName": "TI/SHO RAMANUJ NAGAR (SRINAGAR)",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-ramkola",
    "districtId": "dist-surajpur",
    "nameEn": "RAMKOLA",
    "nameHi": "RAMKOLA",
    "code": "SURA_RAMKOLA",
    "shoName": "TI/SHO RAMKOLA",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-surajpur",
    "districtId": "dist-surajpur",
    "nameEn": "SURAJPUR",
    "nameHi": "SURAJPUR",
    "code": "SURA_SURAJPUR",
    "shoName": "TI/SHO SURAJPUR",
    "shoMobile": "94252XXXXX"
  },
  {
    "id": "ps-surajpur-vishrampur",
    "districtId": "dist-surajpur",
    "nameEn": "VISHRAMPUR",
    "nameHi": "VISHRAMPUR",
    "code": "SURA_VISHRAMPUR",
    "shoName": "TI/SHO VISHRAMPUR",
    "shoMobile": "94252XXXXX"
  }
];

export const mockOfficers: Officer[] = [
  { id: 'off-1', policeStationId: 'ps-durg-kotwali_durg', pno: 'CG-980412', nameEn: 'SI Rajesh Sharma', nameHi: 'उ.नि. राजेश शर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX1', isActiveIO: true },
  { id: 'off-2', policeStationId: 'ps-durg-kotwali_durg', pno: 'CG-020519', nameEn: 'ASI Vinod Kumar Sahu', nameHi: 'स.उ.नि. विनोद कुमार साहू', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX2', isActiveIO: true },
  { id: 'off-3', policeStationId: 'ps-durg-supela', pno: 'CG-110293', nameEn: 'SI Anita Verma', nameHi: 'उ.नि. अनिता वर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX4', isActiveIO: true },
  { id: 'off-4', policeStationId: 'ps-durg-supela', pno: 'CG-140882', nameEn: 'ASI Ramesh Dewangan', nameHi: 'स.उ.नि. रमेश देवांगन', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX5', isActiveIO: true },
  { id: 'off-5', policeStationId: 'ps-raipur_commissionerate-kotwali', pno: 'CG-160399', nameEn: 'SI Jagdish Prasad', nameHi: 'उ.नि. जगदीश प्रसाद', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX6', isActiveIO: true }
];

export const mockDailySubmissions: DailySubmissionRecord[] = [
  {
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
    sectionA: {
      status: 'Completed',
      totalFirsToday: 4,
      sidCreatedCount: 3,
      finalLinkCompletedCount: 2,
      pendingSidCount: 1,
      pendingFinalLinkCount: 1,
      firRecords: [
        { id: 'fir-sid-1', firNumber: '142/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-01', finalLinkCompleted: true, remarks: 'Murder case Scene of Crime video linked' },
        { id: 'fir-sid-2', firNumber: '143/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-02', finalLinkCompleted: true, remarks: 'Photos uploaded & linked' },
        { id: 'fir-sid-3', firNumber: '144/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: true, sidNumber: 'SID-2026-DURG-0912-03', finalLinkCompleted: false, pendingReason: 'Pending for TI review', remarks: 'SID generated, final link tomorrow' },
        { id: 'fir-sid-4', firNumber: '145/2026', firYear: 2026, firRegistrationDate: '2026-11-06', sidCreated: false, finalLinkCompleted: false, pendingReason: 'Night FIR, SOC inspection tomorrow', remarks: 'Late night registration' }
      ],
      generalRemarks: 'All daytime FIRs processed for e-Sakshya SID creation.',
      savedAt: '06:15 PM'
    },
    sectionB: {
      status: 'Completed',
      totalIosPosted: 5,
      iosLoggedInToday: 4,
      iosNotLoggedInToday: 1,
      craLoginPercentage: 80,
      ioRecords: [
        { id: 'cra-io-1', ioName: 'SI Rajesh Sharma', ioCodePno: 'CG-980412', rank: 'SI', hasLoggedIn: true, loginTime: '09:42 AM', remarks: 'Case diary updated' },
        { id: 'cra-io-2', ioName: 'ASI Vinod Kumar Sahu', ioCodePno: 'CG-020519', rank: 'ASI', hasLoggedIn: true, loginTime: '11:15 AM', remarks: 'FIR 168 entries' },
        { id: 'cra-io-3', ioName: 'SI Anita Verma', ioCodePno: 'CG-110293', rank: 'SI', hasLoggedIn: true, loginTime: '10:05 AM', remarks: 'Witness statements' },
        { id: 'cra-io-4', ioName: 'ASI Ramesh Dewangan', ioCodePno: 'CG-140882', rank: 'ASI', hasLoggedIn: false, remarks: 'On VIP duty escort' }
      ],
      generalRemarks: 'ASI Ramesh Dewangan was on VIP duty, rest all logged in.',
      savedAt: '06:22 PM'
    },
    sectionC: {
      status: 'Completed',
      chargesheetsPreparedToday: 2,
      presentedInCourtToday: 1,
      enteredInCctnsToday: 1,
      pendingCctnsEntriesCumulative: 2,
      awaitingCourtPresentationCumulative: 1,
      firRecords: [
        { id: 'cs-1', firNumber: '89/2026', firYear: 2026, chargesheetPrepared: true, preparationDate: '2026-11-06', courtSubmissionStatus: 'Presented', courtSubmissionDate: '2026-11-06', courtEstablishmentName: 'CJM Court Durg', cctnsEntryStatus: 'Completed', cctnsEntryDate: '2026-11-06', cctnsDispatchNo: 'DISP-DURG-2026-8901', cisCaseNo: 'CIS-CR-2026-9041', remarks: 'Chargesheet submitted and entered in CCTNS' }
      ],
      generalRemarks: '1 Challan successfully presented and entered in CCTNS.',
      savedAt: '06:30 PM'
    },
    sectionD: {
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
        { id: 'bns-c-1', firNumber: '142/2026', firYear: 2026, registrationDate: '2026-08-10', arrestDate: '2026-08-10', bnsSections: 'BNS 103(1)', ioName: 'SI Rajesh Sharma', accusedName: 'Suraj @ Golu', statutoryDays: 90, deadlineDate: '2026-11-08', daysElapsed: 88, daysRemaining: 2, isDueToday: true, isOverdue: false, chargesheetPrepared: true, courtPresented: true, cctnsEntry: true, remarks: 'Submitted to avoid default bail' }
      ],
      generalRemarks: 'BNS 90-day critical case presented to avoid default bail under Sec 187 BNSS.',
      savedAt: '06:38 PM'
    }
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
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
  },
  {
    id: 'audit-2',
    timestamp: '2026-11-06 14:02:44',
    userId: 'usr-phq-1',
    userName: 'PHQ Super Admin',
    userRole: 'SUPER_ADMIN',
    action: 'MASTER_CATALOG_SYNC',
    entityType: 'MASTER_IMPORT',
    details: 'Synchronized official roster: 35 Districts and 506 Police Stations',
    ipAddress: '10.150.0.1'
  }
];
