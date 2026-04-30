"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { contactContent } from "@/content/contact";
import { useState } from "react";
import {
    scrollReveal,
    viewportOnce,
    fadeInUp,
} from "@/lib/animations";

/* ─────────────── Contact Hero Section ─────────────── */

function ContactHero() {
    return (
        <section className="relative overflow-hidden" style={{paddingTop: "150px", paddingBottom: "150px", backgroundImage: `url('${contactContent.hero.backgroundImage}')`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            {/* Content */}
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="max-w-6xl text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {contactContent.hero.title}
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── Contact Content Section ─────────────── */

function ContactContent() {
    return (
        <section className="bg-white py-16 px-8 sm:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - The Hyniva Difference Image */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="text-left"
                        >
                            <figure className="mb-0">
                                <div className="vc_single_image-wrapper vc_box_border_grey">
                                    <Image
                                        src={contactContent.differenceImage.src}
                                        alt={contactContent.differenceImage.alt}
                                        width={contactContent.differenceImage.width}
                                        height={contactContent.differenceImage.height}
                                        className="vc_single_image-img attachment-large w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                            </figure>
                        </motion.div>
                    </div>
                    
                    {/* Right Column - Contact Form */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                            className="text-left"
                            data-animation-delay="200"
                        >
                            {/* Form Header */}
                            <header className="kd-section-title col-lg-12 text-left mb-8">
                                <h2 className="separator_off text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                                    {contactContent.contactForm.title}
                                </h2>
                                <h6 className="subtitle text-lg text-slate-600">
                                    {contactContent.contactForm.subtitle}
                                </h6>
                            </header>
                            
                            {/* Empty Space */}
                            <div className="vc_empty_space" style={{height: "20px"}}>
                                <span className="vc_empty_space_inner"></span>
                            </div>
                            
                            {/* Contact Form 7 Structure */}
                            <div className="kd-contact-form full-width-cf">
                                <div className="wpcf7 js" id="wpcf7-f5208-p5756-o1" lang="en-US" dir="ltr">
                                    <form 
                                        action="/contact-us/#wpcf7-f5208-p5756-o1" 
                                        method="post" 
                                        className="wpcf7-form init"
                                        aria-label="Contact form"
                                        noValidate
                                    >
                                        <p>
                                            <span className="wpcf7-form-control-wrap" data-name="your-name">
                                                <input 
                                                    size={40} 
                                                    maxLength={400} 
                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none mb-4" 
                                                    aria-required="true" 
                                                    aria-invalid="false" 
                                                    placeholder="Your name" 
                                                    type="text" 
                                                    name="your-name"
                                                />
                                            </span>
                                            <br />
                                            <span className="wpcf7-form-control-wrap" data-name="your-email">
                                                <input 
                                                    size={40} 
                                                    maxLength={400} 
                                                    className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none mb-4" 
                                                    aria-required="true" 
                                                    aria-invalid="false" 
                                                    placeholder="Your email" 
                                                    type="email" 
                                                    name="your-email"
                                                />
                                            </span>
                                            <br />
                                            <span className="wpcf7-form-control-wrap" data-name="your-message">
                                                <textarea 
                                                    cols={40} 
                                                    rows={10} 
                                                    maxLength={2000} 
                                                    className="wpcf7-form-control wpcf7-textarea w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none resize-none mb-4" 
                                                    aria-invalid="false" 
                                                    placeholder="Your message" 
                                                    name="your-message"
                                                ></textarea>
                                            </span>
                                            <br />
                                            <input 
                                                className="wpcf7-form-control wpcf7-submit has-spinner bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all cursor-pointer border-2 border-blue-900" 
                                                type="submit" 
                                                value="Send message"
                                            />
                                        </p>
                                        <div className="wpcf7-response-output" aria-hidden="true"></div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


/* ─────────────── WordPress Footer Component ─────────────── */

function WordPressFooter() {
    return (
        <footer className="bg-white border-t-2 border-blue-900">
            {/* Upper Footer */}
            <div className="py-12">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and Social */}
                        <div className="space-y-6">
                            <Image
                                src={contactContent.footer.logo.src}
                                alt={contactContent.footer.logo.alt}
                                width={contactContent.footer.logo.width}
                                height={contactContent.footer.logo.height}
                                className="h-auto"
                            />
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.social.title}
                                </h5>
                                <div className="flex space-x-4">
                                    {contactContent.footer.social.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-900 hover:text-blue-700 transition-colors"
                                        >
                                            <i className={`${link.icon} text-xl`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Industries */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                {contactContent.footer.industries.title}
                            </h5>
                            <ul className="space-y-2">
                                {contactContent.footer.industries.links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.url}
                                            className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                {contactContent.footer.services.title}
                            </h5>
                            <ul className="space-y-2">
                                {contactContent.footer.services.links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.url}
                                            className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products & About */}
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.products.title}
                                </h5>
                                <ul className="space-y-2">
                                    {contactContent.footer.products.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.about.title}
                                </h5>
                                <ul className="space-y-2">
                                    {contactContent.footer.about.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Footer */}
            <div className="border-t border-slate-200 py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* US Office */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider flex items-center">
                                <i className="fa-solid fa-location-dot mr-2"></i>
                                {contactContent.offices.us.title}
                            </h5>
                            <div 
                                className="text-slate-600 text-sm leading-relaxed pl-6"
                                dangerouslySetInnerHTML={{ __html: contactContent.offices.us.address }}
                            />
                        </div>

                        {/* India Office */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider flex items-center">
                                <i className="fa-solid fa-location-dot mr-2"></i>
                                {contactContent.offices.india.title}
                            </h5>
                            <div 
                                className="text-slate-600 text-sm leading-relaxed pl-6"
                                dangerouslySetInnerHTML={{ __html: contactContent.offices.india.address }}
                            />
                        </div>

                        {/* Memberships */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">
                                {contactContent.footer.memberships.title}
                            </h5>
                            <div className="flex space-x-4">
                                {contactContent.footer.memberships.images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img.src}
                                        alt={img.alt}
                                        width={100}
                                        height={50}
                                        className="h-auto object-contain"
                                        style={{ width: img.width }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">
                                {contactContent.footer.certifications.title}
                            </h5>
                            <div className="flex space-x-4">
                                {contactContent.footer.certifications.images.map((img, index) => (
                                    <div key={index}>
                                        {img.link ? (
                                            <a
                                                href={img.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Rating and Review"
                                            >
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    width={80}
                                                    height={50}
                                                    className="h-auto object-contain"
                                                    style={{ width: img.width }}
                                                />
                                            </a>
                                        ) : (
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={80}
                                                height={50}
                                                className="h-auto object-contain"
                                                style={{ width: img.width }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─────────────── Contact Footer Component ─────────────── */

function ContactFooter() {
    return (
        <footer className="bg-white border-t border-slate-200">
            {/* Upper Footer */}
            <div className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and Social */}
                        <div className="space-y-6">
                            <Image
                                src={contactContent.footer.logo.src}
                                alt={contactContent.footer.logo.alt}
                                width={contactContent.footer.logo.width}
                                height={contactContent.footer.logo.height}
                                className="h-auto"
                            />
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.social.title}
                                </h5>
                                <div className="flex space-x-4">
                                    {contactContent.footer.social.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-900 hover:text-blue-700 transition-colors"
                                        >
                                            <i className={`${link.icon} text-xl`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Industries */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                {contactContent.footer.industries.title}
                            </h5>
                            <ul className="space-y-2">
                                {contactContent.footer.industries.links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.url}
                                            className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                {contactContent.footer.services.title}
                            </h5>
                            <ul className="space-y-2">
                                {contactContent.footer.services.links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.url}
                                            className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products & About */}
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.products.title}
                                </h5>
                                <ul className="space-y-2">
                                    {contactContent.footer.products.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wider">
                                    {contactContent.footer.about.title}
                                </h5>
                                <ul className="space-y-2">
                                    {contactContent.footer.about.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className="text-slate-600 hover:text-blue-900 transition-colors text-sm"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Footer */}
            <div className="border-t border-slate-200 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* US Office */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider flex items-center">
                                <i className="fa-solid fa-location-dot mr-2"></i>
                                {contactContent.offices.us.title}
                            </h5>
                            <div 
                                className="text-slate-600 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: contactContent.offices.us.address }}
                            />
                        </div>

                        {/* India Office */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider flex items-center">
                                <i className="fa-solid fa-location-dot mr-2"></i>
                                {contactContent.offices.india.title}
                            </h5>
                            <div 
                                className="text-slate-600 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: contactContent.offices.india.address }}
                            />
                        </div>

                        {/* Memberships */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">
                                {contactContent.footer.memberships.title}
                            </h5>
                            <div className="flex space-x-4">
                                {contactContent.footer.memberships.images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img.src}
                                        alt={img.alt}
                                        width={100}
                                        height={50}
                                        className="h-auto object-contain"
                                        style={{ width: img.width }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h5 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">
                                {contactContent.footer.certifications.title}
                            </h5>
                            <div className="flex space-x-4">
                                {contactContent.footer.certifications.images.map((img, index) => (
                                    <div key={index}>
                                        {img.link ? (
                                            <a
                                                href={img.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Rating and Review"
                                            >
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    width={80}
                                                    height={50}
                                                    className="h-auto object-contain"
                                                    style={{ width: img.width }}
                                                />
                                            </a>
                                        ) : (
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={80}
                                                height={50}
                                                className="h-auto object-contain"
                                                style={{ width: img.width }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─────────────── Main Contact Page Component ─────────────── */

function ContactHeader() {
    return (
        <section className="bg-white py-16 px-8 sm:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="wpb_wrapper">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column - Title */}
                        <div className="lg:col-span-4 md:col-span-12">
                            <h3 
                                style={{fontSize: "36px", lineHeight: "42px", textAlign: "left"}}
                                className="vc_custom_heading text-blue-900 font-bold"
                            >
                                {contactContent.hero.subtitle}
                            </h3>
                        </div>
                        
                        {/* Right Column - Description */}
                        <div className="lg:col-span-8 md:col-span-12">
                            <h6 
                                style={{textAlign: "left"}}
                                className="vc_custom_heading text-slate-600 text-lg leading-relaxed"
                            >
                                {contactContent.hero.description}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main>
                <ContactHeader />
                <ContactContent />
            </main>
            <Footer />
        </>
    );
}
