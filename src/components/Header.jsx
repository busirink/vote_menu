import React from 'react';

export default function Header({
  isVotingClosed,
  onOpenCreateModal,
  onToggleVotingStatus,
  onResetAll,
}) {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-lg">
            🍽️
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-zinc-900 leading-tight">
              กินไรดี (WhatToEat)
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span
                className={`w-2 h-2 rounded-full ${
                  isVotingClosed ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'
                }`}
              />
              <span>{isVotingClosed ? 'ปิดโหวตแล้ว' : 'เปิดให้โหวตอยู่'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isVotingClosed && (
            <button
              onClick={onOpenCreateModal}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              + เพิ่มเมนู
            </button>
          )}

          <button
            onClick={onToggleVotingStatus}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
              isVotingClosed
                ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {isVotingClosed ? 'เปิดโหวตใหม่' : 'ปิดโหวต / ดูผู้ชนะ'}
          </button>

          <button
            onClick={onResetAll}
            title="ล้างข้อมูลทั้งหมดเพื่อเริ่มรอบใหม่"
            className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors text-xs"
          >
            รีเซ็ต
          </button>
        </div>
      </div>
    </header>
  );
}