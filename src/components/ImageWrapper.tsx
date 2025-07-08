import {
    AppBridgeBlock,
    Asset,
    getMimeType,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ALLOWED_EXTENSIONS, alignmentClasses } from '../constants';
import { IMAGE_ID, Settings } from '../settings';
import Image from './Image';
import ImageEditor from './ImageEditor';

type Props = {
    appBridge: AppBridgeBlock;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const ImageWrapper = ({ appBridge, isLoading, setIsLoading }: Props) => {
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { alignment } = blockSettings;
    const isEditing = useEditorState(appBridge);
    const image = blockAssets?.[IMAGE_ID]?.[0];

    const [openFileDialog, { selectedFiles }] = useFileInput({
        accept: getMimeType(ALLOWED_EXTENSIONS).join(','),
        multiple: false,
    });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const updateAsset = async (asset: Asset) => {
        await updateAssetIdsFromKey(IMAGE_ID, [asset.id]);
        setIsLoading(false);
    };

    const removeAsset = async () => {
        await deleteAssetIdsFromKey(IMAGE_ID, [image?.id]);
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

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            updateAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div className="tw-h-full">
            {isEditing ? (
                <ImageEditor
                    alignment={alignment}
                    image={image}
                    isLoading={isLoading}
                    onAssetChooseClick={onOpenAssetChooser}
                    onDelete={removeAsset}
                    onDrop={onFilesDrop}
                    onReplaceWithAssetClicked={onOpenAssetChooser}
                    onUploadClicked={openFileDialog}
                />
            ) : (
                <div className={joinClassNames(['tw-flex', alignmentClasses[alignment]])}>
                    <Image src={image?.genericUrl} alt={image?.title} />
                </div>
            )}
        </div>
    );
};

export default ImageWrapper;
