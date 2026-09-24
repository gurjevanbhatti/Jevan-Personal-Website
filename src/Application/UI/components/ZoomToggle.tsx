import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from '../EventBus';
import { Easing } from '../Animation';

interface ZoomToggleProps {}

/**
 * Pulls the camera into the monitor and holds it there, so you can stay at the
 * desk without having to keep the pointer over the screen.
 */
const ZoomToggle: React.FC<ZoomToggleProps> = ({}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [blockEvents, setBlockEvents] = useState(true);

    const onMouseDownHandler = useCallback(
        (event) => {
            setIsActive(true);
            event.preventDefault();
            setZoomed(!zoomed);
        },
        [zoomed]
    );

    const onMouseUpHandler = useCallback(() => {
        setIsActive(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setBlockEvents(false);
        }, 100);
    }, []);

    useEffect(() => {
        if (!blockEvents) {
            window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
            UIEventBus.dispatch('zoomLock', zoomed);
        }
    }, [zoomed]);

    const size = window.innerWidth < 768 ? 11 : 14;

    return (
        <div style={styles.wrapper}>
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={styles.container}
                onMouseDown={onMouseDownHandler}
                onMouseUp={onMouseUpHandler}
                className="icon-control-container"
                id="prevent-click"
                title={zoomed ? 'Back to the desk' : 'Zoom into the computer'}
            >
                <motion.svg
                    id="prevent-click"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3a2630"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    animate={
                        isActive
                            ? 'active'
                            : isHovering
                            ? 'hovering'
                            : 'default'
                    }
                    variants={iconVars}
                >
                    <circle cx="10.5" cy="10.5" r="6.8" />
                    <path d="M15.6 15.6 21 21" />
                    {zoomed ? (
                        <path d="M7.4 10.5h6.2" />
                    ) : (
                        <path d="M7.4 10.5h6.2M10.5 7.4v6.2" />
                    )}
                </motion.svg>
            </div>
        </div>
    );
};

const iconVars = {
    hovering: {
        opacity: 0.75,
        transition: { duration: 0.1, ease: 'easeOut' },
    },
    active: {
        scale: 0.8,
        opacity: 0.5,
        transition: { duration: 0.1, ease: Easing.expOut },
    },
    default: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2, ease: 'easeOut' },
    },
};

const styles: StyleSheetCSS = {
    container: {
        background: '#f6bcd9',
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        display: 'flex',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        pointerEvents: 'auto',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
};

export default ZoomToggle;
