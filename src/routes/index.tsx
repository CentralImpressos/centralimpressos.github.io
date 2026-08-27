import { createFileRoute } from "@tanstack/react-router";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  Globe,
  Download,
  Share2,
  Printer,
  Truck,
  PenTool,
  BadgeCheck,
  Sparkles,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import logoAsset from "@/assets/central-logo.png.asset.json";
import heroImg from "@/assets/grafica-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Central Impressos | Cartão de Visita Digital — Chapecó SC" },
      {
        name: "description",
        content:
          "Cartão de visita digital da Central Impressos: impressão digital, comunicação visual, banners e brindes em Chapecó – SC. Fale pelo WhatsApp.",
      },
      { property: "og:title", content: "Central Impressos | Cartão de Visita Digital" },
      {
        property: "og:description",
        content:
          "Gráfica completa em Chapecó – SC. Impressão digital, banners, adesivos e comunicação visual com acabamento premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartaoDigital,
});

const WHATSAPP = "5549984379052";
const TELEFONE_EXIBICAO = "(49) 9.8437-9052";
const EMAIL = "centralchape@gmail.com";
const INSTAGRAM = "centralimpressoschapeco";
const ENDERECO = "Rua Rio de Janeiro, 381 D — Bairro Presidente Médici, Chapecó – SC, 89801-210";
const SITE = "https://www.centralimpressos.com.br/";

const contatos = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: TELEFONE_EXIBICAO,
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo cartão digital e gostaria de um orçamento.")}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: `@${INSTAGRAM}`,
    href: `https://instagram.com/${INSTAGRAM}`,
  },
  { icon: Mail, label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: MapPin,
    label: "Endereço",
    value: ENDERECO,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`,
  },
  { icon: Globe, label: "Site oficial", value: "centralimpressos.com.br", href: SITE },
];

const servicos = [
  { icon: Printer, title: "Impressão Digital", desc: "Alta definição, cores fiéis e acabamento impecável em cada tiragem." },
  { icon: Truck, title: "Entrega Rápida", desc: "Produção ágil e entrega expressa em Chapecó e toda a região." },
  { icon: PenTool, title: "Criamos sua Arte", desc: "Nossa equipe cria a arte do seu material sem custo extra." },
  { icon: BadgeCheck, title: "Qualidade Garantida", desc: "Revisamos cada detalhe antes da entrega. Satisfação garantida." },
];

const diferenciais = [
  { icon: Sparkles, title: "Acabamento premium", desc: "Materiais selecionados e revisão em cada tiragem." },
  { icon: Clock, title: "Prazo que cumpre", desc: "Produção ágil para demandas urgentes de Chapecó e região." },
];

const tira = [
  "Adesivos",
  "Banners e Lonas",
  "Baralhos",
  "Blocos, Recibos e Talões",
  "Cartão de Visita",
  "Cartazes e Pôsters",
  "Certificados",
  "Convites e Postais",
  "Crachás e Credenciais",
  "Displays",
  "Folder, Flyer e Panfleto",
  "Ímãs",
  "Ingressos e Pulseiras",
  "Marcadores e Réguas",
  "Papel Bandeja",
  "Papel Timbrado",
  "Pastas",
  "Placas Personalizadas",
  "Porta Copo",
  "Troféus",
  "Vira Mate",
];

function baixarContato() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Central Impressos;;;",
    "FN:Central Impressos",
    "ORG:Central Impressos",
    "TITLE:Gráfica e Comunicação Visual",
    `TEL;TYPE=CELL:+${WHATSAPP}`,
    `EMAIL:${EMAIL}`,
    `URL:${SITE}`,
    "ADR;TYPE=WORK:;;Rua Rio de Janeiro 381 D;Chapecó;SC;89801-210;Brasil",
    "END:VCARD",
  ].join("\n");
  const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "central-impressos.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

async function compartilhar() {
  const dados = {
    title: "Central Impressos",
    text: "Gráfica completa em Chapecó – SC",
    url: typeof window !== "undefined" ? window.location.href : SITE,
  };
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(dados);
      return;
    } catch {
      /* usuário cancelou */
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(dados.url);
  }
}

export function CartaoDigital() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fundo animado */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-brand opacity-[0.18] blur-[120px] animate-aurora" />
        <div
          className="absolute -bottom-52 -right-32 h-[34rem] w-[34rem] rounded-full bg-gradient-brand opacity-[0.13] blur-[130px] animate-aurora"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <main className="mx-auto w-full max-w-xl px-5 pb-16 pt-10 sm:pt-16">
        {/* Cartão principal */}
        <section className="animate-rise relative overflow-hidden rounded-4xl border border-border bg-gradient-surface p-7 shadow-card sm:p-10">
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheen"
          />
          <div className="relative flex flex-col items-center text-center">
            <div className="animate-logo-reveal relative">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full bg-gradient-brand opacity-30 blur-3xl animate-logo-glow"
              />
              <div className="animate-logo-shine relative overflow-hidden rounded-[2rem] bg-white px-10 py-7 shadow-glow ring-1 ring-white/60 sm:px-12 sm:py-8">
                <img
                  src={logoAsset.url}
                  alt="Central Impressos — logotipo"
                  width={520}
                  height={220}
                  className="h-24 w-auto sm:h-32"
                />
              </div>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              Gráfica &amp; Comunicação Visual
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Sua marca impressa com <span className="text-gradient-brand">alta qualidade</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Atendimento personalizado em Chapecó – SC. Do orçamento à entrega, cuidamos de cada
              detalhe para o seu material ficar impecável.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de um orçamento.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-pulse-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4" /> Pedir orçamento
              </a>
              <button
                onClick={baixarContato}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-bold text-secondary-foreground transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <Download className="h-4 w-4" /> Salvar contato
              </button>
            </div>
          </div>
        </section>

        {/* Tira animada */}
        <div
          className="animate-rise mt-6 overflow-hidden rounded-full border border-border bg-surface/60 py-3"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex w-max animate-marquee gap-8 pr-8">
            {[...tira, ...tira].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        </div>

        {/* Imagem */}
        <section
          className="animate-rise group relative mt-6 overflow-hidden rounded-3xl border border-border shadow-card"
          style={{ animationDelay: "200ms" }}
        >
          <img
            src={heroImg}
            alt="Impressora digital de grande formato produzindo materiais coloridos na Central Impressos"
            width={1600}
            height={1008}
            className="h-56 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-lg font-extrabold sm:text-xl">Tecnologia de impressão digital</p>
            <p className="mt-1 text-sm text-muted-foreground">Cores vivas, precisão e alta durabilidade.</p>
          </div>
        </section>

        {/* Serviços */}
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.32em] text-primary">Serviços</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {servicos.map((s, i) => (
              <article
                key={s.title}
                className="animate-rise card-hover rounded-2xl border border-border bg-surface/70 p-5 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                style={{ animationDelay: `${260 + i * 90}ms` }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Diferenciais */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {diferenciais.map((d, i) => (
            <div
              key={d.title}
              className="animate-rise flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5"
              style={{ animationDelay: `${640 + i * 90}ms` }}
            >
              <d.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-bold">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Contato */}
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.32em] text-primary">Contato</h2>
          <div className="mt-4 flex flex-col gap-3">
            {contatos.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-rise card-hover group flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-4 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow"
                style={{ animationDelay: `${820 + i * 80}ms` }}
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-primary transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="block truncate text-sm font-semibold">{c.value}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </section>

        <button
          onClick={compartilhar}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:border-primary hover:text-primary"
        >
          <Share2 className="h-4 w-4" /> Compartilhar cartão
        </button>

        <footer className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-sm font-bold">Central Impressos</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ENDERECO}</p>
          <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            © {new Date().getFullYear()} — Todos os direitos reservados
          </p>
        </footer>
      </main>
    </div>
  );
}
