import React from 'react';

const RECOMMENDED_ITEMS = [
  {
    id: 'rec_1',
    name: 'ข้าวกะเพราหมูกรอบไข่ดาว',
    price: 65,
    category: 'อาหารจานเดียว',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=60',
    description: 'เมนูสิ้นคิดที่ไม่เคยทำให้ผิดหวัง กรอบเข้มเต็มคำ'
  },
  {
    id: 'rec_2',
    name: 'ข้าวขาหมูเนื้อหนังไข่',
    price: 60,
    category: 'อาหารจานเดียว',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60',
    description: 'ขาหมูพะโล้เข้มข้น นุ่มละลายในปาก ผักกาดดองตัดเลี่ยน'
  },
  {
    id: 'rec_3',
    name: 'ส้มตำไทย + ไก่ย่างข้าวเหนียว',
    price: 90,
    category: 'อีสานแซ่บ',
    image: 'https://images.unsplash.com/photo-1569058242252-623df46b5025?w=500&auto=format&fit=crop&q=60',
    description: 'สายแซ่บยามบ่าย แก้ง่วง คลีนจัดจ้าน'
  },
  {
    id: 'rec_4',
    name: 'ก๋วยเตี๋ยวต้มยำหมูมะนาวสด',
    price: 55,
    category: 'เส้น/ก๋วยเตี๋ยว',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
    description: 'ซดน้ำซุปร้อนๆ เปรี้ยวเผ็ดแซ่บตาสว่าง'
  },
  {
    id: 'rec_5',
    name: 'ข้าวมันไก่ผสม (ต้ม+ทอด)',
    price: 60,
    category: 'อาหารจานเดียว',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60',
    description: 'ข้าวหอมนุ่ม ไก่ฉ่ำๆ พร้อมน้ำจิ้มเต้าเจี้ยวรสเด็ด'
  },
  {
    id: 'rec_6',
    name: 'ชาไทยเย็นปั่น (หวานน้อย)',
    price: 45,
    category: 'เครื่องดื่ม',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=60',
    description: 'ชาร์จพลังช่วงบ่าย ชาเข้มสะใจ หวานมันกำลังดี'
  }
];

export default function RecommendedMenu({ onAddRecommended, existingMenuNames = [] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
            ไอเดียสำหรับคนคิดไม่ออก
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2">💡 รายการอาหารแนะนำยอดฮิต</h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-1">
            กดเพิ่มเข้าสู่กระดานโหวตได้ทันทีเพื่อเปิดให้ทุกคนในทีมร่วมลงคะแนน
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {RECOMMENDED_ITEMS.map((item) => {
          const isAlreadyAdded = existingMenuNames.includes(item.name);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-zinc-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-zinc-900 text-base">{item.name}</h3>
                    <span className="font-extrabold text-amber-600 text-sm whitespace-nowrap">
                      {item.price} ฿
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  type="button"
                  disabled={isAlreadyAdded}
                  onClick={() =>
                    onAddRecommended({
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isAlreadyAdded
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs active:scale-95'
                  }`}
                >
                  {isAlreadyAdded ? '✓ อยู่ในกระดานโหวตแล้ว' : '+ เพิ่มเข้ากระดานโหวต'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}