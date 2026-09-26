import React, { useCallback, useEffect, useState } from 'react';
import UIEventBus from '../EventBus';

type Mode = 'idle' | 'monitor' | 'free';

interface CameraControlsProps {}

/**
 * Two ways to move the camera: in to the screen, or free look around the room.
 * Pressing the active one again returns to the wide view.
 */
const CameraControls: React.FC<CameraControlsProps> = ({}) => {
    const [mode, setMode] = useState<Mode>('idle');
    const [blockEvents, setBlockEvents] = useState(true);

    useEffect(() => {
        setTimeout(() => setBlockEvents(false), 100);
        const release = () => setMode('idle');
        UIEventBus.on('zoomRelease', release);
        return () => UIEventBus.remove('zoomRelease', release);
    }, []);

    useEffect(() => {
        if (blockEvents) return;
        window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
        UIEventBus.dispatch('freeCamToggle', mode === 'free');
        if (mode !== 'free') UIEventBus.dispatch('cameraMode', mode);
    }, [mode]);

    const pick = useCallback(
        (next: Mode) => (event: React.MouseEvent) => {
            event.preventDefault();
            setMode((m) => (m === next ? 'idle' : next));
        },
        []
    );

    const box = (active: boolean) =>
        Object.assign({}, styles.button, active ? styles.buttonActive : {});

    return (
        <div style={styles.row}>
            <div
                style={box(mode === 'monitor')}
                onMouseDown={pick('monitor')}
                id="prevent-click"
                title="Zoom in on the computer"
            >
                <p style={styles.label} id="prevent-click">
                    Zoom in
                </p>
            </div>

            <div
                style={box(mode === 'free')}
                onMouseDown={pick('free')}
                id="prevent-click"
                title="Look around the room"
            >
                <svg
                    id="prevent-click"
                    viewBox="0 0 16 16"
                    width={13}
                    height={13}
                    style={{ display: 'block' }}
                >
                    <path
                        d="M3 1.4 12.4 9 8.3 9.5l2.2 4.4-1.7.9-2.2-4.4L3 13.6Z"
                        fill="#3a2630"
                    />
                </svg>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        background: '#f6bcd9',
        height: 28,
        paddingLeft: 12,
        paddingRight: 12,
        marginRight: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        flexShrink: 0,
    },
    buttonActive: {
        background: '#e58cb8',
    },
    label: {
        color: '#3a2630',
        fontSize: 14,
        lineHeight: 1,
        whiteSpace: 'nowrap',
    },
};

export default CameraControls;
