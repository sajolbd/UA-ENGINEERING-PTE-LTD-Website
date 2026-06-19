import {
  Building2,
  Droplets,
  Hammer,
  Paintbrush,
  PanelsTopLeft,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import Container from "components/shared/Container";

const services = [
  {
    title: "Renovation & Upgrading",
    icon: Hammer,
  },
  {
    title: "Structural & Exterior Works",
    icon: Building2,
  },
  {
    title: "Painting & Waterproofing",
    icon: Paintbrush,
    secondIcon: Droplets,
  },
  {
    title: "Aluminium & Glazing Works",
    icon: PanelsTopLeft,
  },
  {
    title: "Electrical, Plumbing & Aircon",
    icon: Zap,
    secondIcon: Wrench,
  },
  {
    title: "Solar Panel Installation",
    icon: Sun,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-bold text-secondary sm:text-4xl">
            Our Services
          </h2>
        </div>

        <div className="mt-10 grid overflow-hidden border border-slate-100 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map(({ title, icon: Icon, secondIcon: SecondIcon }) => (
            <div
              key={title}
              className="group flex min-h-[180px] flex-col items-center justify-center border-b border-r border-slate-100 px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:shadow-xl sm:min-h-[200px] xl:border-b-0"
            >
              <div className="relative flex h-16 w-16 items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon size={54} strokeWidth={1.8} />
                {SecondIcon ? (
                  <span className="absolute -right-2 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-colors duration-300 group-hover:bg-secondary">
                    <SecondIcon size={21} strokeWidth={2} />
                  </span>
                ) : null}
              </div>

              <h3 className="mt-6 text-lg font-bold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-white">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}