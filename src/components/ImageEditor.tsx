import { Asset } from '@frontify/app-bridge';
import { MenuItemStyle } from '@frontify/fondue';
import { BlockInjectButton, BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';
import { Image } from './Image';

type ImageEditorProps = {
    image: Asset;
    isLoading: boolean;
    onDelete: () => void;
    onDrop: (files: FileList) => void;
    onUploadClicked: () => void;
    onReplaceWithAssetClicked: () => void;
};

export const ImageEditor = ({
    image,
    isLoading,
    onDelete,
    onDrop,
    onReplaceWithAssetClicked,
    onUploadClicked,
}: ImageEditorProps): ReactElement => {
    return (
        <BlockItemWrapper
            shouldFillContainer={true}
            shouldHideWrapper={!image}
            toolbarFlyoutItems={[
                [
                    {
                        title: 'Replace with upload',
                        onClick: onUploadClicked,
                        icon: <div></div>,
                    },
                    {
                        title: 'Replace with asset',
                        onClick: onReplaceWithAssetClicked,
                        icon: <div></div>,
                    },
                ],
                [
                    {
                        title: 'Remove asset',
                        onClick: onDelete,
                        style: MenuItemStyle.Danger,
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
                        onDrop={onDrop}
                        onUploadClick={onUploadClicked}
                    />
                </div>
            )}
        </BlockItemWrapper>
    );
};
