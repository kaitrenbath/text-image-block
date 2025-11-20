import { BlockProps, RichTextEditor, joinClassNames } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { motion } from 'motion/react';
import { useCallback, useMemo, useRef } from 'react';

import { Direction, Orientation, PLACEHOLDER } from './constants';
import { getPlugins } from './helpers';
import { Settings } from './settings';
import { ImageWrapper } from './components';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const plugins = useMemo(() => getPlugins(appBridge), [appBridge]);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const { animationSpeed, animationStaggering, content, direction, paddingChoice, orientation, ratio } =
        blockSettings;
    const blockId = String(appBridge.context('blockId').get());
    const shouldAnimate = !isEditing;

    const updateContent = useCallback((content: string) => setBlockSettings({ content }), [setBlockSettings]);

    const TextSection = () => {
        return (
            <motion.div
                ref={textRef}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={{
                    duration: animationSpeed,
                    delay: Orientation.ImageText === orientation ? animationStaggering : 0,
                }}
                viewport={{ once: true, amount: 'some', margin: '0px 0px -30% 0px' }}
            >
                <RichTextEditor
                    id={`animated-text-${blockId}`}
                    isEditing={isEditing}
                    placeholder={PLACEHOLDER}
                    plugins={plugins}
                    value={content}
                    onTextChange={updateContent}
                />
            </motion.div>
        );
    };

    const ImageSection = () => {
        return (
            <motion.div
                ref={imageRef}
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={{
                    duration: animationSpeed,
                    delay: Orientation.TextImage === orientation ? animationStaggering : 0,
                }}
                viewport={{ once: true, amount: 'some', margin: '0px 0px -30% 0px' }}
                className="tw-h-full"
            >
                <ImageWrapper appBridge={appBridge} />
            </motion.div>
        );
    };

    return (
        <div id={blockId} className="text-image-block">
            <div
                className={joinClassNames([
                    'tw-flex tw-flex-col tw-gap-x-4 tw-gap-y-6',
                    direction === Direction.Horizontal ? 'tw-flex-col md:tw-flex-row' : 'tw-flex-col',
                ])}
            >
                <div
                    className="tw-w-full tw-flex-1"
                    style={{
                        paddingLeft: paddingChoice,
                        paddingRight: paddingChoice,
                    }}
                >
                    {orientation === Orientation.TextImage || orientation === Orientation.TextOnly ? (
                        <TextSection />
                    ) : (
                        <ImageSection />
                    )}
                </div>
                {(orientation === Orientation.TextImage || orientation === Orientation.ImageText) && (
                    <div
                        className={joinClassNames([
                            'tw-w-full',
                            direction === Direction.Horizontal ? ratio : undefined,
                        ])}
                        style={{
                            paddingLeft: paddingChoice,
                            paddingRight: paddingChoice,
                        }}
                    >
                        {orientation === Orientation.TextImage ? <ImageSection /> : <TextSection />}
                    </div>
                )}
            </div>
        </div>
    );
};
