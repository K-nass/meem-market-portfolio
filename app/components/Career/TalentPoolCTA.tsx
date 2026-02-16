interface TalentPoolCTAProps {
  title: string;
  description: string;
  email: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export default function TalentPoolCTA({
  title,
  description,
  email,
  buttonText,
  onButtonClick,
}: TalentPoolCTAProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-right">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-black text-white mb-4">{title}</h2>
              <p className="text-lg text-blue-100 mb-6">{description}</p>
              <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-3 rounded-xl border border-white/20">
                <span className="material-symbols-outlined text-gold">mail</span>
                <a
                  className="text-white font-bold hover:text-gold transition-colors"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <button
                onClick={onButtonClick}
                className="bg-gold hover:bg-yellow-600 text-primary-dark px-10 py-4 rounded-xl font-black transition-all transform hover:scale-105 shadow-xl"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
