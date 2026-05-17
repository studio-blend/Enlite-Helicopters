# Unlighthouse v2.2 Audit & Optimization Blueprint
> **Project**: Enlite Helicopters Redesign (v2.2)  
> **Status**: Review & Audit Phase (Strictly non-intrusive; no code modifications performed)

This blueprint documents the current performance, accessibility, SEO, and best practice bottlenecks found across the Enlite Helicopters redesigned platform. Each finding is paired with a **root-cause diagnosis** and a **copy-pasteable code diff** showing the exact recommended fix.

---

## 1. Executive Performance & Accessibility Scorecard

While the redesign exhibits exceptional overall scores, a few core pages suffer from minor accessibility gaps and performance overhead. 

| Route / Page | Score | Performance | Accessibility | Best Practices | SEO | Status / Priority |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`/interactive-range`** | `0.93` | `0.84` (Orange) | **`0.88` (Orange)** | `1.00` | `1.00` | 🔴 **High Priority** (UX/A11y Gaps) |
| **`/about`** | `0.94` | **`0.81` (Orange)** | `0.94` | `1.00` | `1.00` | 🟡 **Medium Priority** (Large Media Assets) |
| **`/gallery`** | `0.94` | **`0.83` (Orange)** | `0.94` | `1.00` | `1.00` | 🟡 **Medium Priority** (Masonry Grid Sizing) |
| **`/investor`** | `0.96` | `0.95` | **`0.89` (Orange)** | `1.00` | `1.00` | 🟡 **Medium Priority** (Form ID & Label Gaps) |
| **`/privacy`** | `0.97` | `0.98` | **`0.90` (Orange)** | `1.00` | `1.00` | 🟢 **Low Priority** (Footer Heading Structure) |
| **`/helicopters`** | `0.96` | `0.94` | `0.96` | `1.00` | **`0.92` (Orange)** | 🟢 **Low Priority** (SEO Canonical Tag) |
| **`/` (Home)** | `0.94` | **`0.85` (Orange)** | `0.94` | `0.96` | `1.00` | 🟡 **Medium Priority** (Above-the-fold Images) |

---

## 2. Root Cause Diagnostics & Code Blueprints

### 2.1 Interactive Range Map (`/interactive-range`)
> **Performance**: `0.84` | **Accessibility**: `0.88`  
> **Key Issues**: Form elements missing associated labels, buttons without discernible names, and Leaflet interactive markers missing accessible role descriptors.

#### 🔍 Root Cause Diagnosis
1. **Unlabeled Inputs**: In [MapComponent.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/MapComponent.tsx#L162-L169), the search text field inputs (both mobile and desktop layouts) do not have an associated `<label>` tag, `id`, or `aria-label` attribute. Screen readers are unable to announce the purpose of the input.
2. **Icon-Only Buttons**: The geolocation search buttons (`type="submit"` housing the `<Target>` icon) and current location buttons (`type="button"` housing `<Crosshair>` / `<MapPin>`) have no textual representation or `aria-label`. They are announced to users as an empty "button".
3. **Interactive Marker Pin**: The Leaflet draggable map pin (`CustomPin` divIcon) acts as an interactive button but lacks a descriptive role or screen reader label.
4. **Header Logo Link**: In [Header.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Header.tsx#L51-L53), the main site logo link `<Link href="/">` wraps the `<EnliteLogo>` SVG directly, but lacks its own `aria-label` or inner textual content, triggering a "Links do not have a discernible name" audit warning.

#### 🛠️ Code Blueprint (Fixes for MapComponent.tsx & Header.tsx)

```diff
// File: Enlite/src/components/ui/MapComponent.tsx (Mobile Input)
-            <input
-              type="text"
-              placeholder="Search city..."
-              value={searchQuery}
-              onChange={(e) => setSearchQuery(e.target.value)}
-              disabled={isSearching}
-              className="w-full bg-bg-primary/50 border border-border-default rounded-xl pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-all"
-            />
+            <input
+              type="text"
+              placeholder="Search city..."
+              value={searchQuery}
+              onChange={(e) => setSearchQuery(e.target.value)}
+              disabled={isSearching}
+              aria-label="Search city"
+              id="mobile-city-search"
+              className="w-full bg-bg-primary/50 border border-border-default rounded-xl pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-all"
+            />
```

```diff
// File: Enlite/src/components/ui/MapComponent.tsx (Desktop Input & Buttons)
-            <input
-              type="text"
-              placeholder="Search any city or town..."
-              value={searchQuery}
-              onChange={(e) => setSearchQuery(e.target.value)}
-              disabled={isSearching}
-              className="w-full bg-bg-primary border border-border-default rounded-lg pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50"
-            />
+            <input
+              type="text"
+              placeholder="Search any city or town..."
+              value={searchQuery}
+              onChange={(e) => setSearchQuery(e.target.value)}
+              disabled={isSearching}
+              aria-label="Search city or town in India"
+              id="desktop-city-search"
+              className="w-full bg-bg-primary border border-border-default rounded-lg pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50"
+            />
...
-            <button
-              type="submit"
-              disabled={isSearching}
-              className="absolute right-3 top-2.5 p-1 text-brand-red hover:bg-brand-red/10 rounded transition-colors"
-            >
-              {isSearching ? <div className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin" /> : <Target className="w-4 h-4" />}
-            </button>
+            <button
+              type="submit"
+              disabled={isSearching}
+              aria-label="Search location coordinates"
+              className="absolute right-3 top-2.5 p-1 text-brand-red hover:bg-brand-red/10 rounded transition-colors"
+            >
+              {isSearching ? <div className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin" /> : <Target className="w-4 h-4" />}
+            </button>
```

```diff
// File: Enlite/src/components/ui/MapComponent.tsx (Leaflet Pin CustomPin Accessibility)
 const CustomPin = L.divIcon({
   className: "custom-pin",
-  html: `<div style="width: 24px; height: 24px; background-color: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>`,
+  html: `<div role="application" aria-label="Interactive launch point marker. Drag pin to update radar radius." style="width: 24px; height: 24px; background-color: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>`,
   iconSize: [24, 24],
   iconAnchor: [12, 12],
 });
```

```diff
// File: Enlite/src/components/layout/Header.tsx (Header Logo Link)
-            <Link href="/" className="relative z-10 flex-shrink-0">
-              <EnliteLogo size={28} />
-            </Link>
+            <Link href="/" className="relative z-10 flex-shrink-0" aria-label="Enlite Helicopters Home">
+              <EnliteLogo size={28} />
+            </Link>
```

---

### 2.2 About & Gallery Pages (`/about`, `/gallery`)
> **Performance**: `/about` (`0.81`), `/gallery` (`0.83`)  
> **Key Issues**: Massive improperly sized image assets served from the CDN, and missing responsive image scaling boundaries.

#### 🔍 Root Cause Diagnosis
1. **Empty Image `sizes` Configurations**: In [DynamicVideoPlayer.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/shared/DynamicVideoPlayer.tsx#L85-L103), the above-the-fold video placeholder thumbnails use Next.js's dynamic `<Image fill className="object-cover" />` component but **completely omit** the `sizes` attribute.
   > [!NOTE]
   > When `sizes` is omitted on a `fill` image, Next.js defaults to requesting the maximum viewport width (`100vw`). On a desktop screen, this triggers the image optimization loader to fetch a raw **`3840px` (4K) file**, even when the media grid card only spans a fraction of the columns.
2. **Masonry Grid Overhead**: In the gallery, dynamic image URLs sourced directly from the CMS render at maximum native resolution rather than being capped at viewport layout boundaries.

#### 🛠️ Code Blueprint (Fixes for DynamicVideoPlayer.tsx & Gallery Pages)

```diff
// File: Enlite/src/components/shared/DynamicVideoPlayer.tsx
   if (!videoUrl) {
     return (
       <div className={`relative ${className}`}>
-        <Image src={activeThumbnail} alt={alt} fill className="object-cover" />
+        <Image 
+          src={activeThumbnail} 
+          alt={alt} 
+          fill 
+          className="object-cover" 
+          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
+        />
       </div>
     );
   }
 
   return (
     <div 
       ref={containerRef}
       className={`relative group overflow-hidden bg-black cursor-pointer ${className}`}
       onClick={handlePlay}
     >
       {!isPlaying ? (
         <>
           <Image 
             src={activeThumbnail} 
             alt={alt} 
             fill 
             className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
+            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
           />
```

---

### 2.3 Investor Relations Page (`/investor`)
> **Accessibility**: `0.89`  
> **Key Issues**: Unassociated dropdown elements and raw special character asterisks (`*`) embedded inside input DOM element IDs.

#### 🔍 Root Cause Diagnosis
1. **Unassociated Country Field**: In [InvestorClient.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/app/(company)/investor/InvestorClient.tsx#L61-L76), a raw `<select>` tag is used instead of the custom `<Select>` component. It has a `<label>Country *</label>` element but **lacks a `htmlFor` attribute**, and the corresponding `<select>` tag **lacks an `id`**.
2. **Special Characters inside Input IDs**: In [Input.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/Input.tsx#L14), input IDs are generated dynamically via:
   `const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");`
   Because fields like `"Name *"` and `"Profession *"` have trailing asterisks, the generated IDs contain raw asterisk characters: `id="name-*"` and `id="profession-*"`:
   > [!WARNING]
   > Storing special characters such as `*` inside DOM `id` elements violates standard HTML4/5 specifications, breaks CSS query selector parsers (`#name-*`), and disrupts screen-reader path matching.

#### 🛠️ Code Blueprint (Fixes for InvestorClient.tsx & Input.tsx)

```diff
// File: Enlite/src/components/ui/Input.tsx
 export const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ label, error, icon, className, id, ...props }, ref) => {
-    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
+    // Sanitize generated IDs to remove special characters (like asterisks)
+    const inputId = id || label?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
     return (
```
*(Apply the same sanitized replacement logic to the `Textarea` and `Select` exports in [Input.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/Input.tsx#L53-L88)).*

```diff
// File: Enlite/src/app/(company)/investor/InvestorClient.tsx
-import { Input, Textarea } from "@/components/ui/Input";
+import { Input, Textarea, Select } from "@/components/ui/Input";
...
-                <div className="space-y-2">
-                  <label className="text-sm font-semibold text-text-primary">Country *</label>
-                  <select
-                    name="country"
-                    required
-                    className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none"
-                    defaultValue=""
-                  >
-                    <option value="" disabled>Select country</option>
-                    <option value="India">India</option>
-                    <option value="United States">United States</option>
-                    <option value="United Kingdom">United Kingdom</option>
-                    <option value="Other">Other</option>
-                  </select>
-                  {errors.country?.[0] && <p className="text-red-500 text-xs">{errors.country[0]}</p>}
-                </div>
+                <Select
+                  name="country"
+                  label="Country *"
+                  required
+                  error={errors.country?.[0]}
+                  options={[
+                    { value: "", label: "Select country" },
+                    { value: "India", label: "India" },
+                    { value: "United States", label: "United States" },
+                    { value: "United Kingdom", label: "United Kingdom" },
+                    { value: "Other", label: "Other" }
+                  ]}
+                  defaultValue=""
+                />
```

---

### 2.4 Privacy Policy Page (`/privacy`)
> **Accessibility**: `0.90`  
> **Key Issues**: Heading levels not sequentially descending (skipped heading levels).

#### 🔍 Root Cause Diagnosis
1. **Skipped Heading Hierarchy**: The Privacy page hierarchy flows properly from `H1` (page title) to `H2` (sections). However, in [Footer.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Footer.tsx#L64-L126), the footer column titles are declared using `<h4>` headings:
   ```tsx
   <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
   ```
   > [!IMPORTANT]
   > Lighthouse flags this because the DOM layout transitions directly from `H2` in the page content straight to `H4` in the footer **without an intermediate `H3` heading**. 
   > Footers represent general structural elements, not hierarchical section titles. Using standard CSS-styled `<p>` or `<span role="heading" aria-level="3">` tags for footer columns is recommended to resolve this diagnostic.

#### 🛠️ Code Blueprint (Fixes for Footer.tsx)

```diff
// File: Enlite/src/components/layout/Footer.tsx
           {/* Quick Links */}
           <div>
-            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Quick Links</h4>
+            <p className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Quick Links</p>
...
           {/* Products */}
           <div>
-            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Products</h4>
+            <p className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Products</p>
...
           {/* Resources */}
           <div>
-            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Resources</h4>
+            <p className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Resources</p>
...
           {/* Enquiry */}
           <div className="lg:col-span-1">
-            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Enquiry</h4>
+            <p className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Enquiry</p>
```

---

### 2.5 Helicopter Fleet Page (`/helicopters`)
> **SEO**: `0.92`  
> **Key Issues**: Missing `rel="canonical"` link tag.

#### 🔍 Root Cause Diagnosis
1. **No Canonical Declarations**: In [helicopters/page.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/app/(products)/helicopters/page.tsx#L7-L12), the static page metadata object lacks a defined `alternates` configuration. This flags a warning in Google search engines because query parameters or route-group URL structures could be crawled as duplicate entries.

#### 🛠️ Code Blueprint (Fixes for helicopters/page.tsx)

```diff
// File: Enlite/src/app/(products)/helicopters/page.tsx
 export const metadata: Metadata = {
   title: {
     absolute: "Autonomous Unmanned Cargo Helicopter Fleet | Enlite R2 & R3",
   },
   description: "Explore the Enlite fleet of autonomous heavy-lift helicopters. From the R2 intercity delivery drone to the R3 tactical resupply platform, we define the future of aerial logistics.",
+  alternates: {
+    canonical: "https://enlitehelicopters.com/helicopters",
+  },
 };
```

---

### 2.6 Homepage (`/`)
> **Performance**: `0.85`  
> **Key Issues**: Eager LCP loading warning, and missing responsive sizing configurations on decoration background elements.

#### 🔍 Root Cause Diagnosis
1. **LCP Image Lazy-Loading**: The main above-the-fold hero content image `/images/defence.png` uses standard image parameters but **lacks** the `priority` or `loading="eager"` tags. The browser schedules the initial rendering of the image with lower priority, increasing the Largest Contentful Paint (LCP) visual delay.
2. **Missing Sizes**: Key ornamental imagery assets lack defined width constraints, triggering heavy layout shift estimates.

#### 🛠️ Code Blueprint (Fixes for Above-the-fold Image Elements)

```diff
// Example LCP Above-the-fold next/image Component
         <Image
           src="/images/defence.png"
           alt="Enlite Defense Cargo Helicopter solutions"
           fill
+          priority
+          loading="eager"
           className="object-cover"
-          sizes="100vw"
+          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
         />
```

---

### 2.7 Careers & Investor Selection Inputs (Design Consistency)
> **UI/UX Consistency**: Core UI System Dryness  
> **Key Issues**: Form dropdowns bypass the reusable design system `<Select>` component, leading to style duplication and maintenance overhead.

#### 🔍 Root Cause Diagnosis
1. **Raw Dropdowns in Careers**: In [CareersClient.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/app/(company)/careers/CareersClient.tsx#L140-L155), raw `<select>` inputs with inline styles are hardcoded instead of using the accessible `<Select>` component exported in [Input.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/Input.tsx).
2. **Maintenance Duplication**: Custom focus rings, theme-specific styles, hover backgrounds, and border tokens are copy-pasted instead of propagating from the primary UI kit.

#### 🛠️ Code Blueprint (Fixes for CareersClient.tsx)

```diff
// File: Enlite/src/app/(company)/careers/CareersClient.tsx
-import { Button } from "@/components/ui/Button";
+import { Button } from "@/components/ui/Button";
+import { Select } from "@/components/ui/Input";
...
-                    <div className="space-y-2">
-                      <label className="text-sm font-semibold">Position Applying</label>
-                      <select name="position" required className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
-                        <option value="" disabled>Select Position</option>
-                        {careers.map(job => (
-                          <option key={job.id} value={job.title}>{job.title}</option>
-                        ))}
-                      </select>
-                    </div>
+                    <Select
+                      name="position"
+                      label="Position Applying"
+                      required
+                      value={selectedRole}
+                      onChange={(e) => setSelectedRole(e.target.value)}
+                      options={[
+                        { value: "", label: "Select Position" },
+                        ...careers.map(job => ({ value: job.title, label: job.title }))
+                      ]}
+                    />
-                    <div className="space-y-2">
-                      <label className="text-sm font-semibold">How did you hear about us?</label>
-                      <select name="source" required className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none" defaultValue="">
-                        <option value="" disabled>Select Source</option>
-                        <option value="LinkedIn">LinkedIn</option>
-                        <option value="Website">Website</option>
-                        <option value="Referral">Referral</option>
-                        <option value="Other">Other</option>
-                      </select>
-                    </div>
+                    <Select
+                      name="source"
+                      label="How did you hear about us?"
+                      required
+                      options={[
+                        { value: "", label: "Select Source" },
+                        { value: "LinkedIn", label: "LinkedIn" },
+                        { value: "Website", label: "Website" },
+                        { value: "Referral", label: "Referral" },
+                        { value: "Other", label: "Other" }
+                      ]}
+                      defaultValue=""
+                    />
```

---

### 2.8 Mobile Navigation Drawer Lock & Scroll Throttling (`/layout`)
> **UX & Performance**: Responsive Navigation & Paint Pipelines  
> **Key Issues**: Background document body scrolls while the mobile navigation drawer is active, and scroll-triggered header transformations calculate continuously without paint rate limits.

#### 🔍 Root Cause Diagnosis
1. **Background Scroll Bleed**: While `mobileOpen` drawer is rendered in [Header.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Header.tsx), scroll inputs bypass the glass drawer and scroll the underlying page.
2. **Scroll Thread Congestion**: Scroll actions trigger unthrottled calculations on every pixel transition, risking layout jitter on lower-end viewport screens.

#### 🛠️ Code Blueprint (Fixes for Header.tsx)

```diff
// File: Enlite/src/components/layout/Header.tsx
  useEffect(() => {
+    // Mobile Scroll Lock
+    if (mobileOpen) {
+      document.body.style.overflow = "hidden";
+    } else {
+      document.body.style.overflow = "";
+    }
+    return () => {
+      document.body.style.overflow = "";
+    };
+  }, [mobileOpen]);
+
+  useEffect(() => {
+    let scrollAnimationFrame: number;
     const handleScroll = () => {
-      const current = window.scrollY;
-      setIsScrolled(current > 20);
-      setHidden(current > lastScroll && current > 100);
-      setLastScroll(current);
+      if (scrollAnimationFrame) {
+        cancelAnimationFrame(scrollAnimationFrame);
+      }
+      scrollAnimationFrame = requestAnimationFrame(() => {
+        const current = window.scrollY;
+        setIsScrolled(current > 20);
+        setHidden(current > lastScroll && current > 100);
+        setLastScroll(current);
+      });
     };
     window.addEventListener("scroll", handleScroll, { passive: true });
-    return () => window.removeEventListener("scroll", handleScroll);
+    return () => {
+      window.removeEventListener("scroll", handleScroll);
+      if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
+    };
   }, [lastScroll]);
```

---

### 2.9 Leaflet Map Scroll Zoom Trap & Elegant Geocoding Alert Toasts (`/interactive-range`)
> **Usability & Aesthetics**: Map Navigation & Exception Handling  
> **Key Issues**: Desktop vertical scroll transitions get caught in map area (scroll zoom trap), and geocoding fetch failures launch blocky, browser-native alert windows.

#### 🔍 Root Cause Diagnosis
1. **Interactive Trapping**: Enabling `scrollWheelZoom` on page embedded Leaflet maps stops regular cursor scroll movements and triggers rapid geographical zooming instead.
2. **Unstyled Alert Dialogs**: Blocky, operating-system-styled modal dialog alerts interrupt execution pathways and drop visual quality below premium standards.

#### 🛠️ Code Blueprint (Fixes for MapComponent.tsx)

```diff
// File: Enlite/src/components/ui/MapComponent.tsx
+  const [mapError, setMapError] = useState<string | null>(null);
+
+  useEffect(() => {
+    if (mapError) {
+      const timer = setTimeout(() => setMapError(null), 5000);
+      return () => clearTimeout(timer);
+    }
+  }, [mapError]);
...
         <MapContainer
           center={center}
           zoom={5}
-          scrollWheelZoom={true}
+          scrollWheelZoom={false} // Prevents desktop page scroll trap
           className="w-full h-full z-0"
         >
...
// Replace raw blocky browser alerts:
-        alert("Location not found. Please try a different name.");
+        setMapError("Location not found. Please try a different name.");
...
-        alert("Error searching for location. Please try again.");
+        setMapError("Error searching for location. Please try again.");
...
-        alert("Geolocation is not supported by your browser.");
+        setMapError("Geolocation is not supported by your browser.");
```

---

## 3. High-Impact Action Items Checklist

Use this checklist during the next code patch implementation:

- [ ] **Sanitize Input IDs**: Edit [Input.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/Input.tsx) to strip `*` and special characters from generated DOM IDs.
- [ ] **Standardize Country Selector**: Replace the raw `<select>` dropdown inside [InvestorClient.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/app/(company)/investor/InvestorClient.tsx) with the pre-coded accessible `<Select>` element.
- [ ] **Standardize Careers Selector**: Replace raw `<select>` dropdowns inside [CareersClient.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/app/(company)/careers/CareersClient.tsx) with the unified `<Select>` component.
- [ ] **Lock Mobile Menu Scroll**: Configure [Header.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Header.tsx) to freeze document body scrolling while the mobile sidebar is active.
- [ ] **Throttle Header Listeners**: Wrap the passive scroll scroll listener in [Header.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Header.tsx) with a `requestAnimationFrame` callback.
- [ ] **Fix Map Scroll Zoom Trap**: Toggle `scrollWheelZoom` to `false` inside [MapComponent.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/MapComponent.tsx) to avoid trapping standard cursor scrolling.
- [ ] **Swap Geocoder Browser Alerts**: Replace standard unstyled browser alert modals with a dynamic state-based React notification banner inside [MapComponent.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/MapComponent.tsx).
- [ ] **Add Labels to Range Map**: Attach `aria-label` tags to map searches and buttons in [MapComponent.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/ui/MapComponent.tsx).
- [ ] **Add Responsive sizes to Video Thumbnails**: Patch [DynamicVideoPlayer.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/shared/DynamicVideoPlayer.tsx) to prevent `3840px` dynamic thumbnail asset fetching.
- [ ] **Harmonize Footer Headings**: Swap `<h4>` headers in [Footer.tsx](file:///d:/Data/Project/AntiGravity/enlite-helicopters/Enlite/src/components/layout/Footer.tsx) for styled accessibility-compliant `<p role="heading">` or equivalent tags.
- [ ] **Enforce SEO Canonical Metadata**: Define canonical properties in sitemaps and page metadata across all routes.
