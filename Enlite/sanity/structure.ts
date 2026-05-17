import type { StructureResolver } from "sanity/desk";
import { 
  Settings, 
  Home, 
  Plane, 
  ShoppingBag, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  HelpCircle, 
  Handshake, 
  Star,
  Layers,
  Mail,
  Info,
  TrendingUp,
  Target,
  ShieldCheck,
  Newspaper,
  UserPlus
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Site Settings Group
      S.listItem()
        .title("Site Config")
        .icon(Settings)
        .child(
          S.list()
            .title("Site Config")
            .items([
              S.listItem()
                .title("General Settings")
                .icon(Settings)
                .child(
                  S.document()
                    .schemaType("settings")
                    .documentId("settings")
                ),
              S.listItem()
                .title("Home Page")
                .icon(Home)
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                ),
              S.listItem()
                .title("About Page")
                .icon(Info)
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                ),
              S.listItem()
                .title("Investor Page")
                .icon(TrendingUp)
                .child(
                  S.document()
                    .schemaType("investorPage")
                    .documentId("investorPage")
                ),
            ])
        ),
      S.divider(),

      // Fleet Group
      S.listItem()
        .title("Fleet Management")
        .icon(Plane)
        .child(
          S.documentTypeList("product")
            .title("Helicopters")
        ),
      S.divider(),

      // Markets Group
      S.listItem()
        .title("Markets")
        .icon(Target)
        .child(
          S.documentTypeList("marketPage")
            .title("Market Applications")
        ),
      S.divider(),

      // Company & Partners Group (Unified Category)
      S.listItem()
        .title("Company & Partners")
        .icon(Users)
        .child(
          S.list()
            .title("Company & Partners")
            .items([
              S.listItem()
                .title("Team Members")
                .icon(Users)
                .child(S.documentTypeList("team").title("Team Members")),
              S.listItem()
                .title("Careers & Roles")
                .icon(Briefcase)
                .child(S.documentTypeList("career").title("Careers & Roles")),
              S.listItem()
                .title("Services")
                .icon(Layers)
                .child(S.documentTypeList("service").title("Services")),
              S.listItem()
                .title("Clients")
                .icon(ShieldCheck)
                .child(S.documentTypeList("client").title("Clients")),
              S.listItem()
                .title("Technical & Business Partners")
                .icon(Handshake)
                .child(S.documentTypeList("businessPartner").title("Technical & Business Partners")),
              S.listItem()
                .title("Featured In (Press Features)")
                .icon(Newspaper)
                .child(S.documentTypeList("partner").title("Press Outlets / Featured In")),
            ])
        ),
      S.divider(),

      // Content Group
      S.listItem()
        .title("Content & Media")
        .icon(FileText)
        .child(
          S.list()
            .title("Content & Media")
            .items([
              S.listItem()
                .title("Articles")
                .icon(FileText)
                .child(S.documentTypeList("article")),
              S.listItem()
                .title("Categories")
                .icon(Layers)
                .child(S.documentTypeList("category")),
              S.listItem()
                .title("Testimonials")
                .icon(Star)
                .child(S.documentTypeList("testimonial")),
              S.listItem()
                .title("FAQ")
                .icon(HelpCircle)
                .child(S.documentTypeList("faq")),
              S.listItem()
                .title("Gallery")
                .icon(ImageIcon)
                .child(S.documentTypeList("gallery")),
            ])
        ),
      S.divider(),

      // Inquiries Group (Expanded)
      S.listItem()
        .title("Inquiries & Submissions")
        .icon(Mail)
        .child(
          S.list()
            .title("Inquiries & Submissions")
            .items([
              S.listItem()
                .title("General / Contact Enquiries")
                .icon(Mail)
                .child(S.documentTypeList("contact").title("General / Contact Enquiries")),
              S.listItem()
                .title("Investor Inquiries")
                .icon(TrendingUp)
                .child(S.documentTypeList("investorInquiry").title("Investor Inquiries")),
              S.listItem()
                .title("Career Applications")
                .icon(UserPlus)
                .child(S.documentTypeList("careerApplication").title("Career Applications")),
            ])
        ),

    ]);
