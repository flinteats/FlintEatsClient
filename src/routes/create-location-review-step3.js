import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CreateLocationReviewScreenStep3 extends React.Component {

    constructor(props) {
        super(props);
        // [this state member] : [default value],
        //etc....
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                {/* Card view for displaying and adding tags to the review */}
                <Card style={{ minHeight: 65, maxHeight: 300 }}>
                    {tagsCardItem}
                    <CardItem style={{ alignItems: 'flex-start' }}>
                        <Autocomplete style={{ position: 'relative' }}
                            autoCapitalize='none'
                            data={this.state.tagResults}
                            value={this.state.tagText}
                            onChangeText={(text) => this.tagScan(text)}
                            onSubmitEditing={() => this.addTag({ name: this.state.tagText.toLowerCase(), id: this.state.tags.length })}
                            placeholder='Tags'
                            renderItem={(data) => (
                                <TouchableOpacity
                                    onPress={() => this.addTag(data)}>
                                    <Text>{data.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </CardItem>
                </Card>

            </KeyboardAwareScrollView>
        );
    }

}