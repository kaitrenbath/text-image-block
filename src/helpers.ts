import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { TextStylePluginsWithoutImage, TextStylesWithoutImage } from '@frontify/guideline-blocks-settings';

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
    plugins.setPlugin([
        new AlignLeftPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignCenterPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignRightPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignJustifyPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
    ]);

    return plugins;
};
