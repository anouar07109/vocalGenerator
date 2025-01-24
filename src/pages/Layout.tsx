  import { AppSidebar } from "@/components/app-sidebar"
  import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from  "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Layout({ children }: any) {
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block underline uppercase font-serif text-lg ">
                  <BreadcrumbLink href="#">
                    welcom
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className="rounded-full border px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100 text-gray-900"
            />
            <div className="relative">
              <button
                className="relative text-gray-700 focus:outline-none"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  2
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-600 border rounded-xl shadow-lg">
                  <ul className="p-2">
                    <li className="p-2 text-sm hover:bg-gray-600 cursor-pointer">
                      Nouvelle mise à jour disponible
                    </li>

                    <li className="p-2 text-sm hover:bg-gray-600 cursor-pointer">
                      Message important de l'équipe
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

       

        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

