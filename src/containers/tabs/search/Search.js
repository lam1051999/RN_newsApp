import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { View, StyleSheet } from 'react-native';
import { NEWS_API_KEY } from 'react-native-dotenv';
import ListNews from '../home/components/ListNews';
import NoResults from './components/NoResults';

export default function Search() {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("publishedAt");
    const [news, setNews] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    function fetchData() {
        setIsLoading(true);
        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&pageSize=${pageSize}&language=en&sortBy=${sort}`)
            .then(response => response.json())
            .then(data => {
                setNews(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            <SearchBar setSort={setSort} pageSize={pageSize} setPageSize={setPageSize} query={query} setQuery={setQuery} isLoading={isLoading} fetchData={fetchData} setNews={setNews} />
            {
                news ? (news.articles.length === 0 ?
                    <NoResults />
                    :
                    <ListNews marginBottom={60} news={news} isLoading={isLoading} setPageSize={setPageSize} pageSize={pageSize} fetchData={fetchData} />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchResults: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: '#0288d1'
    }
})