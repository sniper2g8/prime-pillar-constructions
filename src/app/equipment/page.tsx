import { Metadata } from "next";
import EquipmentClientPage from "./equipment-client";

export const metadata: Metadata = {
  title: 'Equipment Catalog | PrimePillar Constructions',
  description: 'Browse our comprehensive catalog of construction equipment available for hire, including concrete equipment, earth moving machinery, demolition tools, power tools, and safety equipment.',
  openGraph: {
    title: 'Equipment Catalog | PrimePillar Constructions',
    description: 'Browse our comprehensive catalog of construction equipment available for hire, including concrete equipment, earth moving machinery, demolition tools, power tools, and safety equipment.',
    url: 'https://www.primepillargh.com/equipment',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function EquipmentPage() {
  return <EquipmentClientPage />;
}