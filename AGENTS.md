# AGENTS.md

이 저장소에서 작업하는 에이전트는 아래 규칙을 항상 지킨다.

## Repository Layout Rule

- 이 저장소의 작업 루트는 `homepage` 폴더 자체다.
- HTML, `asset/`, `documents/`, `AGENTS.md`는 저장소 루트 바로 아래에 둔다.
- `homepage/midas-homepage/...`처럼 동일 프로젝트명을 한 번 더 감싼 중첩 폴더를 만들지 않는다.

## Asset File Rule

- `asset/`에는 현재 웹 구현에서 HTML/CSS/JS가 직접 참조하는 이미지·영상·폰트·스크립트·스타일 파일만 둔다.
- 웹 구현에 직접 쓰지 않는 보관용 이미지·영상 묶음은 `asset/` 바깥의 루트 폴더에 둔다. 예: `studio/`, `unused-assets/`.
- 화면에서 사용할 이미지·영상 파일명이 한글이거나 공백/특수문자를 포함하면, 추가 또는 수정 작업 중 자동으로 영문 소문자 kebab-case 파일명으로 바꾼 뒤 `asset/` 아래로 이동한다.
- 파일명을 바꾸거나 `asset/`으로 이동한 경우, 해당 파일을 참조하는 HTML/CSS/JS 경로도 함께 수정한다.
- 기존 외부 자료 보관 목적의 문서 폴더 파일을 직접 쓰지 않는 한, 화면에서 사용하는 미디어는 `documents/`가 아니라 `asset/`을 참조하게 한다.

## Navigation / Dropdown Rule

- 상단 메뉴와 드롭다운 메뉴 동작은 `asset/service-navigation.js`와 `asset/service-navigation.css`를 단일 소스로 관리한다.
- 각 HTML 하단에 `menu-toggle`, `nav.open`, 드롭다운 관련 인라인 클릭 핸들러를 새로 추가하지 않는다.
- 드롭다운 패널은 `asset/service-navigation.js`에서 `#site-nav` 항목을 복제해 생성한다.
- 드롭다운에는 `회사소개`, `서비스`, `성공사례`, `마이다스종합촬영센터`, `FAQ`가 포함되어야 한다.
- `프로젝트 문의`는 별도 상단 버튼으로 유지하고 드롭다운 복제 대상에서는 제외한다.
- 모바일에서는 상단 nav가 숨겨지므로, 모바일에서 필요한 메뉴는 반드시 드롭다운 안에도 있어야 한다.

## MutationObserver Safety Rule

- `MutationObserver`가 감시하는 속성 안에서 같은 속성을 무조건 다시 변경하지 않는다.
- 특히 `class`를 감시하는 콜백 안에서는 `classList.add/remove/toggle` 호출 전 실제 변경이 필요한지 먼저 검사한다.
- 예: `nav.classList.remove("open")`는 반드시 `nav.classList.contains("open")` 조건 안에서만 실행한다.
- 메뉴가 먹통이 되면 먼저 `asset/service-navigation.js`의 observer, classList 변경, 이벤트 전파 코드를 확인한다.

## Menu Change Verification Rule

- 메뉴 관련 수정 후에는 `node --check asset/service-navigation.js`를 실행한다.
- 브라우저에서 `/asset/service-navigation.js?v=...`가 코드로 보이는지 확인해 asset 경로가 정상인지 확인한다.
- 드롭다운 버튼 클릭 시 `성공사례`와 `마이다스종합촬영센터`가 드롭다운 안에 보이는지 확인한다.
- 모바일 폭에서는 상단 nav가 보이지 않아도 드롭다운으로 모든 주요 메뉴에 접근 가능해야 한다.

## Do Not Touch Media Loading Unless Requested

- 메뉴 문제를 해결하는 과정에서 랜딩 영상, 서비스 카드 영상의 `src`, `preload`, `poster`, lazy-load 방식은 변경하지 않는다.
- 영상 로딩 방식 변경은 사용자가 명시적으로 요청한 경우에만 한다.

## GitHub Commit Rule

- 사용자가 파일 수정, 콘텐츠 수정, 코드 수정, 디자인 수정 등 저장소 변경을 요청하면 작업 완료 후 반드시 GitHub에 커밋하고 푸시한다.
- 커밋 전에는 `git status`로 변경 범위를 확인한다.
- 해당 요청과 관련된 파일만 스테이징하고, 사용자가 만들었거나 다른 작업에서 생긴 관련 없는 변경은 커밋에 포함하지 않는다.
- 원격 브랜치에 새 커밋이 있어 push가 거절되면 `git pull --rebase`로 최신 변경을 반영한 뒤 충돌을 해결하고 다시 push한다.
- 충돌 해결 시 사용자의 최신 요청사항을 보존한다.
- 완료 보고에는 커밋 해시와 push 여부를 함께 적는다.
