"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Settings, User } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", tooltip: "Dashboard" },
  { href: "/news", icon: Newspaper, label: "Cybercrime News", tooltip: "News" },
  { href: "/profile", icon: User, label: "Profile", tooltip: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings", tooltip: "Settings" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref>
            <SidebarMenuButton
              tooltip={item.tooltip}
              isActive={pathname.startsWith(item.href)}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
