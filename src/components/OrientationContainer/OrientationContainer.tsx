import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { ReactElement, ReactNode } from 'react';
import { Orientation } from '../../types';

type Props = {
    children: ReactNode;
    orientation: Orientation;
};

export const OrientationContainer = ({ children, orientation }: Props): ReactElement => {
    return (
        <div
            className={joinClassNames([
                'tw-flex tw-gap-x-4',
                orientation === Orientation.TextImage ? 'tw-flex-row' : 'tw-flex-row-reverse',
            ])}
        >
            {children}
        </div>
    );
};
