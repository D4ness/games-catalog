import * as gamesListActionCreators from "./gamesList"
import * as changePageListActionCreators from "./changePage"

export default {
    ...gamesListActionCreators,
    ...changePageListActionCreators
}