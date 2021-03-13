import { IContext } from "../App";
import { IArticle } from "../interfaces";

export const getContextFunctions = (context: IContext, setContext: any, getData: () => void) => ({
    handleRefresh: () => {
        if (context.isOnline) {
            getData();
        }
    },
    handleSaveArticle: (article: IArticle) => {
        setContext((prevState: IContext) => ({
            ...prevState,
            savedArticles: [...prevState.savedArticles, article]
        }));
    },
    handleUnsaveArticle: (articleId: IArticle['id']) => {
        setContext((prevState: IContext) => ({
            ...prevState,
            savedArticles: prevState.savedArticles.filter(({ id }) => id !== articleId)
        }));
    },
    markArticleAsRead: (articleId: IArticle['id']) => {
        setContext((prevState: IContext) => ({
            ...prevState,
            readArticlesIDs: [...prevState.readArticlesIDs, articleId]
        }));
    },
    updateContextProperty: (key: string, value: unknown) => setContext((prevState: IContext) => ({
        ...prevState,
        [key]: value
    }))
});
