class Xkcd extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    comicNumber: 'latest',
                    lastComic: 0,
                    current: {
                      title: '',
                      img: '',
                      alt: ''
                    },
                };
        
                this.getXKCD = this.getXKCD.bind(this);
                this.prev = this.prev.bind(this);
                this.forward = this.forward.bind(this);
                this.first = this.first.bind(this);
                this.last = this.last.bind(this);
                this.getRandom = this.getRandom.bind(this);
                this.getXKCD();
            }
        
            getXKCD() {
                var url = 'https://xkcd.vercel.app/?comic=' + this.state.comicNumber;
                axios.get(url)
                .then(response => {
                  let comicNum = response.data.num;
                  this.state.comicNumber = comicNum;
                  if(this.state.lastComic == 0) {
                      this.state.lastComic = comicNum;
                  }
                  console.log(this.state);
                  // Since we render current, we need to call setState()
                  this.setState(prevState => {
                    // creating copy of state variable current
                    let current = Object.assign({}, prevState.current);  
                    current = response.data;    // update the object
                    return { current };         // return new object current
                  });
                  return true;
                })
                .catch(error => {
                  console.log(error)
                });
            }
            first(){
                this.state.comicNumber = 1;
                this.getXKCD();
            }
            prev() {
                if (this.state.comicNumber != 1){
                    this.state.comicNumber = this.state.comicNumber - 1;
                }
                this.getXKCD();
            }
            forward() {
                if (this.state.comicNumber !== parseInt(this.state.lastComic)){
                    this.state.comicNumber = this.state.comicNumber + 1;
                }
                this.getXKCD();
            }
            last() {
                this.state.comicNumber = this.state.lastComic;
                this.getXKCD();
            }
            getRandom(){
                this.state.comicNumber = Math.floor(Math.random() * this.state.lastComic);
                this.getXKCD();
            }
        
            render() {
                return (
                    <div>
                        <h1> XKCD Comics </h1>
                        <div>
                            
                            <h2>{this.state.current.safe_title}</h2>
                            <h3>{this.state.current.month}/{this.state.current.day}/{this.state.current.year}</h3>
                            <h4>#{this.state.current.num}</h4>
                            <img src={this.state.current.img} alt={this.state.current.alt}></img>
                            <p>{this.state.current.alt}</p>
                            <button onClick={this.first}>first</button>
                            <button onClick={this.prev}>Previous</button>
                            <button onClick={this.getRandom}>Random</button>
                            <button onClick={this.forward}>Next</button>
                            <button onClick={this.last}>Last</button>
                           
                        </div>
                    </div>
                );
            }
        }
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Xkcd />);