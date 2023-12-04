import {
    Asset,
    getMimeType,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import { BlockProps, RichTextEditor, joinClassNames } from '@frontify/guideline-blocks-settings';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Image, ImageEditor } from './components';
import { ALLOWED_EXTENSIONS, IMAGE_ID, PLACEHOLDER, paddingValues } from './settings';
import { Orientation, Settings } from './types';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
        multiple: false,
    });
    const isEditing = useEditorState(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const { animationSpeed, animationStaggering, content, paddingChoice, orientation } = blockSettings;
    const container = {
        hidden: {
            transition: {
                type: false,
            },
        },
        show: {
            transition: {
                staggerChildren: animationStaggering,
                staggerDirection: orientation === Orientation.TextImage ? 1 : -1,
            },
        },
    };
    const item = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: animationSpeed,
            },
        },
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateAsset = async (asset: Asset) => {
        await updateAssetIdsFromKey(IMAGE_ID, [asset.id]);
        setIsLoading(false);
    };

    const onOpenAssetChooser = () => {
        openAssetChooser(
            async (result) => {
                setIsLoading(true);
                updateAsset(result[0]);
                closeAssetChooser();
            },
            {
                selectedValueId: image?.id,
                extensions: ALLOWED_EXTENSIONS,
            },
        );
    };

    const onFilesDrop = (files: FileList) => {
        setIsLoading(true);
        uploadFile(files[0]);
    };

    const removeAsset = async () => {
        await deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
    };

    const updateContent = (content: string) => setBlockSettings({ content });

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults && isLoading) {
            updateAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    if (isEditing) {
        return (
            <div id={appBridge.context('blockId').get().toString()}>
                <div
                    className={joinClassNames([
                        'tw-flex tw-gap-x-4',
                        orientation === Orientation.TextImage ? 'tw-flex-row' : 'tw-flex-row-reverse',
                    ])}
                >
                    <div
                        className="tw-w-full tw-flex-1 tw-py-4"
                        style={{
                            paddingLeft: paddingValues[paddingChoice],
                            paddingRight: paddingValues[paddingChoice],
                        }}
                    >
                        <RichTextEditor
                            isEditing={isEditing}
                            placeholder={PLACEHOLDER}
                            value={content}
                            onTextChange={updateContent}
                        />
                    </div>
                    <div
                        className="tw-w-full tw-flex-1"
                        style={{
                            paddingLeft: paddingValues[paddingChoice],
                            paddingRight: paddingValues[paddingChoice],
                        }}
                    >
                        <ImageEditor
                            onDelete={removeAsset}
                            onDrop={onFilesDrop}
                            onReplaceWithAssetClicked={onOpenAssetChooser}
                            onUploadClicked={openFileDialog}
                            image={image}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id={appBridge.context('blockId').get().toString()} className="text-image-block">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={joinClassNames([
                    'tw-flex tw-gap-x-4',
                    orientation === Orientation.TextImage ? 'tw-flex-row' : 'tw-flex-row-reverse',
                ])}
            >
                <motion.div
                    variants={item}
                    className="tw-w-full tw-flex-1"
                    style={{
                        paddingLeft: paddingValues[paddingChoice],
                        paddingRight: paddingValues[paddingChoice],
                    }}
                >
                    <RichTextEditor
                        isEditing={isEditing}
                        placeholder={PLACEHOLDER}
                        value={content}
                        onTextChange={updateContent}
                    />
                </motion.div>

                <motion.div
                    variants={item}
                    className="tw-w-full tw-flex-1"
                    style={{
                        paddingLeft: paddingValues[paddingChoice],
                        paddingRight: paddingValues[paddingChoice],
                    }}
                >
                    <Image src={image?.genericUrl} alt={image?.title} />
                </motion.div>
            </motion.div>
        </div>
    );
};
