# 마이다스커뮤니케이션 — 기계가 읽게 만들기 (스키마 + robots.txt 적용 가이드)

현재 스테이징 사이트(github.io)를 검토해 실제 구조·내용에 맞춰 작성했습니다.
아래 JSON-LD 블록을 각 페이지 `<head>`에 넣고, robots.txt를 도메인 루트에 두면 됩니다.

---

## 0. 확정된 회사 정보 / 작업 전 참고

연락처는 사이트 푸터 기준으로 확정했습니다.

| 항목 | 값 |
|---|---|
| 이메일 | sdmidas@gmail.com (확정) |
| 대표 전화 | 02-2675-9767 — 문래 본사 (확정) |
| 스튜디오 전화 | 031-917-5509 — 성석동 마이다스종합촬영센터 |
| 대표자 / 사업자번호 | 이하용 / 117-81-38410 |

- **도메인:** 최종 도메인을 `https://www.midasonair.co.kr` 로 가정했습니다. 다르면 이 문서의 도메인을 일괄 치환하세요.
- **홈 URL:** 현재 홈이 `midas-communication.html`인데, 실제 도메인에서는 **루트(`/`)로 서빙**하는 걸 권장합니다(홈페이지는 보통 루트가 정석). 그에 맞춰 @id·canonical을 루트로 잡았습니다.
- **서비스 5개:** 사이트가 바우처 / 라이브커머스 / 홈쇼핑 인서트 / AI 영상 / TVCF·브랜드 홍보로 구성돼 있어, Service 스키마도 5개로 맞췄습니다.

### 0-B. 페이지 자체에서 고쳐야 할 불일치 (스테이징 검토 중 발견)

스키마와 별개로, 지금 사이트 페이지들 사이에 표기가 갈리는 부분이 있습니다. 기계가 "같은 회사"로 인식하려면 **사이트 전체에서 한 가지로 통일**해야 합니다.

| 항목 | 현재 상태 | 통일안 |
|---|---|---|
| 회사명 표기 | 메인 페이지 "마이다스커뮤니케이션"(붙여) vs FAQ 페이지 "마이다스 커뮤니케이션"(띄어) | **마이다스커뮤니케이션** (붙여쓰기) 로 전 페이지 통일 |
| 스튜디오명 | "종합촬영센터" / "마이다스 종합촬영센터"(띄어) 혼재 | **마이다스종합촬영센터** (붙여쓰기) 로 통일 |
| FAQ 페이지 이메일 | FAQ 페이지엔 `8450d@hanmail.net` 표기 | 메인과 동일하게 **sdmidas@gmail.com** |
| FAQ 페이지 전화 | FAQ 페이지엔 모바일 010-5356-5509만 | 대표 **02-2675-9767** 도 함께 노출 권장 |

위 스키마는 전부 통일안 기준(마이다스커뮤니케이션 / 마이다스종합촬영센터 / sdmidas@gmail.com)으로 작성했습니다. **페이지 본문도 이 표기로 맞춰주세요.** 화면과 스키마가 같아야 검색·AI가 정확히 읽습니다.

---

## 1. 사이트 공통 — 모든 페이지 `<head>`에 삽입

회사(Organization)와 웹사이트(WebSite) 정체성. 가장 핵심 블록입니다.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.midasonair.co.kr/#organization",
      "name": "마이다스커뮤니케이션",
      "legalName": "(주)마이다스커뮤니케이션",
      "alternateName": "Midas Communication",
      "url": "https://www.midasonair.co.kr/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.midasonair.co.kr/asset/midas-logo.webp"
      },
      "description": "마이다스커뮤니케이션은 TVCF, 브랜드 홍보, 홈쇼핑 인서트 영상, 라이브커머스, 수출·혁신바우처, AI 영상까지 제작하는 세일즈 영상 프로덕션입니다. 제품의 셀링포인트를 분석해 구매 전환형 영상으로 기획·촬영·편집·숏폼 재가공까지 원스톱으로 진행하며, 일산 성석동 마이다스종합촬영센터를 기반으로 합니다. 2002년 설립, 이노비즈 인증 기업이자 산업디자인전문회사이며 수출바우처 영상 제작 수행기관입니다.",
      "slogan": "잘 팔리는 제품 영상을 만드는 세일즈 영상 프로덕션",
      "foundingDate": "2002",
      "email": "sdmidas@gmail.com",
      "telephone": "+82-2-2675-9767",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "사업자등록번호",
        "value": "117-81-38410"
      },
      "knowsAbout": [
        "홈쇼핑 인서트 영상 제작",
        "라이브커머스 판매 방송",
        "수출바우처 영상 제작",
        "혁신바우처 영상 제작",
        "AI 영상 제작",
        "TVCF·브랜드 홍보 영상 제작"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "선유로 85-3 마이다스 미디어타워",
        "addressLocality": "영등포구",
        "addressRegion": "서울특별시",
        "postalCode": "07279",
        "addressCountry": "KR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-2-2675-9767",
        "email": "sdmidas@gmail.com",
        "contactType": "sales",
        "areaServed": "KR",
        "availableLanguage": ["Korean", "English"]
      },
      "sameAs": [
        "https://www.youtube.com/@midas_communication",
        "https://www.instagram.com/midas_communication/",
        "https://blog.naver.com/midas_communication"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.midasonair.co.kr/#website",
      "url": "https://www.midasonair.co.kr/",
      "name": "마이다스커뮤니케이션",
      "publisher": { "@id": "https://www.midasonair.co.kr/#organization" },
      "inLanguage": "ko"
    }
  ]
}
</script>
```

---

## 2. 마이다스종합촬영센터 — 홈의 #studio 섹션(또는 별도 스튜디오 페이지)에 삽입

지도·지역 노출용. 좌표·운영시간·전화번호 채워져 있습니다.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.midasonair.co.kr/#studio",
  "name": "마이다스종합촬영센터",
  "parentOrganization": { "@id": "https://www.midasonair.co.kr/#organization" },
  "url": "https://www.midasonair.co.kr/#studio",
  "image": "https://www.midasonair.co.kr/asset/studio-main-default.jpg",
  "description": "일산 성석동 3,000평 부지에 거실·주방·욕실·정원 주거 세트, 무한대 호리존, 라이브 방송센터 등 콘셉트별 세트를 상설로 갖춘 종합 촬영 스튜디오입니다.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "고봉로578번길 9-26",
    "addressLocality": "고양시 일산동구",
    "addressRegion": "경기도",
    "postalCode": "10328",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7085374,
    "longitude": 126.7868984
  },
  "telephone": "+82-31-917-5509",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "₩₩₩"
}
</script>
```

---

## 3. 서비스 — 서비스 페이지(midas-services.html)에 삽입

사이트의 5개 서비스를 그대로 반영했습니다. 한 페이지에 아래 블록을 통째로 넣으면 됩니다.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "바우처 영상 제작",
      "serviceType": "수출바우처·혁신바우처 영상 제작",
      "url": "https://www.midasonair.co.kr/midas-services.html#voucher",
      "description": "수출·혁신바우처 목적에 맞춰 해외 진출과 판로 확대를 위한 기업·제품 영상을 기획·제작합니다.",
      "provider": { "@id": "https://www.midasonair.co.kr/#organization" },
      "areaServed": { "@type": "Country", "name": "대한민국" }
    },
    {
      "@type": "Service",
      "name": "라이브커머스 판매 방송",
      "serviceType": "라이브커머스 영상 제작 및 송출",
      "url": "https://www.midasonair.co.kr/midas-services.html#livecommerce",
      "description": "실시간 판매를 이끄는 라이브커머스 방송의 기획·연출·촬영·송출과 숏폼 재가공을 원스톱으로 진행합니다.",
      "provider": { "@id": "https://www.midasonair.co.kr/#organization" },
      "areaServed": { "@type": "Country", "name": "대한민국" }
    },
    {
      "@type": "Service",
      "name": "홈쇼핑 인서트 영상 제작",
      "serviceType": "홈쇼핑 인서트 영상 제작",
      "url": "https://www.midasonair.co.kr/midas-services.html#home-shopping",
      "description": "방송용 인서트 영상으로 제품의 셀링포인트를 짧고 강렬하게 보여주는 구매 전환형 영상을 제작합니다.",
      "provider": { "@id": "https://www.midasonair.co.kr/#organization" },
      "areaServed": { "@type": "Country", "name": "대한민국" }
    },
    {
      "@type": "Service",
      "name": "AI 영상 제작",
      "serviceType": "생성형 AI 영상 제작",
      "url": "https://www.midasonair.co.kr/midas-services.html#ai",
      "description": "생성형 AI 기반 제작과 후반 작업으로 더 빠르고 새로운 형태의 영상 콘텐츠를 제작합니다.",
      "provider": { "@id": "https://www.midasonair.co.kr/#organization" },
      "areaServed": { "@type": "Country", "name": "대한민국" }
    },
    {
      "@type": "Service",
      "name": "TVCF·브랜드 홍보 영상 제작",
      "serviceType": "TVCF·브랜드 홍보 영상 제작",
      "url": "https://www.midasonair.co.kr/midas-services.html#tvcf",
      "description": "TVCF와 브랜드 홍보 영상을 하나의 흐름으로 기획하고 제작합니다.",
      "provider": { "@id": "https://www.midasonair.co.kr/#organization" },
      "areaServed": { "@type": "Country", "name": "대한민국" }
    }
  ]
}
</script>
```

---

## 4. FAQ — FAQ 페이지(midas-inquiry.html)에 삽입

현재 FAQ 페이지(midas-inquiry.html)에 실제로 올라가 있는 17개 문항을 그대로 반영했습니다.
※ 화면 문구와 스키마 답변은 **같아야** 하므로, 아래 회사명을 '마이다스커뮤니케이션'(붙여쓰기)으로 통일했습니다. 페이지 본문도 같은 표기로 맞춰주세요(아래 0-B 참고).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "세일즈 영상 제작 업체를 선택할 때 무엇을 봐야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "제품의 셀링포인트를 이해하는 능력, 촬영·편집·그래픽 후반작업 역량, 다양한 플랫폼 납품 경험, 판매전환을 고려한 구성 경험, 자체 스튜디오 보유 여부를 확인하는 것이 좋습니다. 마이다스커뮤니케이션은 2002년부터 홈쇼핑 인서트 영상과 제품 판매영상을 제작해 왔으며, 기획부터 촬영·편집·납품까지 한 곳에서 원스톱으로 진행합니다." }
    },
    {
      "@type": "Question",
      "name": "마이다스커뮤니케이션은 어떤 영상 제작에 강한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "홈쇼핑 인서트 영상 제작, 라이브커머스 영상 제작과 송출 대행, 수출바우처 영상 제작에 강점을 가지고 있습니다. 제품의 장점을 구매로 연결하는 판매전환형 영상이 핵심 영역이며, 기업 홍보영상과 숏폼 콘텐츠도 함께 제작합니다." }
    },
    {
      "@type": "Question",
      "name": "회사의 주요 인증이나 자격이 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "마이다스커뮤니케이션은 이노비즈 인증 기업이자 산업디자인전문회사이며, 수출바우처 영상 제작을 수행하는 수행기관입니다. 2002년 설립 이후 20년 이상 영상 제작을 이어온 전문 제작사입니다." }
    },
    {
      "@type": "Question",
      "name": "홈쇼핑 인서트 영상이 무엇인가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "홈쇼핑 인서트 영상은 방송 중간에 삽입되어 제품의 장점을 짧은 시간에 각인시키고 구매를 끌어내는 영상입니다. 제품의 기능·사용 장면·차별점을 압축적으로 보여주기 때문에, 셀링포인트를 얼마나 정확히 영상으로 풀어내느냐가 구매전환을 좌우합니다." }
    },
    {
      "@type": "Question",
      "name": "홈쇼핑 인서트 영상 제작은 어떤 순서로 진행되나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "일반적으로 셀링포인트 분석, 콘티·기획, 촬영, 편집·그래픽, 채널 규격 납품의 순서로 진행됩니다. 마이다스커뮤니케이션은 이 전 과정을 자체 스튜디오에서 원스톱으로 처리해, 단계마다 업체가 바뀌며 생기는 품질 편차와 일정 지연을 줄입니다." }
    },
    {
      "@type": "Question",
      "name": "기존 인서트 영상의 반응이 약한데 리뉴얼도 가능한가요?",
      "acceptedAnswer": { "@type": "Answer", "text": "가능합니다. 기존 영상의 구성과 소구점을 분석해 제품의 강점이 더 잘 드러나고 구매로 이어지도록 재구성합니다. 촬영 소스 재활용 여부와 전면 재촬영 여부는 상태를 보고 함께 정합니다." }
    },
    {
      "@type": "Question",
      "name": "라이브커머스 영상 제작은 어떤 작업을 포함하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "라이브 방송에 사용되는 제품 소개·시연 영상, 오프닝·하이라이트 인서트, 방송용 자막·그래픽 등을 기획·촬영·편집하는 작업을 포함합니다. 마이다스커뮤니케이션은 방송 전체 흐름에 맞춰 콘텐츠를 설계해 몰입도와 구매전환을 함께 끌어올립니다." }
    },
    {
      "@type": "Question",
      "name": "라이브커머스 송출 대행은 무엇을 해주나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "라이브커머스 방송의 세팅과 운영, 실시간 송출을 대행하는 서비스입니다. 방송을 하고 싶지만 운영·송출 인력이나 장비가 없는 경우, 촬영 환경과 송출 환경을 갖춘 자체 스튜디오에서 방송 운영부터 송출까지 맡길 수 있습니다." }
    },
    {
      "@type": "Question",
      "name": "라이브커머스 영상 제작과 송출 대행을 함께 맡길 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네. 영상 제작과 라이브 운영·송출을 한 곳에서 연계해 진행할 수 있어, 제작과 방송을 따로 발주할 때보다 일정과 품질을 일관되게 관리할 수 있습니다." }
    },
    {
      "@type": "Question",
      "name": "수출바우처로 영상을 제작할 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "가능합니다. 마이다스커뮤니케이션은 수출바우처 영상 제작을 수행하는 수행기관으로서, 수출 기업이 해외 시장에 바로 활용할 수 있는 제품·기업 홍보 영상을 제작합니다. 수출바우처 사업의 절차에 맞춰 진행하므로 영상 품질과 사업 처리를 함께 챙길 수 있습니다." }
    },
    {
      "@type": "Question",
      "name": "수출바우처 영상 수행기관을 고를 때 무엇을 봐야 하나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "영상 제작 역량은 물론, 수출바우처 사업의 절차와 정산 요건을 이해하고 진행할 수 있는지를 확인하는 것이 중요합니다. 사업 처리 경험이 없는 제작사와 진행하면 영상은 나와도 바우처 정산 단계에서 문제가 생길 수 있기 때문입니다." }
    },
    {
      "@type": "Question",
      "name": "어떤 종류의 수출용 영상을 만들 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "해외 마케팅용 제품 소개 영상, 브랜드 필름, 해외 채널용 숏폼 등 수출 마케팅에 바로 쓸 수 있는 형태로 제작합니다. 제품의 강점을 해외 바이어와 소비자 관점에서 풀어내는 데 중점을 둡니다." }
    },
    {
      "@type": "Question",
      "name": "제작 기간은 얼마나 걸리나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "영상의 종류와 분량, 촬영 규모에 따라 달라집니다. 인서트 영상처럼 짧은 단위부터 브랜드 필름까지 범위가 넓어, 기획 단계에서 일정을 함께 확정합니다. 정확한 일정은 문의 시 프로젝트 내용을 보고 안내해 드립니다." }
    },
    {
      "@type": "Question",
      "name": "제작 비용은 어떻게 책정되나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "촬영 일수, 출연·세트·그래픽 범위, 후반작업 난이도 등에 따라 결정되므로 프로젝트별 견적으로 안내합니다. 제품과 목적을 알려주시면 그에 맞는 구성과 견적을 제안해 드립니다." }
    },
    {
      "@type": "Question",
      "name": "자체 스튜디오가 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "네. 경기도 고양시 일산동구 성석동에 마이다스종합촬영센터를 운영합니다. 제품 촬영, 대형 제품 촬영, 라이브커머스 송출, 후반작업을 한 곳에서 진행할 수 있는 자체 제작 환경을 갖추고 있습니다." }
    },
    {
      "@type": "Question",
      "name": "지방이나 원격에서도 의뢰할 수 있나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "가능합니다. 제품 발송과 화상 회의를 통해 기획·검수를 진행할 수 있어, 직접 방문이 어려운 경우에도 의뢰하실 수 있습니다. 촬영이 필요한 경우 일정과 방식은 협의해 정합니다." }
    },
    {
      "@type": "Question",
      "name": "어떻게 문의하면 되나요?",
      "acceptedAnswer": { "@type": "Answer", "text": "전화 또는 이메일로 연락 주시면 됩니다. 제품과 제작 목적을 함께 알려주시면 더 빠르게 상담을 진행할 수 있습니다." }
    }
  ]
}
</script>
```

---

## 5. 포트폴리오 영상 — 영상마다 1블록 (복제해서 사용)

성공사례(midas-portfolio.html)의 영상에 적용. 이미지(webp)만 있는 항목은 VideoObject 대신 생략하거나, 영상이 있으면 아래를 채웁니다.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[[영상 제목 — 예: 다이슨 제품 영상 제작 사례]]",
  "description": "[[영상 설명 — 핵심 키워드 포함]]",
  "thumbnailUrl": ["[[썸네일 이미지 URL]]"],
  "uploadDate": "[[2025-01-01T09:00:00+09:00]]",
  "embedUrl": "[[유튜브 임베드 URL 또는 영상 파일 URL]]",
  "publisher": { "@id": "https://www.midasonair.co.kr/#organization" }
}
</script>
```

---

## 6. 빵부스러기(BreadcrumbList) — 하위 페이지에 권장

페이지 경로에 맞게 수정. (예: 서비스 페이지)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://www.midasonair.co.kr/" },
    { "@type": "ListItem", "position": 2, "name": "서비스", "item": "https://www.midasonair.co.kr/midas-services.html" }
  ]
}
</script>
```

---

## 7. robots.txt — 실제 도메인 루트에 배치

`https://www.midasonair.co.kr/robots.txt` 위치에 아래 내용의 텍스트 파일을 둡니다.
검색·AI 크롤러를 **모두 허용**하는 설정입니다. (막으면 AI 추천에서 빠집니다 — 우리는 열어야 하는 쪽)

```
User-agent: *
Allow: /

Sitemap: https://www.midasonair.co.kr/sitemap.xml
```

---

## 8. ⚠️ 지금은 스테이징(github.io) 단계 — 색인 방지 필수

현재 사이트는 github.io 임시 주소입니다. 이걸 검색엔진이 색인해 버리면, 나중에 진짜 도메인(midasonair.co.kr)과 **중복 사이트**가 생겨 둘 다 신뢰도가 깎입니다.

그래서 **스테이징 단계에서는 모든 페이지 `<head>`에 아래 한 줄을 넣어 색인을 막아두세요.**

```html
<meta name="robots" content="noindex, nofollow">
```

그리고 **실제 도메인으로 옮겨 정식 오픈할 때 이 줄을 삭제**하고, 위 7번 robots.txt(전체 허용)를 적용하면 됩니다.
즉 순서는 — ① 스테이징: noindex로 막기 → ② 실제 도메인 이전·SSL 확인 → ③ noindex 삭제 + robots.txt(허용) 적용.
위 스키마 블록(1~6)은 실제 도메인 기준으로 작성돼 있으니, 지금 미리 심어둬도 무방합니다(어차피 스테이징은 색인 안 되니까요).

---

## 9. 페이지별 삽입 위치 요약

| 페이지 | 넣을 블록 |
|---|---|
| 전 페이지 공통 | [1] Organization·WebSite + [8] noindex(스테이징 동안) |
| 홈 (midas-communication.html) | [2] LocalBusiness (#studio 섹션 보유) |
| 서비스 (midas-services.html) | [3] Service 5개 + [6] BreadcrumbList |
| 성공사례 (midas-portfolio.html) | [5] VideoObject(영상별) + [6] BreadcrumbList |
| FAQ (midas-inquiry.html) | [4] FAQPage + [6] BreadcrumbList |
| 회사소개·프로젝트 문의 | [6] BreadcrumbList |

적용 후 검증: [Google Rich Results Test](https://search.google.com/test/rich-results) · [Schema Validator](https://validator.schema.org)

---

## 10. 참고 — 포지셔닝 한마디

사이트가 'TVCF·브랜드 홍보'까지 포함한 넓은 '세일즈 영상 프로덕션'으로 잡혀 있습니다. 0단계에서 정했던 좁은 5개 키워드 전략보다 범위가 넓어진 건데, 이건 장단이 있습니다 — 회사를 폭넓게 보여주는 장점이 있지만, "좁은 질문을 독점한다"는 AI 추천 전략 측면에서는 핵심 키워드(홈쇼핑 인서트·라이브커머스·수출바우처)를 페이지 제목·H1·스키마에서 **더 도드라지게** 유지하는 게 좋습니다. 위 스키마는 그 핵심 키워드를 knowsAbout·Service에 분명히 넣어 균형을 맞춰 뒀습니다.
