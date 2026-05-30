import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  Coins,
  Search,
  ShieldCheck,
} from "lucide-react";
import { PublicNav } from "@/components/layout/public-nav";
import { ButtonLink } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

const features = [
  {
    icon: Camera,
    title: "Photos recto / verso",
    text: "Conservez les visuels essentiels de chaque monnaie dans une fiche privée.",
  },
  {
    icon: Coins,
    title: "Inventaire structuré",
    text: "Pays, période, métal, état, dimensions, notes et statut de collection.",
  },
  {
    icon: BarChart3,
    title: "Valeur indicative",
    text: "Suivez une fourchette basse, moyenne et haute sans promesse de valeur garantie.",
  },
  {
    icon: Search,
    title: "Prêt pour l’expertise",
    text: "Préparez vos fiches pour faciliter un futur échange avec un professionnel.",
  },
];

const plans = [
  {
    name: "Gratuit",
    price: "0 €",
    text: "Pour commencer une petite collection.",
    features: ["25 pièces", "Photos recto / verso", "Dashboard simple", "Collection privée"],
  },
  {
    name: "Premium",
    price: "Bientôt",
    text: "Pour les collectionneurs réguliers.",
    features: ["500 pièces", "Analyses mensuelles", "Exports préparés", "Statistiques avancées"],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Bientôt",
    text: "Pour experts, brocanteurs et inventaires importants.",
    features: ["2 000 pièces", "Quotas étendus", "Préparation marketplace", "Support prioritaire"],
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#020711] text-white">
      <PublicNav />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_77%_30%,rgba(245,183,64,0.2),transparent_24%),radial-gradient(circle_at_24%_16%,rgba(51,100,143,0.26),transparent_34%),linear-gradient(135deg,#020711_0%,#07111d_52%,#06080d_100%)]" />
          <div className="mx-auto grid min-h-[calc(100dvh-77px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_0.92fr] lg:px-8">
            <div>
              <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.05] text-white md:text-7xl">
                Gérez votre collection{" "}
                <span className="text-amber-300">numismatique</span> comme un
                professionnel.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Identifiez, organisez et valorisez vos monnaies anciennes en
                toute simplicité. NumisVault aide à structurer une collection et
                à préparer une estimation indicative à confirmer par un expert.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/register">
                  Créer mon compte gratuit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="secondary">
                  Découvrir les tarifs
                </ButtonLink>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                {["Sans carte bancaire", "Collection privée", "Estimation indicative"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="size-4 text-amber-300" aria-hidden="true" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <Panel className="relative overflow-hidden p-5">
              <div className="absolute right-6 top-6 grid size-24 place-items-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-200">
                <Coins className="size-12" aria-hidden="true" />
              </div>
              <div className="grid gap-5">
                <div>
                  <p className="text-sm text-slate-400">Tableau de bord</p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Aperçu de votre collection
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["184", "Pièces"],
                    ["32", "Pays"],
                    ["8 420 €", "Valeur indicative"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-white/10 bg-slate-950/50 p-4"
                    >
                      <p className="text-2xl font-semibold text-white">{value}</p>
                      <p className="mt-1 text-sm text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3">
                  {[
                    ["20 Francs Napoléon III", "1867 · Or", "385 €"],
                    ["5 Francs Semeuse", "1960 · Argent", "42 €"],
                    ["Denier romain", "IIe siècle · Ancienne", "120 €"],
                  ].map(([title, meta, value]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.045] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-full bg-amber-300/15 text-amber-200">
                          <Coins className="size-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-semibold text-white">{title}</span>
                          <span className="text-sm text-slate-400">{meta}</span>
                        </span>
                      </div>
                      <span className="font-semibold text-amber-100">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        </section>

        <section id="features" className="border-b border-white/10 px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold">
                Des fonctionnalités pensées pour les collectionneurs
              </h2>
              <p className="mt-4 text-slate-400">
                Une V1 centrée sur la donnée privée, la sécurité et une base
                extensible pour l’analyse et les abonnements.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Panel key={feature.title} className="p-5">
                  <feature.icon className="size-8 text-amber-300" aria-hidden="true" />
                  <h3 className="mt-5 font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-white/10 px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl font-bold">Comment ça marche ?</h2>
              <p className="mt-4 text-slate-400">
                Ajoutez une pièce, documentez ses informations, puis suivez une
                estimation indicative non contractuelle.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ["01", "Ajoutez votre pièce", "Renseignez les détails connus et ajoutez les photos recto/verso."],
                ["02", "Organisez votre collection", "Filtrez par pays, métal, statut ou recherche texte."],
                ["03", "Préparez l’expertise", "Gardez une fiche claire pour échanger avec un professionnel."],
              ].map(([step, title, text]) => (
                <div key={step} className="grid grid-cols-[64px_1fr] gap-4">
                  <div className="grid size-14 place-items-center rounded-full border border-amber-300/50 text-lg font-semibold text-amber-200">
                    {step}
                  </div>
                  <Panel className="p-5">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                  </Panel>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="font-serif text-4xl font-bold">
              Des tarifs adaptés à vos besoins
            </h2>
            <p className="mt-4 text-slate-400">
              Les abonnements sont préparés dans l’architecture. Le paiement
              sera branché dans une prochaine étape.
            </p>
            <div className="mt-10 grid gap-4 text-left lg:grid-cols-3">
              {plans.map((plan) => (
                <Panel
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "border-amber-300/70 p-6 shadow-[0_20px_80px_rgba(245,183,64,0.12)]"
                      : "p-6"
                  }
                >
                  <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-3 text-4xl font-bold text-white">{plan.price}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{plan.text}</p>
                  <ul className="mt-6 grid gap-3 text-sm text-slate-300">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="size-4 text-amber-300" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1fr]">
            <h2 className="font-serif text-4xl font-bold">FAQ</h2>
            <div className="grid gap-4">
              {[
                ["Les estimations sont-elles garanties ?", "Non. Elles sont indicatives, non contractuelles et doivent être confirmées par un expert numismate qualifié."],
                ["Mes données sont-elles privées ?", "Oui. Les fiches appartiennent à l’utilisateur connecté et les accès sont vérifiés côté serveur."],
                ["Puis-je déjà vendre une pièce ?", "La V1 ne crée pas de marketplace. Elle prépare vos informations pour contacter un professionnel."],
              ].map(([question, answer]) => (
                <Panel key={question} className="p-5">
                  <h3 className="font-semibold text-white">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{answer}</p>
                </Panel>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-10 text-sm text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-amber-300" aria-hidden="true" />
            <span>NumisVault · SaaS de gestion numismatique</span>
          </div>
          <div className="flex gap-5">
            <a href="/legal" className="hover:text-amber-200">Mentions légales</a>
            <a href="/privacy" className="hover:text-amber-200">Confidentialité</a>
            <a href="/terms" className="hover:text-amber-200">Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
