
import Link from "next/link";
import { HomeIcon, UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function NavLinks() {
const links = [{name: "Home", href: "/", icon: HomeIcon}, {name : "dashboard", href: "/dashboard", icon: DocumentTextIcon}, {name : "customer", href: "/dashboard/customers", icon : UserIcon}]

    return (
        <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
                <Link
                key={link.name}
                href={link.href}
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                >
                    <LinkIcon className= "w-6"/>
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            )
        })}
        </>
        
    )
}