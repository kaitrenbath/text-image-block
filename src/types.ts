export type Settings = {
    animationSpeed: AnimationSpeed;
    animationStaggering: number;
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
    None = 'None',
    Slow = 'Slow',
    Medium = 'Medium',
    Fast = 'Fast',
}

export enum AnimationSpeed {
    Slow = 'Slow',
    Medium = 'Medium',
    Fast = 'Fast',
}
