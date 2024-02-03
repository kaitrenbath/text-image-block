type ImageProps = {
    alt?: string;
    src: string;
};

const Image = ({ alt, src }: ImageProps) => {
    return <img loading="lazy" src={src} alt={alt} />;
};

export default Image;
