"use client";

import { Rocket, Twitter, Youtube, Facebook, Linkedin } from "../svgs";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            {/* Top Section */}
            <div className="hidden md:flex justify-between flex-wrap px-4 py-4 text-sm uppercase gap-4">
                {[
                    ["Platform", "Services", "Integrations", "Affiliates"],
                    ["Pricing", "License", "Newsletters"],
                    ["Security", "Privacy Policy", "Cookies"],
                ].map((links, index) => (
                    <div key={index} className="flex flex-wrap gap-2">
                        {links.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="hover:underline transition-colors before:content-['/'] before:mr-2 before:inline-block first:before:content-none"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 gap-4">
                {/* Branding and Info */}
                <div className="flex items-center gap-4 text-center md:text-left">
                    <Rocket
                        size={28}
                        className="text-gray-800 dark:text-gray-200 transition-colors duration-150 ease-out"
                    />
                    <p className="text-sm">
                        quarter-pounder © {currentYear}
                        <br />
                        Built with codes.
                    </p>
                </div>

                {/* Social Links */}
                <nav className="flex gap-4">
                    {[
                        { href: "https://twitter.com/", label: "Twitter", Icon: Twitter },
                        { href: "https://www.youtube.com/", label: "YouTube", Icon: Youtube },
                        { href: "https://www.facebook.com/", label: "Facebook", Icon: Facebook },
                        { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: Linkedin },
                    ].map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className="hover:opacity-70 transition-opacity"
                            aria-label={label}
                        >
                            <Icon size={24} strokeWidth={2} />
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}