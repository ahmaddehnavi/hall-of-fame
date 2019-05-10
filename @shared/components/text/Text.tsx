import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';

interface Props extends TextProps {
    bold?: boolean
}

@observer
export  class Text extends React.Component<Props> {
    render() {

        return (
            <RNText
                {...this.props}
                style={[this.props.bold ? styles.textBold : styles.text, this.props.style]}
            />
        )
    }
}


const styles = StyleSheet.create({
    text: {
        // todo default normal font,
        textAlign: 'left'
    },
    textBold: {
        // todo default bold font,
        textAlign: 'left'
    },
});