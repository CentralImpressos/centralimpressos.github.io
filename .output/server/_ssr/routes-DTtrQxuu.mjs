import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Phone, c as Mail, d as Download, f as Clock, i as Printer, l as Instagram, m as ArrowUpRight, n as Sparkles, o as PenTool, p as BadgeCheck, r as Share2, s as MapPin, t as Truck, u as Globe } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DTtrQxuu.js
var import_jsx_runtime = require_jsx_runtime();
var central_logo_png_asset_default = {
	version: 1,
	asset_id: "eb35a965-f8e2-4fa4-8190-77dc437597a3",
	project_id: "dec4fc59-c1e1-4a46-8bc7-c60765c4bf93",
	url: "/__l5e/assets-v1/eb35a965-f8e2-4fa4-8190-77dc437597a3/central-logo.png",
	r2_key: "a/v1/dec4fc59-c1e1-4a46-8bc7-c60765c4bf93/eb35a965-f8e2-4fa4-8190-77dc437597a3/central-logo.png",
	original_filename: "central-logo.png",
	size: 109330,
	content_type: "image/png",
	created_at: "2026-08-27T13:06:23Z"
};
var grafica_hero_default = "/assets/grafica-hero-D0Qi1fgg.jpg";
var WHATSAPP = "5549984379052";
var TELEFONE_EXIBICAO = "(49) 9.8437-9052";
var EMAIL = "centralchape@gmail.com";
var INSTAGRAM = "centralimpressoschapeco";
var ENDERECO = "Rua Rio de Janeiro, 381 D — Bairro Presidente Médici, Chapecó – SC, 89801-210";
var SITE = "https://www.centralimpressos.com.br/";
var contatos = [
	{
		icon: Phone,
		label: "WhatsApp",
		value: TELEFONE_EXIBICAO,
		href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo cartão digital e gostaria de um orçamento.")}`
	},
	{
		icon: Instagram,
		label: "Instagram",
		value: `@${INSTAGRAM}`,
		href: `https://instagram.com/${INSTAGRAM}`
	},
	{
		icon: Mail,
		label: "E-mail",
		value: EMAIL,
		href: `mailto:${EMAIL}`
	},
	{
		icon: MapPin,
		label: "Endereço",
		value: ENDERECO,
		href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`
	},
	{
		icon: Globe,
		label: "Site oficial",
		value: "centralimpressos.com.br",
		href: SITE
	}
];
var servicos = [
	{
		icon: Printer,
		title: "Impressão Digital",
		desc: "Alta definição, cores fiéis e acabamento impecável em cada tiragem."
	},
	{
		icon: Truck,
		title: "Entrega Rápida",
		desc: "Produção ágil e entrega expressa em Chapecó e toda a região."
	},
	{
		icon: PenTool,
		title: "Criamos sua Arte",
		desc: "Nossa equipe cria a arte do seu material sem custo extra."
	},
	{
		icon: BadgeCheck,
		title: "Qualidade Garantida",
		desc: "Revisamos cada detalhe antes da entrega. Satisfação garantida."
	}
];
var diferenciais = [{
	icon: Sparkles,
	title: "Acabamento premium",
	desc: "Materiais selecionados e revisão em cada tiragem."
}, {
	icon: Clock,
	title: "Prazo que cumpre",
	desc: "Produção ágil para demandas urgentes de Chapecó e região."
}];
var tira = [
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
	"Vira Mate"
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
		"END:VCARD"
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
		url: typeof window !== "undefined" ? window.location.href : SITE
	};
	if (typeof navigator !== "undefined" && navigator.share) try {
		await navigator.share(dados);
		return;
	} catch {}
	if (typeof navigator !== "undefined" && navigator.clipboard) await navigator.clipboard.writeText(dados.url);
}
function CartaoDigital() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 -z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-brand opacity-[0.18] blur-[120px] animate-aurora" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-52 -right-32 h-[34rem] w-[34rem] rounded-full bg-gradient-brand opacity-[0.13] blur-[130px] animate-aurora",
					style: { animationDelay: "-8s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-xl px-5 pb-16 pt-10 sm:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "animate-rise relative overflow-hidden rounded-4xl border border-border bg-gradient-surface p-7 shadow-card sm:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "animate-logo-reveal relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute -inset-6 rounded-full bg-gradient-brand opacity-30 blur-3xl animate-logo-glow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "animate-logo-shine relative overflow-hidden rounded-[2rem] bg-white px-10 py-7 shadow-glow ring-1 ring-white/60 sm:px-12 sm:py-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: central_logo_png_asset_default.url,
										alt: "Central Impressos — logotipo",
										width: 520,
										height: 220,
										className: "h-24 w-auto sm:h-32"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-primary",
								children: "Gráfica & Comunicação Visual"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 text-3xl font-extrabold leading-tight sm:text-4xl",
								children: ["Sua marca impressa com ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-brand",
									children: "alta qualidade"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
								children: "Atendimento personalizado em Chapecó – SC. Do orçamento à entrega, cuidamos de cada detalhe para o seu material ficar impecável."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex w-full flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de um orçamento.")}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "animate-pulse-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Pedir orçamento"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: baixarContato,
									className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-bold text-secondary-foreground transition-all duration-300 hover:border-primary hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Salvar contato"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-rise mt-6 overflow-hidden rounded-full border border-border bg-surface/60 py-3",
					style: { animationDelay: "120ms" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-max animate-marquee gap-8 pr-8",
						children: [...tira, ...tira].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
							children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" })]
						}, i))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "animate-rise group relative mt-6 overflow-hidden rounded-3xl border border-border shadow-card",
					style: { animationDelay: "200ms" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: grafica_hero_default,
							alt: "Impressora digital de grande formato produzindo materiais coloridos na Central Impressos",
							width: 1600,
							height: 1008,
							className: "h-56 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 sm:h-72"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-0 left-0 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-extrabold sm:text-xl",
								children: "Tecnologia de impressão digital"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Cores vivas, precisão e alta durabilidade."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-bold uppercase tracking-[0.32em] text-primary",
						children: "Serviços"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: servicos.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "animate-rise card-hover rounded-2xl border border-border bg-surface/70 p-5 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow",
							style: { animationDelay: `${260 + i * 90}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-base font-bold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
									children: s.desc
								})
							]
						}, s.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: diferenciais.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-rise flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5",
						style: { animationDelay: `${640 + i * 90}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(d.icon, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							children: d.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: d.desc
						})] })]
					}, d.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-bold uppercase tracking-[0.32em] text-primary",
						children: "Contato"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: contatos.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: c.href,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "animate-rise card-hover group flex items-center gap-4 rounded-2xl border border-border bg-surface/70 p-4 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow",
							style: { animationDelay: `${820 + i * 80}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-primary transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
										children: c.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm font-semibold",
										children: c.value
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" })
							]
						}, c.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: compartilhar,
					className: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:border-primary hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Compartilhar cartão"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-10 border-t border-border pt-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: "Central Impressos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: ENDERECO
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" — Todos os direitos reservados"
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { CartaoDigital as component };
