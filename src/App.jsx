import React, { useState, useEffect } from 'react';
import Header from "./components/Header.jsx";
import VotingStatusBanner from "./components/VotingStatusBanner.jsx";
import MenuGrid from "./components/MenuGrid.jsx";
import MenuFormModal from "./components/MenuFormModal.jsx";
import LeaderboardModal from "./components/LeaderboardModal.jsx";
import RecommendedMenu from "./components/RecommendedMenu.jsx";
import { compressImage } from "./utils/imageCompressor.js";

const STORAGE_KEY_MENUS = 'food_voting_menus';
const STORAGE_KEY_VOTE = 'food_voting_user_vote';
const STORAGE_KEY_CLOSED = 'food_voting_is_closed';

export default function App() {
  // 1. States หลัก (คงเดิม 100%)
  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENUS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [votedMenuId, setVotedMenuId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_VOTE) || null;
  });

  const [isVotingClosed, setIsVotingClosed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_CLOSED) === 'true';
  });

  // Modal States (คงเดิม)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // แท็บหน้าปัจจุบัน: 'voting' = หน้ากระดานโหวต, 'recommended' = หน้ารายการอาหารแนะนำ
  const [activeTab, setActiveTab] = useState('voting');

  // 2. Local Storage Sync (คงเดิม 100%)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MENUS, JSON.stringify(menus));
    } catch (e) {
      console.error('LocalStorage Limit Exceeded', e);
      alert('พื้นที่จัดเก็บข้อมูลเต็ม กรุณาลบรูปภาพหรือเมนูเก่าออกบ้าง');
    }
  }, [menus]);

  useEffect(() => {
    if (votedMenuId) {
      localStorage.setItem(STORAGE_KEY_VOTE, votedMenuId);
    } else {
      localStorage.removeItem(STORAGE_KEY_VOTE);
    }
  }, [votedMenuId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CLOSED, String(isVotingClosed));
  }, [isVotingClosed]);

  // 3. Handlers (คงเดิม 100%)
  const handleAddMenu = ({ name, price, image }) => {
    const newMenu = {
      id: crypto.randomUUID(),
      name,
      price,
      image,
      votes: 0,
      createdAt: Date.now(),
    };
    setMenus((prev) => [newMenu, ...prev]);
  };

  const handleDeleteMenu = (id) => {
    if (window.confirm('คุณต้องการลบเมนูนี้ใช่หรือไม่?')) {
      setMenus((prev) => prev.filter((m) => m.id !== id));
      if (votedMenuId === id) {
        setVotedMenuId(null);
      }
    }
  };

  const handleVote = (id) => {
    if (votedMenuId || isVotingClosed) return;

    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, votes: m.votes + 1 } : m))
    );
    setVotedMenuId(id);
  };

  const handleCancelVote = () => {
    if (!votedMenuId || isVotingClosed) return;

    setMenus((prev) =>
      prev.map((m) => (m.id === votedMenuId ? { ...m, votes: Math.max(0, m.votes - 1) } : m))
    );
    setVotedMenuId(null);
  };

  const handleToggleVotingStatus = () => {
    const nextStatus = !isVotingClosed;
    setIsVotingClosed(nextStatus);
    if (nextStatus) {
      setIsLeaderboardOpen(true);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('คุณต้องการรีเซ็ตผลโหวตและเมนูทั้งหมดเพื่อเริ่มรอบใหม่ใช่หรือไม่?')) {
      setMenus([]);
      setVotedMenuId(null);
      setIsVotingClosed(false);
      localStorage.removeItem(STORAGE_KEY_MENUS);
      localStorage.removeItem(STORAGE_KEY_VOTE);
      localStorage.removeItem(STORAGE_KEY_CLOSED);
    }
  };

  // Handler เพิ่มเมนูที่เลือกจากหน้ารายการแนะนำ แล้วสลับกลับมากระดานโหวตอัตโนมัติ
  const handleAddRecommendedMenu = (item) => {
    handleAddMenu(item);
    setActiveTab('voting');
  };

  const votedMenu = menus.find((m) => m.id === votedMenuId);

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 flex flex-col font-sans">
      {/* Header Bar */}
      <Header
        isVotingClosed={isVotingClosed}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onToggleVotingStatus={handleToggleVotingStatus}
        onResetAll={handleResetAll}
      />

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col gap-6">
        {/* Navigation Tabs Bar */}
        <div className="flex border-b border-zinc-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('voting')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'voting'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span>🍱 กระดานโหวต</span>
            <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-semibold">
              {menus.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommended')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'recommended'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <span>💡 เมนูอาหารแนะนำ</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              HIT
            </span>
          </button>
        </div>

        {/* View Switcher */}
        {activeTab === 'voting' ? (
          <>
            {/* Banner แจ้งเตือนสิทธิ์การโหวต */}
            <VotingStatusBanner
              hasVotedMenu={votedMenu}
              onCancelVote={handleCancelVote}
              isVotingClosed={isVotingClosed}
            />

            {/* ตารางแสดงเมนูทั้งหมด */}
            <MenuGrid
              menus={menus}
              votedMenuId={votedMenuId}
              isVotingClosed={isVotingClosed}
              onVote={handleVote}
              onDeleteMenu={handleDeleteMenu}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
            />
          </>
        ) : (
          /* หน้ารายการอาหารแนะนำ */
          <RecommendedMenu
            onAddRecommended={handleAddRecommendedMenu}
            existingMenuNames={menus.map((m) => m.name)}
          />
        )}
      </main>

      {/* Modals (คงเดิม) */}
      <MenuFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddMenu={handleAddMenu}
        existingMenuNames={menus.map((m) => m.name)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        menus={menus}
      />
    </div>
  );
}