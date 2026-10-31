import type { StaticImageData } from "next/image";

/**
 * Genuine customer testimonials only.
 *
 * Add an entry ONLY when Homefills has supplied (or publicly published and permitted use of) the
 * customer's own words. Keep the wording exactly as given. `name`, `location`, `photo` and `rating`
 * are optional and must be left out unless verified. `source` records where the quote came from
 * (for example "Email, 12 Mar 2026") so it can be re-checked; it is not displayed.
 *
 * Status: the entries below are DEMO PLACEHOLDERS (demo: true) written for the storefront demo. They are not
 * real customers, and the homepage says so. Replace them with genuine testimonials before launch; once no entry
 * is marked demo, the sample-content note disappears automatically.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name?: string;
  /** City, or designation, exactly as the customer gave it. */
  location?: string;
  photo?: StaticImageData;
  /** The customer's actual rating out of 5. Never estimate or round. */
  rating?: number;
  source: string;
  /** True for sample content written for the demo, never for a real customer. */
  demo?: boolean;
};

const demoSource = "Demo placeholder, not a real customer";

export const testimonials: Testimonial[] = [
  {
    id: "demo-1",
    quote: "The turmeric and garam masala are what I reach for every day now. The packs are easy to store and open.",
    name: "Priya",
    location: "Pune",
    source: demoSource,
    demo: true,
  },
  {
    id: "demo-2",
    quote: "I ordered the chana sattu for the family and everyone liked the banana flavour. Easy to make on busy mornings.",
    name: "Rahul",
    location: "Kolkata",
    source: demoSource,
    demo: true,
  },
  {
    id: "demo-3",
    quote: "Good range in one place, from whole spices to superfoods. It made stocking the kitchen simple.",
    name: "Meera",
    location: "Bengaluru",
    source: demoSource,
    demo: true,
  },
  {
    id: "demo-4",
    quote: "The chia seeds come in a neat jar that sits well on the shelf. I like that it is ready to use.",
    name: "Arjun",
    location: "Delhi",
    source: demoSource,
    demo: true,
  },
  {
    id: "demo-5",
    quote: "Our weekend curries taste better with the kitchen king masala. Simple to use and the pack looks lovely.",
    name: "Sunita",
    location: "Bhubaneswar",
    source: demoSource,
    demo: true,
  },
];
