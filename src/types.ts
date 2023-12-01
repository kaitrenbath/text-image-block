export type Settings = {
    orientation: Orientation;
    content?: string;
};

export interface RichTextEditorProps {
    onTextChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
}

export enum Orientation {
    TextImage = 'text_image',
    ImageText = 'image_text',
}
