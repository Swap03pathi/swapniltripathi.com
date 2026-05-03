import Footer from '../components/Footer';

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="relative z-10 pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto text-center py-32">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-sm text-white/30">Coming Soon</p>
      </div>
      <Footer />
    </div>
  );
}
