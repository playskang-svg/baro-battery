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
        "label": "HG",
        "battery": "GB80L"
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
        "label": "가솔린·LPG",
        "battery": "GB80L"
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
        "label": "일반",
        "battery": "GB90L"
      },
      {
        "label": "DM 14년형(ISG)",
        "battery": "AGM80L"
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
        "label": "가솔린·LPG",
        "battery": "GB80L"
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
        "label": "YF 가솔린·LPG·T-GDI",
        "battery": "GB80L"
      },
      {
        "label": "YF 디젤",
        "battery": "GB90L"
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
    "slug": "k3",
    "name": "K3",
    "brand": "기아",
    "vehicleClass": "준중형",
    "rows": [
      {
        "label": "가솔린 I",
        "battery": "GB56219"
      },
      {
        "label": "가솔린 II",
        "battery": "GB57220"
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
        "label": "올뉴(14~18년)",
        "battery": "GB90L"
      },
      {
        "label": "구형·디젤",
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
        "label": "투싼",
        "battery": "GB90L"
      },
      {
        "label": "iX",
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
    "slug": "spark",
    "name": "스파크",
    "brand": "쉐보레",
    "vehicleClass": "경차",
    "rows": [
      {
        "label": "스파크",
        "battery": "GB54459"
      },
      {
        "label": "더넥스트(ISG)",
        "battery": "AGM60L"
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
        "label": "R",
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
        "label": "R",
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
        "label": "전 세대",
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
        "label": "전 세대",
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
        "label": "2010년 이후",
        "battery": "AGM80L"
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
        "label": "2010년 이후",
        "battery": "AGM70L"
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
        "label": "2011년 이후",
        "battery": "GB60044"
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
