import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import News from './News';
import LoadingNews from './LoadingNews';
import FirstNews from './FirstNews';

export default function ListNews({ news, isLoading, setPageSize, pageSize, fetchData , marginBottom }) {
    return (
        <View style={{...styles.container, marginBottom : marginBottom}}>
            <FlatList
                style={styles.flatList}
                data={news ? news.articles : []}
                renderItem={({ item }) => (
                    <News newsItem={item} />
                )}
                keyExtractor={(item, index) => item.url + index}
                initialNumToRender={10}
                onEndReached={async() => {
                    if (news) {
                        if (pageSize < news.totalResults) {
                            await setPageSize(prevValue => prevValue + 10);
                            fetchData();
                        }
                    }
                }}
                onEndReachedThreshold={1}
                ListFooterComponent={<LoadingNews isLoading={isLoading} />}
                ListHeaderComponent={<FirstNews firstNews={news? news.articles[9] : {}} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    flatList: {

    }
})