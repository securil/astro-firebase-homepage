import{s as y,g as x}from"./stats-util.6jJzs6Aj.js";import"./firebase.C_mvUIfW.js";document.addEventListener("DOMContentLoaded",function(){const s=document.getElementById("sync-button"),a=document.getElementById("view-data-button"),c=document.getElementById("sync-status"),l=document.getElementById("sync-message"),o=document.getElementById("yearly-best-data");function e(t,r="info"){c.className=`mt-4 p-4 rounded-lg ${r==="success"?"bg-green-100 text-green-800":r==="error"?"bg-red-100 text-red-800":"bg-blue-100 text-blue-800"}`,l.textContent=t,c.classList.remove("hidden")}s.addEventListener("click",async function(){try{s.disabled=!0,s.textContent="동기화 중...",e("데이터 동기화를 시작합니다...","info");const t=await y();t&&t.length>0?(e(`동기화 완료! ${t.length}개의 연도별 베스트 스코어가 업데이트되었습니다.`,"success"),await d()):e("동기화할 데이터가 없습니다.","error")}catch(t){console.error("동기화 실패:",t),e(`동기화 실패: ${t.message}`,"error")}finally{s.disabled=!1,s.textContent="데이터 동기화 실행"}});async function d(){try{a.disabled=!0,a.textContent="조회 중...";const t=await x();if(t&&t.length>0){const r=`
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">베스트 스코어</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기수</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">모임ID</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${t.map((n,i)=>`
                    <tr class="${i%2===0?"bg-white":"bg-gray-50"}">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${n.year}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${n.score}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${n.memberName}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${n.generation}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${n.meetingId}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            `;o.innerHTML=r,e(`${t.length}개의 연도별 베스트 스코어 데이터를 조회했습니다.`,"success")}else o.innerHTML='<p class="text-gray-500">연도별 베스트 스코어 데이터가 없습니다.</p>',e("데이터가 없습니다. 동기화를 실행해주세요.","error")}catch(t){console.error("데이터 조회 실패:",t),e(`데이터 조회 실패: ${t.message}`,"error")}finally{a.disabled=!1,a.textContent="현재 데이터 조회"}}a.addEventListener("click",d)});
