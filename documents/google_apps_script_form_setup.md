# Google Apps Script 문의 폼 연결 가이드

마이다스 홈페이지의 `midas-project.html` 문의 폼을 Google Sheets와 관리자 이메일로 자동 접수하기 위한 설정 문서입니다.

## 1. Google Sheet 만들기

1. Google Drive에서 새 Google Sheet를 만듭니다.
2. 파일명을 예: `마이다스 홈페이지 문의 접수`로 지정합니다.
3. 상단 메뉴에서 `확장 프로그램 > Apps Script`를 엽니다.

## 2. Apps Script 코드 붙여넣기

Apps Script 편집기의 기본 코드를 모두 지우고 아래 코드를 붙여넣습니다.

```javascript
const CONFIG = {
  SHEET_NAME: "문의내역",
  ADMIN_EMAIL: "sdmidas@gmail.com"
};

const HEADERS = [
  "접수일시",
  "접수 제목",
  "성함",
  "회사·브랜드명",
  "이메일",
  "휴대폰 번호",
  "선호 연락 방법",
  "문의 영상 종류",
  "프로젝트명 또는 제품·브랜드",
  "예산 범위",
  "희망 일정",
  "유입 경로",
  "문의 내용",
  "개인정보 수집·이용 동의",
  "접수 페이지",
  "브라우저"
];

function doPost(e) {
  const params = e.parameter || {};
  const sheet = getSheet_();

  ensureHeader_(sheet);
  sheet.appendRow(HEADERS.map((header) => {
    if (header === "접수일시") return new Date();
    return params[header] || "";
  }));

  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: params["접수 제목"] || "[마이다스 견적 문의]",
    body: buildEmailBody_(params)
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput("MIDAS inquiry endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  }

  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function buildEmailBody_(params) {
  return [
    "[마이다스 견적 문의]",
    "",
    `성함: ${params["성함"] || "-"}`,
    `회사·브랜드명: ${params["회사·브랜드명"] || "-"}`,
    `이메일: ${params["이메일"] || "-"}`,
    `휴대폰 번호: ${params["휴대폰 번호"] || "-"}`,
    `선호 연락 방법: ${params["선호 연락 방법"] || "-"}`,
    `문의 영상 종류: ${params["문의 영상 종류"] || "-"}`,
    `프로젝트명 또는 제품·브랜드: ${params["프로젝트명 또는 제품·브랜드"] || "-"}`,
    `예산 범위: ${params["예산 범위"] || "-"}`,
    `희망 일정: ${params["희망 일정"] || "-"}`,
    `유입 경로: ${params["유입 경로"] || "-"}`,
    "",
    "[문의 내용]",
    params["문의 내용"] || "-",
    "",
    `개인정보 수집·이용 동의: ${params["개인정보 수집·이용 동의"] || "-"}`,
    `접수 페이지: ${params["접수 페이지"] || "-"}`,
    `브라우저: ${params["브라우저"] || "-"}`
  ].join("\n");
}
```

## 3. Web App으로 배포

1. Apps Script 우측 상단 `배포 > 새 배포`를 클릭합니다.
2. 유형에서 `웹 앱`을 선택합니다.
3. 실행 권한은 `나`로 둡니다.
4. 액세스 권한은 `모든 사용자`로 설정합니다.
5. 배포 후 권한 승인 절차를 완료합니다.
6. 생성된 `웹 앱 URL`을 복사합니다.

## 4. 홈페이지에 URL 넣기

`midas-project.html`에서 아래 부분을 찾습니다.

```html
<form class="project-form" id="project-form" data-apps-script-url="">
```

복사한 Web App URL을 넣습니다.

```html
<form class="project-form" id="project-form" data-apps-script-url="https://script.google.com/macros/s/여기에_배포_URL/exec">
```

URL이 비어 있으면 홈페이지는 기존처럼 메일 작성 화면으로 fallback됩니다.

## 5. 테스트

1. 홈페이지 문의 폼에서 테스트 내용을 작성합니다.
2. Google Sheet의 `문의내역` 시트에 새 행이 추가되는지 확인합니다.
3. `sdmidas@gmail.com`으로 관리자 알림 메일이 오는지 확인합니다.
4. 문제가 없다면 실제 공개 URL에 동일하게 반영합니다.
