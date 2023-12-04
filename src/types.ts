export type Settings = {
    animationSpeed: AnimationSpeed;
    animationStaggering: AnimationStagger;
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

export enum AnimationStagger {
    None = 0,
    Slow = 0.15,
    Medium = 0.4,
    Fast = 0.7,
}

export enum AnimationSpeed {
    Slow = 'Slow',
    Medium = 'Medium',
    Fast = 'Fast',
}
