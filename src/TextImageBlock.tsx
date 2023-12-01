import {
    Asset,
    getMimeType,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import { BlockProps, RichTextEditor } from '@frontify/guideline-blocks-settings';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Image, ImageEditor, OrientationContainer } from './components';
import { ALLOWED_EXTENSIONS, IMAGE_ID, PLACEHOLDER } from './settings';
import { Settings } from './types';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isImageLoading && setIsUploading(true),
    });
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
        multiple: false,
    });
    const isEditing = useEditorState(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];
    const { content, orientation } = blockSettings;

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

    const onFileDialogUpload = () => {
        openFileDialog();
    };

    const updateAsset = async (asset: Asset) => {
        await updateAssetIdsFromKey(IMAGE_ID, [asset.id]);
    };

    const removeAsset = async () => {
        await deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
    };

    const updateContent = (content: string) => setBlockSettings({ content });

    useEffect(() => {
        if (selectedFiles) {
            setIsImageLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults && isUploading) {
            updateAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    if (isEditing) {
        return (
            <div id={appBridge.context('blockId').get().toString()}>
                <OrientationContainer orientation={orientation}>
                    <div className="tw-w-full tw-flex-1 tw-py-4">
                        <RichTextEditor
                            isEditing={isEditing}
                            placeholder={PLACEHOLDER}
                            value={content}
                            onTextChange={updateContent}
                        />
                    </div>
                    <div className="tw-w-full tw-flex-1">
                        <ImageEditor
                            onUploadClicked={onFileDialogUpload}
                            onDelete={removeAsset}
                            image={image}
                            isLoading={isImageLoading}
                        />
                    </div>
                </OrientationContainer>
            </div>
        );
    }

    return (
        <div id={appBridge.context('blockId').get().toString()} className="text-image-block">
            <OrientationContainer orientation={orientation}>
                <div className="tw-w-full tw-py-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <RichTextEditor
                            isEditing={isEditing}
                            placeholder={PLACEHOLDER}
                            value={content}
                            onTextChange={updateContent}
                        />
                    </motion.div>
                </div>
                <div className="tw-w-full">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <Image src={image?.genericUrl} alt={image?.title} />
                    </motion.div>
                </div>
            </OrientationContainer>
        </div>
    );
};
