import React, { useEffect, useRef, useState } from 'react';
import CameraControls from './CameraControls';

interface InfoOverlayProps {
    visible: boolean;
}

const NAME_TEXT = 'Jevan Bhatti';
const TITLE_TEXT = 'Welcome to my desk';
const MULTIPLIER = 1;

const InfoOverlay: React.FC<InfoOverlayProps> = ({ visible }) => {
    const visRef = useRef(visible);
    const [nameText, setNameText] = useState('');
    const [titleText, setTitleText] = useState('');
    const [textDone, setTextDone] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void,
        refOverride?: React.MutableRefObject<string>
    ) => {
        if (refOverride) {
            text = refOverride.current;
        }
        if (i < text.length) {
            setTimeout(() => {
                if (visRef.current === true)
                    window.postMessage(
                        { type: 'keydown', key: `_AUTO_${text[i]}` },
                        '*'
                    );

                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback,
                    refOverride
                );
            }, Math.random() * 50 + 50 * MULTIPLIER);
        } else {
            callback();
        }
    };

    useEffect(() => {
        if (visible && nameText == '') {
            setTimeout(() => {
                typeText(0, '', NAME_TEXT, setNameText, () => {
                    typeText(0, '', TITLE_TEXT, setTitleText, () => {
                        setTextDone(true);
                    });
                });
            }, 400);
        }
        visRef.current = visible;
    }, [visible]);

    useEffect(() => {
        if (textDone) {
            setTimeout(() => {
                setZoomVisible(true);
            }, 250);
        }
    }, [textDone]);

    useEffect(() => {
        window.postMessage({ type: 'keydown', key: `_AUTO_` }, '*');
    }, [zoomVisible]);

    return (
        <div style={styles.wrapper}>
            {nameText !== '' && (
                <div style={styles.container}>
                    <p style={styles.text}>{nameText}</p>
                </div>
            )}
            {titleText !== '' && (
                <div style={styles.container}>
                    <p style={styles.text}>{titleText}</p>
                </div>
            )}
            {zoomVisible && (
                <div style={styles.controlRow}>
                    <CameraControls />
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        background: '#f6bcd9',
        padding: 4,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        display: 'flex',
        marginBottom: 4,
        boxSizing: 'border-box',
    },
    wrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    blinkingContainer: {
        // width: 100,
        // height: 100,
        marginLeft: 8,
        paddingBottom: 2,
        paddingRight: 4,
    },
    text: {
        color: '#3a2630',
    },
    controlRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 4,
    },
    lastRowChild: {
        marginRight: 4,
    },
};

export default InfoOverlay;
