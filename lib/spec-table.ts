// 규격 조견표 데이터. 원본: _협업/assets/batterycall-vehicles/spec-table.json (현장 기준, 로케트 GB 코드)
// hold_not_published 항목은 이 파일에 넣지 않는다.
export type SpecRow = { label: string; battery: string };
export type SpecModel = { slug: string; name: string; brand: string; vehicleClass: string; rows: SpecRow[] };
export const specModels: SpecModel[] = [
  {
    "slug": "grandeur",
    "name": "그랜저",
    "brand": "현대",
    "vehicleClass": "준대형",
    "rows": [
      {
        "label": "HG 가솔린·LPG (2011~2016, 2.4 2015~16년식 제외)",
        "battery": "GB80L"
      },
      {
        "label": "HG 2.2 디젤 (2011~2016)",
        "battery": "GB90L"
      },
      {
        "label": "HG 하이브리드 (2013~2016)",
        "battery": "GB57219"
      }
    ]
  },
  {
    "slug": "k7",
    "name": "K7",
    "brand": "기아",
    "vehicleClass": "준대형",
    "rows": [
      {
        "label": "1세대 가솔린·LPG (2009~2016)",
        "battery": "GB80L"
      },
      {
        "label": "올뉴 K7 3.0·3.3 가솔린·디젤 (2016~2019)",
        "battery": "AGM80"
      },
      {
        "label": "올뉴 K7·프리미어 LPG",
        "battery": "GB58014"
      },
      {
        "label": "하이브리드",
        "battery": "GB57219"
      }
    ]
  },
  {
    "slug": "santafe",
    "name": "싼타페",
    "brand": "현대",
    "vehicleClass": "중형 SUV",
    "rows": [
      {
        "label": "싼타페 (2000~2005) 디젤",
        "battery": "GB90L"
      },
      {
        "label": "싼타페 (2000~2005) LPG",
        "battery": "GB80L"
      },
      {
        "label": "싼타페 CM·더스타일 (2006~2012) 디젤",
        "battery": "GB90L"
      },
      {
        "label": "더스타일 (2009~2012) LPG",
        "battery": "GB80L"
      },
      {
        "label": "DM 일반 디젤 (2012.4~2013)",
        "battery": "GB90L"
      },
      {
        "label": "DM 디젤 (2013~2015.6)",
        "battery": "AGM80"
      },
      {
        "label": "더프라임 (2015.6~2018.2) 디젤",
        "battery": "AGM95"
      },
      {
        "label": "더프라임 (2015.6~2018.2) 가솔린",
        "battery": "AGM80"
      },
      {
        "label": "TM (2018.2~2020.6) 디젤",
        "battery": "AGM95"
      },
      {
        "label": "TM (2018.2~2020.6) 가솔린",
        "battery": "AGM80"
      }
    ]
  },
  {
    "slug": "starex",
    "name": "스타렉스",
    "brand": "현대",
    "vehicleClass": "승합",
    "rows": [
      {
        "label": "디젤",
        "battery": "GB90R / GB100R"
      },
      {
        "label": "LPG",
        "battery": "GB80R"
      }
    ]
  },
  {
    "slug": "k5",
    "name": "K5",
    "brand": "기아",
    "vehicleClass": "중형",
    "rows": [
      {
        "label": "1세대 가솔린·LPG (2010~2015)",
        "battery": "GB80L"
      },
      {
        "label": "1세대 오토스탑 (2010~2015)",
        "battery": "AGM70"
      },
      {
        "label": "2세대 JF 가솔린·디젤 (2015~2018)",
        "battery": "AGM80"
      },
      {
        "label": "하이브리드",
        "battery": "GB57219"
      }
    ]
  },
  {
    "slug": "sonata",
    "name": "쏘나타",
    "brand": "현대",
    "vehicleClass": "중형",
    "rows": [
      {
        "label": "YF 가솔린·LPG (2010~2014)",
        "battery": "GB80L"
      },
      {
        "label": "YF 하이브리드 (2010~2014)",
        "battery": "GB57219"
      }
    ]
  },
  {
    "slug": "porter",
    "name": "포터",
    "brand": "현대",
    "vehicleClass": "소형 화물",
    "rows": [
      {
        "label": "포터 II",
        "battery": "GB90R"
      },
      {
        "label": "LPG",
        "battery": "GB80R"
      }
    ]
  },
  {
    "slug": "bongo",
    "name": "봉고",
    "brand": "기아",
    "vehicleClass": "소형 화물",
    "rows": [
      {
        "label": "1톤",
        "battery": "GB100R"
      },
      {
        "label": "봉고 III",
        "battery": "GB100L"
      },
      {
        "label": "프론티어",
        "battery": "GB100R / GB90L / GB100L"
      }
    ]
  },
  {
    "slug": "avante",
    "name": "아반떼",
    "brand": "현대",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "MD",
        "battery": "GB57220 / GB55457 / GB54459"
      }
    ]
  },
  {
    "slug": "avante-ad",
    "name": "아반떼 AD",
    "brand": "현대",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "가솔린·LPG (AD 2015~2018, 더 뉴 AD 2018~2020)",
        "battery": "GB56219"
      },
      {
        "label": "디젤 (AD 2015~2018, 더 뉴 AD 2018~)",
        "battery": "AGM70"
      }
    ]
  },
  {
    "slug": "avante-hd",
    "name": "아반떼 HD",
    "brand": "현대",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "가솔린 (2006~2010)",
        "battery": "GB60AL"
      },
      {
        "label": "디젤 (2006~2010)",
        "battery": "GB80L"
      }
    ]
  },
  {
    "slug": "k3",
    "name": "K3",
    "brand": "기아",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "가솔린·쿱 (2012년~)",
        "battery": "GB56219"
      }
    ]
  },
  {
    "slug": "carnival",
    "name": "카니발",
    "brand": "기아",
    "vehicleClass": "미니밴",
    "rows": [
      {
        "label": "올뉴 YP (2014~2018) 가솔린·LPG",
        "battery": "GB80L"
      },
      {
        "label": "올뉴 YP (2014~2018) 디젤",
        "battery": "GB90L"
      },
      {
        "label": "그랜드 카니발 (2005~2010) 디젤",
        "battery": "GB100L"
      }
    ]
  },
  {
    "slug": "tucson",
    "name": "투싼",
    "brand": "현대",
    "vehicleClass": "준중형 SUV",
    "rows": [
      {
        "label": "투싼 JM 디젤 (2004~2009)",
        "battery": "GB90L"
      },
      {
        "label": "투싼 ix 가솔린 (2010~2015)",
        "battery": "GB80L"
      },
      {
        "label": "투싼 ix 디젤 (2010~2015)",
        "battery": "GB90R"
      }
    ]
  },
  {
    "slug": "morning",
    "name": "모닝",
    "brand": "기아",
    "vehicleClass": "경차",
    "rows": [
      {
        "label": "전 세대",
        "battery": "GB40AL"
      }
    ]
  },
  {
    "slug": "ray",
    "name": "레이",
    "brand": "기아",
    "vehicleClass": "경차",
    "rows": [
      {
        "label": "가솔린 (2011년~)·LPG (2017년~)·터보 (2011~2017)",
        "battery": "GB50L"
      },
      {
        "label": "ISG(공회전 제한) 사양",
        "battery": "AGM60DL"
      }
    ]
  },
  {
    "slug": "spark",
    "name": "스파크",
    "brand": "쉐보레",
    "vehicleClass": "경차",
    "rows": [
      {
        "label": "스파크·더넥스트 가솔린 (2011~2018)",
        "battery": "GB54459"
      },
      {
        "label": "더뉴 스파크 ISG (2018~2019)",
        "battery": "AGM60"
      }
    ]
  },
  {
    "slug": "sorento",
    "name": "쏘렌토",
    "brand": "기아",
    "vehicleClass": "중형 SUV",
    "rows": [
      {
        "label": "R 가솔린·LPG (2009~2012)",
        "battery": "GB80L"
      },
      {
        "label": "R 디젤 (2009~2014)",
        "battery": "GB90L"
      }
    ]
  },
  {
    "slug": "sportage",
    "name": "스포티지",
    "brand": "기아",
    "vehicleClass": "준중형 SUV",
    "rows": [
      {
        "label": "R 디젤 (2010~2015)",
        "battery": "GB90R"
      }
    ]
  },
  {
    "slug": "mohave",
    "name": "모하비",
    "brand": "기아",
    "vehicleClass": "대형 SUV",
    "rows": [
      {
        "label": "3.8 가솔린 (2007~2015)",
        "battery": "GB80L"
      },
      {
        "label": "디젤 (3.0 · 더 뉴 · 더 마스터)",
        "battery": "GB100L"
      }
    ]
  },
  {
    "slug": "veracruz",
    "name": "베라크루즈",
    "brand": "현대",
    "vehicleClass": "대형 SUV",
    "rows": [
      {
        "label": "디젤 (2006~2015)",
        "battery": "GB100L"
      }
    ]
  },
  {
    "slug": "sm5",
    "name": "SM5",
    "brand": "르노삼성",
    "vehicleClass": "중형",
    "rows": [
      {
        "label": "SM5 (1998~2010)",
        "battery": "GB80L"
      },
      {
        "label": "L43·플래티넘 가솔린 (2010~2015)",
        "battery": "GB57820"
      },
      {
        "label": "L43·플래티넘 LPG (2010~2015)",
        "battery": "GB58014"
      },
      {
        "label": "플래티넘 디젤 (2012~2015)",
        "battery": "AGM70"
      },
      {
        "label": "노바 LPG (2015~2019)",
        "battery": "GB57820"
      },
      {
        "label": "노바 디젤 (2015~2019)",
        "battery": "AGM70"
      }
    ]
  },
  {
    "slug": "sm3",
    "name": "SM3",
    "brand": "르노삼성",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "뉴제너레이션·CE (2005~2011)",
        "battery": "GB80L"
      },
      {
        "label": "뉴SM3 L38 가솔린 (2009~2014)",
        "battery": "GB57820"
      },
      {
        "label": "네오 디젤 (2014~2020)",
        "battery": "AGM70"
      }
    ]
  },
  {
    "slug": "sm7",
    "name": "SM7",
    "brand": "르노삼성",
    "vehicleClass": "준대형",
    "rows": [
      {
        "label": "SM7·뉴아트 (2004~2011)",
        "battery": "GB80L"
      },
      {
        "label": "올뉴 L47·노바 가솔린 (2012년~)",
        "battery": "GB60044"
      },
      {
        "label": "노바 LPG (2015년~)",
        "battery": "GB57820"
      }
    ]
  },
  {
    "slug": "k9",
    "name": "K9",
    "brand": "기아",
    "vehicleClass": "대형",
    "rows": [
      {
        "label": "2018년 이전 K9",
        "battery": "GB60044"
      },
      {
        "label": "2018년 이후 더 K9(RJ)",
        "battery": "AGM105"
      }
    ]
  },
  {
    "slug": "ioniq",
    "name": "아이오닉",
    "brand": "현대",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "하이브리드(표기 제외)",
        "battery": "GB55065"
      }
    ]
  },
  {
    "slug": "genesis-dh",
    "name": "제네시스 DH",
    "brand": "제네시스",
    "vehicleClass": "대형",
    "rows": [
      {
        "label": "DH 2013~2016년식",
        "battery": "AGM105L"
      }
    ]
  }
];
