"use client";

import Link from "next/link";
import Image from "next/image";
import { Send } from 'lucide-react';

const SendArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 14 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0 12.001L10.999 12.001L5.5 17.5L6.5 18.5L13.5 11.5L6.5 4.5L5.5 5.5L11 11.001L0 11.001V12.001Z" />
    </svg>
);

const Footer = () => {
    return (
        <footer id="contacts" className="bg-white text-black pt-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center pb-12">
                    <Link href="/" className="mb-8 md:mb-0">
                        <Image 
                            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-Photoroom-29-1759433896216.png"
                            alt="IELTS LY"
                            width={180}
                            height={60}
                            className="h-16 w-auto"
                        />
                    </Link>
                    <nav className="flex flex-wrap gap-x-8 gap-y-4 items-center text-base font-medium text-neutral-800 mb-8 md:mb-0 md:mx-8">
                        <Link href="/report" className="hover:text-black transition-colors">Check result</Link>
                        <Link href="/top-results" className="hover:text-black transition-colors">Rating</Link>
                        <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                        <Link href="/all-tests" className="hover:text-black transition-colors">Tests</Link>
                        <Link href="#contacts" className="hover:text-black transition-colors">Contact us</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="px-8 py-3 border border-black rounded-full font-medium hover:bg-gray-100 transition-colors text-base">
                            Login
                        </Link>
                        <Link href="/login" className="px-8 py-3 bg-[#E60012] text-white rounded-full font-medium hover:opacity-90 transition-opacity text-base">
                            Sign up
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-24 gap-y-16 py-16">
                    <div>
                        <p className="text-neutral-500 text-lg leading-relaxed">
                            If you have any difficulties with the test or have any questions, please contact our managers at:
                        </p>
                        <div className="flex items-center gap-5 mt-8">
                            <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                                <Send className="w-7 h-7 -rotate-45" />
                            </div>
                            <a href="mailto:info@examy.me" className="text-3xl font-bold text-black break-all">
                                info@examy.me
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-3xl font-bold text-black mb-12">Contact Us</h4>
                        <form action="#" method="POST" className="space-y-10">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="message"
                                    name="message"
                                    className="block pt-4 pb-2 w-full text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="message"
                                    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Message
                                </label>
                            </div>
                            <div className="flex items-center">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        id="email_phone"
                                        name="email_phone"
                                        className="block pt-4 pb-2 w-full text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="email_phone"
                                        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Email/Phone number
                                    </label>
                                </div>
                                <button type="submit" className="ml-4 text-black hover:text-gray-600 transition-colors self-end pb-1 focus:outline-none">
                                    <SendArrowIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-[#E60012] text-white">
                <div className="max-w-6xl mx-auto px-6 py-8 text-center">
                    <p className="text-base font-medium mb-4">
                        Examy.me | est. 2023 | Powered by <a href="https://youtube.com/ekursuz" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Ekurs</a> & <a href="https://jdsystems.uz/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">JDSystems</a>
                    </p>
                    <p className="text-xs text-gray-200 max-w-4xl mx-auto leading-relaxed">
                        All trademarks are the property of their respective owners. IELTS® is a registered trademark of The British Council, IDP: IELTS Australia and the University of Cambridge ESOL Examinations (Cambridge ESOL). These products have not been endorsed or approved by their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;