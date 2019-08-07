const {Component}= React 

class Landing extends Component{
    constructor(){
        super()

        this.state={ view: 'search', value:undefined, news:[], article:undefined, error: undefined, user: undefined, favs: []}
        
        this.handleSearch=this.handleSearch.bind(this)
        this.handleRetrieveArticle=this.handleRetrieveArticle.bind(this)
        this.handleBackFromDetail=this.handleBackFromDetail.bind(this)
        this.handleRegister=this.handleRegister.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleToggleFavArticleFromArticleDetail=this.handleToggleFavArticleFromArticleDetail.bind(this)
        this.handleFavorites=this.handleFavorites.bind(this)
        this.handleToggleFavArtFromFavorites=this.handleToggleFavArtFromFavorites.bind(this)
    }

    handleSearch(value){
        /* console.log(value, "correct") */
        this.props.onSpinning()
        logic.searchNews(value)
        .then(news=>this.setState({news,value}))
        .catch(({message}) => this.setState({error: message}))
        .then(() => console.log("p:",this.state.news))
        .then(()=> this.props.onStopSpinning())
    }

    handleRetrieveArticle(item){

        const {props : {credentials}} = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveArticle(id, token, item)
        this.setState({ article:item }) 
    }

    handleRegister(event){
        event.preventDefault()
        this.props.onRegister()
    }

    handleBackFromDetail() {
        const { state: { value }} = this
        logic.searchNews(value)
            .then(news => this.setState({ news, article: undefined }))
            .catch(({ message }) => this.setState({ error: message }))
    }

    handleLogin(event){
        event.preventDefault()
        this.props.onLogin()
    }

    handleLogout(event){
        event.preventDefault()

        const { props: { onLogout } } = this

        this.setState({ user: undefined, view: 'search'}, () =>
        onLogout())

        delete sessionStorage.id
        delete sessionStorage.token
        this.setState({ credentials: undefined })
    }
  
    handleToggleFavArticleFromArticleDetail(article){
        const {props : { onLogin, credentials}, handleRetrieveArticle} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)
        
        credentials ? logic.toggleFavArt(id, token, article)
        .then(() => handleRetrieveArticle(article))
        .catch(({ message}) => this.setState( { error : message})) 
        : onLogin()
    } 

    handleFavorites() {
        const { props: {credentials}} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.retrieveFavNews(id, token)
            .then(favs => this.setState({ view: 'favorites', favs}))
            .catch(({ message }) => this.setState({ error: message}))
    }

    handleToggleFavArtFromFavorites(article) {
        const { props: { onLogin, credentials}, handleFavorites} = this

        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        credentials ? logic.toggleFavArt(id, token, article).then(() => handleFavorites()).catch(({ message }) => this.setState({ error: message})) : onLogin()
    }

    render(){
        const {
        state: { view, news, article, error, user, favs},
        handleSearch, handleRetrieveArticle, handleRegister, handleBackFromDetail, handleLogin, handleToggleFavArticleFromArticleDetail, handleFavorites, handleToggleFavArtFromFavorites } = this

        return <>
        <header>
            {user && <p>Hello, {user.name}</p>}
            <nav className="nav">
                {! user ?
                <ul className="nav-ul">
                    <li><a href="" className="register-li" onClick={handleRegister}>Register</a></li>
                    <li><a className="login-li" href=""onClick={handleLogin}>Login</a></li>
                </ul>: <ul>
                    {view === 'search' && <li><a href="" onClick={event => { event.preventDefault()
                    handleFavorites()}}>Favorites</a></li>}
                    {view === 'favorites' && <li><a href="" onClick={handleGoToSearch}>Search</a></li>}
                    <li><a href="" onClick={handleLogout}>Logout</a></li>
                </ul>}
            </nav>
             <h1 className='landing__title hide'>SkyNews</h1>
             <img className="nav-logo" src="style/img/skynews-logo.png"></img> 
        </header>

        {view === 'search' && <>
            <Search onSearch={handleSearch} error={error}/>

        {!article?
            <Results items={news} paintItem={article => {
                return <ArticleItem article={article}/>
            }} onItem={handleRetrieveArticle}/>
            :
            <ArticleDetail article={article} onBack={handleBackFromDetail} onToggle={handleToggleFavArticleFromArticleDetail}/>}
        </>}
        

        {view === 'favorites' && <>
            <Results items={favs} paintItem={duck => {
                return <ArticleDetail article={article} onToggle={handleToggleFavArtFromFavorites} />
            }} onItem={handleRetrieveArticle} />
        </>}
    </>
    }
}

