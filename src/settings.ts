import { IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

import {
    ALLOWED_EXTENSIONS,
    Alignment,
    AnimationSpeed,
    AnimationStagger,
    Orientation,
    Padding,
    Ratio,
} from './constants';

const ALIGNMENT_ID = 'alignment';
const PADDING_CHOICE_ID = 'paddingChoice';
const RATIO_ID = 'ratio';
const SPEED_ID = 'animationSpeed';
const STAGGER_ID = 'animationStaggering';
export const IMAGE_ID = 'imageAsset';

export type Settings = {
    alignment: (typeof Alignment)[keyof typeof Alignment];
    animationSpeed: (typeof AnimationSpeed)[keyof typeof AnimationSpeed];
    animationStaggering: (typeof AnimationStagger)[keyof typeof AnimationStagger];
    paddingChoice: (typeof Padding)[keyof typeof Padding];
    orientation: (typeof Orientation)[keyof typeof Orientation];
    ratio: (typeof Ratio)[keyof typeof Ratio];
    content?: string;
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
                    showForTranslations: true,
                },
            ],
        },
    ],
    layout: [
        {
            id: RATIO_ID,
            label: 'Ratio',
            type: 'segmentedControls',
            defaultValue: Ratio.Ratio1To1,
            choices: [
                {
                    value: Ratio.Ratio2To1,
                    icon: IconEnum.MediaObjectRatio2To1,
                },
                {
                    value: Ratio.Ratio1To1,
                    icon: IconEnum.MediaObjectRatio1To1,
                },
                {
                    value: Ratio.Ratio1To2,
                    icon: IconEnum.MediaObjectRatio1To2,
                },
            ],
        },
        {
            id: ALIGNMENT_ID,
            type: 'segmentedControls',
            defaultValue: Alignment.Center,
            info: 'For images that are smaller than the width of the Content Block.',
            label: 'Alignment',
            choices: [
                {
                    value: Alignment.Left,
                    icon: IconEnum.ArrowAlignLeft,
                },
                {
                    value: Alignment.Center,
                    icon: IconEnum.ArrowAlignVerticalCentre,
                },
                {
                    value: Alignment.Right,
                    icon: IconEnum.ArrowAlignRight,
                },
            ],
        },
        {
            id: PADDING_CHOICE_ID,
            type: 'segmentedControls',
            defaultValue: Padding.Small,
            info: 'The spacing around the image.',
            label: 'Padding',
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
                    defaultValue: AnimationSpeed.Medium,
                    choices: [
                        {
                            label: 'Fast',
                            value: AnimationSpeed.Fast,
                        },
                        {
                            label: 'Medium',
                            value: AnimationSpeed.Medium,
                        },
                        {
                            label: 'Slow',
                            value: AnimationSpeed.Slow,
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
                    defaultValue: AnimationSpeed.Fast,
                    choices: [
                        {
                            label: 'None',
                            value: AnimationStagger.None,
                        },
                        {
                            label: 'Fast',
                            value: AnimationStagger.Fast,
                        },
                        {
                            label: 'Medium',
                            value: AnimationStagger.Medium,
                        },
                        {
                            label: 'Slow',
                            value: AnimationStagger.Slow,
                        },
                    ],
                },
            ],
        },
    ],
});
