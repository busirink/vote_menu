import React from 'react';

export default function VotingStatusBanner({ hasVotedMenu, onCancelVote, isVotingClosed }) {
  if (!hasVotedMenu && !isVotingClosed) {
    return (
      <div className="bg-zinc-50 border border-zinc-200 text-zinc-600 rounded-xl p-3.5 text-xs sm:text-sm text-center">
        💡 คุณมีสิทธิ์โหวต <strong>1 เสียง</strong> เลือกเมนูที่คุณอยากกินได้เลย
      </div>
    );
  }

  if (hasVotedMenu && !isVotingClosed) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 flex items-center justify-between text-xs sm:text-sm">
        <span>
          ✅ คุณได้โหวตให้เมนู: <strong>{hasVotedMenu.name}</strong> เรียบร้อยแล้ว
        </span>
        <button
          onClick={onCancelVote}
          className="underline font-medium hover:text-emerald-950 transition-colors ml-2"
        >
          ยกเลิกโหวต
        </button>
      </div>
    );
  }

  return null;
}