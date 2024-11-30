// app/Product/layout.tsx
import { ProductProvider } from "@/components/ProductData/ProductContext";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProductProvider>{children}</ProductProvider>;
}
