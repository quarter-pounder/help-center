"use client";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "../ui/sheet";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { handleError } from "@/utils/handleError";
import { mapCategoriesToNavItems } from "@/components/navigation/nav-utils";

export default function MobileNavDrawer() {
    const { categories, loading, error } = useCategories();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const resolvedError = error ? handleError(error) : null;

    const categoryNavItems = !loading && !resolvedError
        ? mapCategoriesToNavItems(categories)
        : [];

    return (
        <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                {/* Trigger Button */}
                <SheetTrigger asChild>
                    <button
                        className="p-2 transition-transform duration-200 hover:scale-105 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </SheetTrigger>

                {/* Sheet Content */}
                <SheetContent
                    side="right"
                    className="h-screen w-full sm:w-80 sm:max-w-md overflow-y-auto bg-stone-50 dark:bg-charcoal border-none shadow-none"
                >
                    {/* Drawer Body */}
                    <div className="pt-8 space-y-2">
                        <ul className="space-y-4">
                            {/* User Guide with Collapsible Categories */}
                            <li>
                                <details className="group">
                                    <summary className="flex items-center justify-between p-1 text-lg font-medium text-gray-700 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                                        User Guides
                                        <span className="ml-2">
                                            <ChevronDown
                                                className="w-4 h-4 group-open:hidden"
                                                aria-hidden="true"
                                            />
                                            <ChevronUp
                                                className="w-4 h-4 hidden group-open:block"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </summary>

                                    {loading && <p className="p-2 text-sm text-gray-500">Loading categories...</p>}
                                    {resolvedError && (
                                        <p className="p-2 text-sm text-red-500">
                                            Error loading categories: {resolvedError.message}
                                        </p>
                                    )}

                                    {!loading && !resolvedError && categoryNavItems.length > 0 && (
                                        <ul className="mt-2 border-l border-dotted space-y-1">
                                            {categoryNavItems.map((item) => (
                                                <li key={item.id}>
                                                    <Link
                                                        href={item.url || "#"}
                                                        className="block text-sm p-1 pl-4 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                        onClick={handleLinkClick} // Close the drawer on click
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {!loading && !resolvedError && categoryNavItems.length === 0 && (
                                        <p className="p-2 text-sm text-gray-500">No categories available.</p>
                                    )}
                                </details>
                            </li>

                            {/* FAQ */}
                            <li>
                                <Link
                                    href="/faq"
                                    className="block p-2 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={handleLinkClick} // Close the drawer on click
                                >
                                    FAQ
                                </Link>
                            </li>

                            {/* Contact */}
                            <li>
                                <Link
                                    href="/contact"
                                    className="block p-2 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={handleLinkClick} // Close the drawer on click
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hidden for Accessibility */}
                    <SheetHeader className="sr-only">
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>
                            Navigate through the guides and FAQs.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}