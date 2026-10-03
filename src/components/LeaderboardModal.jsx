import React from 'react';

export default function LeaderboardModal({ isOpen, onClose, menus }) {
  if (!isOpen) return null;

  const sortedMenus = [...menus].sort((a, b) => b.votes - a.votes);
  const winner = sortedMenus[0];
  const runnersUp = sortedMenus.slice(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-zinc-200 shadow-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">🏆 สรุปผลเมนูยอดนิยม</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-sm font-medium"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {winner && winner.votes > 0 ? (
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 flex items-center gap-4">
              {winner.image ? (
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-20 h-20 rounded-lg object-cover border border-amber-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-amber-100 flex items-center justify-center text-3xl">
                  🥇
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                  มติเอกฉันท์อันดับ 1
                </span>
                <h3 className="text-base font-bold text-zinc-900 truncate mt-0.5">
                  {winner.name}
                </h3>
                <p className="text-xs text-zinc-500">
                  {winner.price ? `฿${Number(winner.price).toLocaleString()}` : 'ไม่ระบุราคา'}
                </p>
                <div className="mt-1 text-xs font-semibold text-amber-900">
                  🔥 รวม {winner.votes} เสียง
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-zinc-400 text-sm">
              ยังไม่มีคะแนนโหวตในรอบนี้
            </div>
          )}

          {runnersUp.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                อันดับอื่น ๆ
              </h4>
              <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
                {runnersUp.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-zinc-400 w-4">
                        #{index + 2}
                      </span>
                      <span className="font-medium text-zinc-800">{item.name}</span>
                    </div>
                    <span className="text-zinc-500 font-medium">
                      {item.votes} โหวต
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
