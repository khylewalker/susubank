
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  ReceiptText,
  ArrowLeftRight,
  History,
  Settings,
  Users,
  ShieldCheck,
  LogOut,
  BellRing,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contributions", label: "Contributions", icon: ReceiptText },
  { href: "/withdrawals", label: "Withdrawals", icon: ArrowLeftRight },
  { href: "/transactions", label: "Transactions", icon: History },
];

const adminNavItems = [
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/create-member", label: "Add New Member", icon: UserPlus },
    { href: "/admin/requests", label: "User Requests", icon: BellRing, badge: "2" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarGroup className="mt-4">
            <h3 className="px-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider group-data-[collapsible=icon]:hidden">Admin</h3>
        </SidebarGroup>
         <SidebarMenu>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="user avatar" alt="User" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium text-sidebar-foreground">Kofi Adu</p>
                <p className="text-xs text-sidebar-foreground/70">Admin</p>
            </div>
        </div>
        <Separator className="my-2 bg-sidebar-border" />
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <SidebarMenuButton asChild tooltip="Logout">
                <Link href="/sign-in">
                    <LogOut />
                    <span>Logout</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
