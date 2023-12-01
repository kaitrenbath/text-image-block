import { ReactElement } from 'react';
import { Asset } from '@frontify/app-bridge';
import { BlockInjectButton, BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { Image } from './Image';

type ImageEditorProps = {
    image: Asset;
    isLoading: boolean;
    onDelete: () => void;
    onUploadClicked: () => void;
};

export const ImageEditor = ({ image, isLoading, onDelete, onUploadClicked }: ImageEditorProps): ReactElement => {
    return (
        <BlockItemWrapper
            shouldFillContainer={true}
            shouldHideWrapper={!image}
            toolbarFlyoutItems={[
                [
                    {
                        title: 'Remove asset',
                        onClick: onDelete,
                        icon: <div></div>,
                    },
                ],
            ]}
            toolbarItems={[]}
        >
            {image ? (
                <Image src={image?.previewUrl} alt={image?.title} />
            ) : (
                <div className="tw-h-full">
                    <BlockInjectButton
                        label="Add or drop image here"
                        fillParentContainer={true}
                        isLoading={isLoading}
                        onUploadClick={onUploadClicked}
                    />
                </div>
            )}
        </BlockItemWrapper>
    );
};
