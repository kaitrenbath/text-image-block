import { Asset } from '@frontify/app-bridge';
import { IconArrowCircleUp20, IconImageStack20, IconTrashBin20, LoadingCircle, MenuItemStyle } from '@frontify/fondue';
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
                <div className={`tw-relative tw-flex tw-w-full tw-flex-1 ${alignmentClasses[alignment]}`}>
                    {isLoading && (
                        <>
                            <span className="tw-absolute tw-inset-0 tw-bg-white tw-opacity-50"></span>
                            <span className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                                <LoadingCircle />
                            </span>
                        </>
                    )}
                    <div>
                        <Image src={image?.previewUrl} alt={image?.title} />
                    </div>
                </div>
            ) : (
                <div className="tw-h-32 md:tw-h-full md:tw-min-h-[120px]">
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
