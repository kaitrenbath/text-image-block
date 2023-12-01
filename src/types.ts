export type Settings = {
    animationSpeed: AnimationSpeed;
    orientation: Orientation;
    paddingChoice: Padding;
    content?: string;
};

export enum Orientation {
    TextImage = 'text_image',
    ImageText = 'image_text',
}

export enum Padding {
    None = 'None',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum AnimationSpeed {
    Slow = 'Slow',
    Medium = 'Medium',
    Fast = 'Fast',
}
