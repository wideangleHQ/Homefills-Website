import { Reveal } from "@/components/reveal";

// Each point paraphrases the brand statement printed on Homefills packs.
const promises = [
  { title: "Small batches", text: "Spices, pulses and dry-fruits are selected carefully from the best lot." },
  { title: "Packed by hand", text: "Packed manually, in clean and hygienic conditions." },
  { title: "Aroma and freshness", text: "The way it is packed is meant to keep the maximum aroma and freshness." },
  { title: "Fair to every rupee", text: "The aim is to bring the finest at competitive prices." },
];

export function BrandPromise() {
  return (
    <section aria-labelledby="promise-title" className="bg-soft">
      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <Reveal className="flex flex-col gap-4 lg:col-span-5">
          <p className="eyebrow text-purple">The Homefills promise</p>
          <h2 id="promise-title" className="text-h2 font-semibold">
            What the pack promises, in its own words.
          </h2>
          <p className="max-w-md font-serif text-lead text-ink">
            Four commitments taken directly from the statement printed on Homefills packaging.
          </p>
        </Reveal>

        <div className="lg:col-span-7">
          <ol className="border-t border-line">
            {promises.map((p, i) => (
              <li key={p.title} className="border-b border-line">
                <Reveal
                  delay={i * 0.06}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 py-6 sm:grid-cols-[4.5rem_14rem_1fr] sm:items-baseline md:py-8"
                >
                  <span className="font-heading text-h3 font-medium text-purple tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-h3 font-semibold">{p.title}</h3>
                  <p className="col-start-2 font-serif text-ink sm:col-start-3">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <p className="mt-8 font-serif text-lead text-purple md:mt-10">
              “This is a promise from homefills and thanks for your trust.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
