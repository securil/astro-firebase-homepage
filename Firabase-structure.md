# 📦 Firestore 컬렉션 구조 문서

청구회 골프 동호회 프로젝트의 Firebase Firestore 컬렉션 구조를 정리한 문서입니다. 프론트엔드 또는 백엔드 개발자가 쉽게 연동할 수 있도록 컬렉션별 필드 구조와 관계를 명확히 정리합니다.

---

## 🔹 1. `members` 컬렉션

회원 정보를 저장하는 기본 컬렉션입니다.

| 필드명     | 타입     | 설명                     |
|------------|----------|--------------------------|
| `id`       | number   | 회원 고유 ID (정수)      |
| `name`     | string   | 이름                     |
| `generation` | number | 기수 (예: 29, 30 등)     |
| `gender`   | string   | 성별 (`남성`, `여성`)    |
| `phone`    | string   | 휴대폰 번호              |

> 🔸 일부 전화번호는 보안상 마스킹 처리됨 (`010-0000-0000`)

---

## 🔹 2. `meetings` 컬렉션

정기/비정기 모임 정보를 담고 있습니다.

| 필드명                     | 타입        | 설명 |
|----------------------------|-------------|------|
| `id`                       | number      | 모임 ID (`yyyyMM` 형식 추정) |
| `date`                     | ISO string  | 모임 날짜 (예: `"2022-03-22T11:00:00"`) |
| `name`                     | string      | 모임 명칭 |
| `type`                     | string      | 모임 유형 (`regular`, `special`) |
| `status`                   | string      | 상태 (`완료`, `예정`) |
| `location`                 | string      | 장소 |
| `course`                   | string      | 코스 정보 |
| `participants`             | number[]    | 회원 ID 목록 |
| `description`              | string      | 모임 설명 |
| `result_link`              | string?     | 결과 링크 (null 가능) |
| `map_url`                  | string?     | 지도 링크 (null 가능) |
| `special_event_description`| string?     | 특별행사 설명 |
| `is_special_tournament`    | boolean     | 특별 대회 여부 |

---

## 🔹 3. `scores` 컬렉션

모임별 스코어 정보를 저장합니다.

| 필드명       | 타입    | 설명 |
|--------------|---------|------|
| `id`         | string  | 문서 ID |
| `member_id`  | number  | 회원 ID (외래키) |
| `meeting_id` | number  | 모임 ID (외래키) |
| `gross_score`| number  | 총 타수 (18홀 기준 합산) |

---

## 🔹 4. `special_awards` 컬렉션

특별상 수상자 정보를 저장합니다.

| 필드명         | 타입      | 설명 |
|----------------|-----------|------|
| `id`           | string    | 문서 ID |
| `meeting_id`   | number    | 모임 ID |
| `member_id`    | number    | 수상자 회원 ID |
| `member_name`  | string?   | 수상자 이름 (일부 문서에만 존재) |
| `category`     | string    | 시상 항목 (예: `longest_male`) |
| `score`        | string    | 기록 (`"81타"`, `"4m"` 등) |
| `hole_number`  | number?   | 해당 홀 번호 (선택적 필드) |
| `created_at`   | timestamp | 생성 시각 (`_seconds`, `_nanoseconds`) |
| `updated_at`   | timestamp | 수정 시각 |

---

## 🔗 컬렉션 간 관계

- `members.id` ←→ `scores.member_id`, `special_awards.member_id`, `meetings.participants[]`
- `meetings.id` ←→ `scores.meeting_id`, `special_awards.meeting_id`

> 모든 관계는 `number` 타입 ID 기준으로 연결됩니다.

---

## 📝 활용 안내

- 해당 구조는 Firebase Admin SDK 기반 JSON 추출 결과를 바탕으로 정리되었습니다.
- 추후 필드가 추가되거나 변경되는 경우, 이 문서를 함께 업데이트하세요.
- 실제 Firestore 사용 시 보안 규칙 및 색인 설정도 함께 관리되어야 합니다.

