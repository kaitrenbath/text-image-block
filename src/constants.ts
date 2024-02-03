import { FileExtensionSets } from '@frontify/guideline-blocks-settings';

export const PLACEHOLDER = 'Write some content here...';
export const ALLOWED_EXTENSIONS = [...FileExtensionSets.Images];

export const Alignment = {
    Left: 'Left',
    Center: 'Center',
    Right: 'Right',
} as const;

export const alignmentClasses = {
    [Alignment.Left]: 'tw-justify-start',
    [Alignment.Center]: 'tw-justify-center',
    [Alignment.Right]: 'tw-justify-end',
};

export const AnimationStagger = {
    None: 0,
    Fast: 0.15,
    Medium: 0.4,
    Slow: 0.7,
} as const;

export const AnimationSpeed = {
    Fast: 0.3,
    Medium: 0.6,
    Slow: 1,
} as const;

export const Orientation = {
    TextImage: 'text_image',
    ImageText: 'image_text',
} as const;

export const Padding = {
    None: '0',
    Small: '1vw',
    Medium: '2.5vw',
    Large: '5vw',
} as const;

export const Ratio = {
    Ratio2To1: 'tw-w-full md:!tw-w-2/3',
    Ratio1To1: 'tw-w-full md:!tw-w-1/2',
    Ratio1To2: 'tw-w-full md:!tw-w-1/3',
} as const;
