import { Reveal } from "@/components/reveal";
import { testimonials } from "@/data/testimonials";

import { TestimonialCarousel } from "./testimonial-carousel";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-canvas">
      <div className="container-page">
        <Reveal className="mb-8 flex max-w-2xl flex-col gap-3 md:mb-12">
          <p className="eyebrow text-purple">Loved by our customers</p>
          <h2 id="testimonials-title" className="text-h2 font-semibold">
            Goodness That Finds Its Way Home.
          </h2>
          <p className="font-serif text-lead text-ink">
            Every kitchen has a story. Here&rsquo;s what our customers have to say about making Homefills a part
            of theirs.
          </p>
        </Reveal>

        {testimonials.length > 0 ? (
          <Reveal>
            <TestimonialCarousel items={testimonials} />
            {testimonials.some((t) => t.demo) && (
              <p className="mt-4 text-meta text-subtle">
                Sample testimonials shown for demonstration. Real customer reviews will replace them.
              </p>
            )}
          </Reveal>
        ) : (
          // Honest empty state: no quotes are shown until genuine ones are added to data/testimonials.ts.
          <p className="max-w-xl rounded-lg border border-line bg-surface p-5 font-serif text-ink md:p-6">
            Customer testimonials will appear here once Homefills shares verified reviews.
          </p>
        )}
      </div>
    </section>
  );
}
