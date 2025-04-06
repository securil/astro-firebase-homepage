import { useState } from 'react';
import StatsSummary from './StatsSummary.jsx';

export default function StatsTabs({ statsByYear }) {
  const [selectedYear, setSelectedYear] = useState('전체');
  const [searchName, setSearchName] = useState('');

  const years = Object.keys(statsByYear).sort();

  // 전체 통계 데이터를 합치는 함수
  const mergeAllYears = (statsByYear) => {
    let all = { scores: [], members: [], meetings: [], specialAwards: [] };

    Object.values(statsByYear).forEach((yearData) => {
      all.scores.push(...yearData.scores);
      all.members.push(...yearData.members);
      all.meetings.push(...yearData.meetings);
      if (yearData.specialAwards) {
        all.specialAwards.push(...yearData.specialAwards);
      }
    });

    return all;
  };

  // 이름 필터링 함수
  const filterByName = (data, name) => {
    if (!name.trim()) return data;

    const lower = name.trim().toLowerCase();

    return {
      ...data,
      scores: data.scores.filter(score =>
        score.member_name?.toLowerCase().includes(lower)
      )
    };
  };

  // 렌더링할 데이터 결정
  let content = null;

  if (selectedYear === '전체') {
    const mergedStats = mergeAllYears(statsByYear);
    const filtered = filterByName(mergedStats, searchName);

    // 데이터가 있을 때만 출력
    content = (
      filtered.scores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">전체 통계</h2>
          <StatsSummary data={filtered} />
        </section>
      )
    );
  } else {
    const yearStats = statsByYear[selectedYear];
    const filtered = filterByName(yearStats, searchName);

    content = (
      filtered.scores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedYear}년 통계</h2>
          <StatsSummary data={filtered} />
        </section>
      )
    );
  }

  return (
    <div>
         {/* 연도 선택 탭 */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['전체', ...years].map((year) => (
          <button
            key={year}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              selectedYear === year
                ? 'btn-primary'
                : 'border border-primary text-primary hover:bg-primary hover:text-white'
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* 출력 콘텐츠 */}
      {content || (
        <p className="text-sm text-gray-500 italic">일치하는 통계 정보가 없습니다.</p>
      )}
    </div>
  );
}
