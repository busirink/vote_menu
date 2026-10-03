import React from 'react';
import MenuCard from './MenuCard';

export default function MenuGrid({
  menus,
  votedMenuId,
  isVotingClosed,
  onVote,
  onDeleteMenu,
  onOpenCreateModal,
}) {
  if (menus.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white border border-dashed border-zinc-200 rounded-2xl">
        <span className="text-4xl block mb-2">📋</span>
        <h3 className="text-base font-semibold text-zinc-800">ยังไม่มีเมนูอาหารในระบบ</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
          เริ่มต้นเปิดโหวตด้วยการเพิ่มเมนูอาหารหรือเครื่องดื่มรายการแรกกันเลย
        </p>
        <button
          onClick={onOpenCreateModal}
          className="mt-4 px-4 py-2 text-xs sm:text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          + เพิ่มเมนูแรก
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {menus.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          isVotedByMe={votedMenuId === menu.id}
          canVote={!votedMenuId}
          isVotingClosed={isVotingClosed}
          onVote={onVote}
          onDelete={onDeleteMenu}
        />
      ))}
    </div>
  );
}