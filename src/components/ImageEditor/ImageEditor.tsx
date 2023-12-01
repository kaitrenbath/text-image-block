import { ReactElement } from 'react';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';

type ImageEditorProps = {
    isLoading: boolean;
    previewUrl?: string;
    title?: string;
    onUploadClicked: () => void;
};

export const ImageEditor = ({ isLoading, onUploadClicked, previewUrl, title }: ImageEditorProps): ReactElement => {
    return (
        <div className="tw-w-full tw-bg-blue-300">
            {previewUrl ? (
                <img
                    loading="lazy"
                    className="tw-w-full tw-h-full tw-object-cover tw-object-left"
                    src={previewUrl}
                    alt={title}
                />
            ) : (
                <BlockInjectButton
                    label="Add or drop image here"
                    fillParentContainer={true}
                    isLoading={isLoading}
                    onUploadClick={onUploadClicked}
                />
            )}
        </div>
    );
};
