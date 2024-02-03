import 'tailwindcss/tailwind.css';

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { TextImageBlock } from './TextImageBlock';
import { settings } from './settings';

export default defineBlock({
    block: TextImageBlock,
    settings,
});
