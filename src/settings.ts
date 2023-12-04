import { FileExtensionSets, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { AnimationSpeed, AnimationStagger, Orientation, Padding } from './types';

const PADDING_CHOICE_ID = 'paddingChoice';
const SPEED_ID = 'animationSpeed';
const STAGGER_ID = 'animationStaggering';
export const IMAGE_ID = 'imageAsset';
export const PLACEHOLDER = 'Write some content here...';
export const ALLOWED_EXTENSIONS = [...FileExtensionSets.Images];

export const paddingValues: Record<Padding, string> = {
    [Padding.None]: '0',
    [Padding.Small]: '1vw',
    [Padding.Medium]: '2.5vw',
    [Padding.Large]: '5vw',
};

export const animationSpeedValues: Record<AnimationSpeed, number> = {
    [AnimationSpeed.Fast]: 0.3,
    [AnimationSpeed.Medium]: 0.6,
    [AnimationSpeed.Slow]: 1,
};

export const animationStaggerValues: Record<AnimationStagger, number> = {
    [AnimationStagger.None]: 0,
    [AnimationStagger.Fast]: 0.15,
    [AnimationStagger.Medium]: 0.4,
    [AnimationStagger.Slow]: 0.7,
};

export const settings = defineSettings({
    main: [
        {
            id: 'orientation',
            type: 'dropdown',
            defaultValue: Orientation.TextImage,
            size: 'large',
            choices: [
                {
                    value: Orientation.TextImage,
                    icon: IconEnum.MediaObjectTextLeft,
                    label: 'Text / Image',
                },
                {
                    value: Orientation.ImageText,
                    icon: IconEnum.MediaObjectTextRight,
                    label: 'Image / Text',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: 'Image',
            blocks: [
                {
                    id: IMAGE_ID,
                    type: 'assetInput',
                    size: 'small',
                    extensions: ALLOWED_EXTENSIONS,
                },
            ],
        },
    ],
    layout: [
        {
            id: PADDING_CHOICE_ID,
            type: 'segmentedControls',
            defaultValue: Padding.Small,
            choices: [
                {
                    value: Padding.None,
                    label: 'None',
                },
                {
                    value: Padding.Small,
                    label: 'S',
                },
                {
                    value: Padding.Medium,
                    label: 'M',
                },
                {
                    value: Padding.Large,
                    label: 'L',
                },
            ],
        },
    ],
    style: [
        {
            id: 'animationSection',
            type: 'sectionHeading',
            label: 'Animation',
            blocks: [
                {
                    id: SPEED_ID,
                    type: 'dropdown',
                    size: 'small',
                    defaultValue: animationSpeedValues[AnimationSpeed.Medium],
                    choices: [
                        {
                            label: AnimationSpeed.Fast,
                            value: animationSpeedValues[AnimationSpeed.Fast],
                        },
                        {
                            label: AnimationSpeed.Medium,
                            value: animationSpeedValues[AnimationSpeed.Medium],
                        },
                        {
                            label: AnimationSpeed.Slow,
                            value: animationSpeedValues[AnimationSpeed.Slow],
                        },
                    ],
                },
            ],
        },
        {
            id: 'staggerSection',
            type: 'sectionHeading',
            label: 'Staggering',
            blocks: [
                {
                    id: STAGGER_ID,
                    type: 'dropdown',
                    size: 'small',
                    defaultValue: animationStaggerValues[AnimationStagger.Fast],
                    choices: [
                        {
                            label: AnimationStagger.None,
                            value: animationStaggerValues[AnimationStagger.None],
                        },
                        {
                            label: AnimationStagger.Fast,
                            value: animationStaggerValues[AnimationStagger.Fast],
                        },
                        {
                            label: AnimationStagger.Medium,
                            value: animationStaggerValues[AnimationStagger.Medium],
                        },
                        {
                            label: AnimationStagger.Slow,
                            value: animationStaggerValues[AnimationStagger.Slow],
                        },
                    ],
                },
            ],
        },
    ],
});
