interface AdBannerProps {
  title?: string;
  size?: "horizontal" | "box" | "vertical";
}

export default function AdBanner({ title = "مساحة إعلانية", size = "horizontal" }: AdBannerProps) {
  let sizeClasses = "w-full h-24 md:h-28"; // الافتراضي عرضي أفقي
  
  if (size === "box") {
    sizeClasses = "w-full h-64";
  } else if (size === "vertical") {
    sizeClasses = "w-full h-[400px]";
  }

  return (
    <div className={`my-6 relative bg-slate-900 border border-amber-500/20 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden shadow-xl group ${sizeClasses}`}>
      {/* إطار وتأثيرات ذهبية خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-50 pointer-events-none"></div>
      
      {/* نص توضيحي (يمكن استبداله لاحقاً بكود Google AdSense أو صور إعلانية) */}
      <span className="text-[10px] tracking-widest text-amber-500/60 uppercase mb-1 font-medium">
        {title}
      </span>
      <div className="border border-dashed border-slate-700 rounded-xl w-full h-full flex items-center justify-center bg-slate-950/50 group-hover:border-amber-500/40 transition-colors">
        <p className="text-xs text-slate-500 font-medium">
          مكان إعلان مخصص (Google AdSense / Banner)
        </p>
      </div>
    </div>
  );
}