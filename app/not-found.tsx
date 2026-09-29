import { SiteHeader } from "@/components/Hero/SiteHeader";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <><SiteHeader /><main className="page-width not-found"><h1>Page not found.</h1><p>Let’s head back to the beginning.</p><Button asChild><a href="/">Back home</a></Button></main></>;
}
