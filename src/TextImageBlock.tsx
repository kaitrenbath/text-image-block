import { useBlockSettings } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useEffect } from 'react';

import type { Settings } from './types';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    useEffect(() => {
        console.log(blockSettings);
    }, [blockSettings]);

    return (
        <div className="text-image-block">
            <p className="tw-w-full">Hello, world</p>
        </div>
    );
};
