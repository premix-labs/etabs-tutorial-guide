// @ts-check
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://premix-labs.github.io",
  base: "/etabs-tutorial-guide",
  integrations: [
    starlight({
      title: "ETABS Tutorial Guide",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Thai",
          lang: "th",
        },
      },
      sidebar: [
        {
          label: "Guide",
          items: [
            { label: "Introduction", link: "/guide/01-introduction/" },
            { label: "Interface Overview", link: "/guide/02-interface/" },
            { label: "Modeling Basics", link: "/guide/03-modeling/" },
            {
              label: "Structural Elements",
              link: "/guide/04-structural-elements/",
            },
            {
              label: "Shear Wall (Modeling)",
              link: "/guide/05-shear-wall/",
            },
            {
              label: "Loading & Load Combinations",
              link: "/guide/06-loading/",
            },
            {
              label: "มาตรฐานไทย (มยผ.)",
              link: "/guide/07-thai-standards/",
            },
            { label: "Analysis & Results", link: "/guide/08-analysis/" },
            { label: "Design & Detailing", link: "/guide/09-design/" },
            {
              label: "Shear Wall Design Results",
              link: "/guide/10-shear-wall-design/",
            },
            { label: "Foundation Design", link: "/guide/11-foundation/" },
            {
              label: "Calculation Report",
              link: "/guide/12-calculation-report/",
            },
            { label: "Troubleshooting", link: "/guide/13-troubleshooting/" },
          ],
        },
      ],
    }),
  ],
});
