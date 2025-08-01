import React from 'react';

const ResponsiveScoreTable = ({ scores, title, isPinkTheme = false }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* 데스크톱 테이블 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-center font-bold">순위</th>
              <th className="px-6 py-4 text-left font-bold">선수</th>
              <th className="px-6 py-4 text-left font-bold">코스</th>
              <th className="px-6 py-4 text-center font-bold">전반</th>
              <th className="px-6 py-4 text-center font-bold">후반</th>
              <th className="px-6 py-4 text-center font-bold">총합</th>
              <th className="px-6 py-4 text-center font-bold">파대비</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {scores?.map((player) => (
              <tr 
                key={`${player.rank}-${player.name}`}
                className={`hover:bg-gray-50 transition-colors ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 
                  player.score < 85 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 
                  player.score < 95 ? 'bg-gradient-to-r from-blue-50 to-cyan-50' : ''
                }`}
              >
                <td className="px-6 py-4 text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                    player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg' : 
                    player.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-lg' : 
                    player.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-yellow-600 text-white shadow-lg' : 
                    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
                  }`}>
                    {player.rank <= 3 && (
                      <span>{player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}</span>
                    )}
                    {player.rank > 3 && player.rank}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-gray-900">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.generation}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{player.course}</td>
                <td className="px-6 py-4 text-center font-semibold">{player.front}</td>
                <td className="px-6 py-4 text-center font-semibold">{player.back}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-bold text-lg ${
                    player.score < 75 ? 'text-purple-600' :
                    player.score < 85 ? 'text-green-600' :
                    player.score < 95 ? 'text-blue-600' :
                    'text-gray-800'
                  }`}>
                    {player.score}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    player.score < 72 ? 'bg-purple-100 text-purple-800' :
                    player.score === 72 ? 'bg-blue-100 text-blue-800' :
                    player.score < 80 ? 'bg-green-100 text-green-800' :
                    player.score < 90 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {player.score < 72 ? `E${72 - player.score}` :
                     player.score === 72 ? 'E' :
                     `+${player.score - 72}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모바일 카드 레이아웃 */}
      <div className="md:hidden">
        {/* 헤더 */}
        <div className={`${isPinkTheme ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gradient-to-r from-gray-800 to-gray-900'} text-white p-4`}>
          <h3 className="text-lg font-bold text-center">{title}</h3>
        </div>

        {/* 카드 리스트 */}
        <div className="divide-y divide-gray-100">
          {scores?.map((player) => (
            <div 
              key={`mobile-${player.rank}-${player.name}`}
              className={`p-4 ${
                player.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 
                player.score < 85 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 
                player.score < 95 ? 'bg-gradient-to-r from-blue-50 to-cyan-50' : 'bg-white'
              }`}
            >
              {/* 순위 + 이름 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                    player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg' : 
                    player.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-lg' : 
                    player.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-yellow-600 text-white shadow-lg' : 
                    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
                  }`}>
                    {player.rank <= 3 ? (
                      <span className="text-lg">{player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}</span>
                    ) : (
                      <span className="text-sm">{player.rank}</span>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.generation} • {player.course}</div>
                  </div>
                </div>

                {/* 총 스코어 */}
                <div className="text-right">
                  <div className={`font-bold text-2xl ${
                    player.score < 75 ? 'text-purple-600' :
                    player.score < 85 ? 'text-green-600' :
                    player.score < 95 ? 'text-blue-600' :
                    'text-gray-800'
                  }`}>
                    {player.score}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                    player.score < 72 ? 'bg-purple-100 text-purple-800' :
                    player.score === 72 ? 'bg-blue-100 text-blue-800' :
                    player.score < 80 ? 'bg-green-100 text-green-800' :
                    player.score < 90 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {player.score < 72 ? `E${72 - player.score}` :
                     player.score === 72 ? 'E' :
                     `+${player.score - 72}`}
                  </div>
                </div>
              </div>

              {/* 전반/후반 스코어 */}
              <div className="flex justify-center gap-6 bg-white bg-opacity-60 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-medium">전반</div>
                  <div className="text-lg font-bold text-gray-800">{player.front}</div>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-medium">후반</div>
                  <div className="text-lg font-bold text-gray-800">{player.back}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveScoreTable;
