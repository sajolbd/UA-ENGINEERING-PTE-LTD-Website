import Image from "next/image";
import Link from "next/link";
import Container from "components/shared/Container";

const services = [
  {
    title: "Renovation & Upgrading",
    icon: "/images/home/service-card/Renovation Upgrading - UA Engineering.png",
    slug: "renovation-upgrading",
  },
  {
    title: "Structural & Exterior Works",
    icon: "/images/home/service-card/Structural Exterior Works - UA Engineering.png",
    slug: "structural-exterior-works",
  },
  {
    title: "Painting & Waterproofing",
    icon: "/images/home/service-card/Painting Waterproofing - UA Engineering.png",
    slug: "painting-waterproofing",
  },
  {
    title: "Aluminium & Glazing Works",
    icon: "/images/home/service-card/Aluminium Glazing Works - UA Engineering.png",
    slug: "aluminium-glazing-works",
  },
  {
    title: "Electrical, Plumbing & Aircon",
    icon: "/images/home/service-card/Electrical Plumbing Aircon - UA Engineering.png",
    slug: "electrical-plumbing-aircon",
  },
  {
    title: "Solar Panel Installation",
    icon: "/images/home/service-card/Solar Panel Installation - UA Engineering.png",
    slug: "solar-panel-installation",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-8 lg:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {services.map(({ title, icon, slug }) => (
            <Link
              key={title}
              href={`/services/${slug}`}
              className="group flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 py-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:bg-primary hover:shadow-[0_12px_30px_rgba(100,18,21,0.15)] sm:min-h-[200px]"
            >
              <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                <Image
                  src={icon}
                  alt={title}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-2 text-base font-bold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-white">
                {title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}