import React, { useState, useEffect, useMemo } from 'react';

// SVG Paths
const SVGS = {
    Airplane: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1 2.5L9 13l-4 4-3-1-1 1 4 4 1-1-1-3 4-4 3.5 6.3c.5.9 1.4 1 2 .8l2.5-1c.5-.2.8-.6.7-1.1z"/></svg>,
    Suitcase: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 20v2"/><path d="M14 20v2"/><path d="M8 10v6"/><path d="M16 10v6"/></svg>,
    Compass: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    Camera: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    Map: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    PalmTree: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c0-5.5 1-10 1-13"/><path d="M13 9c3.5 0 6 2.5 6 6-1.5 0-3.5-1-5.5-2.5"/><path d="M13 9c-3.5 0-6 2.5-6 6 1.5 0 3.5-1 5.5-2.5"/><path d="M13 9c0-3.5-2.5-6-6-6 0 1.5 1 3.5 2.5 5.5"/><path d="M13 9c0-3.5 2.5-6 6-6 0 1.5-1 3.5-2.5 5.5"/><path d="M5 22h14"/></svg>,
    Sailboat: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M10 2v16"/></svg>,
    Backpack: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M4 14h2"/><path d="M18 14h2"/></svg>,
    Sunglasses: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 13a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M13 13a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"/><path d="M11 13h2"/><path d="M3 13v-3a2 2 0 0 1 2-2h4"/><path d="M21 13v-3a2 2 0 0 0-2-2h-4"/></svg>,
    Cocktail: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 5 2 5"/><path d="m2 5 10 10 10-10"/><path d="M12 15v7"/><path d="M8 22h8"/></svg>,
    Bicycle: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/><path d="M12 17.5h6"/><path d="m5.5 17.5 3-7 2-3"/><path d="M4 7h4l4 4"/></svg>,
    Tent: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 20h20"/><path d="m12 4-8 16"/><path d="m12 4 8 16"/><path d="m12 4-4 16"/><path d="m12 4 4 16"/></svg>,
    Bus: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/><path d="M12 20v2"/><path d="M8 20v2"/><path d="M16 20v2"/><path d="M4 12h16"/><path d="M8 6v6"/><path d="M16 6v6"/></svg>,
    Hat: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 14c0-2.8-2.2-5-5-5s-5 2.2-5 5"/><path d="M2 14h20"/><path d="M7 14v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5"/></svg>,
    Ticket: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 7v10"/><path d="M15 7v10"/></svg>,
    Anchor: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><path d="M5 12a7 7 0 0 0 14 0"/></svg>,
    Binoculars: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11.176a2 2 0 0 0 2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11.176a2 2 0 0 1-2 2z"/></svg>,
    Globe: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
};

const ICONS = Object.values(SVGS);

const DoodleBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate random items once per session
    const items = useMemo(() => {
        const generated = [];
        const count = 90; // Increased instances for more density
        for (let i = 0; i < count; i++) {
            const RandomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
            generated.push({
                id: i,
                Icon: RandomIcon,
                top: Math.random() * 100, // 0 to 100%
                left: Math.random() * 100, // 0 to 100%
                size: Math.random() * 30 + 20, // 20px to 50px
                rotate: Math.random() * 60 - 30, // -30deg to 30deg
                parallaxFactor: Math.random() * 0.015 + 0.005 // 0.005 to 0.02
            });
        }
        return generated;
    }, []);

    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 500;

    return (
        <div 
            className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden doodle-background" 
            aria-hidden="true"
        >
            {items.map((item) => {
                const offsetX = (mousePos.x - centerX) * item.parallaxFactor;
                const offsetY = (mousePos.y - centerY) * item.parallaxFactor;
                
                return (
                    <div
                        key={item.id}
                        className="absolute flex items-center justify-center"
                        style={{
                            color: '#7C3A0A',
                            opacity: 0.12,
                            top: `${item.top}%`,
                            left: `${item.left}%`,
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            transform: `translate(${offsetX}px, ${offsetY}px) rotate(${item.rotate}deg)`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <item.Icon className="w-full h-full" />
                    </div>
                );
            })}
        </div>
    );
};

export default DoodleBackground;
