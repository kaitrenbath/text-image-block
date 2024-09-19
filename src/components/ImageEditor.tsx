import { Asset } from '@frontify/app-bridge';
import { IconArrowCircleUp20, IconImageStack20, IconTrashBin20, MenuItemStyle } from '@frontify/fondue';
import { BlockInjectButton, BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';

import Image from './Image';
import { Alignment, alignmentClasses } from '../constants';

type ImageEditorProps = {
    alignment: (typeof Alignment)[keyof typeof Alignment];
    image: Asset;
    isLoading: boolean;
    onAssetChooseClick: () => void;
    onDelete: () => void;
    onDrop: (files: FileList) => void;
    onUploadClicked: () => void;
    onReplaceWithAssetClicked: () => void;
};

const ImageEditor = ({
    alignment,
    image,
    isLoading,
    onAssetChooseClick,
    onDelete,
    onDrop,
    onReplaceWithAssetClicked,
    onUploadClicked,
}: ImageEditorProps): ReactElement => {
    return (
        <BlockItemWrapper
            shouldFillContainer={true}
            shouldHideWrapper={!image}
            toolbarItems={[
                {
                    type: 'menu',
                    items: [
                        [
                            {
                                title: 'Replace with upload',
                                onClick: onUploadClicked,
                                icon: <IconArrowCircleUp20 />,
                            },
                            {
                                title: 'Replace with asset',
                                onClick: onReplaceWithAssetClicked,
                                icon: <IconImageStack20 />,
                            },
                        ],
                        [
                            {
                                title: 'Remove asset',
                                onClick: onDelete,
                                style: MenuItemStyle.Danger,
                                icon: <IconTrashBin20 />,
                            },
                        ],
                    ],
                },
            ]}
        >
            {image ? (
                <div className={`tw-flex tw-w-full tw-flex-1 ${alignmentClasses[alignment]}`}>
                    <Image src={image?.previewUrl} alt={image?.title} />
                </div>
            ) : (
                <div className="tw-h-full tw-min-h-[120px]">
                    <BlockInjectButton
                        label="Add or drop image here"
                        fillParentContainer={true}
                        isLoading={isLoading}
                        onAssetChooseClick={onAssetChooseClick}
                        onDrop={onDrop}
                        onUploadClick={onUploadClicked}
                    />
                </div>
            )}
        </BlockItemWrapper>
    );
};

export default ImageEditor;
