import React from 'react';

const Footer = () => (
    <footer className="w-full py-lg px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md bg-on-background text-surface border-t-2 border-on-background mt-auto">
        <div className="font-headline-md font-bold text-primary">Traveloop</div>
        <div className="flex flex-wrap justify-center gap-md font-body-sm">
            <a className="opacity-80 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="opacity-80 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="opacity-80 hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
        <div className="font-body-sm opacity-80">© 2024 Traveloop. Adventure Awaits.</div>
    </footer>
);

export default Footer;
