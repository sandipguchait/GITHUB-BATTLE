import React from 'react'


var styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

class Loading extends React.Component{

    state={
        text: this.props.text
    }

    componentDidMount() {
        var stopper = this.props.text + '...';

          this.interval = window.setInterval(()=>{
            if(this.state.text === stopper) {
                this.setState ({
                    text: this.props.text
                })
            } else {
                this.setState({
                    text: this.state.text + '.'
                })
            }
        }, 300)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render(){
        return(
            <p style={styles.content}>
            {this.state.text}
            </p>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading'
};

export default Loading;