import {
    BoldPlugin,
    ItalicPlugin,
    LinkPlugin,
    PluginComposer,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue';
import { TextStylePluginsWithoutImage } from '@frontify/guideline-blocks-settings';

export const getPlugins = () => {
    const plugins = new PluginComposer();

    plugins.setPlugin([
        new TextStylePlugin({
            textStyles: TextStylePluginsWithoutImage,
        }),
    ]);
    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
    ]);

    return plugins;
};
