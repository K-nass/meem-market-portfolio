interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  title: string;
  features: Feature[];
}

export default function WhyChooseSection({ title, features }: WhyChooseSectionProps) {
  return (
    <div className="mt-20 py-12 border-y border-slate-200 text-center space-y-4">
      <h3 className="text-2xl font-black text-primary">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
            </div>
            <h4 className="font-bold text-slate-900">{feature.title}</h4>
            <p className="text-sm text-slate-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
