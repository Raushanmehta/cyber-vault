import siteData from "./site.json";

// ── Root Schema Types ──
export type RawSiteData = typeof siteData;
export type CyberVaultSchema = typeof siteData.CyberVault;
export type CyberVaultSections = CyberVaultSchema["sections"];
export type CyberVaultTemplateComponents = CyberVaultSchema["templateComponents"];

// Reference schema convention aliases
export type ServicesSchema = CyberVaultSchema;
export type ServicesSections = CyberVaultSections;

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
export type CyberVaultFooterData = CyberVaultSections["footer"]["variants"]["CyberVaultFooter1"];
export type CyberVaultHeroData = CyberVaultSections["hero"]["variants"]["CyberVaultHero1"];
export type CyberVaultAboutData = CyberVaultSections["about"]["variants"]["CyberVaultAbout1"];
export type CyberVaultOurImpactData = CyberVaultSections["ourImpact"]["variants"]["CyberVaultOurImpact1"];
export type CyberVaultServicesData = CyberVaultSections["services"]["variants"]["CyberVaultServices1"];
export type CyberVaultProcessData = CyberVaultSections["process"]["variants"]["CyberVaultProcess1"];
export type CyberVaultWhyChooseUsData = CyberVaultSections["whyChooseUs"]["variants"]["CyberVaultWhyChooseUs1"];
export type CyberVaultTestimonialData = CyberVaultSections["testimonial"]["variants"]["CyberVaultTestimonial1"];
export type CyberVaultTestimonialsData = CyberVaultTestimonialData;
export type CyberVaultBlogData = CyberVaultSections["blog"]["variants"]["CyberVaultBlog1"];
export type CyberVaultPortfolioData = CyberVaultSections["portfolio"]["variants"]["CyberVaultPortfolio1"];
export type CyberVaultPageTopData = CyberVaultSections["pageTopSection"]["variants"]["CyberVaultPageTop1"];
export type CyberVaultGetAQuoteData = CyberVaultSections["getAQuote"]["variants"]["CyberVaultGetAQuote1"];
export type CyberVaultContactData = CyberVaultSections["contact"]["variants"]["CyberVaultContact1"];

// Optional item types
export type NavItem = CyberVaultNavbarData["navItems"][number];
export type HeroStat = CyberVaultHeroData["floatingStats"][number];
export type AboutFeature = CyberVaultAboutData["features"][number];
export type OurImpactMetric = CyberVaultOurImpactData["stats"][number];
export type ServiceItem = CyberVaultServicesData["servicesList"][number];
export type ProcessStep = CyberVaultProcessData["steps"][number];
export type WhyChooseUsItem = CyberVaultWhyChooseUsData["featurePillars"][number];
export type TestimonialItem = CyberVaultTestimonialData["testimonials"][number];
export type BlogPost = CyberVaultBlogData["blogPosts"][number];
export type PortfolioItem = CyberVaultPortfolioData["projects"][number];
export type ContactInfoCard = CyberVaultContactData["infoCards"][number];

// ── Canonical Mapped Site Data Object ──
const sec = siteData.CyberVault.sections;

export const siteMap = {
  // Compatibility section shortcuts
  topbar: sec.topbar.variants.CyberVaultTopbar1,
  navbar: sec.navbar.variants.CyberVaultNavbar1,
  navItems: sec.navbar.variants.CyberVaultNavbar1.navItems,
  footer: sec.footer.variants.CyberVaultFooter1,
  hero: sec.hero.variants.CyberVaultHero1,
  about: sec.about.variants.CyberVaultAbout1,
  ourImpact: sec.ourImpact.variants.CyberVaultOurImpact1,
  services: sec.services.variants.CyberVaultServices1,
  process: sec.process.variants.CyberVaultProcess1,
  whyChooseUs: sec.whyChooseUs.variants.CyberVaultWhyChooseUs1,
  testimonial: sec.testimonial.variants.CyberVaultTestimonial1,
  testimonials: sec.testimonial.variants.CyberVaultTestimonial1,
  blog: sec.blog.variants.CyberVaultBlog1,
  portfolio: sec.portfolio.variants.CyberVaultPortfolio1,
  pageTopSection: sec.pageTopSection.variants.CyberVaultPageTop1,
  getAQuote: sec.getAQuote.variants.CyberVaultGetAQuote1,
  contact: sec.contact.variants.CyberVaultContact1,

  // Compatibility section shortcuts
  topbarData: sec.topbar.variants.CyberVaultTopbar1,
  navbarData: sec.navbar.variants.CyberVaultNavbar1,
  footerData: sec.footer.variants.CyberVaultFooter1,
  heroData: sec.hero.variants.CyberVaultHero1,
  aboutData: sec.about.variants.CyberVaultAbout1,
  ourImpactData: sec.ourImpact.variants.CyberVaultOurImpact1,
  servicesData: sec.services.variants.CyberVaultServices1,
  processData: sec.process.variants.CyberVaultProcess1,
  whyChooseUsData: sec.whyChooseUs.variants.CyberVaultWhyChooseUs1,
  testimonialData: sec.testimonial.variants.CyberVaultTestimonial1,
  testimonialsData: sec.testimonial.variants.CyberVaultTestimonial1,
  blogData: sec.blog.variants.CyberVaultBlog1,
  portfolioData: sec.portfolio.variants.CyberVaultPortfolio1,
  pageTopSectionData: sec.pageTopSection.variants.CyberVaultPageTop1,
  getAQuoteData: sec.getAQuote.variants.CyberVaultGetAQuote1,
  contactData: sec.contact.variants.CyberVaultContact1,

  // Root Tree
  CyberVault: siteData.CyberVault,
};

export type SiteData = typeof siteMap;
export const site = siteMap;
export default siteData;
