"use client"
import "@/app/activity/03/a3.css";
import "@/app/css/perso.css";
import { usePathname } from "next/navigation";
import ReturnTo from "@/app/components/return";
export default function LocationsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const pathName = usePathname();
    const locationPath = pathName.split('/')[4];

    return (
        <>
        { locationPath ?
            <ReturnTo hrefTarget="/activity/03/view-secrets"/>
            :
            <ReturnTo hrefTarget="/activity/03"/>
        }
            {children}
        </>
    );
  }