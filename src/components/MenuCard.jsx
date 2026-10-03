import React, { useState } from 'react';

export default function MenuCard({
  menu,
  isVotedByMe,
  canVote,
  isVotingClosed,
  onVote,
  onDelete,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col ${
        isVotedByMe
          ? 'border-zinc-900 ring-2 ring-zinc-900 shadow-md'
          : 'border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
      }`}
    >
      <div className="relative w-full h-44 bg-zinc-100 flex items-center justify-center overflow-hidden">
        {menu.image && !imgError ? (
          <img
            src={menu.image}
            alt={menu.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-zinc-300 flex flex-col items-center gap-1">
            <span className="text-3xl">🍲</span>
            <span className="text-[11px] text-zinc-400">ไม่มีรูปภาพ</span>
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-zinc-800 shadow-sm border border-zinc-200/60">
          🔥 {menu.votes} โหวต
        </div>

        {!isVotingClosed && (
          <button
            onClick={() => onDelete(menu.id)}
            className="absolute top-2.5 left-2.5 bg-white/80 backdrop-blur-md text-zinc-400 hover:text-red-500 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            title="ลบเมนูนี้"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-900 text-base leading-snug line-clamp-1">
            {menu.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {menu.price ? `฿${Number(menu.price).toLocaleString()}` : 'ไม่ระบุราคา'}
          </p>
        </div>

        <button
          onClick={() => onVote(menu.id)}
          disabled={!canVote || isVotingClosed}
          className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
            isVotedByMe
              ? 'bg-zinc-900 text-white hover:bg-zinc-800'
              : canVote && !isVotingClosed
              ? 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
          }`}
        >
          {isVotedByMe ? 'โหวตแล้ว ✓' : 'โหวตเมนูนี้'}
        </button>
      </div>
    </div>
  );
}