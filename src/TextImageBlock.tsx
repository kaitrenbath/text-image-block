import { BlockProps, RichTextEditor, joinClassNames } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Orientation, PLACEHOLDER } from './constants';
import { getPlugins } from './helpers';
import { Settings } from './settings';
import { ImageWrapper } from './components';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { animationSpeed, animationStaggering, content, paddingChoice, orientation, ratio } = blockSettings;
    const containerRef = useRef(null);
    const isEditing = useEditorState(appBridge);
    const plugins = useMemo(() => getPlugins(appBridge), [appBridge]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInView, setIsInView] = useState(false);

    const updateContent = useCallback((content: string) => setBlockSettings({ content }), [setBlockSettings]);

    const shouldAnimate = !isLoading && isInView ? 'show' : 'hidden';
    const container = {
        hidden: {
            transition: {
                type: false,
            },
        },
        show: {
            transition: {
                staggerChildren: animationStaggering,
                staggerDirection: orientation === Orientation.TextImage ? 1 : -1,
            },
        },
    };
    const column = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: animationSpeed,
            },
        },
    };

    useEffect(() => {
        const { current } = containerRef;
        const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            setTimeout(() => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            }, 200);
        };
        const observer = new IntersectionObserver(onIntersect, { root: null, rootMargin: '0px', threshold: 1.0 });

        if (current && !isLoading) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.disconnect();
            }
        };
    }, [containerRef, isLoading]);

    return (
        <div id={appBridge.context('blockId').get().toString()} className="text-image-block">
            <motion.div
                variants={container}
                initial={isEditing ? 'show' : 'hidden'}
                animate={isEditing ? 'show' : shouldAnimate}
                ref={containerRef}
                className={joinClassNames([
                    'tw-flex tw-gap-x-4 tw-gap-y-6',
                    orientation === Orientation.TextImage
                        ? 'tw-flex-col md:tw-flex-row'
                        : 'tw-flex-col-reverse md:tw-flex-row-reverse',
                ])}
            >
                <motion.div
                    className="tw-w-full tw-flex-1"
                    variants={column}
                    style={{
                        paddingLeft: paddingChoice,
                        paddingRight: paddingChoice,
                    }}
                >
                    <RichTextEditor
                        isEditing={isEditing}
                        placeholder={PLACEHOLDER}
                        plugins={plugins}
                        value={content}
                        onTextChange={updateContent}
                    />
                </motion.div>
                <motion.div
                    variants={column}
                    className={ratio}
                    style={{
                        paddingLeft: paddingChoice,
                        paddingRight: paddingChoice,
                    }}
                >
                    <ImageWrapper appBridge={appBridge} isLoading={isLoading} setIsLoading={setIsLoading} />
                </motion.div>
            </motion.div>
        </div>
    );
};
