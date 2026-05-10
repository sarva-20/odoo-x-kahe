import React, { useEffect, useState } from 'react';

const AirplaneTransition = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animation takes 3.0s. Wait 0.2s pause = 3.2s
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white/90">
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500">
                    <path 
                        id="flightPath"
                        d="M -100 400 Q 400 100 1100 150" 
                        fill="none" 
                        stroke="#FF4500" 
                        strokeWidth="4" 
                        strokeDasharray="15, 15"
                        strokeDashoffset="2000"
                    >
                        <animate 
                            attributeName="stroke-dashoffset" 
                            from="2000" 
                            to="0" 
                            dur="3s" 
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                        />
                    </path>
                    
                    <g fill="#FF4500">
                        {/* Airplane Icon */}
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="scale(3) translate(-12, -12) rotate(45)" />
                        <animateMotion 
                            dur="3s" 
                            fill="freeze" 
                            rotate="auto"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                        >
                            <mpath href="#flightPath" />
                        </animateMotion>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default AirplaneTransition;
