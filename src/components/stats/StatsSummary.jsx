import StatCard from '../ui/StatCard.jsx';
import { calculateSummaryStats } from '../../lib/service/stats-util';

export default function StatsSummary({ data, showChangeStats = true, cardSize = 'md', layout = 'grid', animated = true, className = '' }) {
  const stats = calculateSummaryStats(data);
  const {
    totalMembers,
    totalMeetings,
    avgScore,
    bestScore,
    bestScoreMemberName,
    holeInOnes = 0,
    prevYearComparison = {}
  } = stats;

  const layoutClasses = {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    flex: 'flex flex-wrap gap-4'
  };

  const containerClass = `stats-summary ${layoutClasses[layout]} ${className}`;

  return (
    <div className={containerClass}>
      <StatCard 
        title="참가 회원" 
        value={`${totalMembers ?? 0}명`} 
        icon="users" 
        color="blue"
        size={cardSize}
        showAnimation={animated}
        change={showChangeStats && prevYearComparison.totalMembersChange}
        changeLabel="전년 대비"
      />

      <StatCard 
        title="평균 스코어" 
        value={`${avgScore ?? '-'}${typeof avgScore === 'string' ? '' : '타'}`} 
        icon="chart-line" 
        color="green" 
        size={cardSize}
        showAnimation={animated}
        change={showChangeStats && prevYearComparison.avgScoreChange}
        changeLabel="전년 대비"
      />

      <StatCard 
        title="베스트 스코어" 
        value={`${bestScore ?? '-'}${typeof bestScore === 'number' ? '타' : ''}`} 
        icon="trophy" 
        color="yellow"
        size={cardSize}
        showAnimation={animated}
      />

      <StatCard 
        title="모임 횟수" 
        value={`${totalMeetings ?? 0}회`} 
        icon="calendar" 
        color="purple" 
        size={cardSize}
        showAnimation={animated}
        change={showChangeStats && prevYearComparison.meetingsChange}
        changeLabel="전년 대비"
      />

      {bestScoreMemberName && (
        <div className="col-span-full mt-2">
          <p className="text-sm text-gray-600 italic">
            베스트 스코어: <span className="font-medium">{bestScoreMemberName}</span>님의 {bestScore}타
          </p>
        </div>
      )}
    </div>
  );
}
