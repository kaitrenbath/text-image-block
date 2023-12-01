import { FileExtensionSets, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { Orientation } from './types';

export const IMAGE_ID = 'imageAsset';
export const PLACEHOLDER = 'Write some content here...';
export const ALLOWED_EXTENSIONS = [...FileExtensionSets.Images];

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
});
