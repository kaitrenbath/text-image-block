import { useAssetUpload, useBlockAssets, useBlockSettings, useEditorState, useFileInput } from '@frontify/app-bridge';
import { BlockProps, RichTextEditor } from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';
import { ImageEditor, OrientationContainer } from './components';
import { PLACEHOLDER } from './settings';
import { Settings } from './types';

export const TextImageBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: false });
    const isEditing = useEditorState(appBridge);

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
    const [, setIsImageLoaded] = useState<boolean>(false);

    const { imageAsset } = blockAssets;
    const { content, orientation } = blockSettings;

    const imageTitle = imageAsset ? imageAsset[0].title : '';
    const imagePreviewUrl = imageAsset ? imageAsset[0].previewUrl : '';

    const onFileDialogUpload = () => {
        setIsUploading(true);
        openFileDialog();
    };

    const onImageLoaded = () => {
        setIsImageLoading(false);
        setIsImageLoaded(true);
    };

    const updateContent = (content: string) => setBlockSettings({ content });

    useEffect(() => {
        if (imagePreviewUrl) {
            const image = new Image();
            image.onload = () => onImageLoaded();
            image.src = imagePreviewUrl;
        }
    }, [imagePreviewUrl]);

    useEffect(() => {
        if (selectedFiles) {
            setIsImageLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults && isUploading) {
            (async (uploadResults) => {
                const resultId = uploadResults[0].id;
                await updateAssetIdsFromKey('imageAsset', [resultId]);
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    if (isEditing) {
        return (
            <div id={appBridge.context('blockId').get().toString()}>
                <OrientationContainer orientation={orientation}>
                    <div className="tw-py-10 tw-w-full tw-bg-red-300">
                        <RichTextEditor
                            isEditing={isEditing}
                            placeholder={PLACEHOLDER}
                            value={content}
                            onTextChange={updateContent}
                        />
                    </div>
                    <ImageEditor
                        onUploadClicked={onFileDialogUpload}
                        title={imageTitle}
                        previewUrl={imagePreviewUrl}
                        isLoading={isImageLoading}
                    />
                </OrientationContainer>
            </div>
        );
    }

    return (
        <div id={appBridge.context('blockId').get().toString()} className="text-image-block">
            <OrientationContainer orientation={orientation}>
                <div className="tw-w-full">
                    <p>add framer motion wrapper</p>
                    <RichTextEditor
                        isEditing={isEditing}
                        placeholder={PLACEHOLDER}
                        value={content}
                        onTextChange={updateContent}
                    />
                </div>
                <div className="tw-w-full">
                    <p>add framer motion wrapper</p>
                </div>
            </OrientationContainer>
        </div>
    );
};
