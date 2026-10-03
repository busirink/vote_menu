import React, { useState } from 'react';
import { compressImage } from '../utils/imageCompressor';

export default function MenuFormModal({ isOpen, onClose, onAddMenu, existingMenuNames }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
      return;
    }

    try {
      setIsProcessing(true);
      setError('');
      const compressed = await compressImage(file, 600, 0.7);
      setImage(compressed);
      setPreviewUrl(compressed);
    } catch (err) {
      setError('ไม่สามารถประมวลผลรูปภาพได้');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('กรุณาระบุชื่อเมนู');
      return;
    }

    const isDuplicate = existingMenuNames.some(
      (n) => n.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setError('มีชื่อเมนูนี้ในรายการแล้ว');
      return;
    }

    onAddMenu({
      name: trimmedName,
      price: price ? parseFloat(price) : 0,
      image,
    });

    setName('');
    setPrice('');
    setImage('');
    setPreviewUrl('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl border border-zinc-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">เพิ่มเมนูอาหาร</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-sm font-medium"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              ชื่อเมนู <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น ข้าวกะเพราหมูกรอบ, ชาไทยเย็น"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">ราคา (บาท)</label>
            <input
              type="number"
              min="0"
              placeholder="เช่น 60"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">รูปภาพเมนู</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
            />
            {isProcessing && <p className="text-[11px] text-zinc-400 mt-1">กำลังย่อขนาดรูปภาพ...</p>}

            {previewUrl && (
              <div className="mt-2.5 relative w-full h-28 rounded-lg overflow-hidden border border-zinc-200">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImage('');
                    setPreviewUrl('');
                  }}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 rounded-lg border border-zinc-200 hover:bg-zinc-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50"
            >
              บันทึกเมนู
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}