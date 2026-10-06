import siteData from "@/data/site.json";

// ── Root Schema Types ──
export type RawSiteData = typeof siteData;
export type CyberVaultSchema = typeof siteData.CyberVault;
export type CyberVaultSections = CyberVaultSchema["sections"];
export type CyberVaultTemplateComponents = CyberVaultSchema["templateComponents"];

// ── Universal SectionProps Interface (ai-builder Standard) ──
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// ── Strongly Typed Section Variant Data Models ──
export type CyberVaultTopbarData = CyberVaultSections["topbar"]["variants"]["CyberVaultTopbar1"];
export type CyberVaultNavbarData = CyberVaultSections["navbar"]["variants"]["CyberVaultNavbar1"];
export type CyberVaultNavItemsData = CyberVaultNavbarData["navItems"];
export type NavItem = CyberVaultNavItemsData[number];
export type CyberVaultFooterData = CyberVaultSections["footer"]["variants"]["CyberVaultFooter1"];
export type CyberVaultHeroData = CyberVaultSections["hero"]["variants"]["CyberVaultHero1"];
export type HeroStat = CyberVaultHeroData["floatingStats"][number];
export type CyberVaultAboutData = CyberVaultSections["about"]["variants"]["CyberVaultAbout1"];
export type AboutFeature = CyberVaultAboutData["features"][number];
export type CyberVaultOurImpactData = CyberVaultSections["ourImpact"]["variants"]["CyberVaultOurImpact1"];
export type OurImpactMetric = CyberVaultOurImpactData["stats"][number];
export type CyberVaultServicesData = CyberVaultSections["services"]["variants"]["CyberVaultServices1"];
export type ServiceItem = CyberVaultServicesData["servicesList"][number];
export type CyberVaultProcessData = CyberVaultSections["process"]["variants"]["CyberVaultProcess1"];
export type ProcessStep = CyberVaultProcessData["steps"][number];
export type CyberVaultWhyChooseUsData = CyberVaultSections["whyChooseUs"]["variants"]["CyberVaultWhyChooseUs1"];
export type WhyChooseUsItem = CyberVaultWhyChooseUsData["featurePillars"][number];
export type CyberVaultTestimonialData = CyberVaultSections["testimonial"]["variants"]["CyberVaultTestimonial1"];
export type CyberVaultTestimonialsData = CyberVaultTestimonialData;
export type TestimonialItem = CyberVaultTestimonialData["testimonials"][number];
export type CyberVaultBlogData = CyberVaultSections["blog"]["variants"]["CyberVaultBlog1"];
export type BlogPost = CyberVaultBlogData["blogPosts"][number];
export type CyberVaultPortfolioData = CyberVaultSections["portfolio"]["variants"]["CyberVaultPortfolio1"];
export type PortfolioItem = CyberVaultPortfolioData["projects"][number];
export type CyberVaultContactData = CyberVaultSections["contact"]["variants"]["CyberVaultContact1"];
export type ContactInfoCard = CyberVaultContactData["infoCards"][number];
export type CyberVaultGetAQuoteData = CyberVaultSections["getAQuote"]["variants"]["CyberVaultGetAQuote1"];
export type CyberVaultPageTopData = CyberVaultSections["pageTopSection"]["variants"]["CyberVaultPageTop1"];
export type CyberVaultThankYouData = CyberVaultSections["thankYou"]["variants"]["CyberVaultThankYou1"];

// ── Canonical Mapped Site Data Object ──
const sec = siteData.CyberVault.sections;

const servicesVariant = sec.services.variants.CyberVaultServices1;
const servicesMapped = {
  ...servicesVariant,
  list: servicesVariant.servicesList,
  servicesList: servicesVariant.servicesList,
  ServiceItem: servicesVariant.servicesList,
  services: servicesVariant.servicesList,
};

const whyChooseUsVariant = sec.whyChooseUs.variants.CyberVaultWhyChooseUs1;
const whyChooseUsMapped = {
  ...whyChooseUsVariant,
  features: whyChooseUsVariant.featurePillars,
  featurePillars: whyChooseUsVariant.featurePillars,
  items: whyChooseUsVariant.featurePillars,
};

const blogVariant = sec.blog.variants.CyberVaultBlog1;
const blogMapped = {
  ...blogVariant,
  posts: blogVariant.blogPosts,
  blogPosts: blogVariant.blogPosts,
};

const testimonialVariant = sec.testimonial.variants.CyberVaultTestimonial1;
const testimonialMapped = {
  ...testimonialVariant,
  items: testimonialVariant.testimonials,
  testimonials: testimonialVariant.testimonials,
};

const portfolioVariant = sec.portfolio.variants.CyberVaultPortfolio1;
const portfolioMapped = {
  ...portfolioVariant,
  items: portfolioVariant.projects,
  projects: portfolioVariant.projects,
};

export const siteMap = {
  topbar: sec.topbar.variants.CyberVaultTopbar1,
  navbar: sec.navbar.variants.CyberVaultNavbar1,
  navItems: sec.navbar.variants.CyberVaultNavbar1.navItems,
  footer: sec.footer.variants.CyberVaultFooter1,

  hero: sec.hero.variants.CyberVaultHero1,
  about: sec.about.variants.CyberVaultAbout1,
  ourImpact: sec.ourImpact.variants.CyberVaultOurImpact1,
  services: servicesMapped,
  process: sec.process.variants.CyberVaultProcess1,
  whyChooseUs: whyChooseUsMapped,
  testimonial: testimonialMapped,
  testimonials: testimonialMapped,
  blog: blogMapped,
  portfolio: portfolioMapped,
  pageTopSection: sec.pageTopSection.variants.CyberVaultPageTop1,
  getAQuote: sec.getAQuote.variants.CyberVaultGetAQuote1,
  contact: sec.contact.variants.CyberVaultContact1,
  thankYou: sec.thankYou.variants.CyberVaultThankYou1,

  // Compatibility object so existing components importing `siteData.home.hero` don't break
  home: {
    hero: sec.hero.variants.CyberVaultHero1,
    about: sec.about.variants.CyberVaultAbout1,
    ourImpact: sec.ourImpact.variants.CyberVaultOurImpact1,
    services: servicesMapped,
    process: sec.process.variants.CyberVaultProcess1,
    whyChooseUs: whyChooseUsMapped,
    testimonial: testimonialMapped,
    blog: blogMapped,
  },

  // Root Tree
  CyberVault: siteData.CyberVault,
};

export type SiteData = typeof siteMap;
export const site = siteMap;
export default site;
