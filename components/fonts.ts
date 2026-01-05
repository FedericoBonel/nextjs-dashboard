/**
 * This file imports the fonts we use.
 *
 * By default Next.js will download and include these fonts if using the next/fonts
 * package and include them in the static assets. This way when user requests a page, they get the fonts packaged in.
 *
 * This means less network requests and less content layout shifts
 */
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
