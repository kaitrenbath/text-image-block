type ImageProps = {
    alt?: string;
    src: string;
};

export const Image = ({ alt, src }: ImageProps) => {
    return <img className="tw-flex tw-w-full" loading="lazy" src={src} alt={alt} />;
};
