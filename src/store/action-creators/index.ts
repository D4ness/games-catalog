import * as gamesListActionCreators from "./gamesList"
import * as changePageListActionCreators from "./changePage"
import * as gameActionCreators from "./game"

export default {
    ...gamesListActionCreators,
    ...changePageListActionCreators,
    ...gameActionCreators
}