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
  Target
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
          S.documentTypeList("helicopter")
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

      // Business Group
      S.listItem()
        .title("Business")
        .icon(ShoppingBag)
        .child(
          S.list()
            .title("Business")
            .items([
              S.listItem()
                .title("Products")
                .icon(ShoppingBag)
                .child(S.documentTypeList("product")),
              S.listItem()
                .title("Services")
                .icon(Layers)
                .child(S.documentTypeList("service")),
              S.listItem()
                .title("Partners")
                .icon(Handshake)
                .child(S.documentTypeList("partner")),
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

      // Company Group
      S.listItem()
        .title("Company")
        .icon(Users)
        .child(
          S.list()
            .title("Company")
            .items([
              S.listItem()
                .title("Team")
                .icon(Users)
                .child(S.documentTypeList("team")),
              S.listItem()
                .title("Careers")
                .icon(Briefcase)
                .child(S.documentTypeList("career")),
            ])
        ),
      S.divider(),

      // Inquiries Group
      S.listItem()
        .title("Inquiries")
        .icon(Mail)
        .child(
          S.documentTypeList("contact")
            .title("Contact Submissions")
        ),
    ]);
