// app/Shop/layout.tsx
import { ShopProvider } from "@/components/ShopData/ShopContext";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ShopProvider>{children}</ShopProvider>;
}
